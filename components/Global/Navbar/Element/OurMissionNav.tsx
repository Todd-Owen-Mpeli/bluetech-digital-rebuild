"use client";

// Imports
import Link from "next/link";
import {useState} from "react";
import {delay, motion} from "framer-motion";

// Styling
import styles from "@/components/Global/Navbar/Styles/Navbar.module.scss";

// Components
import Paragraph from "@/components/Elements/Paragraph";
import {offsetStart, offsetFinish} from "@/animations/animations";

// Animation Variants
export type IOurMissionNavRevealAnimation = {
	open: {
		x: number;
		opacity: number;
		visibility: string;
		transition: {
			duration: number;
			delay: number;
			type: string;
			ease: number[];
		};
	};
	closed: {
		x: number;
		opacity: number;
		visibility: string;
		transition: {
			duration: number;
			type: string;
			ease: number[];
		};
	};
};
export type IContentRevealAnimation = {
	open: {
		x: number;
		opacity: number;
		visibility: string;
		transition: {
			duration: number;
			delay: number;
			type: string;
			ease: number[];
		};
	};
	closed: {
		x: number;
		opacity: number;
		visibility: string;
		transition: {
			duration: number;
			type: string;
			ease: number[];
		};
	};
};

const ourMissionNavRevealAnimation: IOurMissionNavRevealAnimation | any = {
	open: {
		height: "350px",
		opacity: 1,
		visibility: "visible",
		backgroundColor: "#f5f5f5",
		transition: {
			duration: 0.6,
			type: "tween",
			ease: [0.25, 1, 0.5, 1],
		},
	},
	closed: {
		height: "0px",
		opacity: 0,
		visibility: "hidden",
		backgroundColor: "#ffffff",
		transition: {
			duration: 0.6,
			type: "tween",
			ease: [0.25, 1, 0.5, 1],
		},
	},
};
const contentRevealAnimation: IContentRevealAnimation | any = {
	open: {
		x: 0,
		opacity: 1,
		visibility: "visible",
		transition: {
			duration: 0.6,
			delay: 0.5,
			type: "tween",
			ease: [0.4, 0, 0.2, 1],
		},
	},
	closed: {
		x: -50,
		opacity: 0,
		visibility: "hidden",
		transition: {
			duration: 0.6,
			type: "tween",
			ease: [0.6, 0.04, 0.98, 0.335],
		},
	},
};

const OurMissionNav = ({item, index}: any) => {
	const [isOpen, setIsOpen] = useState(false);

	// Toggle handlers
	const displayOurMission = () => setIsOpen(true);
	const hideOurMission = () => setIsOpen(false);

	return (
		<motion.li
			custom={index}
			className={styles.ourMissionNav}
			onMouseLeave={hideOurMission}
			onMouseEnter={displayOurMission}
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
				<motion.div
					initial="closed"
					variants={contentRevealAnimation}
					animate={isOpen ? "open" : "closed"}
					className={isOpen ? styles.content : "hidden"}
				>
					<h4 className={styles.title}>Our Mission</h4>
					<Paragraph
						fadeIn={false}
						content={`We create websites designed for football creators and their communities.`}
						offsetStart={offsetStart}
						offsetFinish={offsetFinish}
						className={isOpen ? styles.paragraph : "hidden"}
					/>
				</motion.div>
			</motion.div>
		</motion.li>
	);
};

export default OurMissionNav;
