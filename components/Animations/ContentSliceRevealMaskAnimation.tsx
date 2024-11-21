"use client";

// Imports
import {FC, useRef} from "react";
import {IAnimation} from "@/types/animations";
import {motion, useInView} from "framer-motion";

//  Mask Animation
export const AnimationProps: IAnimation.IContentSliceRevealMaskAnimation.IAnimation =
	{
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

const ContentSliceRevealMaskAnimation: FC<
	IAnimation.IContentSliceRevealMaskAnimation.IProps
> = ({children, className}) => {
	const body = useRef(null);
	const isInView = useInView(body, {once: false, margin: "05%"});

	return (
		<>
			<div className={className}>
				<div ref={body} className="overflow-hidden">
					<div className="overflow-hidden">
						<motion.div
							initial="initial"
							animate={isInView ? "enter" : ""}
							variants={AnimationProps}
						>
							{children}
						</motion.div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ContentSliceRevealMaskAnimation;
