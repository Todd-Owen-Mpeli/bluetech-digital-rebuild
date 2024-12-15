// Imports
import {FC} from "react";
import {motion} from "framer-motion";
import {IHero} from "@/components/Hero/types/index";
import {offsetStart, offsetFinish} from "@/animations/animations";

// Styling
import styles from "@/components/Hero/styles/Hero.module.scss";

// Components
import Title from "@/components/Elements/Title";
import Paragraph from "@/components/Elements/Paragraph";
import ContentMaskAnimation from "@/components/Animations/ContentMaskAnimation";

const HeroCard: FC<IHero.IHeroCard> = ({
	title,
	paragraph,
	titleColor,
	displayVideo,
	paragraphColor,
}) => {
	return (
		<>
			<motion.div
				className={styles.heroCard}
				style={{
					backdropFilter: displayVideo ? `blur(2px)` : `blur(0px)`,
				}}
			>
				<div className={styles.content}>
					<motion.h1
						className={title ? styles.title : "hidden"}
						style={{
							color: titleColor,
						}}
					>
						{title}
					</motion.h1>
					<div>
						<ContentMaskAnimation>
							<Paragraph
								fadeIn={false}
								content={paragraph}
								offsetStart={offsetStart}
								offsetFinish={offsetFinish}
								styleTextColor={paragraphColor}
								className={paragraph ? styles.paragraph : "hidden"}
							/>
						</ContentMaskAnimation>
					</div>
				</div>
			</motion.div>
		</>
	);
};

export default HeroCard;
