// Imports
import {MotionValue} from "framer-motion";
import {Dispatch, SetStateAction} from "react";

export namespace IOurServices {
	export type IProps = {
		serviceOne: {
			title: string;
			paragraph: string;
			buttonLink: {
				url: string;
				title: string;
				target: string;
			};
			image: {
				altText: string;
				sourceUrl: string;
				mediaDetails: {
					height: number;
					width: number;
				};
			};
			servicesRoles: {
				title: string;
				paragraph: string;
				backgroundColor: string;
				link: {
					url: string;
					title: string;
					target: string;
				};
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
		serviceTwo: {
			title: string;
			paragraph: string;
			backgroundImage: {
				altText: string;
				sourceUrl: string;
				mediaDetails: {
					height: number;
					width: number;
				};
			};
		};
		serviceThree: {
			title: string;
			paragraph: string;
		};
	};
	export type IServicesOneRoles = {
		index: number;
		title: string;
		link: {
			url: string;
			title: string;
			target: string;
		};
		paragraph: string;
		backgroundColor: string;
		scrollOpacity: MotionValue<number>;
		setModal: Dispatch<
			SetStateAction<{
				active: boolean;
				index: number;
			}>
		>;
	};
	export type IServicesOneModal = {
		modal: {
			active: boolean;
			index: number;
		};
		servicesRoles: IProps[`serviceOne`][`servicesRoles`];
	};
	export type IHorizontalParallax = {
		serviceOne: IProps[`serviceOne`];
		serviceTwo: IProps[`serviceTwo`];
		serviceThree: IProps[`serviceThree`];
	};
}
