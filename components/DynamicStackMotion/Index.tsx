"use client";

import {FC, useRef} from "react";
import {motion} from "framer-motion";
import {IDynamicStackMotion} from "@/types/components";

// Styling
import styles from "@/components/DynamicStackMotion/styles/DynamicStackMotion.module.scss";

// Components
import Title from "@/components/Elements/Title";
import ThreeDStackMotion from "@/components/DynamicStackMotion/Card/3DStackMotion";

const DynamicStackMotion: FC<IDynamicStackMotion.IProps> = ({
	title,
	stackMotionGrid,
}) => {
	const wrapperRef = useRef<HTMLDivElement>(null);

	return (
		<motion.div ref={wrapperRef} className={styles.dynamicStackMotion}>
			{title && <Title content={title} className={styles.title} />}
			<ThreeDStackMotion
				wrapperRef={wrapperRef}
				stackMotionGrid={stackMotionGrid}
			/>
		</motion.div>
	);
};

export default DynamicStackMotion;
