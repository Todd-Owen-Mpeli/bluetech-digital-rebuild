// Imports
import {
    offsetStart,
    offsetFinish,
    slideInLeftInitial,
    slideInRightFinish,
    slideInRightInitial
} from "@/animations/animations";
import React, { FC, useMemo, useRef } from "react";
import {IHero} from "@/components/Hero/types/index";
import { motion, useScroll, useTransform } from "framer-motion";


// Styling
import styles from "@/components/Hero/styles/Hero.module.scss";

// Components
import Button from "@/components/Elements/Button/Button";
import VideoCard from "@/components/Hero/fragments/VideoCard";
import Paragraph from "@/components/Elements/Paragraph/Paragraph";
import TextRevealBlurEffect from "@/components/Elements/TextRevealBlurEffect";
import SlideUpDivMaskReveal from "@/components/Animations/SlideUpDivMaskReveal/SlideUpDivMaskReveal";

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
	}, [videoBackgroundImage,]);
    
    
    return (
        <div  ref={container} className={`${styles.heroViewTwo} panel`}>
            <div className={styles.container}>
                <motion.div className={styles.content}>
                    <motion.div
                        viewport={{once: false}}
                        initial={slideInLeftInitial}
                        className={styles.leftSection}
                        whileInView={slideInRightFinish}
                    >
                        <TextRevealBlurEffect
                            content={paragraph}
                            scrollOpacity={scrollOpacity}
                            className={paragraph ? styles.paragraph + " block lg:hidden" : "hidden"}
                        />
                        <Paragraph
                            content={paragraph}
                            className={paragraph ? styles.paragraph + " hidden lg:block" : "hidden"}
                        />
                    </motion.div>
                    <div className={styles.rightSection}>
                        <div className="h-1/2"/>
                        <motion.div
                            viewport={{once: false}}
                            className={styles.wrapper}
                            initial={slideInRightInitial}
                            whileInView={slideInRightFinish}
                        >
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
                            <Button styleNumber={0} link={buttonLink} />
                        </motion.div>
                    </div>
                </motion.div>
                <SlideUpDivMaskReveal backgroundColor={"bg-white"}>
                <MemoizedMotionDiv style={motionStyle} className={styles.videoWrapper}>
                    <VideoCard video={video} displayVideo={displayVideo}/>
                    </MemoizedMotionDiv>
                </SlideUpDivMaskReveal>
            </div>
        </div>
    );
}

export default HeroViewTwo;