// Imports
import {Dispatch, SetStateAction} from "react";

// Components
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

	// Animation
	export type IRevealAnimation = {
		open: {
			y: number;
			opacity: number;
			visibility: string;
			transition: {
				duration: number;
				delay: number;
				type: string;
				ease: number[];
			};
		};
		closed: {
			y: number;
			opacity: number;
			visibility: string;
			transition: {
				duration: number;
				type: string;
				ease: number[];
			};
		};
	};

	// Our Mission Nav Animation
	export type IOurMissionNavRevealAnimation = {
		open: {
			x: number;
			opacity: number;
			visibility: string;
			transition: {
				duration: number;
				delay: number;
				type: string;
				ease: number[];
			};
		};
		closed: {
			x: number;
			opacity: number;
			visibility: string;
			transition: {
				duration: number;
				delay: number;
				type: string;
				ease: number[];
			};
		};
	};
	export type IContentRevealAnimation = {
		open: {
			x: number;
			opacity: number;
			visibility: string;
			transition: {
				duration: number;
				delay: number;
				type: string;
				ease: number[];
			};
		};
		closed: {
			x: number;
			opacity: number;
			visibility: string;
			transition: {
				duration: number;
				delay: number;
				type: string;
				ease: number[];
			};
		};
	};
}
