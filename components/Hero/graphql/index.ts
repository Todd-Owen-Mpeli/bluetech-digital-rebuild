// ACF Flexible Content Component Post Type Query
export const Hero = `
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
		}`;
