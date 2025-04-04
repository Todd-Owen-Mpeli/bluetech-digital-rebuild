"use client";

// Imports
import Link from "next/link";
import Image from "next/image";
import {delay, motion} from "framer-motion";
import {FC, Fragment, useState} from "react";
import {useGlobalContext} from "@/context/global";
import useLocaleTime from "@/hooks/useLocaleTime";
import {INavbar} from "@/components/Global/Navbar/types/index";
import fadeInUp, {initial, stagger} from "@/animations/animations";

// Styling
import styles from "@/components/Global/Navbar/Styles/Navbar.module.scss";

// Components
import MegaMenu from "@/components/Global/Navbar/Element/MegaMenu";

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

	const [menuActive, setMenuActive] = useState(false);

	return (
		<motion.nav
			animate="open"
			initial="closed"
			className={styles.navbar}
			variants={revealAnimation}
		>
			<div className={styles.container}>
				<button
					aria-label="Menu Button"
					onClick={() => setMenuActive(!menuActive)}
					className={`${styles.menuBtn} ${menuActive ? styles.active : ""}`}
				>
					<span className={styles.menuText}>
						{menuActive ? "▶ Close" : "✦ Menu"}
						</span>
				</button>
				<div className={styles.logoWrapper}>
					<Link
						href="/"
						target="_self"
						aria-label={`Bluetech Digital Homepage Link`}
					>
						<Image
							priority
							width={1000}
							height={1000}
							className={styles.logo}
							alt="Bluetech Digital Logo"
							src="/svg/logo/BluetechDigital-Logo-color.svg"
						/>
					</Link>
				</div>
				<div className={styles.buttonSection}>
					<Link
						className={styles.buttonStyling}
						href={`${globalContext?.themesOptionsContent?.navbarCtaLink?.url}`}
						target={globalContext?.themesOptionsContent?.navbarCtaLink?.target}
						aria-label={`${globalContext?.themesOptionsContent?.navbarCtaLink?.title}`}
					>
						{globalContext?.themesOptionsContent?.navbarCtaLink?.title} ✦
					</Link>
				</div>
			</div>
			{/* Hidden Mobile Menu */}
			<div className={styles.mobileMenuWrapper}>
				<MegaMenu
					menuActive={menuActive}
					setMenuActive={setMenuActive}
					mobileLinks={globalContext?.mobileLinks}
				/>
			</div>
		</motion.nav>
	);
};

export default Navbar;
