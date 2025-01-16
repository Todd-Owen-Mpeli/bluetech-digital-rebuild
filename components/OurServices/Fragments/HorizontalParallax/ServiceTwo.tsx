// Imports
import {FC} from "react";
import {motion} from "framer-motion";
import {IOurServices} from "@/components/OurServices/types/index";

// Styling
import styles from "@/components/OurServices/styles/OurServices.module.scss";

const ServiceTwo: FC<IOurServices.IProps[`serviceTwo`] | any> = ({
	serviceTwo,
}) => {
	return (
		<div className={`${styles.serviceTwo} panel`}>
			<motion.div className={styles.container}>{serviceTwo?.title}</motion.div>
		</div>
	);
};

export default ServiceTwo;
