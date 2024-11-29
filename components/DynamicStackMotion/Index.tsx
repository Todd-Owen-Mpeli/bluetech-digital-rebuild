"use client";

// Imports
import {FC, useRef} from "react";
import {IDynamicStackMotion} from "@/types/components";

// Styling
import styles from "@/components/DynamicStackMotion/styles/DynamicStackMotion.module.scss";

// Components
import ThreeDStackMotion from "@/components/DynamicStackMotion/Card/3DStackMotion";

const DynamicStackMotion: FC<IDynamicStackMotion.IProps> = ({
	title,
	stackMotionGrid,
}) => {
	const wrapperRef = useRef<HTMLDivElement>(null);

	return (
		<div ref={wrapperRef} className={styles.dynamicStackMotion}>
			<h2 className={styles.title}>{title}</h2>
			<div className={styles.stackContainer}>
				<div data-stack-2 className={styles.content}>
					{/* <ThreeDStackMotion
						wrapperRef={wrapperRef}
						stackMotionGrid={stackMotionGrid}
					/> */}
				</div>
			</div>
		</div>
	);
};

export default DynamicStackMotion;
