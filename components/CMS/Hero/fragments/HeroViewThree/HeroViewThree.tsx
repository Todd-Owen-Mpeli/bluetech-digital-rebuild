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
import { m } from "framer-motion";
import { IHero } from "@/components/CMS/Hero/types/hero";

// Styling
import styles from "@/components/CMS/Hero/styles/Hero.module.css";

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
				{/* Not a <Link> — the "Our Impact" Button below already navigates
				to this exact same `link.url`; wrapping this whole card in a
				second, outer <a> to the same destination produced an invalid
				nested-anchor (<a> inside <a>), which browsers silently
				"fix" by breaking the tag out — causing a hydration mismatch
				on every load. */}
				<div className={styles.linkWrapper}>
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
						<m.div
							viewport={{once: false}}
							className={styles.content}
							initial={slideInLeftInitial}
							whileInView={slideInRightFinish}
						>
							<ContentSliceRevealMaskAnimation>
								<m.h4
									initial={initialTwo}
									whileInView={fadeIn}
									viewport={{once: true}}
									className={styles.title}
								>
									{title}
								</m.h4>
							</ContentSliceRevealMaskAnimation>
							<m.div
								initial={initial}
								whileInView={fadeIn}
								viewport={{once: false}}
								className={styles.playButton}
							>
								<Button styleNumber={7} link={link}/>
							</m.div>
						</m.div>
						</div>
					</SlideUpDivMaskReveal>
				</div>
			</div>
			<div className={`${styles.heroViewFour} panel`}>
			</div>
		</>
    );
}

export default HeroViewThree