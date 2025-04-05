// Imports
import Link from "next/link";
import React , { FC, useMemo, useRef } from "react";
import {IHero} from "@/components/Hero/types/index";
import { motion, useScroll, useTransform } from "framer-motion";
import { offsetFinish, offsetStart } from "@/animations/animations";

// Styling
import styles from "@/components/Hero/styles/Hero.module.scss";

// Components
import VideoCard from "../VideoCard";
import Paragraph from "@/components/Elements/Paragraph/Paragraph";
import TextRevealBlurEffect from "@/components/Elements/TextRevealBlurEffect";
import SlideInXRightAnimation from "@/components/Animations/SlideInXRightAnimation";

const MemoizedMotionDiv = React.memo(motion.div);

const HeroViewTwo: FC<IHero.IProps[`heroViewTwo`]> = ({
    video,
    paragraph,
    buttonLink,
    displayVideo,
    paragraphTwo,
    videoBackgroundImage
}) => {

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
			backgroundImage: `url(${videoBackgroundImage?.sourceUrl})`,
		};
	}, [
		videoBackgroundImage,
    ]);
    
    
    return (
        <div  ref={container} className={`${styles.heroViewTwo} panel`}>
            <div className={styles.container}>
                <motion.div className={styles.content}>
                    <TextRevealBlurEffect
                        content={paragraph}
                        scrollOpacity={scrollOpacity}
                        className={paragraph ? styles.paragraph : "hidden"}
                    />
                    <div className={styles.rightSection}>
                        <div className="h-1/2"/>
                        <SlideInXRightAnimation className={styles.content}>
                            <Paragraph
                                fadeIn={false}
                                content={paragraphTwo}
                                offsetStart={offsetStart}
                                offsetFinish={offsetFinish}
                                className={
                                    paragraphTwo
                                        ? styles.paragraphTwo
                                        : "hidden"
                                }
                            />
                            <Link
                                className={styles.buttonStyling}
                                href={`${buttonLink?.url}`}
                                target={buttonLink?.target}
                                aria-label={`${buttonLink?.title}`}
                            >
                                {buttonLink?.title}
                            </Link>
                        </SlideInXRightAnimation>
                    </div>
                </motion.div>
                <MemoizedMotionDiv style={motionStyle} className={styles.videoWrapper}>
					<VideoCard
						video={video}
						displayVideo={displayVideo}
					/>
				</MemoizedMotionDiv>
            </div>
        </div>
    );
}

export default HeroViewTwo;