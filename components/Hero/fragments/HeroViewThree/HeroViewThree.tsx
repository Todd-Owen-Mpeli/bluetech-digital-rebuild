// Imports
import React , { FC, useMemo, useRef } from "react";
import {IHero} from "@/components/Hero/types/index";
import { motion, useScroll, useTransform } from "framer-motion";
import fadeInUp, { initial, offsetFinish, offsetStart } from "@/animations/animations";

// Styling
import styles from "@/components/Hero/styles/Hero.module.scss";

const HeroViewThree: FC<IHero.IProps[`heroViewThree`]> = ({ trustedClients }) => {
    return (
        <div className={`${styles.heroViewThree} panel`}>
			<motion.div className={styles.container}>
				{trustedClients?.title || "THREE"}
			</motion.div>
		</div>
    );
}

export default HeroViewThree;