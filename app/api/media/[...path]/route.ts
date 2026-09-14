/* -----------------------------------------------------------------------------
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX Import XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
----------------------------------------------------------------------------- */

import { NextResponse } from "next/server";

/* -----------------------------------------------------------------------------
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX CMS media proxy route XXXXXXXXXXXXXXXXXXXXXXXXXXX
----------------------------------------------------------------------------- */

// Must match the same derivation `config/cmsMediaUrl.ts` uses — the CMS's
// WPGraphQL endpoint lives under a path prefix, not at a host's root, so the
// real media files live under that same prefix, not under CMS_URL/DEV_CMS_URL.
const CMS_SITE_URL: string | undefined = process.env.CMS_API_URL?.replace(/\/graphql\/?$/, "");

// `config/cmsMediaUrl.ts` only ever produces a path for a file under
// WordPress's own media-library directory, with the `wp-content/uploads/`
// segment itself already stripped off (so this app's own URL never has to
// say "WordPress" out loud). This route reconstructs the real path by
// re-prepending it here, which doubles as the security boundary this proxy
// has always needed: whatever `path` a request sends, the upstream fetch it
// produces can only ever land inside `wp-content/uploads/` on the real CMS —
// there is no path this route can be made to request that reaches
// `wp-admin`, `wp-login.php`, or `wp-json`. Don't change this to take a
// caller-supplied prefix "just in case" — the fixed prefix is what makes the
// guarantee hold.
const UPLOADS_PREFIX = "wp-content/uploads/";

/**
 * Proxies a CMS media file (an image, the Hero video, a linked document)
 * through this app's own origin, so neither the real CMS hostname nor its
 * WordPress-specific `wp-content/uploads/` directory name has to appear in a
 * rendered page — `config/cmsMediaUrl.ts` rewrites every
 * `sourceUrl`/`mediaItemUrl`/WYSIWYG `src`/`href` the app renders to
 * `/api/media/<path relative to uploads/>`, and this route is what actually
 * serves that path.
 *
 * Cached for 24h at the edge, matching the `revalidate` every other CMS fetch
 * in this codebase uses for content that rarely changes.
 * @param path The path segments after `/api/media/`, e.g. `["2025", "01",
 * "hero.jpg"]` for `/api/media/2025/01/hero.jpg` — fetched from the CMS at
 * `wp-content/uploads/2025/01/hero.jpg`.
 */
export const GET = async (
	_request: Request,
	{ params }: { params: Promise<{ path: string[] }> }
): Promise<Response> => {
	if (!CMS_SITE_URL) {
		return NextResponse.json({ error: "Media proxy not configured." }, { status: 503 });
	}

	const { path } = await params;

	// A `..`/empty segment is the only way string concatenation below could
	// ever be tricked into resolving outside `wp-content/uploads/` on the
	// real CMS — reject it outright rather than trust the fetch to fail safe.
	if (path.length === 0 || path.some((segment) => segment === "" || segment === "..")) {
		return NextResponse.json({ error: "Not found." }, { status: 404 });
	}

	const relativePath = path.join("/");

	let upstream: Response;
	try {
		upstream = await fetch(`${CMS_SITE_URL}/${UPLOADS_PREFIX}${relativePath}`, {
			next: { revalidate: 86400 },
		});
	} catch (error) {
		console.error(`Media proxy fetch failed for "${relativePath}":`, error);
		return NextResponse.json({ error: "Upstream fetch failed." }, { status: 502 });
	}

	if (!upstream.ok || !upstream.body) {
		return NextResponse.json({ error: "Not found." }, { status: upstream.status === 404 ? 404 : 502 });
	}

	return new NextResponse(upstream.body, {
		status: 200,
		headers: {
			"Content-Type": upstream.headers.get("content-type") ?? "application/octet-stream",
			// Preview a PDF/image in-browser rather than forcing a download.
			"Content-Disposition": "inline",
			"Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
		},
	});
};
