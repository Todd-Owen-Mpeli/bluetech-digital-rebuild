// Imports
import {FC} from "react";
import { IHero } from "@/components/CMS/Hero/types/hero";

// Styling
import styles from "@/components/CMS/Hero/styles/Hero.module.css";

// Components
import HorizontalParallax from "@/components/CMS/Hero/fragments/HorizontalParallax";

const Hero: FC<IHero.IProps> = ({
	heroViewOne,
	heroViewTwo,
	heroViewThree,
}) => {
    return (
		<div className={styles.hero}>
			<div className={styles.container}>
				<HorizontalParallax
					heroViewOne={heroViewOne}
					heroViewTwo={heroViewTwo}
					heroViewThree={heroViewThree}
				/>
			</div>
		</div>
    );
}

export default Hero;