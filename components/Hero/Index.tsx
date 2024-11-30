// Imports
import {FC, useRef} from "react";
import {IHero} from "@/types/components/index";
import {motion, useScroll, useTransform} from "framer-motion";

// Styling
import styles from "@/components/Hero/styles/Hero.module.scss";

// Components
import Paragraph from "@/components/Elements/Paragraph";
import MainContent from "@/components/Hero/Fragments/MainContent";
import VideoContainer from "@/components/Hero/Fragments/VideoContainer";
import BlurEffectTwo from "@/components/Animations/TextScrollEffect/BlurEffectTwo";
import BlurEffectOne from "@/components/Animations/TextScrollEffect/BlurEffectOne";
import ContentSliceRevealMaskAnimation from "@/components/Animations/ContentSliceRevealMaskAnimation";
import ParagraphTextMaskAnimation from "../Animations/ParagraphTextMaskAnimation";

const Hero: FC<IHero.IProps> = ({
	video,
	title,
	subtitle,
	paragraph,
	buttonLink,
	actionTitle,
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
	const titleColor = useTransform(scrollY, [0, 100], ["#ffb000", "#833df4"]);

	// Background Color
	const backgroundColor = useTransform(
		scrollY,
		[0, 100],
		["#521cb7", "rgba(0, 0, 0, 1)"]
	);

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
				<div className={styles.bottomContent}>
					<div className={styles.content}>
						<ParagraphTextMaskAnimation
							content={paragraph}
							className={paragraph ? styles.paragraph : "hidden"}
						/>
						<BlurEffectOne content={actionTitle} className={styles.subtitle} />
					</div>
				</div>
			</motion.div>
		</>
	);
};
export default Hero;
