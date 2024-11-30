// Imports
import {FC} from "react";
import {motion} from "framer-motion";
import {IHero} from "@/types/components/index";

// Styling
import styles from "@/components/Hero/styles/Hero.module.scss";

const VideoContainer: FC<IHero.IVideoContainer> = ({
	scale,
	video,
	displayVideo,
	videoBackgroundImage,
}) => {
	return (
		<>
			<motion.div
				className={styles.videoContainer}
				style={{
					scale,
					backgroundImage: `url("${videoBackgroundImage?.sourceUrl}")`,
				}}
			>
				<motion.video
					muted
					controls
					autoPlay
					loop={true}
					playsInline
					controlsList="nofullscreen"
					aria-label={`Video Element: ${video?.title}`}
					className={displayVideo ? styles.backgroundVideo : "hidden"}
				>
					<source
						className={styles.source}
						type={video?.mimeType || "video/mp4"}
						width={video?.mediaDetails?.width || 1000}
						height={video?.mediaDetails?.height || 1000}
						src={"/video/AC3-studio.com-showreel-video.mp4"}
					/>
				</motion.video>
			</motion.div>
		</>
	);
};

export default VideoContainer;
