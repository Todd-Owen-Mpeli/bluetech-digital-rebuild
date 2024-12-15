// Imports
import {FC} from "react";
import {motion} from "framer-motion";
import {IHero} from "@/components/Hero/types/index";

// Styling
import styles from "@/components/Hero/styles/Hero.module.scss";

const VideoCard: FC<IHero.IVideoCard> = ({
	video,
	scale,
	rotateX,
	rotateY,
	translateX,
	translateY,
	displayVideo,
	videoBackgroundImage,
	contentWrapperBackgroundColor,
}) => {
	return (
		<>
			<div className={styles.videoContainer}>
				<div className={styles.videoWrapper}>
					<motion.div
						style={{
							scale,
							x: translateX,
							y: translateY,
							rotateX: `${rotateX}deg`,
							rotateY: `${rotateY}deg`,
							transformPerspective: 1000, // Adds perspective for the tilt effect
							transition: "transform 0.2s ease-out", // Smoother transition
							backgroundColor: contentWrapperBackgroundColor,
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
								src={video?.mediaItemUrl}
								type={video?.mimeType || "video/mp4"}
								width={
									video?.mediaDetails?.width ? video?.mediaDetails?.width : 550
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
		</>
	);
};

export default VideoCard;
