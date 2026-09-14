// Imports
import { ISlug } from "@/types/context";
import { fetchCmsGraphQL } from "@/graphql/CMS/fetchCmsGraphQL";

/* PAGES SLUGS (URLS) */
export const getAllPagesSlugs = async (): Promise<ISlug> => {
	try {
		const content = `
			{
				pageURLs: pages(where: {status: PUBLISH}, last: 100) {
					nodes {
						slug
						modified
					}
				}
			}
		`;

		const data: any = await fetchCmsGraphQL(content);

		return data?.pageURLs?.nodes;
	} catch (error) {
		console.log(error);
		throw new Error("Something went wrong trying to fetch all pages urls");
	}
};
