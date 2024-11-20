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
												displaySection
												video
												titleEnd
												paragraph
												titleStart
												titleMiddle
												displayVideo
												buttonLink {
													url
													title
													target
												}
												buttonLinkTwo {
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
												smallImageOne {
													altText
													sourceUrl
													mediaDetails {
														height
														width
													}
												}
												smallImageTwo {
													altText
													sourceUrl
													mediaDetails {
														height
														width
													}
												}
												rightsideImage {
													altText
													sourceUrl
													mediaDetails {
														height
														width
													}
												}
											}
											... on ${postTypeFlexibleContent}_HeroTwo {
												fieldGroupName
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
											... on ${postTypeFlexibleContent}_FeaturesGrid {
                      							fieldGroupName
												displaySection
                      							cardOne {
                      								title
                      								subtitle
                      								paragraph
                      							}
                      							cardTwo {
                      								backgroundImage {
                      									altText
                      									sourceUrl
                      									mediaDetails {
                      										height
                      										width
                      									}
                      								}
                      							}
                      							cardThree {
                      								foreground {
                      									title
                      									subtitle
                      									paragraph
                      								}
                      								background {
                      									title
                      									subtitle
                      									paragraph
                      								}
                      							}
                      							lastCard {
                      								backgroundImage {
                      									altText
                      									sourceUrl
                      									mediaDetails {
                      										height
                      										width
                      									}
                      								}
                      							}
                      							gridContent {
													card {
														title
														subtitle
														paragraph
														backgroundColor
													}
                      							}
											}
											... on ${postTypeFlexibleContent}_FeaturesGridTwo {
                      							fieldGroupName
												displaySection
                      							cardOne {
                      							  title
                      							  subtitle
                      							  paragraph
                      							}
                      							cardTwo {
                      							  backgroundImage {
                      									altText
                      									sourceUrl
                      									mediaDetails {
                      										height
                      										width
                      									}
                      								}
                      							}
                      							lastCard {
                      								backgroundImage {
                      									altText
                      									sourceUrl
                      									mediaDetails {
                      										height
                      										width
                      									}
                      								}
                      							}
                      							gridContent {
													card {
														title
														subtitle
														paragraph
														backgroundColor
													}
                      							}
											}
											... on ${postTypeFlexibleContent}_TwoColumnButtonContent {
												fieldGroupName
												displaySection
                  								title
                  								subtitle
                  								paragraph
												backgroundColor
												buttonLink {
													url
													title
													target
												}
                  								columnTwoContent {
                  									paragraph
                  									paragraphTwo
                  									paragraphThree
                  									buttonText
                  									buttonTextTwo
                  									buttonTextThree
                  								}
											}
											... on ${postTypeFlexibleContent}_JumboContentSection {
												fieldGroupName
												displaySection
												contentSection {
													content {
														title
														subtitle
														paragraph
														imageLocation
														backgroundDisplay
														buttonLink {
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
														smallImage {
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
											... on ${postTypeFlexibleContent}_JumboContentImage {
												fieldGroupName
												displaySection
												title
												subtitle
												paragraph
												quality {
													title
													paragraph
												}
												reliability {
													title
													paragraph
												}
												image {
													altText
													sourceUrl
													mediaDetails {
														height
														width
													}
												}
												contentBox {
													text
													subtext
													icon {
														altText
														sourceUrl
														mediaDetails {
															height
															width
														}
													}
												}
												bottomContent {
													text
													textTwo
													buttonLink {
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
													displayTextarea
													displayButtonOrImage
												}
											}
											... on ${postTypeFlexibleContent}_AchievementsStatsCta {
												fieldGroupName
												displaySection
												title
												paragraph
												displayAchievementsContent
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
												achievements {
													card {
														title
														paragraph
														icon {
															altText
															sourceUrl
															mediaDetails {
															height
															width
															}
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
											}
											... on ${postTypeFlexibleContent}_TitleParagraph {
												fieldGroupName
												displaySection
												title
												paragraph
												displayParagraph
											}
											... on ${postTypeFlexibleContent}_BenefitsStats {
												fieldGroupName
												displaySection
												title
												subtitle
												paragraph
												benefitsGrid {
													text
												}
											}
											... on ${postTypeFlexibleContent}_OurPartners {
												fieldGroupName
												displaySection
												title
												subtitle
												paragraph
												imageGrid {
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
											... on ${postTypeFlexibleContent}_OurServices {
												fieldGroupName
												displaySection
												title
												subtitle
												paragraph
												buttonLink {
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
												servicesGrid {
													card {
														title
														subtitle
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
											... on ${postTypeFlexibleContent}_ServicesGrid {
           										fieldGroupName
												displaySection
           										servicesGrid {
           											card {
           												title
           												subtitle
														paragraph
           												image {
           													altText
           													sourceUrl
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
														bulletPoints {
                											text
                										}
           											}
           										}
           									}
											... on ${postTypeFlexibleContent}_Testimonials {
												fieldGroupName
												displaySection
												title
												subtitle
												paragraph
											}
											... on ${postTypeFlexibleContent}_TestimonialsSlider {
												fieldGroupName
												displaySection
											}
											... on ${postTypeFlexibleContent}_TestimonialsTwo {
												fieldGroupName
												displaySection
												title
												subtitle
												paragraph
												buttonLink {
													url
													title
													target
												}
											}
											... on ${postTypeFlexibleContent}_TitleContentImage {
												fieldGroupName
												displaySection
												title
												subtitle
												paragraph
												imageLocation
												buttonLink {
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
											... on ${postTypeFlexibleContent}_VideoBlock {
												fieldGroupName
												displaySection
												title
												video
												subtitle
												paragraph
												displayVideo
												highlightText
												displayYoutubeIcon
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
											}
											... on ${postTypeFlexibleContent}_Gallery {
												fieldGroupName
												displaySection
												title
												paragraph
												highlightText
												gallery {
            										altText
            										sourceUrl
            										mediaDetails {
            											height
            											width
            										}
												}
											}
											... on ${postTypeFlexibleContent}_CaseStudiesGrid {
            									fieldGroupName
												displaySection
            									title
            									subtitle
            									paragraph
            								}
											... on ${postTypeFlexibleContent}_NewsInsightsGrid {
												fieldGroupName
												displaySection
												title
												italic
												paragraph
											}
											... on ${postTypeFlexibleContent}_NewsInsightsThreeCards {
												fieldGroupName
												displaySection
												title
												italic
												paragraph
											}
											... on ${postTypeFlexibleContent}_Faq {
												fieldGroupName
												displaySection
												title
												subtitle
												paragraph
												faqGrid {
													card {
														title
														paragraph
													}
												}
											}
											... on ${postTypeFlexibleContent}_FaqTwo {
												fieldGroupName
												displaySection
												title
												subtitle
												paragraph
												buttonLink {
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
												faqGrid {
													card {
														title
														paragraph
													}
												}
											}
											... on ${postTypeFlexibleContent}_Cta {
												fieldGroupName
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
											... on ${postTypeFlexibleContent}_CtaTwo {
												fieldGroupName
												displaySection
												title
												highlightText
												backgroundColor
												highlightTextColor
												buttonLink {
													url
													title
													target
												}
											}
											... on ${postTypeFlexibleContent}_LinkedinCta {
												fieldGroupName
												displaySection
												title
												highlightText
												backgroundColor
												highlightTextColor
												displayLinkedinIcon
												buttonLink {
													url
													title
													target
												}
											}
											... on ${postTypeFlexibleContent}_ContactInfo {
												fieldGroupName
												displaySection
												title
												paragraph
											}
											... on ${postTypeFlexibleContent}_ContactForm {
												fieldGroupName
												displaySection
												title
												formTitle
												paragraph
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
