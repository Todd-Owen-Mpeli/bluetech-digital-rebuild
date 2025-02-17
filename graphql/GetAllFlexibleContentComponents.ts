// Imports
import {client} from "@/config/apollo";
import {DocumentNode, gql} from "@apollo/client";

// Components: ACF Flexible Content Post Types
import { Hero } from "@/components/Hero/graphql";
import { OurServices } from "@/components/OurServices/graphql";
import { OurExpertise } from "@/components/OurExpertise/graphql";
import { TitleParagraph } from "@/components/TitleParagraph/graphql";

/* PAGES & BLOGS POSTS*/
/* Fetch all Flexible Content Components 
(For every flexible content page) */
export const getAllFlexibleContentComponents = async (
	slug: string,
	postType: string,
	postTypeFlexibleContent: string
): Promise<any> => {
	try {
		const content: DocumentNode = gql`
			{
        		mainContent: ${postType}(where: {name: "${slug}", status: PUBLISH}) {
        		  edges {
						node {
							template {
								... on DefaultTemplate {
									flexibleContent {
										flexibleContent {
											... on ${postTypeFlexibleContent}_Hero {${Hero}}
											... on ${postTypeFlexibleContent}_OurServices {${OurServices}}
											... on ${postTypeFlexibleContent}_OurExpertise {${OurExpertise}}
                							... on ${postTypeFlexibleContent}_TitleParagraph {${TitleParagraph}}
										}
									}
								}
							}
						}
					}
        		}
			}
		`;

		const response: any = await client.query({
			query: content,
		});

		return {
			content:
				response.data?.mainContent?.edges[0]?.node?.template?.flexibleContent
					?.flexibleContent,
		};
	} catch (error) {
		console.log(error);
		throw new Error(
			"Something went wrong trying to fetch all flexible content components"
		);
	}
};
