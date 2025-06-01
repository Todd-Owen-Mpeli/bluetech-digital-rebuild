
// Imports
import { MotionValue } from "framer-motion";

export namespace IOurServices {
	export type IProps = {
        title: string;
        service: {
            title: string;
            paragraph: string;
            backgroundColour: string;
            options: {
                text: string;
            }[];
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
        }[];
        hoverImages: {
            image: {
				altText: string;
				sourceUrl: string;
				mediaDetails: {
					height: number;
					width: number;
				};
            };
        }[]
        backgroundImage: {
			altText: string;
			sourceUrl: string;
			mediaDetails: {
				height: number;
				width: number;
			};
        };
        servicesBackgroundImage: {
			altText: string;
			sourceUrl: string;
			mediaDetails: {
				height: number;
				width: number;
			};
        };
    };
    
    export type ITitleSection = {
        title: IProps['title'];
        hoverImages: IProps['hoverImages']
        backgroundImage: IProps['backgroundImage']
    };
    
    export type IServices= {
        service: IProps['service']
        servicesBackgroundImage: IProps['servicesBackgroundImage']
    }

    export type ICard= {
        range: any;
        index: number;
        targetScale: number;
        progress: MotionValue<number>;
        title: IProps['service'][0][`title`];
        image: IProps['service'][0][`image`];
        options: IProps['service'][0][`options`];
        paragraph: IProps['service'][0][`paragraph`];
        buttonLink: IProps['service'][0][`buttonLink`];
        servicesBackgroundImage: IProps['servicesBackgroundImage']
        backgroundColour: IProps['service'][0][`backgroundColour`];
    }
}