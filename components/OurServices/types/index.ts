export namespace IOurServices {
	export type IProps = {
		serviceOne: {
			title: string;
			paragraph: string;
			image: {
				altText: string;
				sourceUrl: string;
				mediaDetails: {
					height: number;
					width: number;
				};
			};
		};
		serviceTwo: {
			title: string;
			paragraph: string;
			image: {
				altText: string;
				sourceUrl: string;
				mediaDetails: {
					height: number;
					width: number;
				};
			};
		};
		serviceThree: {
			title: string;
			paragraph: string;
		};
	};

	export type IHorizontalParallax = {
		serviceOne: IProps[`serviceOne`];
		serviceTwo: IProps[`serviceTwo`];
		serviceThree: IProps[`serviceThree`];
	};
}
