"use client";

// Imports
import {FC, Fragment} from "react";
import Link from "next/link";
import Image from "next/image";
import {motion} from "framer-motion";
import {INavbar} from "@/types/components";
import {useGlobalContext} from "@/context/global";
import useLocaleTime from "@/hooks/useLocaleTime";
import useScrollPosition from "@/hooks/useScrollPosition";
import {fadeIn, initial, stagger, initialTwo} from "@/animations/animations";

// Styling
import styles from "@/components/Global/Navbar/styles/Navbar.module.scss";

// Components
import NavbarMenuLinks from "@/components/Global/Navbar/Element/NavbarMenuLinks";
import ContentSliceRevealMaskAnimation from "@/components/Animations/ContentSliceRevealMaskAnimation";

const Navbar: FC<INavbar.IProps> = () => {
	const globalContext = useGlobalContext();

	// Background color scroll position change
	const scrollPosition = useScrollPosition();

	const localeTime = useLocaleTime();

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
										<NavbarMenuLinks index={index} item={item} />
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
				<ContentSliceRevealMaskAnimation className={styles.other}>
					<time className={styles.localeTime}>London {localeTime}</time>
				</ContentSliceRevealMaskAnimation>
			</div>
		</nav>
	);
};

export default Navbar;
