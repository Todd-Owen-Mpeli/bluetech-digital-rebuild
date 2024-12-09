// Imports
import {FC} from "react";
import {motion} from "framer-motion";
import {IHero} from "@/types/components/index";
import {fadeIn, initialTwo} from "@/animations/animations";

// Styling
import styles from "@/components/Hero/styles/Hero.module.scss";

// Components
import Title from "@/components/Elements/Title";

const Hero: FC<IHero.IProps> = ({title}) => {
	return (
		<>
			<motion.div className={styles.hero}>
				<div className={styles.container}>
					<div className={styles.content}></div>
				</div>
			</motion.div>
		</>
	);
};
export default Hero;
