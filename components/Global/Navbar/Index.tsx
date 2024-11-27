"use client";

// Imports
import Link from "next/link";
import {delay, motion} from "framer-motion";
import {INavbar} from "@/types/components";
import {FC, Fragment, useState} from "react";
import {useGlobalContext} from "@/context/global";
import useLocaleTime from "@/hooks/useLocaleTime";
import fadeInUp, {initial, stagger} from "@/animations/animations";
import useScrollPosition from "@/hooks/useScrollPosition";

// Styling
import styles from "@/components/Global/Navbar/Styles/Navbar.module.scss";

// Components
import OurMissionNav from "@/components/Global/Navbar/Element/OurMissionNav";
import NavbarMenuLinks from "@/components/Global/Navbar/Element/NavbarMenuLinks";

// Animation Variants
export type IRevealAnimation = {
	open: {
		y: number;
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
		y: number;
		opacity: number;
		visibility: string;
		transition: {
			duration: number;
			type: string;
			ease: number[];
		};
	};
};

const revealAnimation: IRevealAnimation | any = {
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
				<div className={styles.links}>
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
				<div className={styles.logo}>
					<Link
						href="/"
						target="_self"
						aria-label={`Bluetech Digital Homepage Link`}
					>
						<h4 className={styles.title}>Bluetech Digital</h4>
					</Link>
				</div>
				<div className={styles.menuContainer}>
					<motion.button
						initial={initial}
						whileInView={fadeInUp}
						viewport={{once: false}}
						className={
							globalContext?.themesOptionsContent?.navbarCtaLink?.url
								? styles.buttonStyling + " group"
								: "hidden"
						}
						style={{
							backgroundImage: `url("/svg/button-arrow-bg.svg")`,
						}}
					>
						<Link
							className={styles.link + " text-pureBlack group-hover:text-white"}
							href={`${globalContext?.themesOptionsContent?.navbarCtaLink?.url}`}
							target={
								globalContext?.themesOptionsContent?.navbarCtaLink?.target
							}
							aria-label={`${globalContext?.themesOptionsContent?.navbarCtaLink?.title}`}
						>
							{globalContext?.themesOptionsContent?.navbarCtaLink?.title}
						</Link>
					</motion.button>
				</div>
			</div>
		</motion.nav>
	);
};

export default Navbar;
