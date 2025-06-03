"use client";

// Imports
import {useEffect, useState} from "react";
import {AnimatePresence} from "framer-motion";

// Components
import Preloader from "@/components/Global/PreloaderAnimation/Elements/Preloader";

const PreloaderAnimation = () => {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);
			document.body.style.cursor = "default";
			window.scrollTo(0, 0);
		}, 2000);

		return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
	}, []);

	return (
		<AnimatePresence mode="wait">{isLoading && <Preloader />}</AnimatePresence>
	);
};

export default PreloaderAnimation;