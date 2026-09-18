// Imports
import {MetadataRoute} from "next";
import {locales} from "@/context/constants";
import {buildLocaleAlternates} from "@/i18n/buildAlternates";

// Get All Pages
import {
	getAllPagesSlugs,
} from "@/graphql/CMS/GetAllPagesSlugs";

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
	const [

		// Pages Slugs
		pagesSlugs,
	] = await Promise.all([

		// Pages Slugs
		getAllPagesSlugs(),

	]);

	const entries: MetadataRoute.Sitemap = [];

	(pagesSlugs ?? []).forEach((page: any) => {
		// The "home" page's real public route is "/", not "/home" — app/[locale]/page.tsx
		// serves the locale root; app/[locale]/[slug]/page.tsx would otherwise
		// duplicate it at a second URL if "home" were treated like any other slug.
		const pathWithoutLocale = page.slug === "home" ? "" : `/${page.slug}`;

		locales.forEach((locale) => {
			const {languages} = buildLocaleAlternates(locale, pathWithoutLocale);

			entries.push({
				url: languages[locale],
				changeFrequency: "monthly",
				lastModified: page.modified,
				priority: pathWithoutLocale === "" ? 1 : 0.8,
				alternates: {languages},
			});
		});
	});

	return entries;
};

export default sitemap;
