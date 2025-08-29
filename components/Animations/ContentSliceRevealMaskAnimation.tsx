"use client"

// Imports
import { FC, useRef} from "react";
import { motion, useInView} from "framer-motion";

// Content Slice Reveal Mask Animation
namespace ITypes {
	export type IProps = {
		className?: string;
		triggerOnce?: boolean;
		centerContent?: boolean;
		children: React.ReactNode;
	};

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
}

//  Mask Animation
const AnimationProps: ITypes.IAnimation | any = {
	initial: {
		y: "100%",
	},
	enter: (i: number) => ({
		y: "0", // Move into view
		transition: {
			duration: 1,
			ease: [0.5, 0.5, 0.75, 1],
			delay: 0.05 * i,
		},
	}),
};

const ContentSliceRevealMaskAnimation: FC<ITypes.IProps> = ({
	children,
	className,
	triggerOnce = false,
	centerContent = false,
}) => {
	const body = useRef(null);
	const isInView = useInView(body, {once: triggerOnce, margin: "-5%"});

	return (
		<div className={className}>
			<div ref={body} className="overflow-hidden w-full h-full">
				<div className="overflow-hidden w-full h-full">
					<motion.div
						initial="initial"
						variants={AnimationProps}
						animate={isInView ? "enter" : ""}
						className={` w-full h-full flex flex-col gap-0 ${centerContent ? "items-center justify-center" : "items-center lg:items-baseline justify-center"}`}
					>
						{children}
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default ContentSliceRevealMaskAnimation;
