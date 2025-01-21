"use client";

// Imports
import {FC} from "react";
import Link from "next/link";
import {useState} from "react";
import Image from "next/image";
import {motion} from "framer-motion";
import {initialTwo, fadeIn} from "@/animations/animations";
import {IOurServices} from "@/components/OurServices/types/index";

// Styling
import styles from "@/components/OurServices/styles/OurServices.module.scss";

// Components
import TextRevealBlurEffect from "@/components/Elements/TextRevealBlurEffect";

const Roles: FC<IOurServices.IServicesOneRoles> = ({
	link,
	index,
	title,
	setModal,
	paragraph,
	scrollOpacity,
	backgroundColor,
}) => {
	const [isHovering, setIsHovering] = useState(false);

	return (
		<Link
			href={`${link?.url}`}
			aria-label={`${link?.title}`}
			target={link?.target ? link?.target : "_self"}
		>
			<div
				onMouseEnter={() => {
					setIsHovering(true);
					setModal({active: true, index});
				}}
				onMouseLeave={() => {
					setIsHovering(false);
					setModal({active: false, index});
				}}
				className={styles.roles + " group"}
			>
				<motion.h4
					initial={initialTwo}
					whileInView={fadeIn}
					viewport={{once: true}}
					className={styles.title + ` group-hover:lg:translate-x-[-10px]`}
					style={{color: `${isHovering ? backgroundColor : "#000"}`}}
				>
					{title}
				</motion.h4>
				<div className={styles.content}>
					<TextRevealBlurEffect
						content={paragraph}
						scrollOpacity={scrollOpacity}
						className={
							paragraph
								? styles.paragraph + "  group-hover:lg:translate-x-[10px]"
								: "hidden"
						}
					/>
				</div>
			</div>
		</Link>
	);
};

export default Roles;
