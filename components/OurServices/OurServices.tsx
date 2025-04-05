// Imports
import {FC} from "react";
import {IOurServices} from "@/components/OurServices/types/index";

// Styling
import styles from "@/components/OurServices/styles/OurServices.module.scss";

const OurServices: FC<IOurServices.IProps> = ({
	serviceOne,
	serviceTwo,
}) => {
    return (
        <div className={styles.ourServices}>
			<div className={styles.container}>
				<div className="h-screen bg-white"></div>
			</div>
		</div>
    );
}

export default OurServices;