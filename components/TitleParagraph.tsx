// Imports
import {
	initial,
	fadeInUp,
	offsetStart,
	offsetFinish,
} from "@/animations/animations";
import {FC} from "react";
import {motion} from "framer-motion";
import {ITitleParagraph} from "@/types/components";

// Styling
import styles from "@/styles/components/Elements/Paragraph.module.scss";

// Components
import Paragraph from "@/components/Elements/Paragraph";

const TitleParagraph: FC<ITitleParagraph> = ({
	title,
	paragraph,
	displayParagraph,
}) => {
	return (
		<>
			<div className={styles.titleParagraph}>
				<motion.h2
					initial={initial}
					whileInView={fadeInUp}
					viewport={{once: true}}
					className={title ? styles.title : "hidden"}
				>
					{title}
				</motion.h2>
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
		</>
	);
};

export default TitleParagraph;
