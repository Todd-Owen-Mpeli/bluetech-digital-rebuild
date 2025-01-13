// Imports
import gsap from "gsap";
import {motion} from "framer-motion";
import ScrollTrigger from "gsap/ScrollTrigger";
import {FC, useRef, useLayoutEffect} from "react";
import {IOurExpertise} from "@/components/OurExpertise/types/index";

// Styling
import styles from "@/components/OurExpertise/styles/OurExpertise.module.scss";

// Gsap Register Plugin
gsap.registerPlugin(ScrollTrigger);

const HorizontalParallax: FC<IOurExpertise.IHorizontalParallax> = ({}) => {
	// Track the progress of the scroll and scale
	const containerRef = useRef<HTMLDivElement>(null);
	const sliderRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		const mediaQuery = window.matchMedia("(min-width: 768px)"); // Tailwind "md:" breakpoint
		const container = containerRef.current;
		const slider = sliderRef.current;
		if (!container || !slider) return;
		const panels = gsap.utils.toArray<HTMLDivElement>(".panel");

		const setupHorizontalScroll = () => {
			gsap.to(panels, {
				xPercent: -100 * (panels.length - 1),
				ease: "none",
				scrollTrigger: {
					trigger: slider,
					pin: true,
					scrub: 0.5, // Smooth scroll effect
					end: () => `+=${slider.offsetWidth}`,
				},
			});
		};

		const destroyScrollTrigger = () => {
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		};

		const handleResize = () => {
			if (mediaQuery.matches) {
				setupHorizontalScroll();
			} else {
				destroyScrollTrigger();
			}
		};

		// Initial setup
		if (mediaQuery.matches) {
			setupHorizontalScroll();
		}

		// Add resize listener
		window.addEventListener("resize", handleResize);

		// Cleanup on unmount
		return () => {
			destroyScrollTrigger();
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<div ref={containerRef} className={styles.horizontalParallax}>
			<motion.div ref={sliderRef} className={styles.container}>
				<div className={`${styles.panelOne} panel`}>ONE</div>
				<div className={`${styles.panelTwo} panel`}>TWO</div>
				<div className={`${styles.panelThree} panel`}>THREE</div>
			</motion.div>
		</div>
	);
};

export default HorizontalParallax;
