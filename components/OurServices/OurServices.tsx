// Imports
import { FC } from "react";
import { motion } from "framer-motion";
import fadeInUp, { initial } from "@/animations/animations";
import {IOurServices} from "@/components/OurServices/types/index";

// Styling
import styles from "@/components/OurServices/styles/OurServices.module.scss";

// Components
import TitleSection from "@/components/OurServices/fragments/TitleSection";

const OurServices: FC<IOurServices.IProps> = ({
    title,
	serviceOne,
	serviceTwo,
    hoverImages,
}) => {
    return (
        <div className={styles.ourServices}>
			<div className={styles.container}>
                <TitleSection title={title} hoverImages={hoverImages} />
                <div className={styles.servicesGrid}></div>
			</div>
		</div>
    );
}

export default OurServices;