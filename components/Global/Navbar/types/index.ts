// Imports
import { Dispatch, SetStateAction } from "react";
import {IGlobal} from "../../../../types/context/index";

// Components
export namespace INavbar {
	export type IProps = {};
	export type INavbarMenuLinks = {
		item: any;
		index: number;
	};

	export type IMobileMenu = {
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

	export type IMobileMenuAnimation = {
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
