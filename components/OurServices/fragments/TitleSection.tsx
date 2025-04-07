"use client";

// Imports
import gsap from 'gsap';
import Image from "next/image";
import { motion } from "framer-motion";
import { FC, useEffect, useRef, useState  } from "react";
import fadeInUp, { initial } from "@/animations/animations";
import {IOurServices} from "@/components/OurServices/types/index";

// Styling
import styles from "@/components/OurServices/styles/OurServices.module.scss";

const TitleSection: FC<IOurServices.ITitleSection> = ({ title, hoverImages }) => {
    const sectionRef = useRef<HTMLElement | null | any>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [indexImg, setIndexImg] = useState<number>(0);
    const incrRef = useRef<number>(0);
    const oldIncrXRef = useRef<number>(0);
    const oldIncrYRef = useRef<number>(0);
    const resetDist = typeof window !== 'undefined' ? window.innerWidth / 8 : 100; // Fallback for SSR

    useEffect(() => {
        const section = sectionRef.current;
        const container = containerRef.current;

        if (!section || !container) return;

        const handleMouseMoveOnce = (e: MouseEvent) => {
        oldIncrXRef.current = e.clientX;
        oldIncrYRef.current = e.clientY;
        };

        const handleMouseMove = (e: MouseEvent) => {
        const valX = e.clientX;
        const valY = e.clientY;

        incrRef.current += Math.abs(valX - oldIncrXRef.current) + Math.abs(valY - oldIncrYRef.current);

        if (incrRef.current > resetDist) {
            incrRef.current = 0;
            createMedia(valX, valY - container.getBoundingClientRect().top, valX - oldIncrXRef.current, valY - oldIncrYRef.current);
        }

        oldIncrXRef.current = valX;
        oldIncrYRef.current = valY;
        };

        section.addEventListener('mousemove', handleMouseMoveOnce, { once: true });
        section.addEventListener('mousemove', handleMouseMove);

        return () => {
        section.removeEventListener('mousemove', handleMouseMoveOnce);
        section.removeEventListener('mousemove', handleMouseMove);
        };
    }, [resetDist, hoverImages]);

    const createMedia = (x: number, y: number, deltaX: number, deltaY: number) => {
        const container = containerRef.current;
        if (!container || !hoverImages.length) return;

        const image = document.createElement('img');
        image.setAttribute('src', hoverImages[indexImg].image.sourceUrl);
        image.setAttribute('alt', hoverImages[indexImg].image.altText);
        container.appendChild(image);

        let tl: gsap.core.Timeline | null = gsap.timeline({ // Declare tl within the scope
        onComplete: () => {
            if (container.contains(image)) {
            container.removeChild(image);
            }
            if (tl) { // Check if tl is not null before calling kill
            tl.kill();
            tl = null; // Clean up the timeline reference
            }
        },
        });

        tl.fromTo(
        image,
        {
            xPercent: -50 + (Math.random() - 0.5) * 80,
            yPercent: -50 + (Math.random() - 0.5) * 10,
            scaleX: 1.3,
            scaleY: 1.3,
        },
        {
            scaleX: 1,
            scaleY: 1,
            ease: 'elastic.out(2, 0.6)',
            duration: 0.6,
        }
        );

        tl.fromTo(
        image,
        {
            x,
            y,
            rotation: (Math.random() - 0.5) * 20,
        },
        {
            x: `+=${deltaX * 4}`,
            y: `+=${deltaY * 4}`,
            rotation: (Math.random() - 0.5) * 20,
            ease: 'power4.out',
            duration: 1.5,
        },
        '<'
        );

        tl.to(image, {
        duration: 0.3,
        scale: 0.5,
        delay: 0.1,
        ease: 'back.in(1.5)',
        });

        setIndexImg((prevIndex) => (prevIndex + 1) % hoverImages.length);
    };

    return (
        <div ref={sectionRef} className={styles.titleSection}>
            <div ref={containerRef} className={styles.containerWrapper}>
                <div className={styles.wrapper}>
                    <motion.h2
                        initial={initial}
                        whileInView={fadeInUp}
                        viewport={{ once: false, amount: 0.3 }}
                        className={title ? styles.title : "hidden"}
                    >
                        {title}
                    </motion.h2>
                </div>
                <div className={styles.hoverImages}>
                    {hoverImages?.length &&
                        hoverImages.map((item, index) => (
                            <Image
                                key={index}
                                className={styles.image}
                                alt={item.image.altText}
                                src={item.image.sourceUrl}
                                width={item.image.mediaDetails?.width || 1000}
                                height={item.image.mediaDetails?.height || 1000}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
}

export default TitleSection;