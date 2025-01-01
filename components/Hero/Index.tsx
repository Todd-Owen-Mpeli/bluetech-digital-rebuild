// Imports
import React from "react";
import Link from "next/link";
import {FC, useRef, useMemo} from "react";
import {IHero} from "@/components/Hero/types/index";
import {motion, useScroll, useTransform} from "framer-motion";

// Styling
import styles from "@/components/Hero/styles/Hero.module.scss";

// Components
import HeroCard from "@/components/Hero/Fragments/HeroCard";
import VideoCard from "@/components/Hero/Fragments/VideoCard";
import TextRevealBlurEffect from "@/components/Hero/Fragments/TextRevealBlurEffect";

const MemoizedMotionDiv = React.memo(motion.div);

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
	const scale = useTransform(scrollY, [0, 500], [1, 0.9]);

	// Scroll Opacity Div
	const scrollOpacity = useTransform(scrollY, [0, 25], [1, 0]);

	// Content & Background Color
	const titleColor = useTransform(scrollY, [0, 100], ["#ece5d5", "#ffb000"]);
	const borderRadius = useTransform(scrollY, [0, 1000], ["25px", "2500px"]);
	const backgroundColor = useTransform(scrollY, [0, 100], ["#ffb000", "#000"]);
	const contentWrapperBackgroundColor = useTransform(
		scrollY,
		[0, 100],
		["#212020", "#ffb000"]
	);

	// Memoize the styles to prevent unnecessary recalculations
	const motionStyle = useMemo(() => {
		return {
			scale,
			borderRadius,
			transformPerspective: 1000,
			transition: "transform 0.2s ease-out",
			backgroundColor: contentWrapperBackgroundColor,
			backgroundImage: `url(${videoBackgroundImage?.sourceUrl})`,
		};
	}, [
		scale,
		borderRadius,
		videoBackgroundImage,
		contentWrapperBackgroundColor,
	]);

	return (
		<>
			<motion.div
				ref={container}
				className={styles.hero}
				style={{backgroundColor}}
			>
				<div className={styles.container}>
					<div className={styles.main}>
						<div className={styles.wrapper}>
							<MemoizedMotionDiv style={motionStyle} className={styles.content}>
								<VideoCard
									video={video}
									borderRadius={borderRadius}
									displayVideo={displayVideo}
								/>
								<HeroCard
									title={title}
									titleColor={titleColor}
									borderRadius={borderRadius}
									displayVideo={displayVideo}
								/>
							</MemoizedMotionDiv>
						</div>
						<motion.div
							className={styles.scrollDown}
							style={{opacity: scrollOpacity}}
						>
							<Link href="#starDescription" aria-label="Scroll Down">
								<div className={styles.wrapper} />
							</Link>
						</motion.div>
					</div>
				</div>
			</motion.div>
			<div className={styles.bottomContent}>
				<TextRevealBlurEffect
					content={paragraph}
					scrollOpacity={scrollOpacity}
					className={paragraph ? styles.paragraph : "hidden"}
				/>
			</div>
		</>
	);
};

export default Hero;
