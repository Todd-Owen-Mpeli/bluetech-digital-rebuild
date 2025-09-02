// Imports
import {
	fadeIn,
	initial,
	initialTwo,
	slideInLeftInitial,
	slideInRightFinish,
	slideInRightInitial
} from "@/animations/animations";
import { FC } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { IHero } from "@/components/CMS/Hero/types/index";

// Styling
import styles from "@/components/CMS/Hero/styles/Hero.module.scss";

// Components
import Button from "@/components/Global/Elements/Button/Button";
import Paragraph from "@/components/Global/Elements/Paragraph/Paragraph";
import VideoCard from "@/components/CMS/Hero/fragments/HeroViewThree/Elements/VideoCard";
import SlideUpDivMaskReveal from "@/components/Animations/SlideUpDivMaskReveal/SlideUpDivMaskReveal";
import ContentSliceRevealMaskAnimation from "@/components/Animations/ContentSliceRevealMaskAnimation";

const HeroViewThree: FC<IHero.IHeroViewThree.IProps> = ({ 
	link,
    title,
    video,
    displayVideo,
    backgroundImage
 }) => {
    return (
		<>
			<div className={`${styles.heroViewThree} panel`}>
				<Link
					href={`${link?.url || "/"}`}
					aria-label={`${link?.title}`}
					className={styles.linkWrapper}
					target={link?.target || "_self"}
				>
					<SlideUpDivMaskReveal
						triggerOnce={true}
						className={styles.mainContainer}
						backgroundColor={"bg-pureBlack"}
						style={{
							backgroundImage: `url("${backgroundImage?.sourceUrl}")`,
						}}
					>
						<VideoCard video={video} displayVideo={displayVideo}/>
						<div className={styles.contentWrapper}>
						<motion.div
							viewport={{once: false}}
							className={styles.content}
							initial={slideInLeftInitial}
							whileInView={slideInRightFinish}
						>
							<ContentSliceRevealMaskAnimation>
								<motion.h4
									initial={initialTwo}
									whileInView={fadeIn}
									viewport={{once: true}}
									className={styles.title}
								>
									{title}
								</motion.h4>
							</ContentSliceRevealMaskAnimation>
							<motion.div
								initial={initial}
								whileInView={fadeIn}
								viewport={{once: false}}
								className={styles.playButton}
							>
								<Button styleNumber={7} link={link}/>
							</motion.div>
						</motion.div>
						</div>
					</SlideUpDivMaskReveal>
				</Link>
			</div>
			<div className={`${styles.heroViewFour} panel`}>
			</div>
		</>
    );
}

export default HeroViewThree