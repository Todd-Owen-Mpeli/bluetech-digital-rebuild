// Imports
import {FC, useRef} from "react";
import {IHero} from "@/types/components/index";
import {motion, useScroll, useTransform} from "framer-motion";

// Styling
import styles from "@/components/Hero/styles/Hero.module.scss";

// Components
import MainContent from "@/components/Hero/Fragments/MainContent";
import VideoContainer from "@/components/Hero/Fragments/VideoContainer";

const Hero: FC<IHero.IProps> = ({
	video,
	title,
	subtitle,
	buttonLink,
	displayVideo,
	buttonLinkTwo,
	trustedClients,
	videoBackgroundImage,
}) => {
	// Track the progress of the scroll and scale
	const container = useRef(null);
	const {scrollY} = useScroll();

	// Scale content wrapper
	const scale = useTransform(scrollY, [0, 400], [1, 0.75]);

	// Background Color
	const titleColor = useTransform(scrollY, [0, 100], ["#833df4", "#ffb000"]);

	// Background Color
	const backgroundColor = useTransform(scrollY, [0, 100], ["#000", "#050506"]);

	return (
		<>
			<motion.div
				ref={container}
				className={styles.hero}
				style={{
					backgroundColor: backgroundColor,
				}}
			>
				<VideoContainer
					scale={scale}
					video={video}
					displayVideo={displayVideo}
					videoBackgroundImage={videoBackgroundImage}
				/>
				<MainContent
					title={title}
					subtitle={subtitle}
					titleColor={titleColor}
					buttonLink={buttonLink}
					buttonLinkTwo={buttonLinkTwo}
					trustedClients={trustedClients}
				/>
			</motion.div>
		</>
	);
};
export default Hero;
