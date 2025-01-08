// Imports
import {FC, useRef} from "react";
import {motion, useScroll, useTransform} from "framer-motion";
import {IOurExpertise} from "@/components/OurExpertise/types/index";

// Styling
import styles from "@/components/OurExpertise/styles/OurExpertise.module.scss";

// Components
import TextRevealBlurEffect from "@/components/Hero/Fragments/TextRevealBlurEffect";

const OurExpertise: FC<IOurExpertise.IProps> = ({title, paragraph}) => {
	// Track the progress of the scroll and scale
	const container = useRef(null);
	const {scrollY} = useScroll();
	// Scroll Opacity Div
	const scrollOpacity = useTransform(scrollY, [0, 25], [1, 0]);

	return (
		<motion.div ref={container} className={styles.ourExpertise}>
			<div className={styles.container}>
				<div className={styles.top}>
					<motion.h2 className={styles.title}>{title}</motion.h2>
					<TextRevealBlurEffect
						content={paragraph}
						scrollOpacity={scrollOpacity}
						className={paragraph ? styles.paragraph : "hidden"}
					/>
				</div>
				<div className={styles.main}></div>
			</div>
		</motion.div>
	);
};

export default OurExpertise;
