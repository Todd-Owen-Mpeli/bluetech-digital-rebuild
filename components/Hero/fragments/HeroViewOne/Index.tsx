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

const HeroViewOne: FC<IHero.IHeroViewOne> = ({ heroViewOne }) => {

    // Memoize the styles to prevent unnecessary recalculations
	const motionStyle = useMemo(() => {
		return {
			transformPerspective: 1000,
			transition: "transform 0.2s ease-out",
			backgroundImage: `url(${heroViewOne?.videoBackgroundImage?.sourceUrl})`,
		};
	}, [
		heroViewOne?.videoBackgroundImage,
    ]);
    
    return (
        <div className={styles.heroViewOne}>
            <div className={styles.container}>
                <MemoizedMotionDiv style={motionStyle} className={styles.content}>
					<VideoCard
						video={heroViewOne?.video}
						displayVideo={heroViewOne?.displayVideo}
					/>
                    <motion.div
                        className={styles.heroCard}
                        style={{
                            backdropFilter: heroViewOne?.displayVideo ? `blur(0.5px)` : `blur(0px)`,
                        }}
                    >
                        <div className={styles.content}>
                            <motion.h1
                                initial={initial}
                                whileInView={fadeInUp}
                                viewport={{once: true}}
                                className={heroViewOne?.title ? styles.title : "hidden"}
                            >
                                {heroViewOne?.title}
                            </motion.h1>
                            <motion.h2
                                initial={initial}
                                whileInView={fadeInUp}
                                viewport={{once: true}}
                                className={heroViewOne?.subtitle ? styles.subtitle : "hidden"}
                            >
                                {heroViewOne?.subtitle}
                            </motion.h2>
                        </div>
                    </motion.div>
				</MemoizedMotionDiv>
            </div>
        </div>
    );
}

export default HeroViewOne;