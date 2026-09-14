// Imports
import { ISeo } from "@/types/context";
import { fetchCmsGraphQL } from "@/graphql/CMS/fetchCmsGraphQL";

/* PAGES & BLOGS POSTS*/
/* Fetch all Seo Content (For
	every flexible content page) */
export const getAllSeoContent = async (
	slug: string,
	postType: string
): Promise<ISeo> => {
	try {
		const content = `
			{
				mainContent: ${postType}(where: {name: "${slug}", status: PUBLISH}) {
					edges {
						node {
							seo {
								canonical
								cornerstone
								focuskw
								fullHead
								metaDesc
								metaKeywords
								metaRobotsNofollow
								metaRobotsNoindex
								opengraphAuthor
								opengraphDescription
								opengraphImage {
									mediaItemUrl
								}
								opengraphModifiedTime
								opengraphPublishedTime
								opengraphPublisher
								opengraphSiteName
								opengraphTitle
								opengraphType
								opengraphUrl
								readingTime
								title
								twitterDescription
								twitterTitle
								twitterImage {
									mediaItemUrl
								}
							}
						}
					}
				}
			}
		`;

		const data: any = await fetchCmsGraphQL(content);

		return data?.mainContent?.edges[0]?.node?.seo;
	} catch (error) {
		console.log(error);
		throw new Error(
			`Something went wrong trying to fetch all ${postType} seo content per page`
		);
	}
};
