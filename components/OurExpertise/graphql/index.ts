// ACF Flexible Content Component Post Type Query
export const OurExpertise = `
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
        }`;
