'use client';

// Imports
import Link from "next/link";
import Image from "next/image";
import { FC, useRef } from "react";
import { useTransform, motion, useScroll } from 'framer-motion';
import {IOurServices} from "@/components/OurServices/types/index";
import { offsetFinish, offsetStart } from "@/animations/animations";

// Styling
import styles from "@/components/OurServices/styles/OurServices.module.scss";

// Components
import Paragraph from "@/components/Elements/Paragraph/Paragraph";

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
    backgroundColour
}) => {

    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'start start']
    })

    const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1])
    const scale = useTransform(progress, range, [1, targetScale]);
    
    return (
        <div ref={container} className={styles.cardContainer}>
            <motion.div 
                className={styles.card}
                style={{
                    scale,
                    backgroundColor: backgroundColour,
                    top: `calc(-5vh + ${index * 25}px)`
                }}
            >
                <h2>{title}</h2>
                <div className={styles.body}>
                <div className={styles.description}>
                    <Paragraph
                        fadeIn={false}
                        content={paragraph}
                        offsetStart={offsetStart}
                        offsetFinish={offsetFinish}
                        className={
                            paragraph
                                ? styles.paragraph
                                : "hidden"
                        }
                    />
                    <span>
                        <Link
                            href={`${buttonLink?.url}`}
                            target={buttonLink?.target}
                            className={styles.buttonStyling}
                            aria-label={`${buttonLink?.title}`}
                        >
                            {buttonLink?.title}
                        </Link>
                        <svg width="22" height="12" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z" fill="black"/>
                        </svg>
                    </span>
                </div>
                    <div className={styles.imageContainer}>
                        <motion.div
                            className={styles.inner}
                            style={{scale: imageScale}}
                        >
                            <Image
                                alt={image?.altText}
                                src={image?.sourceUrl}
                                className={styles.image}
                                width={image?.mediaDetails?.width || 1000}
                                height={image?.mediaDetails?.height || 1000}
                            />
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default Card;