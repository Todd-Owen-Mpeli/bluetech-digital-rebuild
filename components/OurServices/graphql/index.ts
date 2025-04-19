// ACF Flexible Content Component Post Type Query
export const OurServices = `
    fieldGroupName
    displaySection
	title
	hoverImages {
		image {
			altText
			sourceUrl
			mediaDetails {
				height
				width
			}
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
	service {
		title
		paragraph
		backgroundColour
		options {
			text
		}
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
`;