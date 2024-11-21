// Imports
import {
	fadeIn,
	initialTwo,
	slideInLeftInitial,
	slideInRightFinish,
	slideInRightInitial,
} from "@/animations/animations";
import {FC} from "react";
import Link from "next/link";
import Image from "next/image";
import {motion} from "framer-motion";
import {IHero} from "@/types/components/index";

// Styling
import styles from "@/components/Hero/styles/Hero.module.scss";

// Components
import Paragraph from "@/components/Elements/Paragraph";

const Hero: FC<IHero.IProps> = ({
	video,
	titleEnd,
	paragraph,
	titleStart,
	titleMiddle,
	buttonLink,
	displayVideo,
	smallImageOne,
	buttonLinkTwo,
	smallImageTwo,
	rightsideImage,
	videoBackgroundImage,
}) => {
	return (
		<>
			<motion.div className={styles.hero}>
				<div className={styles.container}>
					<div className={styles.content}>hi</div>
				</div>
			</motion.div>
		</>
	);
};
export default Hero;
