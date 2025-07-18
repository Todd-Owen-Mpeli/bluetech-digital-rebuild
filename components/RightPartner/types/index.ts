
export namespace IRightPartner {
	export type IProps = {
        title: string;
        paragraph: string;
        stats: {
            text: string;
            number: string;
            paragraph: string;
        }[];
        image: {
            altText: string;
            sourceUrl: string;
            mediaDetails: {
                height: number;
                width: number;
            };
        };
        hoverImage: {
            altText: string;
            sourceUrl: string;
            mediaDetails: {
                height: number;
                width: number;
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
}