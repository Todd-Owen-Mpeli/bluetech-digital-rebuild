"use client";

// Imports
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import useWindowSize from "@/hooks/useWindowSize";
import {FC, Fragment, useEffect} from "react";
import {IDynamicStackMotion} from "@/types/components";

// Styling
import styles from "@/components/DynamicStackMotion/styles/DynamicStackMotion.module.scss";

// Register the ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

const ThreeDStackMotion: FC<IDynamicStackMotion.I3DStackMotion> = ({
	stackMotionGrid,
	wrapperRef,
}) => {
	const size = useWindowSize();

	useEffect(() => {
		if (!wrapperRef.current) return;

		const wrapElement = wrapperRef.current;
		const contentElement = wrapElement.querySelector(
			".content"
		) as HTMLDivElement;
		const imageElements = Array.from(wrapElement.querySelectorAll(".card"));

		let winSize = {
			width: size.width || window.innerWidth,
			height: size.height || window.innerHeight,
		};

		const resizeHandler = () => {
			winSize = {width: window.innerWidth, height: window.innerHeight};
		};

		const scrollEffect = () => {
			if (!contentElement) return;
			contentElement.style.transform =
				"rotate3d(1, 0, 0, 55deg) rotate3d(0, 1, 0, 30deg)";
			contentElement.style.opacity = "0";

			const tl = gsap.timeline({
				defaults: {ease: "sine.inOut"},
				scrollTrigger: {
					trigger: wrapElement,
					start: "top center",
					end: "+=150%",
					scrub: true,
					onEnter: () => gsap.set(contentElement, {opacity: 1}),
					onEnterBack: () => gsap.set(contentElement, {opacity: 1}),
					onLeave: () => gsap.set(contentElement, {opacity: 0}),
					onLeaveBack: () => gsap.set(contentElement, {opacity: 0}),
				},
			});

			tl.fromTo(
				imageElements,
				{z: (index) => -1.2 * winSize.height - index * 0.08 * winSize.height},
				{
					z: (index) =>
						3 * winSize.height +
						(imageElements.length - index - 1) * 0.08 * winSize.height,
				},
				0
			).fromTo(
				imageElements,
				{rotationZ: -130},
				{rotationZ: 360, stagger: 0.006},
				0
			);
		};

		window.addEventListener("resize", resizeHandler);
		scrollEffect();

		return () => {
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
			window.removeEventListener("resize", resizeHandler);
		};
	}, [size, wrapperRef]);

	return (
		<>
			{stackMotionGrid?.map((item: any, index: number) => (
				<Fragment key={index}>
					<div
						className={styles.card}
						aria-label={item.image.altText}
						style={{
							backgroundImage: `url(${item.image.sourceUrl})`,
						}}
					/>
				</Fragment>
			))}
		</>
	);
};

export default ThreeDStackMotion;
