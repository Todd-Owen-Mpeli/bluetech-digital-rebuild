"use client";

// Imports
import {FC} from "react";
import Link from "next/link";
import {motion} from "framer-motion";
import {INavbar} from "@/types/components";
import {initial, arrayLoopStaggerChildren} from "@/animations/animations";

// Styling
import styles from "@/components/Global/Navbar/Styles/Navbar.module.scss";

const OurMissionNav: FC<INavbar.IOurMissionNav> = ({
	index,
	item,
	ourMissionOpen,
	setOurMissionOpen,
}) => {
	const displayOurMission = () => {
		setOurMissionOpen(true);
	};

	const hideOurMission = () => {
		setOurMissionOpen(false);
	};

	return (
		<motion.li
			custom={index}
			initial={initial}
			whileInView="animate"
			viewport={{once: true}}
			onMouseLeave={hideOurMission}
			onMouseEnter={displayOurMission}
			className={styles.ourMissionNav}
			variants={arrayLoopStaggerChildren}
		>
			<Link
				className={styles.link}
				href={`${item?.node?.url}`}
				aria-label={`${item?.node?.label}`}
				target={`${item?.node?.target ? item?.node?.target : "_self"}`}
			>
				{item?.node?.label}
			</Link>
			{ourMissionOpen ? (
				<>
					<div className={styles.contentWrapper}></div>
				</>
			) : null}
		</motion.li>
	);
};

export default OurMissionNav;
