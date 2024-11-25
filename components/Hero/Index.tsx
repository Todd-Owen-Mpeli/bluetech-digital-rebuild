// Imports
import {FC} from "react";
import {motion} from "framer-motion";
import {IHero} from "@/types/components/index";
import {useTiltEffect} from "@/hooks/useTiltEffect";
import {offsetStart, offsetFinish} from "@/animations/animations";

// Styling
import styles from "@/components/Hero/styles/Hero.module.scss";

// Components
import Title from "@/components/Elements/Title";
import Paragraph from "@/components/Elements/Paragraph";
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
	console.log(video);

	// Content wrapper tilt animation effect
	const {rotateX, rotateY, translateX, translateY} = useTiltEffect();

	return (
		<>
			<motion.div className={styles.hero}>
				<div className={styles.container}>
					<div className="relative w-full h-full">
						<motion.div
							style={{
								x: translateX,
								y: translateY,
								rotateX: `${rotateX}deg`,
								rotateY: `${rotateY}deg`,
								transformPerspective: 1000, // Adds perspective for the tilt effect
								transition: "transform 0.2s ease-out", // Smoother transition
								backgroundImage: `url("${videoBackgroundImage?.sourceUrl}")`,
							}}
							className={styles.contentWrapper}
						>
							<motion.video
								muted
								autoPlay
								loop={true}
								controls={false}
								playsInline
								controlsList="nofullscreen"
								aria-label={`Video Element: ${video?.title}`}
								className={displayVideo ? styles.video : "hidden"}
							>
								<source
									src={video?.link}
									type="video/mp4"
									width={
										video?.mediaDetails?.width
											? video?.mediaDetails?.width
											: 1000
									}
									height={
										video?.mediaDetails?.height
											? video?.mediaDetails?.height
											: 550
									}
								/>
							</motion.video>
						</motion.div>
					</div>
				</div>
			</motion.div>
		</>
	);
};
export default Hero;
