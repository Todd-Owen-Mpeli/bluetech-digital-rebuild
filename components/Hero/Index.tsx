// Imports
import {FC} from "react";
import {motion} from "framer-motion";
import {IHero} from "@/types/components/index";
import {offsetStart, offsetFinish} from "@/animations/animations";

// Styling
import styles from "@/components/Hero/styles/Hero.module.scss";

// Components
import Title from "@/components/Elements/Title";
import Paragraph from "@/components/Elements/Paragraph";
import VideoCard from "@/components/Hero/Card/VideoCard";

const Hero: FC<IHero.IProps> = ({
	video,
	title,
	paragraph,
	buttonLink,
	displayVideo,
	buttonLinkTwo,
	videoBackgroundImage,
}) => {
	return (
		<>
			<motion.div className={styles.hero}>
				<div className={styles.container}>
					<div className={styles.content}>
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
					</div>
					<div className={styles.bottomContent}>
						<div className="hidden lg:block w-full lg:w-2/5"></div>
						<VideoCard
							video={video}
							buttonLink={buttonLink}
							displayVideo={displayVideo}
							buttonLinkTwo={buttonLinkTwo}
							videoBackgroundImage={videoBackgroundImage}
						/>
					</div>
				</div>
			</motion.div>
		</>
	);
};
export default Hero;
