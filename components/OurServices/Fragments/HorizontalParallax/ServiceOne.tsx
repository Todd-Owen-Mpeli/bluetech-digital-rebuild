// Imports
import {FC} from "react";
import {motion} from "framer-motion";
import {IOurServices} from "@/components/OurServices/types/index";

// Styling
import styles from "@/components/OurServices/styles/OurServices.module.scss";

const ServiceOne: FC<IOurServices.IProps[`serviceOne`] | any> = ({
	serviceOne,
}) => {
	return (
		<div className={`${styles.serviceOne} panel`}>
			<motion.div className={styles.container}>{serviceOne?.title}</motion.div>
		</div>
	);
};

export default ServiceOne;
