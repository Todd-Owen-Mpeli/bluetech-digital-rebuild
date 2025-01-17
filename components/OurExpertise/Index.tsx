// Imports
import {FC, useRef} from "react";
import {useScroll} from "framer-motion";
import {IOurExpertise} from "@/components/OurExpertise/types/index";

// Styling
import styles from "@/components/OurExpertise/styles/OurExpertise.module.scss";

// Components
import SvgMask from "@/components/OurExpertise/Fragments/SvgMask";
import VideoCard from "@/components/OurExpertise/Fragments/VideoCard";
import MainContent from "@/components/OurExpertise/Fragments/MainContent";

const OurExpertise: FC<IOurExpertise.IProps> = ({
	video,
	title,
	paragraph,
	displayVideo,
	videoBackgroundImage,
}) => {
	const container = useRef(null);
	const {scrollYProgress} = useScroll({
		target: container,
		offset: ["start start", "end end"],
	});

	return (
		<>
			<div className={styles.ourExpertise}>
				<div className={styles.container}>
					<div ref={container} className={styles.contentWrapper}>
						<div className={styles.main}>
							<VideoCard
								video={video}
								displayVideo={displayVideo}
								videoBackgroundImage={videoBackgroundImage}
							/>
							<MainContent
								title={title}
								paragraph={paragraph}
								scrollYProgress={scrollYProgress}
							/>
						</div>
						<SvgMask scrollYProgress={scrollYProgress} />
					</div>
				</div>
			</div>
		</>
	);
};

export default OurExpertise;
