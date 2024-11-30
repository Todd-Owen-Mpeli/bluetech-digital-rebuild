"use client";

// Imports
import {FC} from "react";
import {motion} from "framer-motion";
import {IHero} from "@/types/components/index";
import {fadeIn, initialTwo} from "@/animations/animations";

// Styling
import styles from "@/components/Hero/styles/Hero.module.scss";

// Components
import Title from "@/components/Elements/Title";
import HeroButton from "@/components/Hero/Fragments/HeroButton";
import ClientsImages from "@/components/Hero/Fragments/ClientsImages";

const MainContent: FC<IHero.IMainContent> = ({
	title,
	subtitle,
	titleColor,
	buttonLink,
	buttonLinkTwo,
	trustedClients,
}) => {
	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<motion.h4
					initial={initialTwo}
					whileInView={fadeIn}
					viewport={{once: false}}
					className={styles.subtitle}
				>
					{subtitle}
				</motion.h4>
				<Title
					content={title}
					styleTextColor={titleColor}
					className={title ? styles.title : "hidden"}
				/>
				<div
					className={styles.trustedClients}
					style={{
						backgroundImage: `url("/svg/button-arrow-bg.svg")`,
					}}
				>
					<motion.h4
						initial={initialTwo}
						whileInView={fadeIn}
						viewport={{once: false}}
						className={styles.textTitle}
					>
						{trustedClients.title}
					</motion.h4>
					<ClientsImages clientsImages={trustedClients?.clientsImages} />
				</div>
				<div className={styles.buttonWrapper}>
					<HeroButton
						buttonLink={buttonLink}
						slideInLeftAnimation={true}
						className={styles.buttonStyling}
					/>
					<HeroButton
						buttonLink={buttonLinkTwo}
						slideInRightAnimation={true}
						className={styles.buttonStyling}
					/>
				</div>
			</div>
		</div>
	);
};

export default MainContent;
