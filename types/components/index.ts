// Imports
import {MotionValue} from "framer-motion";
import {Dispatch, RefObject, SetStateAction} from "react";

// Components
export namespace IHero {
	export type IProps = {
		title: string;
		subtitle: string;
		paragraph: string;
		actionTitle: string;
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
			clientsImages: {
				name: string;
				channelName: string;
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
	export type IButton = {
		className: string;
		slideInLeftAnimation?: boolean;
		slideInRightAnimation?: boolean;
		buttonLink: {
			url: string;
			title: string;
			target: string;
		};
	};
	export type IClientsImages = {
		clientsImages: IProps[`trustedClients`][`clientsImages`];
	};
	export type ITopVideoContainer = {
		video: IProps[`video`];
		scale: MotionValue<number>;
		displayVideo: IProps[`displayVideo`];
		videoBackgroundImage: IProps[`videoBackgroundImage`];
	};
}

export namespace IDynamicStackMotion {
	export type IProps = {
		title: string;
		subtitle: string;
		paragraph: string;
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
		stackMotionGrid: {
			title: string;
			paragraph: string;
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
	export type I3DStackMotion = {
		wrapperRef: RefObject<HTMLDivElement>;
		stackMotionGrid: IProps[`stackMotionGrid`];
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
		styleTextColor?: MotionValue<string> | string;
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
