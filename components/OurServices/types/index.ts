export namespace IOurServices {
	export type IProps = {
        title: string;
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
}