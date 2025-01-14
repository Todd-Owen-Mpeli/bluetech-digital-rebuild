// Imports
import {FC, useRef} from "react";
import {motion, useScroll} from "framer-motion";
import {IOurExpertise} from "@/components/OurExpertise/types/index";

// Styling
import styles from "@/components/OurExpertise/styles/OurExpertise.module.scss";

// Components
import TopSection from "@/components/OurExpertise/Fragments/TopSection/Index";
import HorizontalParallax from "@/components/OurExpertise/Fragments/HorizontalParallax/Index";

const OurExpertise: FC<IOurExpertise.IProps> = ({
	video,
	title,
	paragraph,
	displayVideo,
	videoBackgroundImage,
}) => {
	// Track the progress of the scroll and scale
	const container = useRef(null);
	const {scrollY} = useScroll();

	return (
		<motion.div ref={container} className={styles.ourExpertise}>
			<div className={styles.container}>
				<TopSection
					video={video}
					title={title}
					scrollY={scrollY}
					paragraph={paragraph}
					displayVideo={displayVideo}
					videoBackgroundImage={videoBackgroundImage}
				/>
				<HorizontalParallax />
				<div className="h-screen bg-accent-default"></div>
			</div>
		</motion.div>
	);
};

export default OurExpertise;
