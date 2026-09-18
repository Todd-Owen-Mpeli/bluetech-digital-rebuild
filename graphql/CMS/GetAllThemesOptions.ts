// Imports
import { ICustomPostTypes } from "@/types/context";
import { fetchCmsGraphQL } from "@/graphql/CMS/fetchCmsGraphQL";

/* THEMES OPTIONS CONTENT
 The ID number refers to the
"Global Content" page ID*/
export const getThemesOptionsContent =
	async (): Promise<ICustomPostTypes.IThemesOptions> => {
		try {
			const content = `
				{
					themeOptions(where: {name: "Global Content", status: PUBLISH}) {
						edges {
							node {
								themeOptions {
									email
									address
									emailTwo
									phoneNumber
									phoneNumberTwo
									copyrightText
									textarea
									facebookLink {
										url
										title
										target
									}
									twitterLink {
										url
										title
										target
									}
									linkedinLink {
										url
										title
										target
									}
									navbarCtaLink {
										url
										title
										target
									}
									displayNoticeBanner
									noticeBannerTextarea
									errorPageContent {
										displaySection
										title
										paragraph
										buttonLink {
											url
											title
											target
										}
										backgroundImage {
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
				}
			`;

			const data: any = await fetchCmsGraphQL(content);

			return data?.themeOptions?.edges[0]?.node?.themeOptions;
		} catch (error) {
			console.log(error);
			throw new Error(
				"Something went wrong trying to fetch themes options content"
			);
		}
	};
