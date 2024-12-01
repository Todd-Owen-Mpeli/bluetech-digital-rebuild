// Imports
import {FC} from "react";
import {IAboutIntro} from "@/types/components/index";
import {offsetStart, offsetFinish} from "@/animations/animations";

// Styling
import styles from "@/components/AboutIntro/styles/AboutIntro.module.scss";

// Components
import BlurEffectOne from "@/components/Animations/TextScrollEffect/BlurEffectOne";
import TextGradientScrollOpacity from "@/components/Animations/TextGradientScrollOpacity";
import ParagraphTextMaskAnimation from "@/components/Animations/ParagraphTextMaskAnimation";
import Paragraph from "../Elements/Paragraph";

const AboutIntro: FC<IAboutIntro.IProps> = ({
	paragraph,
	actionTitle,
	paragraphTwo,
}) => {
	return (
		<>
			<div className={styles.aboutIntro}>
				<div className={styles.container}>
					<div className={styles.topContent}>
						<BlurEffectOne
							content={actionTitle}
							className={styles.actionTitle}
						/>
					</div>
					<div className={styles.bottomContent}>
						<ParagraphTextMaskAnimation
							content={paragraph}
							className={styles.paragraph}
						/>
						<TextGradientScrollOpacity
							content={paragraphTwo}
							offsetStart={offsetStart}
							offsetFinish={offsetFinish}
							afterStyling={styles.words}
							beforeStyling={styles.shadow}
							className={styles.paragraphTwo}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default AboutIntro;
