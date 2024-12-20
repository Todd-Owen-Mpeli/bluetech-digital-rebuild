// Imports
import {FC, useRef} from "react";
import {ISamurai} from "@/components/Samurai/types/Index";
import {fadeInUp, initial} from "@/animations/animations";
import {motion, useScroll, useTransform} from "framer-motion";

// Styling
import styles from "@/components/Samurai/styles/Samurai.module.scss";

// Components
import Samurai3D from "@/components/Samurai/fragments/Samurai3D";
import TextRevealBlurEffect from "@/components/Hero/fragments/TextRevealBlurEffect";

const Hero: FC<ISamurai.IProps> = ({title, subtitle, paragraph}) => {
	// Track the progress of the scroll and scale
	const container = useRef(null);
	const {scrollY} = useScroll();

	// Scroll Opacity Div
	const scrollOpacity = useTransform(scrollY, [0, 25], [1, 0]);

	return (
		<>
			<motion.div ref={container} className={styles.samurai}>
				<div className={styles.container}>
					<Samurai3D />
					<div className={styles.main}>
						<motion.h5
							initial={initial}
							whileInView={fadeInUp}
							viewport={{once: true}}
							className={title ? styles.subtitle : "hidden"}
						>
							{subtitle}
						</motion.h5>
						<motion.h2
							initial={initial}
							whileInView={fadeInUp}
							viewport={{once: true}}
							className={title ? styles.title : "hidden"}
						>
							{title}
						</motion.h2>
						<TextRevealBlurEffect
							content={paragraph}
							scrollOpacity={scrollOpacity}
							className={paragraph ? styles.paragraph : "hidden"}
						/>
					</div>
				</div>
			</motion.div>
			<div className="h-screen bg-pureBlack"></div>
		</>
	);
};

export default Hero;
