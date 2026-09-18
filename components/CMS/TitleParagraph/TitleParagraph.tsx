// Imports
import {
	initial,
	fadeInUp,
	offsetStart,
	offsetFinish,
} from "@/animations/animations";
import {FC} from "react";
import {m} from "framer-motion";
import { ITitleParagraph } from "@/components/CMS/TitleParagraph/types/titleParagraph";

// Styling
import styles from "@/components/CMS/TitleParagraph/styles/TitleParagraph.module.css";

// Components
import Paragraph from "@/components/Global/Elements/Paragraph/Paragraph";

const TitleParagraph: FC<ITitleParagraph.IProps> = ({
	title,
	paragraph,
	displayParagraph,
}) => {
	return (
		<div className={styles.titleParagraph}>
			<m.h2
				initial={initial}
				whileInView={fadeInUp}
				viewport={{once: true}}
				className={title ? styles.title : "hidden"}
			>
				{title}
			</m.h2>
			<Paragraph
				fadeIn={false}
				content={paragraph}
				offsetStart={offsetStart}
				offsetFinish={offsetFinish}
				className={
					paragraph
						? styles.paragraph +
						  ` ${
								displayParagraph
									? "text-center lg:text-center"
									: "text-center lg:text-left"
						  }`
						: "hidden"
				}
			/>
		</div>
	);
};

export default TitleParagraph;
