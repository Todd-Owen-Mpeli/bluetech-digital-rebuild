export namespace IOurServices {
	export type IProps = {
        title: string;
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
            options: {
                text: string;
            }[];
        };
        serviceTwo: {
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
            options: {
                text: string;
            }[];
        };
    };
    
    export type ITitleSection = {
        title: IProps['title'];
        hoverImages: IProps['hoverImages']
    };
    
    export type IImage = {
        image: {
            altText: string;
            sourceUrl: string;
            mediaDetails?: {
            width?: number;
            height?: number;
            };
        };
    }
}