// Imports
import {MotionValue} from "framer-motion";

export namespace IOurExpertise {
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
		videoBackgroundImage: {
			altText: string;
			sourceUrl: string;
			mediaDetails: {
				height: number;
				width: number;
			};
		};
	};
	export type ISvgMask = {
		scrollYProgress: MotionValue<number>;
	};
	export type IVideoCard = {
		video: IProps[`video`];
		displayVideo: IProps[`displayVideo`];
		videoBackgroundImage: IProps[`videoBackgroundImage`];
	};
	export type IMainContent = {
		title: IProps[`title`];
		paragraph: IProps[`paragraph`];
		scrollYProgress: MotionValue<number>;
	};
}
