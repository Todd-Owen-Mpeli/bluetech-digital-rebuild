// Imports
import {FC} from "react";
import {motion} from "framer-motion";
import DOMPurify from "isomorphic-dompurify";
import {IElements} from "@/types/components/index";
import {fadeIn, initialTwo} from "@/animations/animations";

const Title: FC<IElements.ITitle> = ({content, className}) => {
	/* Sanitize the WYSIWYG title content */
	function createTitleMarkup(titleContent: string) {
		return {
			__html: DOMPurify.sanitize(titleContent),
		};
	}

	return (
		<motion.div
			initial={initialTwo}
			whileInView={fadeIn}
			viewport={{once: true}}
			className={content ? `block ${className}` : `hidden`}
			dangerouslySetInnerHTML={createTitleMarkup(content)}
		/>
	);
};

export default Title;
