// Imports
import { IGlobal } from "@/context/types/context";
import { Dispatch, SetStateAction } from "react";

// Components
export namespace INavbar {
	export type IProps = {};
	export type INavbarMenuLinks = {
		item: any;
		index: number;
	};

	export type IMegaMenu = {
		menuActive: boolean;
		mobileLinks: IGlobal.IContext[`mobileLinks`];
		setMenuActive: Dispatch<SetStateAction<boolean>>;
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

	export type IMegaMenuAnimation = {
		open: {
			width: string;
			height: string;
			top: string;
			right: string;
			padding: string;
			borderRadius: string;
			transition: {
				duration: number;
				type: string;
				ease: number[];
			};
		};
		closed: {
			width: string;
			height: string;
			top: string;
			right: string;
			padding: string;
			borderRadius: string;
			transition: {
				duration: number;
				type: string;
				ease: number[];
			};
		};
	};
}
