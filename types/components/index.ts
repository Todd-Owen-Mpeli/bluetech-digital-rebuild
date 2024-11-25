// Imports
import {MotionValue} from "framer-motion";
import {Dispatch, SetStateAction} from "react";

// Components
export namespace IHero {
	export type IProps = {
		title: string;
		paragraph: string;
		displayVideo: boolean;
		video: {
			title: string;
			mimeType: string;
			mediaItemUrl: string;
			mediaDetails: {
				width: number;
				height: number;
			};
		};
		trustedClients: {
			title: string;
			textarea: string;
			clientNumber: string;
			clientsImages: {
				image: {
					altText: string;
					sourceUrl: string;
					mediaDetails: {
						height: number;
						width: number;
					};
				};
			}[];
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
		videoBackgroundImage: {
			altText: string;
			sourceUrl: string;
			mediaDetails: {
				height: number;
				width: number;
			};
		};
	};
	export type IVideoCard = {
		title: IProps[`title`];
		video: IProps[`video`];
		paragraph: IProps[`paragraph`];
		buttonLink: IProps[`buttonLink`];
		displayVideo: IProps[`displayVideo`];
		buttonLinkTwo: IProps[`buttonLinkTwo`];
	};
}
export namespace INavbar {
	export type IProps = {};
	export type IOurMissionNav = {
		item: any;
		index: number;
		ourMissionOpen: boolean;
		setOurMissionOpen: Dispatch<SetStateAction<boolean>>;
	};
	export type INavbarMenuLinks = {
		item: any;
		index: number;
	};
}
export type ITitleParagraph = {
	title: string;
	paragraph: string;
	displayParagraph: boolean;
};

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
		fadeIn?: boolean;
		content: string;
		className: string;
		offsetStart?: number;
		offsetFinish?: number;
		styleTextColor?: MotionValue<string> | string;
	};
	export type IBackHoverButton = {
		link: string;
	};
}
