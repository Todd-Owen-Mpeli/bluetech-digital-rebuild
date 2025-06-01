// Imports
import { FC } from "react";
import {ICTATwo} from "@/components/CTATwo/types/index";

// Styling
import styles from "@/components/CTATwo/styles/CTATwo.module.scss";

// Components
import Button from "@/components/Elements/Button/Button";
import SlideInXRightAnimation from "@/components/Animations/SlideInXRightAnimation";
import ContentSliceRevealMaskAnimation from "@/components/Animations/ContentSliceRevealMaskAnimation";

const CTATwo: FC<ICTATwo.IProps> = ({
	title,
	buttonLink,
}) => {

    return (
        <div className={styles.ctaTwo}
            // style={{backgroundImage: `url("/svg/background/stacked-steps-haikei-green-darkGreen.svg")`}}
        >
            <div className={styles.container}>
                <ContentSliceRevealMaskAnimation className={styles.leftSection}>
					<h2 className={styles.title}>{title}</h2>
				</ContentSliceRevealMaskAnimation>
				<SlideInXRightAnimation className={styles.rightSection}>
                    <Button styleNumber={1} link={buttonLink} />
				</SlideInXRightAnimation>
			</div>
		</div>
    );
}

export default CTATwo;