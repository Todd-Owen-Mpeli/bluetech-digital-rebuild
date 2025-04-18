"use client";

// Imports
import gsap from 'gsap';
import { FC, useEffect, useRef } from "react";
import {IOurServices} from "@/components/OurServices/types/index";

// Styling
import styles from "@/components/OurServices/styles/OurServices.module.scss";

// Components
import Title from '@/components/Elements/Title';
import ScrollYProgressReveal from '@/components/Animations/ScrollYProgressReveal';

const TitleSection: FC<IOurServices.ITitleSection> = ({ title, hoverImages, backgroundImage }) => {

    const rootRef = useRef<HTMLDivElement | null>(null);
    const imageIndex = useRef<number>(0);
    const incr = useRef<number>(0);
    const oldX = useRef<number>(0);
    const oldY = useRef<number>(0);
    const resetDist = typeof window !== "undefined" ? window.innerWidth / 8 : 200;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const createMedia = (x: number, y: number, deltaX: number, deltaY: number) => {
        const root = rootRef.current;
        if (!root || !hoverImages.length) return;

        const img: HTMLImageElement = document.createElement("img");
        const current = hoverImages[imageIndex.current];

        img.src = current.image.sourceUrl;
        img.alt = current.image.altText || "trail-img";
        img.className = styles.image;

        root.appendChild(img);

        const tl = gsap.timeline({
        onComplete: () => {
            root.removeChild(img);
            tl.kill();
        },
        });

        tl.fromTo(
        img,
        {
            xPercent: -50 + (Math.random() - 0.5) * 80,
            yPercent: -50 + (Math.random() - 0.5) * 10,
            scaleX: 1.3,
            scaleY: 1.3,
        },
        {
            scaleX: 1,
            scaleY: 1,
            ease: "elastic.out(2, 0.6)",
            duration: 0.6,
        }
        );

        tl.fromTo(
        img,
        {
            x,
            y,
            rotation: (Math.random() - 0.5) * 20,
        },
        {
            x: `+=${deltaX * 4}`,
            y: `+=${deltaY * 4}`,
            rotation: (Math.random() - 0.5) * 20,
            ease: "power4.out",
            duration: 1.5,
        },
        "<"
        );

        tl.to(img, {
        duration: 0.3,
        scale: 0.5,
        delay: 0.1,
        ease: "back.in(1.5)",
        });

        imageIndex.current = (imageIndex.current + 1) % hoverImages.length;
    };

    useEffect(() => {
        const root = rootRef.current;
        if (!root || !hoverImages?.length) return;

        const handleMouseMoveOnce = (e: MouseEvent) => {
        oldX.current = e.clientX;
        oldY.current = e.clientY;
        };

        const handleMouseMove = (e: MouseEvent) => {
        const x = e.clientX;
        const y = e.clientY;

        incr.current += Math.abs(x - oldX.current) + Math.abs(y - oldY.current);

        if (incr.current > resetDist) {
            incr.current = 0;
            const deltaX = x - oldX.current;
            const deltaY = y - oldY.current;

            createMedia(x, y - root.getBoundingClientRect().top, deltaX, deltaY);
        }

        oldX.current = x;
        oldY.current = y;
        };

        root.addEventListener("mousemove", handleMouseMoveOnce, { once: true });
        root.addEventListener("mousemove", handleMouseMove);

        return () => {
        root.removeEventListener("mousemove", handleMouseMove);
        };
    }, [createMedia, hoverImages, resetDist]);

    return (
        <div ref={rootRef} className={styles.titleSection}
            style={{
		    	clipPath: `polygon(0 0, 68% 0, 100% 0, 100% 99%, 25% 95%, 0 100%)`,
		    	backgroundImage: `linear-gradient(
					0deg,
					rgba(0, 0, 0, 0.45),
					rgba(0, 0, 0, 0.95),
					rgba(0, 0, 0, 1)
				),url("${backgroundImage?.sourceUrl}")`,
            }}
        >
            <div className={styles.containerWrapper}>
                <ScrollYProgressReveal className={styles.wrapper}>
                    <Title content={title} className={title ? styles.title : "hidden"}/>
                </ScrollYProgressReveal>
            </div>
        </div>
    );
}

export default TitleSection;