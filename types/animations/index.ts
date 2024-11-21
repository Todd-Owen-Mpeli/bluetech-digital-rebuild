// Imports
import {Variants} from "framer-motion";

/*  FRAMER-MOTION ANIMATIONS
Custom reusable Animation Properties/variables */

export namespace IAnimation {
	// 3D Tilt animation effect
	export type IUseTiltEffect = {
		rotateX: number;
		rotateY: number;
		translateX: number;
		translateY: number;
	};

	// Text Effect Reveal
	export type IPresetType = "blur" | "shake" | "scale" | "fade" | "slide";

	export type ITextEffectProps = {
		children: string;
		per?: "word" | "char";
		as?: keyof JSX.IntrinsicElements;
		variants?: {
			container?: Variants;
			item?: Variants;
		};
		className?: string;
		preset?: IPresetType;
	};

	// WhileInView
	export type IInitial = {
		y: number;
		opacity: number;
	};
	export type IInitialTwo = {
		y: number;
		opacity: number;
	};
	export type IFadeIn = {
		opacity: number;
		transition: {
			duration: number;
			delay: number;
			ease: string;
		};
	};
	export type IFadeInTwo = {
		y: number;
		opacity: number;
		transition: {
			delay: number;
			duration: number;
			ease: string;
		};
	};
	export type IFadeInUp = {
		y: number;
		opacity: number;
		transition: {
			delay: number;
			duration: number;
			ease: string;
		};
	};
	export type IStagger = {
		initial: {
			opacity: number;
			y: number;
		};
		animate: {
			opacity: number;
			y: number;
			transition: {
				delay: number;
				duration: number;
				ease: string;
			};
		};
	};
	export type IArrayLoopStaggerChildren = {
		initial: {
			opacity: number;
			y: number;
		};
		animate: (keys: number) => {
			opacity: number;
			y: number;
			transition: {
				delay: number;
				duration: number;
				ease: string;
			};
		};
	};
	export type ISlideInRightInitial = {
		y: number;
		x: number;
		opacity: number;
	};
	export type ISlideInLeftInitial = {
		y: number;
		x: number;
		opacity: number;
	};
	export type ISlideInRightFinish = {
		x: number;
		y: 0;
		opacity: number;
		transition: {
			delay: number;
			duration: number;
			ease: string;
			staggerChildren: number;
		};
	};

	// Scroll Based Velocity
	export type IVelocityScrollProps = {
		text: string;
		className?: string;
		displayFour: boolean;
		defaultVelocity?: number;
	};
	export type IParallaxProps = {
		children: string;
		baseVelocity: number;
		className?: string;
	};

	// Text Typing Animation
	export type ITextTypingAnimation = {
		text: string;
		color?: any;
		display?: any;
		opacity?: any;
		duration?: number;
		className?: string;
	};

	// Title, Paragraph Text & Content Mask Animation
	export type ITitleTextMaskAnimation = {
		text: string;
		className?: string;
		styleTextColor?: any;
		isPageTitle?: boolean;
	};
	export type IContentMaskAnimation = {
		children: React.ReactNode;
	};
	export type IParagraphTextMaskAnimation = {
		text: string;
		className?: string;
		styleTextColor?: any;
	};

	// Text Scroll Button
	export type ITextScrollButton = {
		className?: string;
		classNameTwo?: string;
		classNameThree?: string;
		styleTextColor?: string;
		children: React.ReactNode;
		styleButtonLineColor?: string;
	};

	export type ITransforms = {
		x: number;
		y: number;
		rotationZ: number;
	}[];
	export type IDisperse = {
		open: (i: any) => {
			x: string;
			y: string;
			rotateZ: number;
			transition: {
				duration: number;
				ease: number[];
			};
			zIndex: number;
		};
		closed: {
			x: number;
			y: number;
			rotateZ: number;
			transition: {
				duration: number;
				ease: number[];
			};
			zIndex: number;
		};
	};

	// Content Slice Reveal Mask Animation
	export namespace IContentSliceRevealMaskAnimation {
		export type IAnimation = {
			initial: {
				y: string;
			};
			enter: (i: number) => {
				y: string;
				transition: {
					duration: number;
					ease: number[];
					delay: number;
				};
			};
		};
		export type IProps = {
			className?: string;
			children: React.ReactNode;
		};
	}
}

// ScrollY Progress Based Content Reveal Animation
export namespace IScrollYProgressReveal {
	export type IProps = {
		className?: string;
		children: React.ReactNode;
	};

	export interface IFadeInAnimation extends IProps {}
	export interface ISlideInXAnimation extends IProps {}
}
