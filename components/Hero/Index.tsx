// Imports
import {
	fadeIn,
	initial,
	fadeInUp,
	initialTwo,
	offsetStart,
	offsetFinish,
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
import Paragraph from "@/components/Elements/Paragraph";
import VideoCard from "@/components/Hero/Card/VideoCard";
import ClientsImages from "@/components/Hero/Card/ClientsImages";
import TextBlurScrollEffect from "@/components/Animations/TextBlurScrollEffect";

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
						src={"/video/playgoals.com-Hero-Gameplay-Video.mp4"}
						type={video?.mimeType || "video/mp4"}
						width={video?.mediaDetails?.width || 1000}
						height={video?.mediaDetails?.height || 1000}
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

	// Content Wrapper & Background Color
	const backgroundColor = useTransform(
		scrollY,
		[0, 100],
		["#ffffff", "#fafafa"]
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
				<TopVideoContainer
					scale={scale}
					video={video}
					displayVideo={displayVideo}
					videoBackgroundImage={videoBackgroundImage}
				/>
				<div className={styles.container}>
					<motion.div
						viewport={{once: false}}
						initial={slideInLeftInitial}
						className={styles.topContent}
						whileInView={slideInRightFinish}
					>
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
							className={title ? styles.title : "hidden"}
						/>
						<Paragraph
							fadeIn={false}
							content={paragraph}
							offsetStart={offsetStart}
							offsetFinish={offsetFinish}
							className={paragraph ? styles.paragraph : "hidden"}
						/>

						<TextBlurScrollEffect
							content={paragraph}
							className={styles.paragraphTwo}
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
					</motion.div>

					{/* <VideoCard
						title={title}
						video={video}
						paragraph={paragraph}
						buttonLink={buttonLink}
						displayVideo={displayVideo}
						buttonLinkTwo={buttonLinkTwo}
						trustedClients={trustedClients}
						videoBackgroundImage={videoBackgroundImage}
					/> */}
				</div>
			</motion.div>
			<motion.div className="h-[50vh] bg-white" />
		</>
	);
};
export default Hero;
