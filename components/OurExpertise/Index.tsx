// Imports
import { FC } from "react";
import { IOurExpertise } from "@/components/OurExpertise/types/index";

// Styling
import styles from "@/components/OurExpertise/styles/OurExpertise.module.scss";

// Components

const OurExpertise:FC<IOurExpertise.IProps> = ({
	title,
	paragraph,
}) => {
    return (
        <div className={styles.ourExpertise}>
           <div className={styles.container}>
			</div>
        </div>
    );
}

export default OurExpertise;