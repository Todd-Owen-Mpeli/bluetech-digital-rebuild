// Imports
import { INewsCaseStudies, ISlug } from "@/types/context";
import { fetchCmsGraphQL } from "@/graphql/CMS/fetchCmsGraphQL";

/* NEWS & INSIGHTS SLUGS (URLS) */
export const getAllNewsInsightsPostsSlugs = async (): Promise<ISlug> => {
	try {
		const content = `
			{
				newsInsightsSlugs: posts(where: {status: PUBLISH}, last: 100) {
					nodes {
						slug
						modified
					}
				}
			}
		`;

		const data: any = await fetchCmsGraphQL(content);

		return data?.newsInsightsSlugs?.nodes;
	} catch (error) {
		console.log(error);
		throw new Error(
			"Something went wrong trying to fetch the news insight slugs"
		);
	}
};

// All News & Insights Content
export const getAllNewsInsightsContent =
	async (): Promise<INewsCaseStudies.INewsInsights> => {
		try {
			const content = `
				{
					newsInsightsContent: posts(where: {status: PUBLISH}, last: 100) {
						edges {
							node {
								id
								uri
								date
								excerpt
								title(format: RENDERED)
								featuredImage {
									node {
										altText
										sourceUrl
										mediaDetails {
											height
											width
										}
									}
								}
							}
						}
					}
				}
			`;

			const data: any = await fetchCmsGraphQL(content);

			return data?.newsInsightsContent?.edges;
		} catch (error) {
			console.log(error);
			throw new Error(
				"Something went wrong trying to fetch all the news insight posts"
			);
		}
	};

// Latest Three News & Insights Content
export const getThreeNewsInsightsContent =
	async (): Promise<INewsCaseStudies.INewsInsights> => {
		try {
			const content = `
				{
					newsInsightsContent: posts(where: {status: PUBLISH}, first: 3) {
						edges {
							node {
								id
								uri
								date
								excerpt
								title(format: RENDERED)
								featuredImage {
									node {
										altText
										sourceUrl
										mediaDetails {
											height
											width
										}
									}
								}
							}
						}
					}
				}
			`;

			const data: any = await fetchCmsGraphQL(content);

			return data?.newsInsightsContent?.edges;
		} catch (error) {
			console.log(error);
			throw new Error(
				"Something went wrong trying to fetch all the news insight posts"
			);
		}
	};
