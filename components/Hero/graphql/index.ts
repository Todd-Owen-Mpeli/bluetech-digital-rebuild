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
		paragraphTwo
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
	}
	heroViewThree {
		title
		displayVideo
		link {
			url
			title
			target
		}
		video {
			title
			mimeType
			mediaItemUrl
			mediaDetails {
				width
				height
			}
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
`;