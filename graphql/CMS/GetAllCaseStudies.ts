// Imports
import { INewsCaseStudies, ISlug } from "@/types/context";
import { fetchCmsGraphQL } from "@/graphql/CMS/fetchCmsGraphQL";

/* CASE STUDIES SLUGS (URLS) */
export const getAllCaseStudiesSlugs = async (): Promise<ISlug> => {
	try {
		const content = `
			{
				caseStudiesSlugs: caseStudies(where: {status: PUBLISH}, last: 100) {
					nodes {
						slug
						modified
					}
				}
			}
		`;

		const data: any = await fetchCmsGraphQL(content);

		return data?.caseStudiesSlugs?.nodes;
	} catch (error) {
		console.log(error);
		throw new Error(
			"Something went wrong trying to fetch the case studies slugs"
		);
	}
};

// All Case Studies Content
export const getAllCaseStudiesContent =
	async (): Promise<INewsCaseStudies.ICaseStudies> => {
		try {
			const content = `
				{
					caseStudiesContent: caseStudies(
						where: {status: PUBLISH, orderby: {field: DATE, order: ASC}}
						first: 100
					) {
						edges {
							node {
								slug
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

			return data?.caseStudiesContent?.edges;
		} catch (error) {
			console.log(error);
			throw new Error(
				"Something went wrong trying to fetch all the case studies content"
			);
		}
	};
