// Imports
import {FC, useRef} from "react";
import {IHero} from "@/types/components/index";
import {useTiltEffect} from "@/hooks/useTiltEffect";
import {motion, useScroll, useTransform} from "framer-motion";

// Styling
import styles from "@/components/Hero/styles/Hero.module.scss";

// Components
import VideoCard from "@/components/Hero/Card/VideoCard";

const Hero: FC<IHero.IProps> = ({
	video,
	title,
	paragraph,
	buttonLink,
	displayVideo,
	buttonLinkTwo,
	videoBackgroundImage,
}) => {
	// Track the progress of the scroll and scale
	const container = useRef(null);
	const {scrollY} = useScroll();

	// Scale content wrapper
	const scale = useTransform(scrollY, [0, 400], [1, 0.85]);

	return (
		<>
			<motion.div ref={container} className={styles.hero}>
				<div className={styles.container}>
					<div className={styles.contentWrapper}>
						<motion.div
							style={{
								scale,
								backgroundImage: `url("${videoBackgroundImage?.sourceUrl}")`,
							}}
							className={styles.content}
						>
							<VideoCard
								title={title}
								video={video}
								paragraph={paragraph}
								buttonLink={buttonLink}
								displayVideo={displayVideo}
								buttonLinkTwo={buttonLinkTwo}
							/>
						</motion.div>
					</div>
				</div>
			</motion.div>
			<div className="h-screen bg-white"></div>
		</>
	);
};
export default Hero;
