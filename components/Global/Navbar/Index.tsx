"use client";

// Imports
import Link from "next/link";
import Image from "next/image";
import {delay, motion} from "framer-motion";
import {FC, Fragment, useState} from "react";
import {useGlobalContext} from "@/context/global";
import useLocaleTime from "@/hooks/useLocaleTime";
import useScrollPosition from "@/hooks/useScrollPosition";
import {INavbar} from "@/components/Global/Navbar/types/index";
import fadeInUp, {initial, stagger} from "@/animations/animations";

// Styling
import styles from "@/components/Global/Navbar/Styles/Navbar.module.scss";

// Components
import OurMissionNav from "@/components/Global/Navbar/Element/OurMissionNav";
import NavbarMenuLinks from "@/components/Global/Navbar/Element/NavbarMenuLinks";

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

	// Background color scroll position change
	const scrollPosition = useScrollPosition();

	// Hides or Display Our Mission Nav Content
	const [ourMissionOpen, setOurMissionOpen] = useState(false);

	return (
		<motion.nav
			animate="open"
			initial="closed"
			className={styles.navbar}
			variants={revealAnimation}
		>
			<div className={styles.container}>
				<div className={styles.logo}>
					<Link
						href="/"
						target="_self"
						aria-label={`Bluetech Digital Homepage Link`}
					>
						<Image
							priority
							width={1000}
							height={1000}
							className={styles.image}
							alt="Bluetech Digital Logo"
							src="/svg/logo/BluetechDigital-Logo-color.svg"
						/>
					</Link>
					<time className={styles.localeTime}>London {localeTime}</time>
				</div>
				<div className={styles.menuLinks}>
					<motion.ul
						initial={initial}
						variants={stagger}
						whileInView="animate"
						viewport={{once: true}}
						className={styles.ul}
					>
						{globalContext?.navbarMenuLinks?.length > 0 ? (
							globalContext?.navbarMenuLinks?.map(
								(item: any, index: number) => (
									<Fragment key={index}>
										{item?.node?.url === "/mission" ? (
											<OurMissionNav
												index={index}
												item={item}
												ourMissionOpen={ourMissionOpen}
												setOurMissionOpen={setOurMissionOpen}
											/>
										) : (
											<NavbarMenuLinks index={index} item={item} />
										)}
									</Fragment>
								)
							)
						) : (
							<></>
						)}
					</motion.ul>
				</div>
				<div className={styles.buttonSection}>
					<Link
						className={styles.buttonStyling}
						href={`${globalContext?.themesOptionsContent?.navbarCtaLink?.url}`}
						target={globalContext?.themesOptionsContent?.navbarCtaLink?.target}
						aria-label={`${globalContext?.themesOptionsContent?.navbarCtaLink?.title}`}
					>
						{globalContext?.themesOptionsContent?.navbarCtaLink?.title}
					</Link>
				</div>
			</div>
		</motion.nav>
	);
};

export default Navbar;
