// Imports
import Link from "next/link";
import {FC, useRef} from "react";
import {IHero} from "@/components/Hero/types/index";
import {motion, useScroll, useTransform} from "framer-motion";

// Styling
import styles from "@/components/Hero/styles/Hero.module.scss";

// Components
import {useTiltEffect} from "@/hooks/useTiltEffect";
import HeroCard from "@/components/Hero/Cards/HeroCard";
import VideoCard from "@/components/Hero/Cards/VideoCard";

const Hero: FC<IHero.IProps> = ({
	video,
	title,
	paragraph,
	displayVideo,
	videoBackgroundImage,
}) => {
	// Track the progress of the scroll and scale
	const container = useRef(null);
	const {scrollY} = useScroll();

	// Scale content wrapper
	const scale = useTransform(scrollY, [0, 50], [1, 0.9]);

	// Scroll Opacity Div
	const scrollOpacity = useTransform(scrollY, [0, 25], [1, 0]);

	// Content Wrapper & Background Color
	const titleColor = useTransform(scrollY, [0, 100], ["#ece5d5", "#ffb000"]);
	const paragraphColor = useTransform(
		scrollY,
		[0, 100],
		["#ece5d5", "#ece5d5"]
	);
	const backgroundColor = useTransform(scrollY, [0, 100], ["#ece5d5", "#000"]);
	const contentWrapperBackgroundColor = useTransform(
		scrollY,
		[0, 100],
		["#ffb000", "#ffb000"]
	);

	// Content wrapper tilt animation effect
	const {rotateX, rotateY, translateX, translateY} = useTiltEffect();

	return (
		<>
			<motion.div
				ref={container}
				className={styles.hero}
				style={{
					backgroundColor: backgroundColor,
				}}
			>
				<div className={styles.container}>
					<div className={styles.main}>
						<div className={styles.wrapper}>
							<motion.div
								className={styles.content}
								style={{
									scale,
									x: translateX,
									y: translateY,
									rotateX: `${rotateX}deg`,
									rotateY: `${rotateY}deg`,
									transformPerspective: 1000, // Adds perspective for the tilt effect
									transition: "transform 0.2s ease-out", // Smoother transition
									backgroundColor: contentWrapperBackgroundColor,
									backgroundImage: `url("${videoBackgroundImage?.sourceUrl}")`,
								}}
							>
								<VideoCard video={video} displayVideo={displayVideo} />
								<HeroCard
									title={title}
									paragraph={paragraph}
									titleColor={titleColor}
									displayVideo={displayVideo}
									paragraphColor={paragraphColor}
								/>
							</motion.div>
						</div>
						<motion.div
							className={styles.scrollDown}
							style={{
								opacity: scrollOpacity,
							}}
						>
							<Link
								target="_self"
								href="#starDescription"
								aria-label={`Scroll Down`}
							>
								<div className={styles.wrapper} />
							</Link>
						</motion.div>
					</div>
				</div>
			</motion.div>
			<div className={styles.afterContent} />
		</>
	);
};
export default Hero;
