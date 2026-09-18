/**
 * The three languages confirmed for this site (English, French, German) — a
 * UK creative agency's client base, not cbf-rebuild's six (chosen for a
 * Tanzanian bank foundation's audience, which doesn't transfer here).
 * `defaultLocale` needs no translation calls — the CMS source of truth
 * already is English.
 */
export const locale = {
	en: "en",
	fr: "fr",
	de: "de",
} as const;

export const locales: string[] = Object.values(locale);

export const defaultLocale: string = locale.en;

// Native-language labels for LocaleSwitcher.tsx — no flag icons (unlike
// cbf-rebuild's LocaleSwitcher) since sourcing/designing flag assets isn't
// something to invent unprompted; a plain text label list is functional
// without needing new visual assets.
export const localeLabels: Record<string, string> = {
	en: "English",
	fr: "Français",
	de: "Deutsch",
};

