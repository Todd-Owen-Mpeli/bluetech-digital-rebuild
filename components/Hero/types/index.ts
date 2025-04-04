export namespace IHero {
	export type IProps = {
        heroViewOne: {
			title: string;
            subtitle: string;
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
        heroViewTwo: {
			paragraph: string;
			paragraphTwo: string;
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
        };
        heroViewThree: {
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
	};

	export type IVideoCard = {
		video: IProps[`heroViewOne`][`video`];
		displayVideo: IProps[`heroViewOne`][`displayVideo`];
    };
    
    export type IHorizontalParallax = {
		heroViewOne: IProps[`heroViewOne`];
		heroViewTwo: IProps[`heroViewTwo`];
		heroViewThree: IProps[`heroViewThree`];
	};

}