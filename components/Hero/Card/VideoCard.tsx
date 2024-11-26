// Imports
import {
	initial,
	fadeInUp,
	offsetFinish,
	offsetStart,
} from "@/animations/animations";
import {FC} from "react";
import Link from "next/link";
import {motion} from "framer-motion";
import {IHero} from "@/types/components";

// Styling
import styles from "@/components/Hero/styles/Hero.module.scss";

// Components
import Title from "@/components/Elements/Title";
import Paragraph from "@/components/Elements/Paragraph";

const VideoCard: FC<IHero.IVideoCard> = ({
	video,
	title,
	paragraph,
	buttonLink,
	displayVideo,
	buttonLinkTwo,
}) => {
	return (
		<>
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
					src={video?.mediaItemUrl}
					type={video?.mimeType || "video/mp4"}
					width={video?.mediaDetails?.width || 1000}
					height={video?.mediaDetails?.height || 1000}
				/>
			</motion.video>
			<motion.div
				style={{
					backdropFilter: displayVideo ? `blur(2px)` : `blur(0px)`,
				}}
				className={styles.heroCard}
			>
				<div className={styles.content}>
					<Title content={title} className={title ? styles.title : "hidden"} />
					<div>
						<Paragraph
							fadeIn={false}
							content={paragraph}
							offsetStart={offsetStart}
							offsetFinish={offsetFinish}
							className={paragraph ? styles.paragraph : "hidden"}
						/>

						<div className={styles.buttonStyling}>
							<motion.button
								initial={initial}
								whileInView={fadeInUp}
								viewport={{once: false}}
								className={buttonLink?.url ? "w-fit mx-auto lg:mx-0" : "hidden"}
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
								initial={initial}
								whileInView={fadeInUp}
								viewport={{once: false}}
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
				</div>
			</motion.div>
		</>
	);
};

export default VideoCard;
