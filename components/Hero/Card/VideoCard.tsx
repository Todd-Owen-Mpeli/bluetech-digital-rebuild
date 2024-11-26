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
import {FC} from "react";
import Link from "next/link";
import {motion} from "framer-motion";
import {IHero} from "@/types/components";
import {useTiltEffect} from "@/hooks/useTiltEffect";

// Styling
import styles from "@/components/Hero/styles/Hero.module.scss";

// Components
import Title from "@/components/Elements/Title";
import Paragraph from "@/components/Elements/Paragraph";
import ClientsImages from "@/components/Hero/Card/ClientsImages";

const Button: FC<IHero.IButton> = ({buttonLink, className}) => {
	return (
		<>
			<motion.button
				initial={initial}
				whileInView={fadeInUp}
				viewport={{once: false}}
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

const VideoCard: FC<IHero.IVideoCard> = ({
	video,
	title,
	paragraph,
	buttonLink,
	displayVideo,
	buttonLinkTwo,
	trustedClients,
	videoBackgroundImage,
}) => {
	// Content wrapper tilt animation effect
	const {rotateX, rotateY, translateX, translateY} = useTiltEffect();

	return (
		<>
			<div className={styles.bottomContent}>
				<div className={styles.leftSection}>
					<Paragraph
						fadeIn={false}
						content={paragraph}
						offsetStart={offsetStart}
						offsetFinish={offsetFinish}
						className={paragraph ? styles.paragraph : "hidden"}
					/>
				</div>
				<motion.div
					viewport={{once: false}}
					initial={slideInRightInitial}
					whileInView={slideInRightFinish}
					className={styles.videoWrapper}
					style={{
						x: translateX,
						y: translateY,
						rotateX: `${rotateX}deg`,
						rotateY: `${rotateY}deg`,
						transformPerspective: 200,
						transition: "transform 0.2s ease-out",
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
						className={displayVideo ? styles.video : "hidden"}
					>
						<source
							className={styles.source}
							src={"/video/playgoals.com-Hero-Gameplay-Video.mp4"}
							// src={video?.mediaItemUrl}
							type={video?.mimeType || "video/mp4"}
							width={video?.mediaDetails?.width || 1000}
							height={video?.mediaDetails?.height || 1000}
						/>
					</motion.video>
				</motion.div>
			</div>
		</>
	);
};

export default VideoCard;
