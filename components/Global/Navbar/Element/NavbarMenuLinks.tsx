"use client";

// Imports
import {FC} from "react";
import Link from "next/link";
import {motion} from "framer-motion";
import {INavbar} from "@/types/components";
import {initial, arrayLoopStaggerChildren} from "@/animations/animations";

// Styling
import styles from "@/components/Global/Navbar/Styles/Navbar.module.scss";

const NavbarMenuLinks: FC<INavbar.INavbarMenuLinks> = ({index, item}) => {
	return (
		<>
			<motion.li
				custom={index}
				initial={initial}
				whileInView="animate"
				viewport={{once: true}}
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
			</motion.li>
		</>
	);
};

export default NavbarMenuLinks;
