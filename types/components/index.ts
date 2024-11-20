// Imports
import {Dispatch, SetStateAction} from "react";

// Components
export namespace IHero {
	export type IProps = {
		video: string;
		titleEnd: string;
		paragraph: string;
		titleStart: string;
		titleMiddle: string;
		displayVideo: boolean;
		videoBackgroundImage: {
			altText: string;
			sourceUrl: string;
			mediaDetails: {
				width: number;
				height: number;
			};
		};
		buttonLink: {
			url: string;
			title: string;
			target: string;
		};
		buttonLinkTwo: {
			url: string;
			title: string;
			target: string;
		};
		rightsideImage: {
			altText: string;
			sourceUrl: string;
			mediaDetails: {
				height: number;
				width: number;
			};
		};
		smallImageOne: {
			altText: string;
			sourceUrl: string;
			mediaDetails: {
				height: number;
				width: number;
			};
		};
		smallImageTwo: {
			altText: string;
			sourceUrl: string;
			mediaDetails: {
				height: number;
				width: number;
			};
		};
	};
}

// Global
export namespace IPagination {
	export type IProps = {
		contentArray: any;
		className: string;
		contentType: string;
		numberOfItemsRenderedPerPage: number;
	};
	export type ICard = {
		item: any;
		index: number;
		itemsPerPage: number;
		contentType: IProps[`contentType`];
	};
	export type IPaginationCard = {
		totalPages: any;
		currentPage: any;
		buttonClipPath: string;
		contentArray: IProps[`contentArray`];
		setCurrentPage: Dispatch<SetStateAction<number>>;
	};
}

export type ISmoothScrolling = {
	children: React.ReactNode;
};

// Elements
export namespace IElements {
	export type ITitle = {
		content: string;
		className: string;
	};
	export type IParagraph = {
		content: string;
		className: string;
	};
	export type IBackHoverButton = {
		link: string;
	};
}
