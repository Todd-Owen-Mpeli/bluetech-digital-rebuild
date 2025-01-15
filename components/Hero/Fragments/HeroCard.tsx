// Imports
import {FC} from "react";
import {motion} from "framer-motion";
import {IHero} from "@/components/Hero/types/index";

// Styling
import styles from "@/components/Hero/styles/Hero.module.scss";

// Components
import ClientsImages from "@/components/Hero/Fragments/ClientsImages";
import IntroTextAnimation from "@/components/Hero/Elements/IntroTextAnimation";

const HeroCard: FC<IHero.IHeroCard> = ({
	title,
	titleColor,
	buttonLink,
	borderRadius,
	displayVideo,
	trustedClients,
}) => {
	return (
		<>
			<motion.div
				className={styles.heroCard}
				style={{
					borderRadius,
					backdropFilter: displayVideo ? `blur(0.5px)` : `blur(0px)`,
				}}
			>
				<div className={styles.content}>
					<IntroTextAnimation
						title={title}
						titleColor={titleColor}
						className={styles.title}
					/>
					<ClientsImages
						title={trustedClients.title}
						clientsImages={trustedClients.clientsImages}
					/>
				</div>
			</motion.div>
		</>
	);
};

export default HeroCard;
