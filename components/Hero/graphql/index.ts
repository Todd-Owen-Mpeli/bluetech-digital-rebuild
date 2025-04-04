// ACF Flexible Content Component Post Type Query
export const Hero = `
        fieldGroupName
        displaySection
		heroViewOne {
			title
			subtitle
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
		heroViewTwo {
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
		heroViewThree {
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
`;