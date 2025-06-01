// Imports
import {client} from "@/config/apollo";
import {DocumentNode, gql} from "@apollo/client";

// Components: ACF Flexible Content Post Types
import { Hero } from "@/components/Hero/graphql/index";
import { CTATwo } from "@/components/CTATwo/graphql/index";
import { OurServices } from "@/components/OurServices/graphql/index";
import { RightPartner } from "@/components/RightPartner/graphql/index";
import { PartnersLogos } from "@/components/PartnersLogos/graphql/index";
import { TitleParagraph } from "@/components/TitleParagraph/graphql/index";

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
											... on ${postTypeFlexibleContent}_CtaTwo {${CTATwo}}
											... on ${postTypeFlexibleContent}_OurServices {${OurServices}}
                							... on ${postTypeFlexibleContent}_RightPartner {${RightPartner}}
											... on ${postTypeFlexibleContent}_PartnersLogos {${PartnersLogos}}
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
