"use client";

// Imports
import Link from "next/link";
import {useState} from "react";
import {delay, motion} from "framer-motion";

// Styling
import styles from "@/components/Global/Navbar/Styles/Navbar.module.scss";

// Animation Variants
const ourMissionNavRevealAnimation = {
	open: {
		height: "450px",
		display: "flex",
		backgroundColor: "#f5f5f5",
		transition: {
			delay: 0.5,
			duration: 0.4,
			type: "tween",
			ease: [0.23, 1, 0.32, 1],
		},
	},
	closed: {
		height: "0px",
		display: "none",
		backgroundColor: "#ffffff",
		transition: {
			delay: 0.2,
			duration: 0.4,
			ease: "easeOut",
		},
	},
};

const Navbar = ({item, index}: any) => {
	const [isOpen, setIsOpen] = useState(false);

	// Toggle handlers
	const displayOurMission = () => setIsOpen(true);
	const hideOurMission = () => setIsOpen(false);

	return (
		<motion.li
			custom={index}
			className={styles.ourMissionNav}
			onMouseEnter={displayOurMission}
			onMouseLeave={hideOurMission}
		>
			<Link
				href={item?.node?.url || ""}
				className={styles.link}
				aria-label={item?.node?.label}
				target={item?.node?.target || "_self"}
			>
				{item?.node?.label}
			</Link>

			{/* Animated Dropdown */}
			<motion.div
				initial="closed"
				className={styles.contentWrapper}
				animate={isOpen ? "open" : "closed"}
				variants={ourMissionNavRevealAnimation}
			>
				{/* Content goes here */}
				<div className={styles.content}>
					<p>Your dropdown content</p>
				</div>
			</motion.div>
		</motion.li>
	);
};

export default Navbar;
