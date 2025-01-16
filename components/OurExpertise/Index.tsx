// Imports
import {FC} from "react";
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
	return (
		<div className={styles.ourExpertise}>
			<div className={styles.container}>
				<TopSection
					video={video}
					title={title}
					paragraph={paragraph}
					displayVideo={displayVideo}
					videoBackgroundImage={videoBackgroundImage}
				/>
				<HorizontalParallax />
				<div className="h-screen bg-accent-default"></div>
			</div>
		</div>
	);
};

export default OurExpertise;
