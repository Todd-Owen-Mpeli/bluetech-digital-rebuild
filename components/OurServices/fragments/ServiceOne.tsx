// Imports
import { FC } from "react";
import Image from "next/image";
import {motion} from "framer-motion";
import {IOurServices} from "@/components/OurServices/types/index";

// Styling
import styles from "@/components/OurServices/styles/OurServices.module.scss";

// Components
import Paragraph from "@/components/Elements/Paragraph/Paragraph";

const ServiceOne: FC<IOurServices.IServiceOne> = ({serviceOne}) => {
    return (
        <div className={styles.serviceOne}>
            <div className={styles.contentWrapper}>
            </div>
        </div>
    );
}

export default ServiceOne;