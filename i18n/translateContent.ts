/* -----------------------------------------------------------------------------
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX Import XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
----------------------------------------------------------------------------- */

import { getTranslatedContent } from "@/api/Translation/GetTranslatedContent";
import { locale as localeConst } from "@/context/constants";

/* -----------------------------------------------------------------------------
Unlike cbf-rebuild's equivalent module, every function here takes `locale` as
an explicit argument rather than reading it internally via `next/root-params`
(an experimental Next.js API) — this app's page tree is small enough (two
routes) that prop-drilling the current route's `params.locale` down to every
call site is simpler and needs no experimental feature. Behaviourally
identical: a no-op for the default locale, fails soft to the English source on
any Azure error.
----------------------------------------------------------------------------- */

/* -----------------------------------------------------------------------------
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX Translate Fields XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
----------------------------------------------------------------------------- */

/**
 * Translates a flat record of English string fields into `locale`. A no-op
 * for the default locale ('en'): the CMS source of truth already is English,
 * so this is where every English page load is kept from paying for a
 * translation call whose result would be discarded.
 *
 * Deliberately a wrapping layer over the existing `graphql/CMS/*.ts` fetchers,
 * not built into them — a caller fetches English content exactly as before,
 * then pipes the result through this function.
 *
 * Batches every field into at most two Azure calls (one for plain-text fields,
 * one for HTML fields, run in parallel) rather than one call per field. Falsy
 * fields (`null`/`undefined`/`''`) are skipped entirely before batching, so an
 * ACF field that's legitimately empty doesn't round-trip through Azure as an
 * empty string.
 * @param fields Plain-text/HTML string fields to translate, keyed by field name.
 * @param locale The current route's locale.
 * @param htmlFieldNames Which keys in `fields` hold raw HTML — selects Azure's
 * `textType=html` mode per field, since a single object can mix a plain-text
 * title with an HTML body.
 * @returns `fields` unchanged for the default locale; otherwise the same shape
 * with every non-empty value replaced by its translation.
 */
export const translateFields = async <T extends Record<string, string | null | undefined>>(
	fields: T,
	locale: string,
	htmlFieldNames: (keyof T)[] = []
): Promise<T> => {
	if (locale === localeConst.en) {
		return fields;
	}

	const entries = Object.entries(fields).filter(([, value]) => Boolean(value)) as [keyof T, string][];
	const plainEntries = entries.filter(([key]) => !htmlFieldNames.includes(key));
	const htmlEntries = entries.filter(([key]) => htmlFieldNames.includes(key));

	try {
		const [plainTranslated, htmlTranslated] = await Promise.all([
			plainEntries.length ? getTranslatedContent(plainEntries.map(([, value]) => value), locale, false) : [],
			htmlEntries.length ? getTranslatedContent(htmlEntries.map(([, value]) => value), locale, true) : [],
		]);

		const result = { ...fields };
		plainEntries.forEach(([key], index) => {
			result[key] = plainTranslated[index] as T[keyof T];
		});
		htmlEntries.forEach(([key], index) => {
			result[key] = htmlTranslated[index] as T[keyof T];
		});

		return result;
	} catch (error) {
		console.warn(`translateFields: serving English for "${locale}" —`, error instanceof Error ? error.message : error);
		return fields;
	}
};

/* -----------------------------------------------------------------------------
XXXXXXXXXXXXXXXXXXXXXXXXXXX Translate Post Summaries XXXXXXXXXXXXXXXXXXXXXXXXXXX
----------------------------------------------------------------------------- */

// The subset of a post/case-study summary's fields this project translates —
// kept narrow and explicit rather than translating every string field on a
// summary, since fields like `slug` must never be translated.
export type ITranslatableSummary = {
	title: string;
	excerpt: string;
};

/**
 * Translates `title`/`excerpt` across a whole list of post/case-study
 * summaries (an archive page's worth) in one Azure call each, rather than one
 * call per item. A no-op for the default locale.
 * @param posts Summaries to translate — only `title`/`excerpt` are read;
 * every other field on each item passes through unchanged.
 * @param locale The current route's locale.
 * @returns A new array, same length/order as `posts`, with `title`/`excerpt`
 * replaced by their translations (or unchanged for the default locale).
 */
export const translatePostSummaries = async <T extends ITranslatableSummary>(
	posts: T[],
	locale: string
): Promise<T[]> => {
	if (locale === localeConst.en || !posts.length) {
		return posts;
	}

	const titles = posts.map((post) => post.title);
	const excerpts = posts.map((post) => post.excerpt);

	try {
		const [translatedTitles, translatedExcerpts] = await Promise.all([
			getTranslatedContent(titles, locale, false),
			getTranslatedContent(excerpts, locale, false),
		]);

		return posts.map((post, index) => ({
			...post,
			title: translatedTitles[index] ?? post.title,
			excerpt: translatedExcerpts[index] ?? post.excerpt,
		}));
	} catch (error) {
		console.warn(`translatePostSummaries: serving English for "${locale}" —`, error instanceof Error ? error.message : error);
		return posts;
	}
};

/* -----------------------------------------------------------------------------
XXXXXXXXXXXXXXXXXXXXXXXXXXXXX Translate UI Strings XXXXXXXXXXXXXXXXXXXXXXXXXXXXX
----------------------------------------------------------------------------- */

/**
 * Translates a small record of fixed English UI strings — a label a CMS
 * block renders itself rather than reading from ACF. Plain-text only, one
 * Azure call. A no-op for the default locale; fails soft on any Azure error.
 * @param strings The English labels, keyed however the caller likes.
 * @param locale The current route's locale.
 */
export const translateUiStrings = async <T extends Record<string, string>>(strings: T, locale: string): Promise<T> => {
	if (locale === localeConst.en) {
		return strings;
	}

	const keys = Object.keys(strings) as (keyof T)[];
	const values = keys.map((key) => strings[key]);

	try {
		const translated = await getTranslatedContent(values, locale, false);

		const result = { ...strings };
		keys.forEach((key, index) => {
			result[key] = ((translated[index] as string) ?? strings[key]) as T[keyof T];
		});
		return result;
	} catch (error) {
		console.warn(`translateUiStrings: serving English for "${locale}" —`, error instanceof Error ? error.message : error);
		return strings;
	}
};

/* -----------------------------------------------------------------------------
XXXXXXXXXXXXXXXXXXXXXXXXXX Translate Global Chrome XXXXXXXXXXXXXXXXXXXXXXXXXXXXX
----------------------------------------------------------------------------- */

// Minimal shape of one WPGraphQL menu-link edge — only `node.label` is
// display text; `node.url`/`node.id` identify the target and must never be
// translated.
type IMenuEdge = { node: { label: string } & Record<string, unknown> };

// The prose fields on the WPGraphQL `themeOptions` object this app reads —
// the footer/notice-banner text, the 404 page content, and the navbar CTA
// label. Everything else on `themeOptions` (email, phone, address, social
// URLs) is not display prose and must not be translated.
type IThemeOptionsLike = {
	copyrightText?: string;
	textarea?: string;
	noticeBannerTextarea?: string;
	navbarCtaLink?: { title?: string } & Record<string, unknown>;
	errorPageContent?: {
		title?: string;
		paragraph?: string;
		buttonLink?: { title?: string } & Record<string, unknown>;
	} & Record<string, unknown>;
} & Record<string, unknown>;

/**
 * Translates ALL of the layout's site-wide chrome — every menu label across
 * every menu, plus the `themeOptions` prose (footer blurb / copyright line /
 * notice banner / 404 text / navbar CTA label) — in exactly **two** Azure
 * calls total (one plain, one HTML), rather than one call per menu plus more
 * for the theme options.
 *
 * This matters on Azure Translator's Free (F0) tier: several parallel
 * `/translate` calls per non-English page render can come back `429`, and a
 * `429` on a cold cache means nothing gets stored, so every reload repeats
 * the failure. Collapsing to two calls (with source strings deduped across
 * menus first) keeps the whole layout inside one burst the tier can actually
 * serve, so the result lands in Next's 7-day fetch cache and later renders
 * cost nothing.
 *
 * No-op for the default locale. Fails soft — on any Azure error the English
 * source (menus + `themeOptions`) passes straight through.
 * @param locale The current request locale.
 * @param menus Every menu-link edge array, keyed however the caller likes —
 * the same keys come back with `node.label` translated.
 * @param themeOptions `themeOptions` as `getThemesOptionsContent()` returned it.
 */
export const translateGlobalChrome = async <M extends Record<string, IMenuEdge[]>, T extends IThemeOptionsLike>(
	locale: string,
	menus: M,
	themeOptions: T
): Promise<{ menus: M; themeOptions: T }> => {
	if (locale === localeConst.en) {
		return { menus, themeOptions };
	}

	// De-dupe source strings across every menu — a repeated label recurs
	// across the navbar / footer / mobile menus.
	const plainSet = new Set<string>();
	const htmlSet = new Set<string>();

	for (const edges of Object.values(menus)) {
		for (const edge of edges ?? []) {
			if (edge?.node?.label) plainSet.add(edge.node.label);
		}
	}
	if (themeOptions?.copyrightText) plainSet.add(themeOptions.copyrightText);
	if (themeOptions?.navbarCtaLink?.title) plainSet.add(themeOptions.navbarCtaLink.title);
	if (themeOptions?.errorPageContent?.title) plainSet.add(themeOptions.errorPageContent.title);
	if (themeOptions?.errorPageContent?.buttonLink?.title) plainSet.add(themeOptions.errorPageContent.buttonLink.title);
	if (themeOptions?.textarea) htmlSet.add(themeOptions.textarea);
	if (themeOptions?.noticeBannerTextarea) htmlSet.add(themeOptions.noticeBannerTextarea);
	if (themeOptions?.errorPageContent?.paragraph) htmlSet.add(themeOptions.errorPageContent.paragraph);

	const plainList = [...plainSet];
	const htmlList = [...htmlSet];

	try {
		const [plainOut, htmlOut] = await Promise.all([
			plainList.length ? getTranslatedContent(plainList, locale, false) : [],
			htmlList.length ? getTranslatedContent(htmlList, locale, true) : [],
		]);

		const plainMap = new Map(plainList.map((source, index) => [source, plainOut[index] || source]));
		const htmlMap = new Map(htmlList.map((source, index) => [source, htmlOut[index] || source]));

		const tr = (value?: string) => (value ? plainMap.get(value) ?? value : value);
		const trHtml = (value?: string) => (value ? htmlMap.get(value) ?? value : value);

		const translatedMenus = Object.fromEntries(
			Object.entries(menus).map(([key, edges]) => [
				key,
				(edges ?? []).map((edge) => ({
					...edge,
					node: { ...edge.node, label: plainMap.get(edge?.node?.label) ?? edge?.node?.label },
				})),
			])
		) as M;

		const translatedThemeOptions = {
			...themeOptions,
			...(themeOptions?.copyrightText !== undefined ? { copyrightText: tr(themeOptions.copyrightText) } : {}),
			...(themeOptions?.textarea !== undefined ? { textarea: trHtml(themeOptions.textarea) } : {}),
			...(themeOptions?.noticeBannerTextarea !== undefined
				? { noticeBannerTextarea: trHtml(themeOptions.noticeBannerTextarea) }
				: {}),
			...(themeOptions?.navbarCtaLink
				? { navbarCtaLink: { ...themeOptions.navbarCtaLink, title: tr(themeOptions.navbarCtaLink.title) } }
				: {}),
			...(themeOptions?.errorPageContent
				? {
						errorPageContent: {
							...themeOptions.errorPageContent,
							title: tr(themeOptions.errorPageContent.title),
							paragraph: trHtml(themeOptions.errorPageContent.paragraph),
							...(themeOptions.errorPageContent.buttonLink
								? {
										buttonLink: {
											...themeOptions.errorPageContent.buttonLink,
											title: tr(themeOptions.errorPageContent.buttonLink.title),
										},
									}
								: {}),
						},
					}
				: {}),
		} as T;

		return { menus: translatedMenus, themeOptions: translatedThemeOptions };
	} catch (error) {
		console.warn(`translateGlobalChrome: serving English chrome for "${locale}" —`, error instanceof Error ? error.message : error);
		return { menus, themeOptions };
	}
};

/* -----------------------------------------------------------------------------
XXXXXXXXXXXXXXXXXXXXXXXXX ACF Prose Field Translation XXXXXXXXXXXXXXXXXXXXXXXXXX
----------------------------------------------------------------------------- */

/**
 * One object's translatable fields: `plain` = plain-text (titles, labels),
 * `html` = WordPress WYSIWYG markup (Azure's `textType=html` mode translates
 * it without touching tags). `nested` descends into a named sub-object
 * (recursively).
 */
type IProseNode = {
	plain?: string[];
	html?: string[];
	nested?: Record<string, IProseNode>;
};

/**
 * A block's full prose spec — the top-level `IProseNode` plus `repeaters`:
 * each key is an ACF repeater array field, and `item` (optional) descends one
 * level into every element first.
 */
type IProseSpec = IProseNode & {
	repeaters?: Record<string, IProseNode & { item?: string }>;
};

/**
 * Per-block-type allowlist of which ACF fields hold genuine translatable
 * prose — built from each block's `types/<name>.ts` shape, not a blind
 * "translate every string" walk of untyped CMS data.
 *
 * `OurServices.service[].options[].text` (a repeater nested inside another
 * repeater row) isn't covered — the walker below only descends one repeater
 * level — a minor, deliberate scoping gap, not an oversight.
 */
export const PROSE_FIELDS: Record<string, IProseSpec> = {
	CTATwo: { plain: ["title"], nested: { buttonLink: { plain: ["title"] } } },
	Hero: {
		nested: {
			heroViewOne: { plain: ["title", "subtitle"] },
			heroViewTwo: { html: ["paragraph", "paragraphTwo"], nested: { buttonLink: { plain: ["title"] } } },
			heroViewThree: { plain: ["title"], nested: { link: { plain: ["title"] } } },
		},
	},
	OurServices: {
		plain: ["title"],
		repeaters: { service: { plain: ["title"], html: ["paragraph"], nested: { buttonLink: { plain: ["title"] } } } },
	},
	RightPartner: { plain: ["title"], html: ["paragraph"], repeaters: { stats: { plain: ["text", "paragraph"] } } },
	TitleParagraph: { plain: ["title"], html: ["paragraph"] },
	InstagramFeed: { plain: ["title"] },
};

/**
 * Deep-translates a block's allowlisted prose for `locale` and returns a
 * translated **copy of the whole `item`** (every non-prose ACF field passes
 * through untouched). A no-op that returns `item` as-is for the default
 * locale and for any block with no `PROSE_FIELDS` entry.
 *
 * Every string across the spec — flat, nested and repeater — is gathered into
 * one plain-text batch and one HTML batch, so a block with a long repeater
 * still costs exactly two Azure calls. Fails soft: on any Azure error the
 * untouched English `item` is returned.
 */
export const translateBlockProse = async (
	item: Record<string, unknown>,
	spec: IProseSpec | undefined,
	locale: string
): Promise<Record<string, unknown>> => {
	if (!spec || locale === localeConst.en) return item;

	const clone = structuredClone(item) as Record<string, unknown>;

	type ISlot = { text: string; set: (value: string) => void };
	const plainSlots: ISlot[] = [];
	const htmlSlots: ISlot[] = [];

	const collect = (host: unknown, plain: string[] = [], html: string[] = []) => {
		if (!host || typeof host !== "object") return;
		const record = host as Record<string, unknown>;
		for (const key of plain) {
			if (typeof record[key] === "string" && record[key]) {
				plainSlots.push({
					text: record[key] as string,
					set: (value) => {
						record[key] = value;
					},
				});
			}
		}
		for (const key of html) {
			if (typeof record[key] === "string" && record[key]) {
				htmlSlots.push({
					text: record[key] as string,
					set: (value) => {
						record[key] = value;
					},
				});
			}
		}
	};

	const walkNode = (host: unknown, node: IProseNode) => {
		collect(host, node.plain, node.html);
		if (!node.nested || !host || typeof host !== "object") return;
		const record = host as Record<string, unknown>;
		for (const [key, childNode] of Object.entries(node.nested)) {
			walkNode(record[key], childNode);
		}
	};

	walkNode(clone, spec);

	for (const [field, repeater] of Object.entries(spec.repeaters ?? {})) {
		const rows = clone[field];
		if (!Array.isArray(rows)) continue;
		for (const row of rows) {
			const target = repeater.item ? (row as Record<string, unknown> | null)?.[repeater.item] : row;
			walkNode(target, repeater);
		}
	}

	if (!plainSlots.length && !htmlSlots.length) return clone;

	try {
		const [plainOut, htmlOut] = await Promise.all([
			plainSlots.length ? getTranslatedContent(plainSlots.map((slot) => slot.text), locale, false) : [],
			htmlSlots.length ? getTranslatedContent(htmlSlots.map((slot) => slot.text), locale, true) : [],
		]);
		plainSlots.forEach((slot, index) => slot.set((plainOut[index] as string) ?? slot.text));
		htmlSlots.forEach((slot, index) => slot.set((htmlOut[index] as string) ?? slot.text));
	} catch (error) {
		console.warn(`translateBlockProse: serving English for "${locale}" —`, error instanceof Error ? error.message : error);
		return item;
	}

	return clone;
};

/**
 * Translates every flexible-content block in a page's content array — each
 * item's simple block name is derived from its `fieldGroupName` suffix
 * (matching `RenderFlexibleContent.tsx`'s own derivation) and looked up in
 * `PROSE_FIELDS`. A no-op for the default locale.
 * @param content The array `getAllFlexibleContentComponents` returns.
 * @param locale The current route's locale.
 */
export const translateFlexibleContent = async (
	content: Record<string, unknown>[] | undefined,
	locale: string
): Promise<Record<string, unknown>[] | undefined> => {
	if (!content || locale === localeConst.en) return content;

	return Promise.all(
		content.map((item) => {
			const fieldGroupName = item.fieldGroupName as string | undefined;
			const simpleName = fieldGroupName?.substring(fieldGroupName.lastIndexOf("_") + 1);
			return translateBlockProse(item, simpleName ? PROSE_FIELDS[simpleName] : undefined, locale);
		})
	);
};
