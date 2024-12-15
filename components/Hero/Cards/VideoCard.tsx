// Imports
import {FC} from "react";
import {motion} from "framer-motion";
import {IHero} from "@/components/Hero/types/index";

// Styling
import styles from "@/components/Hero/styles/Hero.module.scss";

const VideoCard: FC<IHero.IVideoCard> = ({video, displayVideo}) => {
	return (
		<>
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
					src={`/video/AC3-studio.com-showreel-video.mp4`}
					// src={video?.mediaItemUrl}
					type={video?.mimeType || "video/mp4"}
					width={video?.mediaDetails?.width ? video?.mediaDetails?.width : 550}
					height={
						video?.mediaDetails?.height ? video?.mediaDetails?.height : 550
					}
				/>
			</motion.video>
		</>
	);
};

export default VideoCard;
