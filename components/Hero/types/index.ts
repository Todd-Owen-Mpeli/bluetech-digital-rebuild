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
		buttonLink: {
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
	};

	export type IVideoCard = {
		video: IProps[`video`];
		borderRadius: MotionValue<string>;
		displayVideo: IProps[`displayVideo`];
	};

	export type IHeroCard = {
		title: IProps[`title`];
		titleColor: MotionValue<string>;
		buttonLink: IProps[`buttonLink`];
		borderRadius: MotionValue<string>;
		displayVideo: IProps[`displayVideo`];
		trustedClients: IProps[`trustedClients`];
	};

	export type IRenderStars = {
		rating: number;
		color: string;
	};

	export type IClientsImages = {
		title: IProps[`trustedClients`][`title`];
		clientsImages: IProps[`trustedClients`][`clientsImages`];
	};
}
