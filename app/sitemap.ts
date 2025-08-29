// Imports
import {MetadataRoute} from "next";

// Get All Pages
import {
	getAllPagesSlugs,
} from "@/graphql/GetAllPagesSlugs";

const sitemap = async () => {
	const [

		// Pages & Post Slugs 
		pagesSlugs,
	] = await Promise.all([

		// Pages Slugs 
		getAllPagesSlugs(),

	]);

	const siteUrl: any = process.env.SITE_URL;


	/* EMPTY ARRAYS */
	/* Pages, News Insights Posts Arrays */
	const pagesLinks: any[] = [];

	/* PUSHING THE DYNAMIC SLUGS
	 INTO THE EMPTY ARRAYS */
	// Pages Dynamic Links
	pagesSlugs.map((keys: any) => {
		const object = {
			url: `${siteUrl}/${keys.slug}`,
			changefreq: "monthly",
			lastmod: `${keys.modified}`,
			priority: 0.8,
		};

		pagesLinks.push(object);
	});

	// Arrays with your all dynamic links
	const allLinks: MetadataRoute.Sitemap = [
		/* Pages, News Insights Posts Arrays */
		...pagesLinks,

	];

	return allLinks;
};

export default sitemap;
