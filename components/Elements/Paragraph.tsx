// Imports
import {FC, useRef} from "react";
import DOMPurify from "isomorphic-dompurify";
import {motion, useScroll} from "framer-motion";
import {IElements} from "@/types/components/index";

// Styling
import styles from "@/styles/components/Elements/Paragraph.module.scss";

const Paragraph: FC<IElements.IParagraph> = ({
	fadeIn,
	content,
	className,
	offsetStart,
	offsetFinish,
	styleTextColor,
}) => {
	const container = useRef(null);

	const {scrollYProgress} = useScroll({
		target: container,
		offset: [`start ${offsetStart || 0.9}`, `start ${offsetFinish || 0.5}`],
	});

	/* Sanitize the WYSIWYG paragraph content */
	const createParagraphMarkup = (paragraphContent: string) => {
		return {
			__html: DOMPurify.sanitize(paragraphContent),
		};
	};
	return (
		<motion.div
			ref={container}
			style={{
				color: styleTextColor || "",
				opacity: fadeIn ? scrollYProgress : 1,
			}}
			dangerouslySetInnerHTML={createParagraphMarkup(content)}
			className={content ? styles.paragraph + ` block ${className}` : `hidden`}
		/>
	);
};

export default Paragraph;
