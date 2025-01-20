// Imports
import {client} from "@/config/apollo";
import {DocumentNode, gql} from "@apollo/client";

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
											... on ${postTypeFlexibleContent}_Hero {
                								fieldGroupName
                								displaySection
                								title
												subtitle
                								paragraph
                								displayVideo
                								video {
                									title
                									mimeType
                									mediaItemUrl
                									mediaDetails {
                										height
                										width
                									}
                								}
												buttonLink {
													url
													title
													target
												}
                								videoBackgroundImage {
                									altText
                									sourceUrl
                									mediaDetails {
                										height
                										width
                									}
                								}
												trustedClients {
													title
													clientsImages {
														name
														channelName
														image {
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
											... on ${postTypeFlexibleContent}_OurServices {
                								fieldGroupName
                								displaySection
                								serviceOne {
                									title
													paragraph
                									image {
														altText
														sourceUrl
														mediaDetails {
															height
															width
														}
													}
													services {
														title
														paragraph
														backgroundColor
														link {
															url
															title
															target
														}
														image {
															altText
															sourceUrl
															mediaDetails {
																height
																width
															}
														}
													}
                								}
                								serviceTwo {
                									title
													paragraph
                								}
                							}
											... on ${postTypeFlexibleContent}_OurExpertise {
                								fieldGroupName
                								displaySection
                								title
                								paragraph
												displayVideo
                								video {
                									title
                									mimeType
                									mediaItemUrl
                									mediaDetails {
                										height
                										width
                									}
                								}
                								videoBackgroundImage {
                									altText
                									sourceUrl
                									mediaDetails {
                										height
                										width
                									}
                								}
                							}
                							... on ${postTypeFlexibleContent}_TitleParagraph {
                								fieldGroupName
                								displaySection
                								title
                								paragraph
                								displayParagraph
                							}
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
