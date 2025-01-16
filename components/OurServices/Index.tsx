// Imports
import {FC} from "react";
import {IOurServices} from "@/components/OurServices/types/index";

// Styling
import styles from "@/components/OurServices/styles/OurServices.module.scss";

// Components
import HorizontalParallax from "@/components/OurServices/Fragments/HorizontalParallax/Index";

const OurServices: FC<IOurServices.IProps> = ({
	serviceOne,
	serviceTwo,
	serviceThree,
}) => {
	return (
		<div className={styles.ourServices}>
			<div className={styles.container}>
				<HorizontalParallax
					serviceOne={serviceOne}
					serviceTwo={serviceTwo}
					serviceThree={serviceThree}
				/>
				<div className="h-screen bg-accent-default"></div>
			</div>
		</div>
	);
};

export default OurServices;
