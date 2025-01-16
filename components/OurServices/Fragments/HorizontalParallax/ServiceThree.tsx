// Imports
import {FC} from "react";
import {motion} from "framer-motion";
import {IOurServices} from "@/components/OurServices/types/index";

// Styling
import styles from "@/components/OurServices/styles/OurServices.module.scss";

const ServiceThree: FC<IOurServices.IProps[`serviceThree`] | any> = ({
	serviceThree,
}) => {
	return (
		<div className={`${styles.serviceThree} panel`}>
			<motion.div className={styles.container}>
				{serviceThree?.title || "THREE"}
			</motion.div>
		</div>
	);
};

export default ServiceThree;
