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
		displayVideo: IProps[`displayVideo`];
	};

	export type IHeroCard = {
		title: IProps[`title`];
		paragraph: IProps[`paragraph`];
		titleColor: MotionValue<string>;
		paragraphColor: MotionValue<string>;
		displayVideo: IProps[`displayVideo`];
	};
}
