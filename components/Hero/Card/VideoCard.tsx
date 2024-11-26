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
					<motion.div
						viewport={{once: false}}
						initial={slideInLeftInitial}
						whileInView={slideInRightFinish}
					>
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

						<div className={styles.buttonWrapper}>
							<Button
								buttonLink={buttonLink}
								className={styles.buttonStyling}
							/>
							<Button
								buttonLink={buttonLinkTwo}
								className={styles.buttonStyling}
							/>
						</div>
					</motion.div>
					<div className={styles.bottomContent}>
						<div className={styles.div} />
						<motion.div
							viewport={{once: false}}
							initial={slideInRightInitial}
							whileInView={slideInRightFinish}
							className={styles.trustedClients}
						>
							<div className={styles.leftSection}>
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
							<div className={styles.rightSection}>
								<div className={styles.stars}>
									<motion.h4
										initial={initialTwo}
										whileInView={fadeIn}
										viewport={{once: false}}
										className={styles.textTitle}
									>
										{trustedClients.title}
									</motion.h4>
								</div>
								<div className={styles.total}>
									<motion.h5
										initial={initialTwo}
										whileInView={fadeIn}
										viewport={{once: false}}
										className={styles.clientNumber}
									>
										{trustedClients.clientNumber}
									</motion.h5>
									<motion.h5
										initial={initialTwo}
										whileInView={fadeIn}
										viewport={{once: false}}
										className={styles.textarea}
									>
										{trustedClients.textarea}
									</motion.h5>
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</motion.div>
		</>
	);
};

export default VideoCard;
