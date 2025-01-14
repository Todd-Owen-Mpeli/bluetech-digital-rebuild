// Imports
import {FC} from "react";
import {motion, useTransform} from "framer-motion";
import {IOurExpertise} from "@/components/OurExpertise/types/index";

// Styling
import styles from "@/components/OurExpertise/styles/OurExpertise.module.scss";

// Components
import VideoCard from "@/components/OurExpertise/Fragments/TopSection/VideoCard";
import TextRevealBlurEffect from "@/components/OurExpertise/Fragments/TextRevealBlurEffect";

const MainContent: FC<IOurExpertise.IMainContent> = ({
	title,
	paragraph,
	scrollOpacity,
}) => {
	return (
		<div className={styles.content}>
			<motion.h2 className={styles.title}>{title}</motion.h2>
			<TextRevealBlurEffect
				content={paragraph}
				scrollOpacity={scrollOpacity}
				className={paragraph ? styles.paragraph : "hidden"}
			/>
		</div>
	);
};

const TopSection: FC<IOurExpertise.ITopSection> = ({
	video,
	title,
	scrollY,
	paragraph,
	displayVideo,
	videoBackgroundImage,
}) => {
	// Scroll Opacity Div
	const scrollOpacity = useTransform(scrollY, [0, 500], [1, 0]);

	return (
		<div className={styles.topSection}>
			<VideoCard
				video={video}
				displayVideo={displayVideo}
				videoBackgroundImage={videoBackgroundImage}
			/>
			<MainContent
				title={title}
				paragraph={paragraph}
				scrollOpacity={scrollOpacity}
			/>
		</div>
	);
};

export default TopSection;
