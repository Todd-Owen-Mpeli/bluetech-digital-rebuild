// Imports
import {FC} from "react";
import {IHero} from "@/components/Hero/types/index";

// Styling
import styles from "@/components/Hero/styles/Hero.module.scss";

// Components
import HorizontalParallax from "@/components/Hero/fragments/HorizontalParallax";

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