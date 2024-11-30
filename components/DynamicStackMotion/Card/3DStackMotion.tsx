"use client";

import {
	fadeIn,
	initialTwo,
	offsetStart,
	offsetFinish,
} from "@/animations/animations";
import {gsap} from "gsap";
import Image from "next/image";
import {motion} from "framer-motion";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import useWindowSize from "@/hooks/useWindowSize";
import {FC, useEffect, Fragment, useRef} from "react";
import {IDynamicStackMotion} from "@/types/components";

// Styling
import styles from "@/components/DynamicStackMotion/styles/DynamicStackMotion.module.scss";

// Components
import Paragraph from "@/components/Elements/Paragraph";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const ThreeDStackMotion: FC<IDynamicStackMotion.I3DStackMotion> = ({
	wrapperRef,
	stackMotionGrid,
}) => {
	const contentRef = useRef<HTMLDivElement>(null);
	const {width, height} = useWindowSize();

	useEffect(() => {
		if (!wrapperRef.current || !contentRef.current) return;

		const wrapperElement = wrapperRef.current;
		const contentElement = contentRef.current;
		const cardElements = contentElement.querySelectorAll<HTMLDivElement>(
			`.${styles.cardWrapper}`
		);

		// Update window size dynamically
		let winSize = {
			width: width || window.innerWidth,
			height: height || window.innerHeight,
		};

		// Helper function for throttling
		const throttle = (func: any, limit: number) => {
			let inThrottle: boolean;
			return function (this: any) {
				// eslint-disable-next-line prefer-rest-params
				const args = arguments;
				// eslint-disable-next-line @typescript-eslint/no-this-alias
				const context = this;
				if (!inThrottle) {
					func.apply(context, args);
					inThrottle = true;
					setTimeout(() => (inThrottle = false), limit);
				}
			};
		};

		// Animation logic
		const initializeEffect = () => {
			gsap.set(contentElement, {
				transform: "rotate3d(1, 0, 0, 55deg) rotate3d(0, 1, 0, 30deg)",
				opacity: 0,
				visibility: "hidden",
			});

			const timeline = gsap.timeline({
				defaults: {ease: "sine.inOut"},
				scrollTrigger: {
					trigger: wrapperElement,
					start: "top 60%",
					end: "+=200%",
					scrub: true,
					onEnter: () =>
						gsap.to(contentElement, {opacity: 1, visibility: "visible"}),
					onEnterBack: () =>
						gsap.to(contentElement, {opacity: 1, visibility: "visible"}),
					onLeave: () =>
						gsap.to(contentElement, {opacity: 0, visibility: "hidden"}),
					onLeaveBack: () =>
						gsap.to(contentElement, {opacity: 0, visibility: "hidden"}),
				},
			});

			timeline
				.fromTo(
					cardElements,
					{
						z: (index) => -1.2 * winSize.height - index * 0.08 * winSize.height,
					},
					{
						z: (index) =>
							3 * winSize.height +
							(cardElements.length - index - 1) * 0.08 * winSize.height,
					},
					0
				)
				.fromTo(
					cardElements,
					{rotationZ: -130},
					{rotationZ: 360, stagger: 0.006},
					0
				);
		};

		initializeEffect();

		const handleResize = throttle(() => {
			winSize = {width: window.innerWidth, height: window.innerHeight};
			initializeEffect();
		}, 100);

		window.addEventListener("resize", handleResize);
		return () => {
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
			window.removeEventListener("resize", handleResize);
		};
	}, [width, height, wrapperRef]);

	return (
		<>
			<div className={styles.stackInner}>
				<div className={styles.container} ref={contentRef}>
					{[
						...stackMotionGrid,
						...stackMotionGrid,
						...stackMotionGrid,
						...stackMotionGrid,
					].map((item, index) => (
						<Fragment key={index}>
							<div className={styles.cardWrapper}>
								<div className={styles.card} aria-label={item.image.altText}>
									<div className={styles.imageWrapper}>
										<Image
											className={styles.image}
											alt={item.image.altText}
											src={item.image.sourceUrl}
											width={item.image.mediaDetails.width || 1000}
											height={item.image.mediaDetails.height || 1000}
										/>
									</div>
									<div className={styles.content}>
										<motion.h4
											initial={initialTwo}
											whileInView={fadeIn}
											viewport={{once: false}}
											className={styles.text}
										>
											{item?.title?.length > 25
												? item?.title?.substring(0, 25) + "..."
												: item?.title}
										</motion.h4>
										<Paragraph
											fadeIn={false}
											content={item?.paragraph}
											offsetStart={offsetStart}
											offsetFinish={offsetFinish}
											className={item?.paragraph ? styles.paragraph : "hidden"}
										/>
									</div>
								</div>
							</div>
						</Fragment>
					))}
				</div>
			</div>
		</>
	);
};

export default ThreeDStackMotion;
