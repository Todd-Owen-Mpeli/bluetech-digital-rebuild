// Imports
import {FC, useRef} from "react";
import fadeInUp, {initial} from "@/animations/animations";
import {motion, useScroll, useTransform} from "framer-motion";
import {IOurServices} from "@/components/OurServices/types/index";

// Styling
import styles from "@/components/OurServices/styles/OurServices.module.scss";

// Components

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
		<div ref={container} className={`${styles.serviceOne} panel`}>
			<div className={styles.container}>
				<div className={styles.main}></div>
			</div>
		</div>
	);
};

export default ServiceOne;
