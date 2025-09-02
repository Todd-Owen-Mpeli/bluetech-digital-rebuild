// Imports
import {FC} from "react";
import { IHero } from "@/components/CMS/Hero/types/index";

// Styling
import styles from "@/components/CMS/Hero/styles/Hero.module.scss";

const VideoCard: FC<IHero.IHeroViewTwo.IVideoCard> = ({video, displayVideo}) => {
	return (
		<video
			muted={true}
			autoPlay
			loop={true}
			controls={false}
			playsInline
			controlsList="nofullscreen"
			aria-label={`Video: ${video?.title}`}
			className={displayVideo ? styles.video : "hidden"}
		>
			<source
				src={`${video?.mediaItemUrl}`}
				type={video?.mimeType || "video/mp4"}
				width={video?.mediaDetails?.width ? video?.mediaDetails?.width : 550}
				height={
					video?.mediaDetails?.height ? video?.mediaDetails?.height : 550
				}
			/>
		</video>
	);
};

export default VideoCard;