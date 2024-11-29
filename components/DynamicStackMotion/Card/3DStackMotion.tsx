"use client";

import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import useWindowSize from "@/hooks/useWindowSize";
import {FC, useEffect, Fragment} from "react";
import {IDynamicStackMotion} from "@/types/components";

// Styling
import styles from "@/components/DynamicStackMotion/styles/DynamicStackMotion.module.scss";

gsap.registerPlugin(ScrollTrigger);

const ThreeDStackMotion: FC<IDynamicStackMotion.I3DStackMotion> = ({
	stackMotionGrid,
	wrapperRef,
}) => {
	const size = useWindowSize();

	// useEffect(() => {
	// 	if (!wrapperRef.current) return;

	// 	const wrapElement = wrapperRef.current;
	// 	const contentElement = wrapElement.querySelector<HTMLDivElement>(
	// 		`.${styles.content}`
	// 	);
	// 	const imageElements = Array.from(
	// 		wrapElement.querySelectorAll(`.${styles.card}`)
	// 	);

	// 	let winSize = {
	// 		width: size.width || window.innerWidth,
	// 		height: size.height || window.innerHeight,
	// 	};

	// 	const resizeHandler = () => {
	// 		winSize = {width: window.innerWidth, height: window.innerHeight};
	// 	};

	// 	const initScrollAnimation = () => {
	// 		if (!contentElement) return;

	// 		const tl = gsap.timeline({
	// 			defaults: {ease: "sine.inOut"},
	// 			scrollTrigger: {
	// 				trigger: wrapElement,
	// 				start: "top center",
	// 				end: "bottom+=150%",
	// 				scrub: true,
	// 			},
	// 		});

	// 		tl.fromTo(
	// 			imageElements,
	// 			{z: (index) => -1.2 * winSize.height - index * 0.1 * winSize.height},
	// 			{z: (index) => 3 * winSize.height + index * 0.1 * winSize.height},
	// 			0
	// 		).fromTo(
	// 			imageElements,
	// 			{rotationZ: -130},
	// 			{rotationZ: 360, stagger: 0.06},
	// 			0
	// 		);
	// 	};

	// 	initScrollAnimation();
	// 	window.addEventListener("resize", resizeHandler);

	// 	return () => {
	// 		ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
	// 		window.removeEventListener("resize", resizeHandler);
	// 	};
	// }, [size, wrapperRef]);

	return (
		<div className={styles.stackContainer}>
			<div className={styles.wrapper}>
				<div className={styles.content}>
					{stackMotionGrid?.map((item, index) => (
						<Fragment key={index}>
							<div
								className={styles.card}
								aria-label={item.image.altText}
								style={{backgroundImage: `url(${item.image.sourceUrl})`}}
							/>
						</Fragment>
					))}
				</div>
			</div>
		</div>
	);
};

export default ThreeDStackMotion;
