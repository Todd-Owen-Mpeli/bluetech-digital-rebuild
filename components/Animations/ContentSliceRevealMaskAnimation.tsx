"use client";

// Imports
import {FC, useRef} from "react";
import {motion, useInView} from "framer-motion";

// Content & Animation Types
namespace ITypes {
	export type IProps = {
		className?: string;
		children: React.ReactNode;
	};
	export type IAnimationProps = {
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
export const animation: ITypes.IAnimationProps = {
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
}) => {
	const body = useRef(null);
	const isInView = useInView(body, {once: false, margin: "-5%"});

	return (
		<div className={className}>
			<div ref={body} className="overflow-hidden">
				<div className="overflow-hidden">
					<motion.div
						initial="initial"
						animate={isInView ? "enter" : ""}
						variants={animation}
					>
						{children}
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default ContentSliceRevealMaskAnimation;
