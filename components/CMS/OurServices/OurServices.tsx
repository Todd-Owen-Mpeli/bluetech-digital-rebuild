// Imports
import { FC } from "react";
import {IOurServices} from "@/components/CMS/OurServices/types/index";

// Styling
import styles from "@/components/CMS/OurServices/styles/OurServices.module.scss";

// Components
import TitleSection from "@/components/CMS/OurServices/fragments/TitleSection";
import Services from "@/components/CMS/OurServices/fragments/Services/Services";

const OurServices: FC<IOurServices.IProps> = ({
    title,
	service,
    hoverImages,
    backgroundImage,
    servicesBackgroundImage
}) => {
    
    return (
        <div className={styles.ourServices}>
            <TitleSection title={title} hoverImages={hoverImages} backgroundImage={backgroundImage} />
            <Services service={service} servicesBackgroundImage={servicesBackgroundImage} />
		</div>
    );
}

export default OurServices;