// Imports
import { FC } from "react";
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
    backgroundImage
}) => {
    return (
        <div className={styles.ourServices}>
			<div className={styles.container}>
                <TitleSection title={title} hoverImages={hoverImages} backgroundImage={backgroundImage} />
                <div className={styles.servicesGrid}>
                    <div className={styles.container}></div>
                </div>
			</div>
		</div>
    );
}

export default OurServices;