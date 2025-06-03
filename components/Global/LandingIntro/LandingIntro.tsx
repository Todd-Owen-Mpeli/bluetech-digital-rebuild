"use client";

// Imports
import { gsap } from 'gsap';
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';

// Styling
import styles from "@/components/Global/LandingIntro/styles/LandingIntro.module.scss";

type ILandingIntro = {
    setHasVisited: Dispatch<SetStateAction<boolean>>;
};

const LandingIntro: FC<ILandingIntro> = ({setHasVisited}) => {

    // State to control the visibility of the loader animation
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Ensure gsap is available on the window object before proceeding
    if (typeof window.gsap === 'undefined') {
      console.error("GSAP is not loaded. Please ensure it's included via a script tag.");
      // Optionally, you can set showLoader to false here to display content immediately
      // if GSAP fails to load, or implement a fallback.
      setShowLoader(false);
      localStorage.setItem('hasVisited', 'true');
      setHasVisited(true);
      return;
    }

    const gsap = window.gsap; // Access gsap from the window object

    // Get window width for responsive animation calculations
    const windowWidth = window.innerWidth;
    const wrapperWidth = 180; // Width of each count-wrapper
    const finalPosition = windowWidth - wrapperWidth;
    // Calculate step distance for horizontal movement
    const stepDistance = finalPosition / 6;

    // Initialize GSAP timeline for sequential animations
    const tl = gsap.timeline({
      onComplete: () => {
        // After all animations complete, hide the loader and update localStorage
        setShowLoader(false);
        localStorage.setItem('hasVisited', 'true');
        setHasVisited(true); // Update parent state to show main content
      }
    });

    // Animation for the counting digits
    tl.to(".count", {
      x: -900, // Move digits off-screen to the left
      duration: 0.85,
      delay: 0.5,
      ease: "power4.inOut",
    });

    // Loop to animate the count-wrapper and digits in steps
    for (let i = 1; i <= 6; i++) {
      const xPosition = -900 + i * 180; // Calculate x position for digits
      tl.to(".count", {
        x: xPosition,
        duration: 0.85,
        ease: "power4.inOut",
        onStart: () => {
          // Animate the count-wrapper horizontally
          gsap.to(".count-wrapper", {
            x: stepDistance * i,
            duration: 0.85,
            ease: "power4.inOut",
          });
        },
      });
    }

    // Set initial scale of SVG revealers to 0
    gsap.set(".revealer svg", { scale: 0 });

    // Define delays for each revealer SVG animation
    const delays = [6, 6.5, 7];
    document.querySelectorAll(".revealer svg").forEach((el, i) => {
      tl.to(el, {
        scale: 45, // Scale up the SVG to reveal content
        duration: 1.5,
        ease: "power4.inOut",
        delay: delays[i], // Staggered delays for each revealer
      }, "<"); // Use '<' to make this animation start at the same time as the previous one in the timeline

    });

    // Animation for the header text and site info
    tl.to(".header h1", {
      rotateY: 0, // Rotate header text back to normal
      opacity: 1, // Fade in header text
      duration: 2,
      ease: "power3.out",
      delay: 8, // Delay before this animation starts
      onStart: () => {
        // Animate toggle button scale
        gsap.to(".toggle-btn", {
          scale: 1,
          duration: 1,
          ease: "power4.inOut",
        });
        // Animate site info lines
        gsap.to(".line p", {
          y: 0, // Move site info lines into view
          duration: 1,
          stagger: 0.1, // Stagger animation for each line
          ease: "power3.out",
        });
      },
    }, "<"); // Use '<' to make this animation start at the same time as the previous one in the timeline

    // Cleanup function for GSAP animations
    return () => {
      tl.kill(); // Kill the timeline to prevent memory leaks
    };
  }, [setHasVisited]); // Dependency array includes setHasVisited to ensure effect re-runs if it changes (though it won't here)

  // Only render the loader if showLoader is true
  if (!showLoader) {
    return null; // Don't render anything if the loader is hidden
    }
    
    return (
        // Apply global styling with Tailwind CSS
        <div className={styles.landingIntro}>
            {/* Loader section */}
            <div className={styles.topSection}>
                {/* First count wrapper */}
                <div className="relative w-[180px] h-[180px] overflow-hidden">
                    <div className="absolute top-0 left-0 flex h-full count">
                    <div className="w-[180px] h-[180px] flex justify-center items-center text-[10rem] font-bold text-white digit"><h1>9</h1></div>
                    <div className="w-[180px] h-[180px] flex justify-center items-center text-[10rem] font-bold text-white digit"><h1>8</h1></div>
                    <div className="w-[180px] h-[180px] flex justify-center items-center text-[10rem] font-bold text-white digit"><h1>7</h1></div>
                    <div className="w-[180px] h-[180px] flex justify-center items-center text-[10rem] font-bold text-white digit"><h1>4</h1></div>
                    <div className="w-[180px] h-[180px] flex justify-center items-center text-[10rem] font-bold text-white digit"><h1>2</h1></div>
                    <div className="w-[180px] h-[180px] flex justify-center items-center text-[10rem] font-bold text-white digit"><h1>0</h1></div>
                    </div>
                </div>

                {/* Second count wrapper */}
                <div className="relative w-[180px] h-[180px] overflow-hidden">
                    <div className="absolute top-0 left-0 flex h-full count">
                    <div className="w-[180px] h-[180px] flex justify-center items-center text-[10rem] font-bold text-white digit"><h1>9</h1></div>
                    <div className="w-[180px] h-[180px] flex justify-center items-center text-[10rem] font-bold text-white digit"><h1>5</h1></div>
                    <div className="w-[180px] h-[180px] flex justify-center items-center text-[10rem] font-bold text-white digit"><h1>9</h1></div>
                    <div className="w-[180px] h-[180px] flex justify-center items-center text-[10rem] font-bold text-white digit"><h1>7</h1></div>
                    <div className="w-[180px] h-[180px] flex justify-center items-center text-[10rem] font-bold text-white digit"><h1>4</h1></div>
                    <div className="w-[180px] h-[180px] flex justify-center items-center text-[10rem] font-bold text-white digit"><h1>0</h1></div>
                    </div>
                </div>

                {/* Revealer SVGs */}
                <div className="absolute transform origin-center revealer revealer-1">
                    <svg width="151" height="148" viewBox="0 0 151 148" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M75.9817 0L77.25 34.2209C78.0259 55.1571 94.8249 71.9475 115.762 72.7127L150.982 74L115.762 75.2873C94.8249 76.0525 78.0259 92.8429 77.25 113.779L75.9817 148L74.7134 113.779C73.9375 92.8429 57.1385 76.0525 36.2019 75.2873L0.981689 74L36.2018 72.7127C57.1384 71.9475 73.9375 55.1571 74.7134 34.2209L75.9817 0Z" />
                    </svg>
                </div>

                <div className="absolute transform origin-center revealer revealer-2">
                    <svg width="151" height="148" viewBox="0 0 151 148" fill="#CDFD50" xmlns="http://www.w3.org/2000/svg">
                    <path d="M75.9817 0L77.25 34.2209C78.0259 55.1571 94.8249 71.9475 115.762 72.7127L150.982 74L115.762 75.2873C94.8249 76.0525 78.0259 92.8429 77.25 113.779L75.9817 148L74.7134 113.779C73.9375 92.8429 57.1385 76.0525 36.2019 75.2873L0.981689 74L36.2018 72.7127C57.1384 71.9475 73.9375 55.1571 74.7134 34.2209L75.9817 0Z" />
                    </svg>
                </div>

                <div className="absolute transform origin-center revealer revealer-3">
                    <svg width="151" height="148" viewBox="0 0 151 148" fill="black" xmlns="http://www.w3.org/2000/svg">
                    <path d="M75.9817 0L77.25 34.2209C78.0259 55.1571 94.8249 71.9475 115.762 72.7127L150.982 74L115.762 75.2873C94.8249 76.0525 78.0259 92.8429 77.25 113.779L75.9817 148L74.7134 113.779C73.9375 92.8429 57.1385 76.0525 36.2019 75.2873L0.981689 74L36.2018 72.7127C57.1384 71.9475 73.9375 55.1571 74.7134 34.2209L75.9817 0Z" />
                    </svg>
                </div>
            </div>

            {/* Main content container, initially hidden by the loader */}
            <div className={styles.bottomSection}>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-2xl font-semibold site-info">
                    <div className="overflow-hidden line"><p className="translate-y-full">Digital & Brand Design</p></div>
                    <div className="overflow-hidden line"><p className="translate-y-full">Photography & Film Production</p></div>
                </div>
                <div className="absolute bottom-8 right-8 w-16 h-16 rounded-full bg-white flex justify-center items-center cursor-pointer scale-0 toggle-btn">
                    {/* Inline SVG for the toggle button icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
                </div>
                <div className="header">
                    <h1 className="text-[15vw] font-extrabold opacity-0 [transform:rotateY(90deg)]">HauteMuse</h1>
                </div>
            </div>
        </div>
    );
}

export default LandingIntro;