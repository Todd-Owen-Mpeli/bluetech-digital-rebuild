// Imports
import { motion } from "framer-motion";
import React , { FC, useMemo } from "react";
import {IHero} from "@/components/Hero/types/index";
import fadeInUp, { initial } from "@/animations/animations";

// Styling
import styles from "@/components/Hero/styles/Hero.module.scss";

// Components
import VideoCard from "../VideoCard";

const MemoizedMotionDiv = React.memo(motion.div);

const HeroViewOne: FC<IHero.IProps[`heroViewOne`]> = ({ video, title, subtitle, displayVideo, videoBackgroundImage }) => {

    // Memoize the styles to prevent unnecessary recalculations
	const motionStyle = useMemo(() => {
		return {
			transformPerspective: 1000,
			transition: "transform 0.2s ease-out",
			backgroundImage: `url(${videoBackgroundImage?.sourceUrl})`,
		};
	}, [
		videoBackgroundImage,
    ]);
    
    return (
        <div className={`${styles.heroViewOne} panel`}>
            <MemoizedMotionDiv style={motionStyle} className={styles.content}>
				<VideoCard
					video={video}
					displayVideo={displayVideo}
				/>
                <motion.div
                    className={styles.heroCard}
                    style={{
                        backdropFilter: displayVideo ? `blur(0.5px)` : `blur(0px)`,
                    }}
                >
                    <div className={styles.content}>
                        <motion.h1
                            initial={initial}
                            whileInView={fadeInUp}
                            viewport={{once: true}}
                            className={title ? styles.title : "hidden"}
                        >
                            {title}
                        </motion.h1>
                        <motion.h2
                            initial={initial}
                            whileInView={fadeInUp}
                            viewport={{once: true}}
                            className={subtitle ? styles.subtitle : "hidden"}
                        >
                            {subtitle}
                        </motion.h2>
                    </div>
                </motion.div>
			</MemoizedMotionDiv>
        </div>
    );
}

export default HeroViewOne;