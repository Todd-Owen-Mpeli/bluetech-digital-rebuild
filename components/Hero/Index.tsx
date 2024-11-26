// Imports
import {FC, useRef} from "react";
import {IHero} from "@/types/components/index";
import {useTiltEffect} from "@/hooks/useTiltEffect";
import {motion, useScroll, useTransform} from "framer-motion";

// Styling
import styles from "@/components/Hero/styles/Hero.module.scss";

// Components
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
	// Track the progress of the scroll and scale
	const container = useRef(null);
	const {scrollY} = useScroll();

	// Scale content wrapper
	const scale = useTransform(scrollY, [0, 400], [1, 0.85]);

	console.log(scale);

	// Content Wrapper & Background Color
	const backgroundColor = useTransform(
		scrollY,
		[0, 100],
		["rgba(17, 17, 17, 1)", "#000"]
	);

	// Content wrapper tilt animation effect
	const {rotateX, rotateY, translateX, translateY} = useTiltEffect();

	return (
		<>
			<motion.div
				ref={container}
				className={styles.hero}
				style={{backgroundColor: backgroundColor}}
			>
				<div className={styles.container}>
					<div className={styles.contentWrapper}>
						<motion.div
							style={{
								scale,
								x: translateX,
								y: translateY,
								rotateX: `${rotateX}deg`,
								rotateY: `${rotateY}deg`,
								transformPerspective: 1000,
								transition: "transform 0.2s ease-out",
								backgroundImage: `url("${videoBackgroundImage?.sourceUrl}")`,
							}}
							className={styles.content}
						>
							<VideoCard
								title={title}
								video={video}
								paragraph={paragraph}
								buttonLink={buttonLink}
								displayVideo={displayVideo}
								buttonLinkTwo={buttonLinkTwo}
							/>
						</motion.div>
					</div>
				</div>
			</motion.div>
			<motion.div
				className="h-[50vh] bg-white"
				style={{backgroundColor: backgroundColor}}
			></motion.div>
		</>
	);
};
export default Hero;
