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
		video: IProps[`video`];
		borderRadius: MotionValue<string>;
		displayVideo: IProps[`displayVideo`];
	};

	export type IHeroCard = {
		title: IProps[`title`];
		titleColor: MotionValue<string>;
		borderRadius: MotionValue<string>;
		displayVideo: IProps[`displayVideo`];
	};
}
