// ACF Flexible Content Component Post Type Query
export const OurServices = `
        fieldGroupName
        displaySection
		title
		serviceOne {
			title
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
		}
		serviceTwo {
			title
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
		}
`;