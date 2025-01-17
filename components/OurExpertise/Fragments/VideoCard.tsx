// Imports
import {FC} from "react";
import {motion} from "framer-motion";
import {IOurExpertise} from "@/components/OurExpertise/types/index";

// Styling
import styles from "@/components/OurExpertise/styles/OurExpertise.module.scss";

const VideoCard: FC<IOurExpertise.IVideoCard> = ({
	video,
	displayVideo,
	videoBackgroundImage,
}) => {
	return (
		<motion.video
			muted
			autoPlay
			loop={true}
			controls={false}
			playsInline
			controlsList="nofullscreen"
			aria-label={`Video: ${video?.title}`}
			poster={`${videoBackgroundImage.sourceUrl}`}
			className={displayVideo ? styles.video : "hidden"}
		>
			<source
				src={video?.mediaItemUrl}
				type={video?.mimeType || "video/mp4"}
				width={video?.mediaDetails?.width ? video?.mediaDetails?.width : 550}
				height={video?.mediaDetails?.height ? video?.mediaDetails?.height : 550}
			/>
		</motion.video>
	);
};

export default VideoCard;
