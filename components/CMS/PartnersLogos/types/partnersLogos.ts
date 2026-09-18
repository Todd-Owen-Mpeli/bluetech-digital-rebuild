export namespace IPartnersLogos {
	export type IProps = {
		logoGrid: {
			image: {
				altText: string;
				sourceUrl: string;
				mediaDetails: {
					width: number;
					height: number;
				};
			};
		}[];
	};

	export type IInfiniteSlider = {
		gap?: number;
		speed?: number;
		reverse?: boolean;
		className?: string;
		speedOnHover?: number;
		children: React.ReactNode;
		direction?: 'horizontal' | 'vertical';
	};
}