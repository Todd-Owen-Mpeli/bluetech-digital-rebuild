import {FC, useRef} from "react";
import DOMPurify from "isomorphic-dompurify";
import {motion, useScroll, MotionValue, useTransform} from "framer-motion";

// Content & Animation Types
namespace ITypes {
	export type IProps = {
		content: string;
		className: string;
		afterStyling: string;
		beforeStyling: string;
		offsetStart?: number;
		offsetFinish?: number;
	};
	export type IAnimationProps = {
		word: string;
		afterStyling: string;
		beforeStyling: string;
		range: [number, number];
		progress: MotionValue<number>;
	};
}

const TextGradientScrollOpacity: FC<ITypes.IProps> = ({
	content,
	className,
	offsetStart,
	offsetFinish,
	afterStyling,
	beforeStyling,
}) => {
	const container = useRef<HTMLDivElement>(null);

	const {scrollYProgress} = useScroll({
		target: container,
		offset: [`start ${offsetStart || 0.9}`, `start ${offsetFinish || 0.5}`],
	});

	// Sanitize and strip <p> tags from content
	const sanitizeAndRemovePTags = (html: string) => {
		// Sanitize the input first
		const sanitized = DOMPurify.sanitize(html);

		// Create a temporary DOM element to parse the sanitized content
		const tempElement = document.createElement("div");
		tempElement.innerHTML = sanitized;

		// Extract only the inner text, stripping all <p> tags or others
		return tempElement.innerText || tempElement.textContent || "";
	};

	// Process content to remove <p> tags
	const processedContent = sanitizeAndRemovePTags(content);

	// Split sanitized content into words
	const words = processedContent.split(" ");

	return (
		<motion.div
			ref={container}
			className={`${className}`} // Set the initial opacity to 20%
		>
			{words.map((word: string, index: number) => {
				const start = index / words.length;
				const end = start + 1 / words.length;

				return (
					<AnimatedWord
						key={index}
						word={word}
						range={[start, end]}
						progress={scrollYProgress}
						afterStyling={afterStyling}
						beforeStyling={beforeStyling}
					/>
				);
			})}
		</motion.div>
	);
};

const AnimatedWord: FC<ITypes.IAnimationProps> = ({
	word,
	range,
	progress,
	afterStyling,
	beforeStyling,
}) => {
	const opacity = useTransform(progress, range, [0.2, 1]); // Transition between 20% to 100%

	return (
		<div className={afterStyling}>
			<motion.span style={{opacity}} className={beforeStyling}>
				{word}
			</motion.span>
		</div>
	);
};

export default TextGradientScrollOpacity;
