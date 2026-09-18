/* -----------------------------------------------------------------------------
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX Hide the CMS origin XXXXXXXXXXXXXXXXXXXXXXXXXXXXX
----------------------------------------------------------------------------- */

// Never reaches a Client Component bundle — see the doc comment below.
import "server-only";

/* -----------------------------------------------------------------------------
Every WPGraphQL field that hands back a URL under the CMS's own uploads
directory (a featured image, a logo, the Hero video's `mediaItemUrl`) arrives
as an *absolute* URL pointing at the real CMS origin. Left alone, that's
exactly what ends up in the rendered page — visible in page source, a
"copy image address", a "copy link address" on any document.
`app/api/media/[...path]/route.ts` proxies those files through this app's own
origin instead; the functions here rewrite a CMS-origin URL to point at that
proxy, wherever one is found.

Unlike a bare WordPress install, this CMS's WPGraphQL endpoint
(`CMS_API_URL`) lives under a path prefix
(`https://vzt.nmy.mybluehost.me/website_bffab4f5/graphql`), not at a host's
root — confirmed against a live query, e.g.
`https://vzt.nmy.mybluehost.me/website_bffab4f5/wp-content/uploads/2025/01/...`.
So matching against `CMS_URL`/`DEV_CMS_URL` alone (bare hostnames) would miss
every real media URL this CMS actually returns; `CMS_SITE_URL` derives the
*site root* (host + path prefix) from `CMS_API_URL` by dropping its trailing
`/graphql`, and that's the origin actually used for matching and for the
proxy route's upstream fetch. `CMS_URL`/`DEV_CMS_URL` are kept in
`CMS_ORIGINS` too as a fallback, in case content ever links directly to the
production host instead.
----------------------------------------------------------------------------- */

const CMS_SITE_URL = process.env.CMS_API_URL?.replace(/\/graphql\/?$/, "");
const CMS_ORIGINS = [CMS_SITE_URL, process.env.CMS_URL, process.env.DEV_CMS_URL].filter(
	(url): url is string => Boolean(url)
);

/* -----------------------------------------------------------------------------
XXXXXXXXXXXXXXXXXXXXXXXXXXXXX Photon-wrapped CMS URLs XXXXXXXXXXXXXXXXXXXXXXXXXX
Jetpack's Photon CDN, if ever enabled on this CMS, re-hosts media as
`https://i{0-3}.wp.com/<cms-domain>/wp-content/uploads/…` — a Photon URL still
carries the real CMS hostname *inside* it, one level down. Photon also 403s
server-side/datacenter requests, so `next/image`'s own optimizer (which
fetches server-side) can't load one directly either way. Recognising this
shape and extracting straight to the `/api/media` path handles both problems
in one step: this app's own proxy always fetches from `CMS_SITE_URL`
directly, never Photon, so the 403 never happens, and the hostname is masked
exactly as for a non-Photon URL.
----------------------------------------------------------------------------- */

const PHOTON_ORIGIN_RE = /^https?:\/\/i[0-3]\.wp\.com\/[^/]+/i;

/* -----------------------------------------------------------------------------
`wp-content/uploads/` is WordPress's own media-library directory name — leaving
it in the proxied path is as much a giveaway that the CMS is WordPress as the
real hostname would be. Every URL this module ever rewrites — bare CMS-origin
or Photon-wrapped, they both ultimately point at the same real uploads
directory — matches this one shape, so a single regex extracts the part that
actually varies (the dated sub-path + filename) and drops everything else:
the origin, the `wp-content/uploads/` segment itself, and any trailing query
string. `app/api/media/[...path]/route.ts` reconstructs the real path by
re-prepending `wp-content/uploads/` before it fetches from `CMS_SITE_URL`, so
nothing is lost — this app's own URL just never has to say the directory
name out loud.
----------------------------------------------------------------------------- */

const UPLOADS_SUBPATH_RE = /\/wp-content\/uploads\/([^?#]+)/i;

/* -----------------------------------------------------------------------------
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX Single URL field XXXXXXXXXXXXXXXXXXXXXXXXXXXXX
----------------------------------------------------------------------------- */

/**
 * The `/api/media` path for a single URL, whether it's a bare CMS-origin URL
 * or a Photon-wrapped one — or `null` if `url` is neither (a URL on some
 * unrelated host, an already-rewritten root-relative path, plain text) or no
 * CMS origin is configured to rewrite against in the first place (rewriting
 * to a proxy that has nothing to fetch from would be worse than leaving a
 * working, if origin-revealing, URL alone).
 */
const mediaProxyPath = (url: string): string | null => {
	if (CMS_ORIGINS.length === 0) return null;

	const isRecognisedOrigin =
		PHOTON_ORIGIN_RE.test(url) || CMS_ORIGINS.some((origin) => url.startsWith(origin));
	if (!isRecognisedOrigin) return null;

	const uploadsMatch = url.match(UPLOADS_SUBPATH_RE);
	return uploadsMatch ? `/api/media/${uploadsMatch[1]}` : null;
};

/**
 * Rewrites a single absolute CMS-origin (or Photon-wrapped) URL
 * (`featuredImage.sourceUrl`, the Hero video's `mediaItemUrl`, …) to the same
 * path behind this app's own `/api/media` proxy. Passes anything else —
 * `null`/`undefined`, an already root-relative path, a URL on some other
 * host — straight through unchanged, so it's safe to call on a value that
 * might not be a CMS URL at all.
 * @param url The field value as WPGraphQL returned it.
 * @returns The rewritten path, or `url` unchanged if it isn't a CMS URL.
 */
export const rewriteCmsMediaUrl = <T extends string | null | undefined>(url: T): T => {
	if (!url) return url;
	return (mediaProxyPath(url) ?? url) as T;
};

/* -----------------------------------------------------------------------------
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX WYSIWYG HTML field XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
----------------------------------------------------------------------------- */

// Deliberately scoped to `src`/`href` values that look like an absolute URL —
// a root-relative path is never a CMS URL, so there's nothing for
// `mediaProxyPath` to rewrite it to and matching it would just be wasted work.
const SRC_OR_HREF_URL_RE = /(src|href)="(https?:\/\/[^"]*)"/g;

/**
 * Rewrites every CMS-origin or Photon-wrapped `src="…"`/`href="…"` in a
 * WYSIWYG HTML string (a post `content`/`excerpt`, an ACF `paragraph` field)
 * — covers an inline `<img>` and a linked document in one pass, whichever
 * attribute carries it.
 * @param html The raw HTML field value as WPGraphQL returned it.
 * @returns The HTML with every matching `src`/`href` rewritten; `""` for a
 * falsy input.
 */
export const rewriteCmsUrlsInHtml = (html: string | null | undefined): string => {
	if (!html) return "";
	return html.replace(SRC_OR_HREF_URL_RE, (full, attr: string, url: string) => {
		const rewritten = mediaProxyPath(url);
		return rewritten ? `${attr}="${rewritten}"` : full;
	});
};

/* -----------------------------------------------------------------------------
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX Whole response payload XXXXXXXXXXXXXXXXXXXXXXXXX
----------------------------------------------------------------------------- */

// Above this many levels of nesting, stop recursing rather than risk a stack
// overflow on a pathological/circular payload — no real WPGraphQL response
// shape in this codebase nests anywhere near this deep.
const MAX_DEPTH = 12;

const rewriteValue = (value: unknown, depth: number): unknown => {
	if (depth > MAX_DEPTH) return value;

	if (typeof value === "string") {
		// A field can be a bare URL (sourceUrl, mediaItemUrl) or a WYSIWYG blob
		// with URLs embedded in markup — try both; each is a no-op if it doesn't
		// apply, and a string is never validly both shapes at once.
		const bareUrlRewrite = rewriteCmsMediaUrl(value);
		if (bareUrlRewrite !== value) return bareUrlRewrite;
		return rewriteCmsUrlsInHtml(value);
	}

	if (Array.isArray(value)) {
		return value.map((item) => rewriteValue(item, depth + 1));
	}

	if (value && typeof value === "object") {
		const result: Record<string, unknown> = {};
		for (const [key, nested] of Object.entries(value)) {
			result[key] = rewriteValue(nested, depth + 1);
		}
		return result;
	}

	return value;
};

/**
 * Recursively rewrites every CMS-origin URL anywhere inside an arbitrary
 * WPGraphQL response payload — a bare URL field or one embedded in a WYSIWYG
 * HTML blob, at any depth, in an object or an array. Applying this once at
 * the point `fetchCmsGraphQL` unwraps its response means every consumer,
 * present and future, gets data that's already safe: there's no per-field
 * "did I remember to rewrite this one" failure mode left to have as new ACF
 * fields/blocks are added later.
 *
 * Safe on non-CMS strings: a title, a slug, a plain-text label never happens
 * to start with (or embed a `src=`/`href=` pointing at) the CMS origin, so
 * this only ever touches genuine CMS URLs.
 * @param value Any JSON-shaped value — typically a full or partial GraphQL
 * `data` object, but works equally on a single nested field.
 * @returns A deep copy of `value` with every CMS-origin URL rewritten.
 */
export const rewriteCmsUrlsDeep = <T>(value: T): T => rewriteValue(value, 0) as T;
