"use client";

// Imports
import {FC} from "react";
import Link from "next/link";
import Image from "next/image";
import { motion} from "framer-motion";
import {useGlobalContext} from "@/context/global";
import useLocaleTime from "@/hooks/useLocaleTime";
import {INavbar} from "@/components/Global/Navbar/types/index";
import fadeInUp, {initial, stagger} from "@/animations/animations";

// Styling
import styles from "@/components/Global/Navbar/Styles/Navbar.module.scss";


// Animation Variants
const revealAnimation: INavbar.IRevealAnimation | any = {
	open: {
		y: 0,
		opacity: 1,
		visibility: "visible",
		transition: {
			duration: 1,
			delay: 0.5,
			type: "tween",
			ease: [0.25, 1, 0.5, 1],
		},
	},
	closed: {
		y: -100,
		opacity: 0,
		visibility: "hidden",
		transition: {
			duration: 0.6,
			type: "tween",
			ease: [0.25, 1, 0.5, 1],
		},
	},
};

const Navbar: FC<INavbar.IProps> = () => {
	const globalContext = useGlobalContext();

	const localeTime = useLocaleTime();

	return (
		<motion.nav
			animate="open"
			initial="closed"
			className={styles.navbar}
			variants={revealAnimation}
		>
			<div className={styles.container}>
			</div>
		</motion.nav>
	);
};

export default Navbar;
