/* -----------------------------------------------------------------------------
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX Import XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
----------------------------------------------------------------------------- */

import { locales } from "@/context/constants";

/* -----------------------------------------------------------------------------
XXXXXXXXXXXXXXXXXXXXXXXXXXXXX Environment Variables XXXXXXXXXXXXXXXXXXXXXXXXXXXX
----------------------------------------------------------------------------- */

const SITE_URL: string = (process.env.SITE_URL ?? "").replace(/\/$/, "");

/* -----------------------------------------------------------------------------
XXXXXXXXXXXXXXXXXXXXXXXXXXXX Build Locale Alternates XXXXXXXXXXXXXXXXXXXXXXXXXXX
----------------------------------------------------------------------------- */

/**
 * Builds `generateMetadata`'s `alternates` (canonical + hreflang) for a
 * locale-prefixed route. Every route now lives under `app/[locale]/`, so
 * WPGraphQL's/Yoast's own `seo.canonical`/`seo.opengraphUrl` values (computed
 * with no locale segment, and on the CMS's own origin — see
 * `config/cmsMediaUrl.ts`'s doc comment for why those can't be trusted
 * directly) can't be used here either way.
 *
 * `languages` includes an `x-default` entry pointing at the un-prefixed
 * (English) URL, per Google's hreflang guidance — the version to serve a
 * visitor whose locale doesn't match any of this site's supported ones.
 * @param locale The current route's locale.
 * @param pathWithoutLocale The route's path *below* the locale segment,
 * including a leading slash (e.g. `/about`, or `''` for the home page —
 * never including the locale itself).
 * @returns `{ canonical, languages }`, ready to spread into `generateMetadata`'s
 * returned object, or to pull `canonical`/`languages` out of directly (as
 * `app/sitemap.ts` does for a sitemap entry's `url`/`alternates.languages`).
 */
export const buildLocaleAlternates = (
	locale: string,
	pathWithoutLocale: string
): { canonical: string; languages: Record<string, string> } => ({
	canonical: `${SITE_URL}/${locale}${pathWithoutLocale}`,
	languages: {
		...Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}${pathWithoutLocale}`])),
		"x-default": `${SITE_URL}${pathWithoutLocale}`,
	},
});
