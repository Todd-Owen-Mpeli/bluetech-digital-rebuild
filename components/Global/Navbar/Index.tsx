"use client";

// Imports
import Link from "next/link";
import {motion} from "framer-motion";
import {INavbar} from "@/types/components";
import {FC, Fragment, useState} from "react";
import {useGlobalContext} from "@/context/global";
import useLocaleTime from "@/hooks/useLocaleTime";
import useScrollPosition from "@/hooks/useScrollPosition";
import {fadeIn, initial, stagger, initialTwo} from "@/animations/animations";

// Styling
import styles from "@/components/Global/Navbar/Styles/Navbar.module.scss";

// Components
import OurMissionNav from "@/components/Global/Navbar/Element/OurMissionNav";
import NavbarMenuLinks from "@/components/Global/Navbar/Element/NavbarMenuLinks";
import ContentSliceRevealMaskAnimation from "@/components/Animations/ContentSliceRevealMaskAnimation";

const Navbar: FC<INavbar.IProps> = () => {
	const globalContext = useGlobalContext();

	const localeTime = useLocaleTime();

	// Background color scroll position change
	const scrollPosition = useScrollPosition();

	// Hides or Display Our Mission Nav Content
	const [ourMissionOpen, setOurMissionOpen] = useState(false);

	return (
		<nav
			className={
				styles.navbar +
				`  ${scrollPosition > 50 ? "bg-white" : "bg-transparent"}`
			}
		>
			<div className={styles.container}>
				<ContentSliceRevealMaskAnimation className={styles.links}>
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
				</ContentSliceRevealMaskAnimation>
				<ContentSliceRevealMaskAnimation className={styles.logo}>
					<Link
						href="/"
						target="_self"
						aria-label={`Bluetech Digital Homepage Link`}
					>
						<h4 className={styles.title}>Bluetech Digital</h4>
					</Link>
				</ContentSliceRevealMaskAnimation>
				<ContentSliceRevealMaskAnimation className={styles.menuContainer}>
					<time className={styles.localeTime}>London {localeTime}</time>
				</ContentSliceRevealMaskAnimation>
			</div>
		</nav>
	);
};

export default Navbar;
