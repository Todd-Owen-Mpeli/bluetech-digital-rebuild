import "server-only";
import { locale as localeConst } from "@/context/constants";
import en from "@/i18n/dictionaries/en.json";

// The static UI-string dictionary shape, inferred once from the English source
// of truth — every other locale's JSON is checked against this same shape at
// import time (a locale file missing a key, or misspelling one, is a build-time
// type error here rather than a silently-blank string in production).
export type IDictionary = typeof en;

const dictionaries: Record<string, () => Promise<IDictionary>> = {
	[localeConst.en]: () => Promise.resolve(en),
	[localeConst.fr]: () => import("@/i18n/dictionaries/fr.json").then((m) => m.default),
	[localeConst.de]: () => import("@/i18n/dictionaries/de.json").then((m) => m.default),
};

/**
 * Loads the static UI-string dictionary for a locale — Next's own documented
 * `getDictionary()` pattern. `import "server-only"` enforces at build time
 * that this can never end up in a Client Component's bundle; components that
 * need these strings but are themselves Client Components (`CookiePolicy`)
 * get the relevant slice passed down as a `dict` prop from their nearest
 * Server Component ancestor instead.
 *
 * This covers only the static, non-CMS UI chrome (the cookie banner, the
 * locale switcher label) — CMS content (page prose, SEO text, menu labels) is
 * translated dynamically via `i18n/translateContent.ts` instead, never
 * through this static dictionary.
 * @param locale One of this project's supported locale codes.
 * @returns The dictionary for that locale, falling back to English for an
 * unrecognized value rather than throwing — a missing/garbled locale here
 * shouldn't crash the whole page over what's ultimately just label text.
 */
export const getDictionary = async (locale: string): Promise<IDictionary> => {
	const load = dictionaries[locale] ?? dictionaries[localeConst.en];
	return load();
};
