"use client";

// Imports
import Link from "next/link";
import {FC, Fragment} from "react";
import {m} from "framer-motion";
import {INavbar} from "@/components/Global/Navbar/types/index";

// Styling
import styles from "@/components/Global/Navbar/styles/Navbar.module.css";

// Animation
const megaMenuAnimation: INavbar.IMegaMenuAnimation | any = {
	open: {
		width: "55vw",
		height: "55vh",
		top: "55px",
		right: "0px",
		padding: "3rem 2rem",
		borderRadius: "15px",
        transition: {
            duration: 0.75,
            type: "tween",
            ease: [0.76, 0, 0.24, 1]
        },
	},
	closed: {
		width: "10px",
		height: "10px",
		top: "10px",
		right: "25px",
		borderRadius: "25px",
		padding: "0rem 0rem",
		transition: {
			duration: 0.5,
			type: "tween",
			ease: [0.76, 0, 0.24, 1],
		},
	},
};

const MegaMenu: FC<INavbar.IMegaMenu> = ({ menuActive, mobileLinks, setMenuActive }) => {
    
    const closeMenu = () => {
		setMenuActive(false);
    };
    
    return (
        <div className={menuActive ? styles.megaMenu: "hidden"}>
            <m.div
				initial="closed"
                className={styles.container}
				variants={megaMenuAnimation}
				animate={menuActive ? "open" : "closed"}
            >
                Enter
            </m.div>
        </div>
    );
}

export default MegaMenu;