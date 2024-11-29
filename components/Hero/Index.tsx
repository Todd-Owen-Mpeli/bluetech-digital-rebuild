// Imports
import {
	fadeIn,
	initialTwo,
	slideInLeftInitial,
	slideInRightFinish,
	slideInRightInitial,
} from "@/animations/animations";
import Link from "next/link";
import {FC, useRef} from "react";
import {IHero} from "@/types/components/index";
import {motion, useScroll, useTransform} from "framer-motion";

// Styling
import styles from "@/components/Hero/styles/Hero.module.scss";

// Components
import Title from "@/components/Elements/Title";
import ClientsImages from "@/components/Hero/Card/ClientsImages";
import BlurEffectTwo from "@/components/Animations/TextScrollEffect/BlurEffectTwo";
import BlurEffectOne from "@/components/Animations/TextScrollEffect/BlurEffectOne";

const Button: FC<IHero.IButton> = ({
	buttonLink,
	className,
	slideInLeftAnimation,
	slideInRightAnimation,
}) => {
	return (
		<>
			<motion.button
				viewport={{once: false}}
				initial={
					slideInLeftAnimation
						? slideInLeftInitial
						: slideInRightAnimation
						? slideInRightInitial
						: ""
				}
				whileInView={slideInRightFinish}
				className={buttonLink?.url ? className : "hidden"}
			>
				<Link
					className={styles.link}
					href={`${buttonLink?.url}`}
					target={buttonLink?.target}
					aria-label={`${buttonLink?.title}`}
				>
					{buttonLink?.title}
				</Link>
			</motion.button>
		</>
	);
};

const TopVideoContainer: FC<IHero.ITopVideoContainer> = ({
	scale,
	video,
	displayVideo,
	videoBackgroundImage,
}) => {
	return (
		<>
			<motion.div
				className={styles.videoContainer}
				style={{
					scale,
					backgroundImage: `url("${videoBackgroundImage?.sourceUrl}")`,
				}}
			>
				<motion.video
					muted
					controls
					autoPlay
					loop={true}
					playsInline
					controlsList="nofullscreen"
					aria-label={`Video Element: ${video?.title}`}
					className={displayVideo ? styles.backgroundVideo : "hidden"}
				>
					<source
						className={styles.source}
						type={video?.mimeType || "video/mp4"}
						width={video?.mediaDetails?.width || 1000}
						height={video?.mediaDetails?.height || 1000}
						src={"/video/AC3-studio.com-showreel-video.mp4"}
					/>
				</motion.video>
			</motion.div>
		</>
	);
};

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
	const titleColor = useTransform(scrollY, [0, 100], ["#833df4", "#ffb000"]);

	// Background Color
	const backgroundColor = useTransform(scrollY, [0, 100], ["#000", "#521cb7"]);

	return (
		<>
			<motion.div
				ref={container}
				className={styles.hero}
				style={{
					backgroundColor: backgroundColor,
				}}
			>
				<TopVideoContainer
					scale={scale}
					video={video}
					displayVideo={displayVideo}
					videoBackgroundImage={videoBackgroundImage}
				/>
				<div className={styles.container}>
					<div className={styles.content}>
						<motion.h4
							initial={initialTwo}
							whileInView={fadeIn}
							viewport={{once: false}}
							className={styles.subtitle}
						>
							{subtitle}
						</motion.h4>
						<Title
							content={title}
							styleTextColor={titleColor}
							className={title ? styles.title : "hidden"}
						/>
						<div
							className={styles.trustedClients}
							style={{
								backgroundImage: `url("/svg/button-arrow-bg.svg")`,
							}}
						>
							<motion.h4
								initial={initialTwo}
								whileInView={fadeIn}
								viewport={{once: false}}
								className={styles.textTitle}
							>
								{trustedClients.title}
							</motion.h4>
							<ClientsImages clientsImages={trustedClients?.clientsImages} />
						</div>
						<div className={styles.buttonWrapper}>
							<Button
								buttonLink={buttonLink}
								slideInLeftAnimation={true}
								className={styles.buttonStyling}
							/>
							<Button
								buttonLink={buttonLinkTwo}
								slideInRightAnimation={true}
								className={styles.buttonStyling}
							/>
						</div>
					</div>
				</div>
				<div className={styles.bottomContent}>
					<div className={styles.content}>
						<BlurEffectTwo content={paragraph} className={styles.paragraph} />
						<BlurEffectOne content={actionTitle} className={styles.subtitle} />
					</div>
				</div>
			</motion.div>
		</>
	);
};
export default Hero;
