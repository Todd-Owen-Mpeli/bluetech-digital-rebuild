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
			title: string;
			displayVideo: boolean;
			link: {
				url: string;
				title: string;
				target: string;
			};
			video: {
				title: string;
				mimeType: string;
				mediaItemUrl: string;
				mediaDetails: {
					width: number;
					height: number;
				};
			};
			backgroundImage: {
				altText: string;
				sourceUrl: string;
				mediaDetails: {
					height: number;
					width: number;
				};
			};
		};
	};
    
    export type IHorizontalParallax = {
		heroViewOne: IProps[`heroViewOne`];
		heroViewTwo: IProps[`heroViewTwo`];
		heroViewThree: IProps[`heroViewThree`];
    };

    // Slide One
	export namespace IHeroViewOne {
		export type IProps = {
			title: IHero.IProps[`heroViewOne`][`title`];
			video: IHero.IProps[`heroViewOne`][`video`];
			subtitle: IHero.IProps[`heroViewOne`][`subtitle`];
			displayVideo: IHero.IProps[`heroViewOne`][`displayVideo`];
			videoBackgroundImage: IHero.IProps[`heroViewOne`][`videoBackgroundImage`];
		};

		export type IVideoCard = {
            video: IHero.IProps[`heroViewOne`][`video`];
            displayVideo: IHero.IProps[`heroViewOne`][`displayVideo`];
        };
    };
    
     // Slide Two
	export namespace IHeroViewTwo {
		export type IProps = {
            video: IHero.IProps[`heroViewTwo`][`video`];
			paragraph: IHero.IProps[`heroViewTwo`][`paragraph`];
			buttonLink: IHero.IProps[`heroViewTwo`][`buttonLink`];
			paragraphTwo: IHero.IProps[`heroViewTwo`][`paragraphTwo`];
			displayVideo: IHero.IProps[`heroViewTwo`][`displayVideo`];
			videoBackgroundImage: IHero.IProps[`heroViewTwo`][`videoBackgroundImage`];
		};

		export type IVideoCard = {
            video: IHero.IProps[`heroViewTwo`][`video`];
            displayVideo: IHero.IProps[`heroViewTwo`][`displayVideo`];
        };
	};
    
    // Slide Three
	export namespace IHeroViewThree {
		export type IProps = {
			link: IHero.IProps[`heroViewThree`][`link`];
			video: IHero.IProps[`heroViewThree`][`video`];
			title: IHero.IProps[`heroViewThree`][`title`];
			displayVideo: IHero.IProps[`heroViewThree`][`displayVideo`];
			backgroundImage: IHero.IProps[`heroViewThree`][`backgroundImage`];
		};

		export type IVideoCard = {
			video: IHero.IProps[`heroViewThree`][`video`];
			displayVideo: IHero.IProps[`heroViewThree`][`displayVideo`];
		};
	};

}