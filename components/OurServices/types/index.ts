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
        backgroundImage: {
			altText: string;
			sourceUrl: string;
			mediaDetails: {
				height: number;
				width: number;
			};
        };
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
        backgroundImage: IProps['backgroundImage']
    };
    
    export type IServiceOne= {
        serviceOne: IProps['serviceOne']

    }
}