'use client';

// Imports
import {
    initial,
    offsetStart,
    offsetFinish,
    slideInLeftInitial,
    slideInRightFinish,
    arrayLoopStaggerChildren,
} from "@/animations/animations";
import Link from "next/link";
import Image from "next/image";
import { FC, Fragment, useRef } from "react";
import { useTransform, motion, useScroll } from 'framer-motion';
import {IOurServices} from "@/components/OurServices/types/index";

// Styling
import styles from "@/components/OurServices/styles/OurServices.module.scss";

// Components
import Title from "@/components/Elements/Title";
import Paragraph from "@/components/Elements/Paragraph/Paragraph";
import SlideInXLeftAnimation from "@/components/Animations/SlideInXLeftAnimation";
import ContentSliceRevealMaskAnimation from "@/components/Animations/ContentSliceRevealMaskAnimation";

const Card: FC<IOurServices.ICard> = ({
    title,
    index,
    image,
    range,
    options,
    progress,
    paragraph,
    buttonLink,
    targetScale,
    backgroundColour,
    servicesBackgroundImage
}) => {

    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'start start']
    })

    const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1])
    const scale = useTransform(progress, range, [1, targetScale]);

	let svgColor: any;
	let titleColor: any;
    let buttonColor: any;
    let buttonSVGColor: any;
	let paragraphColor: any;
	let optionsTextColor: any;

    switch (backgroundColour) {
		case "#ffffff":
			svgColor = "fill-primary-default group-hover:fill-accent-default";
			titleColor = "text-primary-default group-hover:text-accent-default";
			buttonColor = "text-white bg-pureBlack hover:text-pureBlack hover:bg-accent-default";
			buttonSVGColor = "fill-accent-default group-hover/button:fill-pureBlack";
            paragraphColor = "text-pureBlack";
            optionsTextColor = "text-pureBlack border-pureBlack hover:text-pureBlack hover:border-accent-default hover:bg-accent-default";
            break;
        case "#bff007":
			svgColor = "fill-pureBlack group-hover:fill-primary-default";
			titleColor = "text-pureBlack group-hover:text-primary-default";
            buttonColor = "text-white bg-pureBlack hover:text-pureBlack hover:text-white hover:bg-primary-default";
            buttonSVGColor = "fill-accent-default group-hover/button:fill-accent-default";
            paragraphColor = "text-pureBlack";
            optionsTextColor = "text-pureBlack border-pureBlack hover:text-white hover:border-primary-default hover:bg-primary-default";
            break;
        case "#012b27":
			svgColor = "fill-white group-hover:fill-accent-default";
			titleColor = "text-white group-hover:text-accent-default";
            buttonColor = "text-white bg-pureBlack hover:text-pureBlack hover:bg-accent-default";
            buttonSVGColor = "fill-accent-default group-hover/button:fill-pureBlack";
            paragraphColor = "text-white";
            optionsTextColor = "text-white border-white hover:text-pureBlack hover:border-accent-default hover:bg-accent-default";
            break;
        case "#ff0044":
			svgColor = "fill-white group-hover:fill-accent-default";
			titleColor = "text-white group-hover:text-accent-default";
            buttonColor = "text-white bg-pureBlack hover:text-pureBlack hover:bg-accent-default";
            buttonSVGColor = "fill-accent-default group-hover/button:fill-pureBlack";
			paragraphColor = "text-white";
			optionsTextColor = "text-white border-white hover:text-pureBlack hover:border-accent-default hover:bg-accent-default";
			break;
		default:
			svgColor = "fill-pureBlack group-hover:fill-primary-default";
			titleColor = "text-pureBlack group-hover:text-primary-default";
			buttonColor = "text-white bg-pureBlack hover:text-pureBlack hover:bg-accent-default";
			paragraphColor = "text-pureBlack";
			break;
	}
    
    return (
        <div ref={container} className={styles.cardContainer + " group"}>
            <motion.div 
                className={styles.card}
                style={{
                    scale,
                    backgroundColor: backgroundColour,
                    top: `calc(-5vh + ${index * 25}px)`,
                    backgroundImage: `${backgroundColour === "#ffffff" ? `linear-gradient(0deg,rgba(255, 255, 255, 0.9),rgba(255, 255, 255, 0.9),rgba(255, 255, 255, 0.9)),url("${servicesBackgroundImage?.sourceUrl}")` : "none"}`,
                }}
            >
                <div className={styles.topSection}>
                    <ContentSliceRevealMaskAnimation>
                        <Title
                            content={title}
                            className={title ? styles.title + ` ${titleColor}` : "hidden"}
                        />
                    </ContentSliceRevealMaskAnimation>
                    <div className={styles.svgWrapper}>
                        <svg width="81" height="82" viewBox="0 0 81 82" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.svg + " group-hover:rotate-[45deg]"}>
                            <path
                                className={svgColor} d="M52.9696 64.5854C51.6459 63.2617 49.6094 63.2617 48.2857 64.5854L42.7872 70.0839C41.4635 71.4076 39.4271 71.4076 38.1034 70.0839L32.4013 64.3818C31.0776 63.0581 31.0775 61.0216 32.4013 59.6979L80.971 11.1282L70.585 0.742188L22.0153 49.3119C20.6916 50.6356 18.6551 50.6356 17.3314 49.3119L11.6293 43.6098C10.3056 42.2861 10.3056 40.2497 11.6293 38.926L17.1277 33.4275C18.4515 32.1038 18.4515 30.0673 17.1277 28.7436L11.4256 23.0415C10.1019 21.7178 10.1019 19.6813 11.4256 18.3576L16.9241 12.8592C18.2478 11.5355 18.2478 9.499 16.9241 8.17529L11.222 2.47318C9.89828 1.14948 7.86182 1.14948 6.53812 2.47319L1.03965 7.97165C-0.284051 9.29535 -0.284051 11.3318 1.03965 12.6555L6.74177 18.3576C8.06547 19.6813 8.06546 21.7178 6.74176 23.0415L1.2433 28.54C-0.0804043 29.8637 -0.0804005 31.9001 1.2433 33.2238L6.94541 38.9259C8.26912 40.2497 8.26911 42.2861 6.94541 43.6098L1.44694 49.1083C0.123239 50.432 0.123243 52.4685 1.44694 53.7922L7.14905 59.4943C8.47276 60.818 8.47276 62.8545 7.14906 64.1782L1.6506 69.6766C0.326892 71.0003 0.32689 73.0368 1.6506 74.3605L7.3527 80.0626C8.67641 81.3863 10.7129 81.3863 12.0366 80.0626L17.535 74.5641C18.8587 73.2404 20.8952 73.2404 22.2189 74.5641L27.921 80.2662C29.2447 81.5899 31.2812 81.59 32.6049 80.2663L38.1034 74.7678C39.4271 73.4441 41.4635 73.4441 42.7872 74.7678L48.4893 80.4699C49.8131 81.7936 51.8495 81.7936 53.1732 80.4699L58.6717 74.9714C59.9954 73.6477 62.0319 73.6477 63.3556 74.9714L69.0577 80.6735C70.3814 81.9972 72.4178 81.9972 73.7415 80.6735L79.24 75.1751C80.5637 73.8514 80.5637 71.8149 79.24 70.4912L73.5379 64.7891C72.2142 63.4654 70.1777 63.4654 68.854 64.7891L63.3556 70.2876C62.0319 71.6113 59.9954 71.6113 58.6717 70.2876L52.9696 64.5854ZM22.2189 69.8803C20.8952 71.204 18.8587 71.204 17.535 69.8803L11.8329 64.1782C10.5092 62.8544 10.5092 60.818 11.8329 59.4943L17.3314 53.9958C18.6551 52.6721 20.6916 52.6721 22.0153 53.9958L27.7174 59.6979C29.0411 61.0216 29.0411 63.0581 27.7174 64.3818L22.2189 69.8803Z" fill="currentColor"
                            />
                        </svg>
                    </div>
                </div>
                <div className={styles.bottomSection}>
                    <div className={styles.description}>
                        <SlideInXLeftAnimation className="w-full h-full">
                            <Paragraph
                                fadeIn={false}
                                content={paragraph}
                                offsetStart={offsetStart}
                                offsetFinish={offsetFinish}
                                className={paragraph ? styles.paragraph + ` ${paragraphColor}`: "hidden"}
                            />
                        </SlideInXLeftAnimation>
                        <motion.div
                            viewport={{once: false}}
                            className={styles.options}
                            initial={slideInLeftInitial}
                            whileInView={slideInRightFinish}
                        >
                            {options?.length > 0 ? (
                                options?.map(
                                    (item: any, index: number) => (
                                        <Fragment key={index}>
                                            <motion.div
                                                custom={index}
                                                initial={initial}
                                                whileInView="animate"
                                                viewport={{once: true}}
                                                variants={arrayLoopStaggerChildren}
                                            >
                                                <span className={item?.text ? styles.text + ` ${optionsTextColor}` : "hidden"}>
                                                    {item?.text}
                                                </span>
                                            </motion.div>
                                        </Fragment>
                                    )
                                )
                            ) : (
                                <></>
                            )}
                        </motion.div>
                        <motion.div
                            viewport={{once: false}}
                            initial={slideInLeftInitial}
                            whileInView={slideInRightFinish}
                            className={styles.buttonSection + ` group/button ${buttonColor}`}
                        >
                            <Link
                                href={`${buttonLink?.url}`}
                                target={buttonLink?.target}
                                className={styles.buttonStyling}
                                aria-label={`${buttonLink?.title}`}
                            >
                                {buttonLink?.title}
                            </Link>
                            <svg width="22" height="12" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.svg}>
                                <path className={buttonSVGColor} d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z" fill="currentColor"/>
                            </svg>
                        </motion.div>
                    </div>
                    <div className={styles.imageContainer}>
                        <motion.div
                            className={styles.inner}
                            style={{scale: imageScale,}}
                        >
                            <Image
                                alt={image?.altText}
                                src={image?.sourceUrl}
                                className={styles.image}
                                width={image?.mediaDetails?.width || 1000}
                                height={image?.mediaDetails?.height || 1000}
                                style={{
                                    clipPath: `inset(0 0 0 0 round 5% 20% 0 10%)`,
                                }}
                            />
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default Card;