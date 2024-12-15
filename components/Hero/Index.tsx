// Imports
import {FC, useRef} from "react";
import Link from "next/link";
import {IHero} from "@/components/Hero/types/index";
import {fadeIn, initialTwo} from "@/animations/animations";
import {motion, useScroll, useTransform} from "framer-motion";

// Styling
import styles from "@/components/Hero/styles/Hero.module.scss";

// Components
import Title from "@/components/Elements/Title";
import {useTiltEffect} from "@/hooks/useTiltEffect";
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
	const scale = useTransform(scrollY, [0, 400], [1, 0.9]);

	// Content Wrapper & Background Color
	const backgroundColor = useTransform(scrollY, [0, 100], ["#ece5d5", "#000"]);
	const contentWrapperBackgroundColor = useTransform(
		scrollY,
		[0, 100],
		["#1a1a1a", "#292929"]
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
					<div className={styles.content}>
						<div className={styles.videoContainer}>
							<VideoCard
								scale={scale}
								video={video}
								rotateY={rotateY}
								rotateX={rotateX}
								translateX={translateX}
								translateY={translateY}
								contentWrapperBackgroundColor={contentWrapperBackgroundColor}
								displayVideo={displayVideo}
								videoBackgroundImage={videoBackgroundImage}
							/>
						</div>
						<Link
							target="_self"
							href="#starDescription"
							aria-label={`Scroll Down`}
						>
							<div className={styles.scrollDown} />
						</Link>
					</div>
					<div className={styles.divFade} />
				</div>
			</motion.div>
		</>
	);
};
export default Hero;
