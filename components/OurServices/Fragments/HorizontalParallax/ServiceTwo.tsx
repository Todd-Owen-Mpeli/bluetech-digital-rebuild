// Imports
import {FC} from "react";
import {motion} from "framer-motion";
import fadeInUp, {initial} from "@/animations/animations";
import {IOurServices} from "@/components/OurServices/types/index";

// Styling
import styles from "@/components/OurServices/styles/OurServices.module.scss";

// Components
import SlideInXLeftAnimation from "@/components/Animations/SlideInXLeftAnimation";
import ContentSliceRevealMaskAnimation from "@/components/Animations/ContentSliceRevealMaskAnimation";

const ServiceTwo: FC<IOurServices.IProps[`serviceTwo`]> = ({
	title,
	image,
	paragraph,
}) => {
	return (
		<div
			className={`${styles.serviceTwo} panel`}
			style={{backgroundImage: `url(${image?.sourceUrl})`}}
		>
			<div className={styles.container}>
				<div className={styles.main}>
					<SlideInXLeftAnimation className="w-full">
						<div className={styles.card} style={{backdropFilter: "blur(8px)"}}>
							<div>
								<motion.h2
									initial={initial}
									whileInView={fadeInUp}
									viewport={{once: true}}
									className={title ? styles.subtitle : "hidden"}
								>
									Services
								</motion.h2>
								<ContentSliceRevealMaskAnimation>
									<motion.h2
										initial={initial}
										whileInView={fadeInUp}
										viewport={{once: true}}
										className={title ? styles.title : "hidden"}
									>
										{title}
									</motion.h2>
								</ContentSliceRevealMaskAnimation>
							</div>
						</div>
					</SlideInXLeftAnimation>
				</div>
			</div>
			<div className={styles.divFade} />
		</div>
	);
};

export default ServiceTwo;
