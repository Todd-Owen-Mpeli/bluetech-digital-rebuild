// Imports
import { FC } from "react";
import { motion } from "framer-motion";
import fadeInUp, { initial } from "@/animations/animations";
import {IOurServices} from "@/components/OurServices/types/index";

// Styling
import styles from "@/components/OurServices/styles/OurServices.module.scss";

const TitleSection: FC<IOurServices.ITitleSection> = ({title, hoverImages}) => {
    return (
        <div className={styles.titleSection}>
            <div className={styles.wrapper}>
                <motion.h2
                    initial={initial}
                    whileInView={fadeInUp}
                    viewport={{once: true}}
                    className={title ? styles.title : "hidden"}
                >
                    {title}
                </motion.h2>
            </div>
            <div className={styles.medias}></div>
        </div>
    );
}

export default TitleSection;