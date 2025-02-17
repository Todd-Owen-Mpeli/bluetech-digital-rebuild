// ACF Flexible Content Component Post Type Query
export const OurServices = `
        fieldGroupName
        displaySection
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
			roles {
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
			backgroundImage {
				altText
				sourceUrl
				mediaDetails {
					height
					width
				}
			}
		}`;
