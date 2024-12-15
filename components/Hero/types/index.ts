import {MotionValue} from "framer-motion";

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
		rotateX: number;
		rotateY: number;
		translateX: number;
		translateY: number;
		video: IProps[`video`];
		scale: MotionValue<number>;
		displayVideo: IProps[`displayVideo`];
		contentWrapperBackgroundColor: MotionValue<string>;
		videoBackgroundImage: IProps[`videoBackgroundImage`];
	};
}
