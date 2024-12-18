"use client";

// Imports
import {gsap} from "gsap";
import {FC, useEffect, useRef} from "react";
import {motion, useInView, MotionValue} from "framer-motion";

type IIntroTextAnimation = {
	title: string;
	className?: string;
	titleColor: MotionValue<string>;
};

const IntroTextAnimation: FC<IIntroTextAnimation> = ({
	title,
	className,
	titleColor,
}) => {
	const titleRef = useRef<HTMLDivElement>(null);

	// Use inView to determine when the component is visible
	const isInView = useInView(titleRef, {once: true, margin: "-10%"});

	useEffect(() => {
		if (isInView && titleRef.current) {
			const words = [...titleRef.current.querySelectorAll(".word")];

			// Set perspective for each parent node
			words.forEach((word) => gsap.set(word.parentNode, {perspective: 1000}));

			// GSAP animation runs only when component enters view
			gsap.fromTo(
				words,
				{
					"will-change": "opacity, transform",
					z: () => gsap.utils.random(500, 950),
					opacity: 0,
					xPercent: () => gsap.utils.random(-100, 100),
					yPercent: () => gsap.utils.random(-10, 10),
					rotationX: () => gsap.utils.random(-90, 90),
				},
				{
					ease: "expo",
					opacity: 1,
					rotationX: 0,
					rotationY: 0,
					xPercent: 0,
					yPercent: 0,
					z: 0,
					duration: 0.5,
					delay: 0.1,
					stagger: {
						each: 0.05,
						from: "random",
					},
				}
			);
		}
	}, [isInView]);

	// Function to split the text into span-wrapped characters
	const splitText = (text: string) => {
		return text.split("").map((char, index) => (
			<span key={index} className="word">
				{char}
			</span>
		));
	};

	return (
		<>
			<motion.h1
				ref={titleRef}
				className={
					title
						? "grid min-h-[15vh] w-full max-w-[1800px] mx-auto lg:mx-0 place-items-left"
						: "hidden"
				}
			>
				<motion.span
					className={className}
					style={{
						color: titleColor || "",
					}}
				>
					{splitText(`${title}`)}
				</motion.span>
			</motion.h1>
		</>
	);
};

export default IntroTextAnimation;
