"use client";

// Imports
import {FC, useRef} from "react";
import {motion, useInView} from "framer-motion";

// Content & Animation Types
namespace ITypes {
	export type IProps = {
		content: string;
		className?: string;
		styleTextColor?: any;
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

const extractPhrases = (htmlString: any) => {
	// Match the content between <p> tags using a regular expression
	const regex = /<p>(.*?)<\/p>/g;
	let match;
	const phrases = [];

	// Use the exec method to find all matches
	while ((match = regex.exec(htmlString)) !== null) {
		// Push the captured group (content between <p> tags) to the phrases array
		phrases.push(match[1].trim());
	}

	return phrases;
};

const ParagraphTextMaskAnimation: FC<ITypes.IProps> = ({
	content,
	className,
	styleTextColor,
}) => {
	const body = useRef(null);
	const phrases = extractPhrases(content);
	const isInView = useInView(body, {once: false, margin: "-5%"});

	return (
		<div ref={body} className="overflow-hidden">
			{phrases.map((phrase: any, index: number) => {
				return (
					<div key={index} className="overflow-hidden">
						<motion.p
							custom={index}
							initial="initial"
							variants={animation}
							className={className}
							animate={isInView ? "enter" : ""}
							style={{
								color: styleTextColor ? styleTextColor : "none",
							}}
						>
							{phrase}
						</motion.p>
					</div>
				);
			})}
		</div>
	);
};

export default ParagraphTextMaskAnimation;
