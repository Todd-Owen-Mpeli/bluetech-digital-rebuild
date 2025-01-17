// Imports
import {FC} from "react";
import {motion, useTransform} from "framer-motion";
import {IOurExpertise} from "@/components/OurExpertise/types/index";

// Styling
import styles from "@/components/OurExpertise/styles/OurExpertise.module.scss";

// Components
import Title from "@/components/Elements/Title";
import TextRevealBlurEffect from "@/components/Elements/TextRevealBlurEffect";
import ContentSliceRevealMaskAnimation from "@/components/Animations/ContentSliceRevealMaskAnimation";

const MainContent: FC<IOurExpertise.IMainContent> = ({
	title,
	paragraph,
	scrollYProgress,
}) => {
	// Scroll Opacity Div
	const scrollOpacity = useTransform(scrollYProgress, [0, 500], [1, 0]);

	return (
		<div className={styles.mainContent}>
			<div />
			<motion.div
				className={styles.wrapper}
				style={{opacity: scrollOpacity, backdropFilter: "blur(24px)"}}
			>
				<ContentSliceRevealMaskAnimation>
					<Title content={title} className={title ? styles.title : "hidden"} />
				</ContentSliceRevealMaskAnimation>
				<TextRevealBlurEffect
					content={paragraph}
					scrollOpacity={scrollOpacity}
					className={paragraph ? styles.paragraph : "hidden"}
				/>
			</motion.div>
		</div>
	);
};

export default MainContent;
