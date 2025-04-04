// Imports
import React , { FC, useMemo, useRef } from "react";
import {IHero} from "@/components/Hero/types/index";
import { motion, useScroll, useTransform } from "framer-motion";
import fadeInUp, { initial, offsetFinish, offsetStart } from "@/animations/animations";

// Styling
import styles from "@/components/Hero/styles/Hero.module.scss";

// Components
import VideoCard from "../VideoCard";
import TextRevealBlurEffect from "@/components/Elements/TextRevealBlurEffect";

const MemoizedMotionDiv = React.memo(motion.div);

const HeroViewTwo: FC<IHero.IHeroViewTwo> = ({ heroViewTwo }) => {

    // Track the progress of the scroll and scale
	const container = useRef(null);
	const {scrollY} = useScroll();

    // Scroll Opacity Div
	const scrollOpacity = useTransform(scrollY, [0, 25], [1, 0]);

    // Memoize the styles to prevent unnecessary recalculations
	const motionStyle = useMemo(() => {
		return {
			transformPerspective: 1000,
			transition: "transform 0.2s ease-out",
			backgroundImage: `url(${heroViewTwo?.videoBackgroundImage?.sourceUrl})`,
		};
	}, [
		heroViewTwo?.videoBackgroundImage,
    ]);
    
    
    return (
        <div className={styles.heroViewTwo}>
            <div className={styles.container}>
                <motion.div className={styles.content}>
                    <TextRevealBlurEffect
                        scrollOpacity={scrollOpacity}
                        content={heroViewTwo?.paragraph}
                        className={heroViewTwo?.paragraph ? styles.paragraph : "hidden"}
                    />
                </motion.div>
                <MemoizedMotionDiv style={motionStyle} className={styles.videoWrapper}>
					<VideoCard
						video={heroViewTwo?.video}
						displayVideo={heroViewTwo?.displayVideo}
					/>
				</MemoizedMotionDiv>
            </div>
        </div>
    );
}

export default HeroViewTwo;