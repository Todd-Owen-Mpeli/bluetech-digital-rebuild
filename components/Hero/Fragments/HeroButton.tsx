// Imports
import {
	slideInLeftInitial,
	slideInRightFinish,
	slideInRightInitial,
} from "@/animations/animations";
import {FC} from "react";
import Link from "next/link";
import {motion} from "framer-motion";
import {IHero} from "@/types/components/index";

// Styling
import styles from "@/components/Hero/styles/Hero.module.scss";

const HeroButton: FC<IHero.IHeroButton> = ({
	buttonLink,
	className,
	slideInLeftAnimation,
	slideInRightAnimation,
}) => {
	return (
		<>
			<motion.button
				viewport={{once: false}}
				initial={
					slideInLeftAnimation
						? slideInLeftInitial
						: slideInRightAnimation
						? slideInRightInitial
						: ""
				}
				whileInView={slideInRightFinish}
				className={buttonLink?.url ? className : "hidden"}
			>
				<Link
					className={styles.link}
					href={`${buttonLink?.url}`}
					target={buttonLink?.target}
					aria-label={`${buttonLink?.title}`}
				>
					{buttonLink?.title}
				</Link>
			</motion.button>
		</>
	);
};

export default HeroButton;
