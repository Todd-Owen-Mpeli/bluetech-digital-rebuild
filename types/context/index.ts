export type ISeo = {
	canonical: string;
	cornerstone: boolean;
	focuskw: string;
	fullHead: string;
	metaDesc: string;
	metaKeywords: string;
	metaRobotsNofollow: string;
	metaRobotsNoindex: string;
	opengraphAuthor: string;
	opengraphDescription: string;
	opengraphImage: {
		mediaItemUrl: string;
	};
	opengraphModifiedTime: string;
	opengraphPublishedTime: string;
	opengraphPublisher: string;
	opengraphSiteName: string;
	opengraphTitle: string;
	opengraphType: string;
	opengraphUrl: string;
	readingTime: number;
	title: string;
	twitterDescription: string;
	twitterTitle: string;
	twitterImage: {
		mediaItemUrl: string;
	};
};
export type IContent = [
	{
		content: any;
	}
];

/* CUSTOM POST TYPES TYPES  */
export namespace ICustomPostTypes {
	export type ITestimonials = {
		node: {
			testimonialReview: {
				name: string;
				jobTitle: string;
				starRating: number;
				paragraph: string;
				image: {
					altText: string;
					sourceUrl: string;
					mediaDetails: {
						width: number;
						height: number;
					};
				};
			};
		};
	}[];
	export type IThemesOptions = {
		email: string;
		address: string;
		emailTwo: string;
		phoneNumber: string;
		phoneNumberTwo: string;
		copyrightText: string;
		facebookLink: {
			url: string;
			title: string;
			target: string;
		};
		twitterLink: {
			url: string;
			title: string;
			target: string;
		};
		linkedinLink: {
			url: string;
			title: string;
			target: string;
		};
		navbarCtaLink: {
			url: string;
			title: string;
			target: string;
		};
		textarea: string;
		displayNoticeBanner: boolean;
		noticeBannerTextarea: string;
		errorPageContent: {
			title: string;
			paragraph: string;
			buttonLink: {
				url: string;
				title: string;
				target: string;
			};
			backgroundImage: {
				altText: string;
				sourceUrl: string;
				mediaDetails: {
					width: number;
					height: number;
				};
			};
		};
	};
}

// WEBSITE NEWS AND CASE STUDIES TYPES
export namespace INewsCaseStudies {
	export type INewsInsights = {
		node: {
			id: string;
			uri: string;
			date: string;
			title: string;
			excerpt: string;
			featuredImage: {
				node: {
					altText: string;
					sourceUrl: string;
					mediaDetails: {
						width: number;
						height: number;
					};
				};
			};
		};
	}[];

	export interface ICaseStudies extends INewsInsights {}
}

// WEBSITE LINKS AND SUBLINKS TYPES
export namespace ILinks {
	export type INavbarMenuLinks = {
		node: {
			id: string;
			url: string;
			label: string;
		};
	}[];

	export interface IMobileLinks extends INavbarMenuLinks {}
	export interface ICareerSublinks extends INavbarMenuLinks {}
	export interface ICopyrightLinks extends INavbarMenuLinks {}
	export interface IFooterMenuLinks extends INavbarMenuLinks {}
	export interface IOurServicesLinks extends INavbarMenuLinks {}
}

// SLUG RESPONSE
type SlugResponse = {
	slug: string;
	modified: string;
};
export interface ISlug extends Array<SlugResponse> {}
