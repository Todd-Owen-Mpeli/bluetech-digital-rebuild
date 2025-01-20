// Imports
import {FC, useRef} from "react";
import {motion, useScroll, useTransform} from "framer-motion";
import {IOurServices} from "@/components/OurServices/types/index";

// Styling
import styles from "@/components/OurServices/styles/OurServices.module.scss";

// Components
import Title from "@/components/Elements/Title";
import Paragraph from "@/components/Elements/Paragraph";
import TextRevealBlurEffect from "@/components/Elements/TextRevealBlurEffect";
import SlideInXLeftAnimation from "@/components/Animations/SlideInXLeftAnimation";
import SlideInXRightAnimation from "@/components/Animations/SlideInXRightAnimation";

const ServiceOne: FC<IOurServices.IProps[`serviceOne`]> = ({
	title,
	image,
	paragraph,
}) => {
	const container = useRef(null);
	const {scrollYProgress} = useScroll({
		target: container,

		offset: ["start start", "end end"],
	});

	// Scroll Opacity Div
	const scrollOpacity = useTransform(scrollYProgress, [0, 500], [1, 0]);

	return (
		<motion.div ref={container} className={`${styles.serviceOne} panel`}>
			<div className={styles.container}>
				<div className={styles.main}></div>
			</div>
		</motion.div>
	);
};

export default ServiceOne;
