// Imports
import {MotionValue} from "framer-motion";
import {Dispatch, SetStateAction} from "react";

// Components
export namespace IHero {
	export type IProps = {
		title: string;
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
