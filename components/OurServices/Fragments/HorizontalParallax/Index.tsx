"use client";

// Imports
import gsap from "gsap";
import {motion} from "framer-motion";
import ScrollTrigger from "gsap/ScrollTrigger";
import {FC, useRef, useLayoutEffect} from "react";
import {IOurServices} from "@/components/OurServices/types/index";

// Styling
import styles from "@/components/OurServices/styles/OurServices.module.scss";

// Components
import ServiceTwo from "@/components/OurServices/Fragments/HorizontalParallax/ServiceTwo";
import ServiceThree from "@/components/OurServices/Fragments/HorizontalParallax/ServiceThree";
import ServiceOne from "@/components/OurServices/Fragments/HorizontalParallax/ServiceOne/Index";

// Gsap Register Plugin
gsap.registerPlugin(ScrollTrigger);

const HorizontalParallax: FC<IOurServices.IHorizontalParallax> = ({
	serviceOne,
	serviceTwo,
	serviceThree,
}) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const sliderRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		const container = containerRef.current;
		const slider = sliderRef.current;
		if (!container || !slider) return;

		const panels = gsap.utils.toArray<HTMLDivElement>(".panel");

		// Media query match for 'md:' breakpoint (min-width: 768px)
		const mediaQuery = window.matchMedia("(min-width: 768px)");

		const setupHorizontalScroll = () => {
			gsap.to(panels, {
				xPercent: -100 * (panels.length - 1),
				ease: "none",
				scrollTrigger: {
					trigger: slider,
					pin: true,
					scrub: 1.5, // Smooth scroll effect
					end: () => `+=${slider.scrollWidth}`, // Dynamically calculate width
					invalidateOnRefresh: true, // Recalculate on refresh
				},
			});
		};

		const destroyScrollTrigger = () => {
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		};

		const applyMobileStyles = () => {
			// Reset slider position and ensure vertical scroll works
			gsap.set(slider, {clearProps: "all"});
			container.style.overflow = "visible"; // Allow vertical scrolling
		};

		const handleResize = () => {
			if (mediaQuery.matches) {
				// Desktop or larger
				destroyScrollTrigger();
				setupHorizontalScroll();
			} else {
				// Mobile
				destroyScrollTrigger();
				applyMobileStyles();
			}
			ScrollTrigger.refresh(); // Refresh ScrollTrigger calculations
		};

		// Initial setup
		if (mediaQuery.matches) {
			setupHorizontalScroll();
		} else {
			applyMobileStyles();
		}

		// Add resize listener with debounce
		let resizeTimeout: NodeJS.Timeout | null = null;
		const debouncedResize = () => {
			if (resizeTimeout) clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(handleResize, 200);
		};
		window.addEventListener("resize", debouncedResize);

		// Cleanup on unmount
		return () => {
			destroyScrollTrigger();
			window.removeEventListener("resize", debouncedResize);
		};
	}, []);

	return (
		<div ref={containerRef} className={styles.horizontalParallax}>
			<motion.div ref={sliderRef} className={styles.wrapper}>
				<ServiceOne
					title={serviceOne.title}
					image={serviceOne.image}
					paragraph={serviceOne.paragraph}
					buttonLink={serviceOne.buttonLink}
					servicesRoles={serviceOne.servicesRoles}
				/>
				<ServiceTwo
					title={serviceTwo.title}
					paragraph={serviceTwo.paragraph}
					backgroundImage={serviceTwo.backgroundImage}
				/>
				<ServiceThree serviceThree={serviceThree} />
			</motion.div>
		</div>
	);
};

export default HorizontalParallax;
