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
import Image from "next/image";
import {FC, useRef} from "react";
import {IHero} from "@/types/components";
import {useTiltEffect} from "@/hooks/useTiltEffect";
import {motion, useScroll, useTransform} from "framer-motion";

// Styling
import styles from "@/components/Hero/styles/Hero.module.scss";

// Components
import Title from "@/components/Elements/Title";
import Paragraph from "@/components/Elements/Paragraph";
import ClientsImages from "@/components/Hero/Card/ClientsImages";
import TextBlurScrollEffect from "@/components/Animations/TextBlurScrollEffect";

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
	return (
		<>
			<div className={styles.zoomParallax}>
				<div className={styles.content}>
					<div className={styles.topSection}>
						<Paragraph
							fadeIn={true}
							content={paragraph}
							offsetStart={offsetStart}
							offsetFinish={offsetFinish}
							className={paragraph ? styles.paragraph : "hidden"}
						/>
						<TextBlurScrollEffect
							content={`For <span>Creators</span> by <span>Creators</span>`}
							className={styles.subtitle}
						/>
					</div>
					<div className=""></div>
				</div>
			</div>
		</>
	);
};

export default VideoCard;
