// Imports
import { FC } from "react";
import {IOurServices} from "@/components/OurServices/types/index";

// Styling
import styles from "@/components/OurServices/styles/OurServices.module.scss";

// Components
import TitleSection from "@/components/OurServices/fragments/TitleSection";
import Services from "@/components/OurServices/fragments/Services/Services";

const OurServices: FC<IOurServices.IProps> = ({
    title,
	service,
    hoverImages,
    backgroundImage
}) => {
    return (
        <div className={styles.ourServices}>
            <TitleSection title={title} hoverImages={hoverImages} backgroundImage={backgroundImage} />
            <Services service={service} />
		</div>
    );
}

export default OurServices;