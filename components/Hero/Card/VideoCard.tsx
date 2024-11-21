// Imports
import {FC} from "react";
import Link from "next/link";
import {motion} from "framer-motion";
import {IHero} from "@/types/components";
import {useTiltEffect} from "@/hooks/useTiltEffect";
import {initial, fadeInUp} from "@/animations/animations";

// Styling
import styles from "@/components/Hero/styles/Hero.module.scss";

// Components
import Paragraph from "@/components/Elements/Paragraph";

const VideoCard: FC<IHero.IVideoCard> = ({
	video,
	buttonLink,
	displayVideo,
	buttonLinkTwo,
	videoBackgroundImage,
}) => {
	// Content wrapper tilt animation effect
	const {rotateX, rotateY, translateX, translateY} = useTiltEffect();

	return (
		<div className={styles.videoCard}>
			<div className={styles.container}>
				<div className={styles.wrapper}>
					<motion.div
						style={{
							x: translateX,
							y: translateY,
							rotateX: `${rotateX}deg`,
							rotateY: `${rotateY}deg`,
							transformPerspective: 1000, // Adds perspective for the tilt effect
							transition: "transform 0.2s ease-out", // Smoother transition
							backgroundImage: `url("${videoBackgroundImage?.sourceUrl}")`,
						}}
						className={styles.contentWrapper}
					>
						<motion.video
							muted
							autoPlay
							loop={true}
							controls={false}
							playsInline
							controlsList="nofullscreen"
							aria-label={`Video Element: ${video?.title}`}
							className={displayVideo ? styles.video : "hidden"}
						>
							<source
								src={video?.link}
								type="video/mp4"
								width={
									video?.mediaDetails?.width ? video?.mediaDetails?.width : 550
								}
								height={
									video?.mediaDetails?.height
										? video?.mediaDetails?.height
										: 550
								}
							/>
						</motion.video>
						{/* <motion.div
							style={{
								backdropFilter: displayVideo ? `blur(2px)` : `blur(0px)`,
							}}
							className={styles.card}
						>
							<div className={styles.content}>
								<div className={styles.buttonStyling}>
									<motion.button
										viewport={{once: false}}
										initial={initial}
										whileInView={fadeInUp}
										className={
											buttonLink?.url ? "w-fit mx-auto lg:mx-0" : "hidden"
										}
									>
										<Link
											className={styles.button}
											href={`${buttonLink?.url}`}
											target={buttonLink?.target}
											aria-label={`${buttonLink?.title}`}
										>
											{buttonLink?.title}
										</Link>
									</motion.button>
									<motion.button
										viewport={{once: false}}
										initial={initial}
										whileInView={fadeInUp}
										className={
											buttonLinkTwo?.url ? "w-fit mx-auto lg:mx-0" : "hidden"
										}
									>
										<Link
											className={styles.button}
											href={`${buttonLinkTwo?.url}`}
											target={buttonLinkTwo?.target}
											aria-label={`${buttonLinkTwo?.title}`}
										>
											{buttonLinkTwo?.title}
										</Link>
									</motion.button>
								</div>
							</div>
						</motion.div> */}
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default VideoCard;
