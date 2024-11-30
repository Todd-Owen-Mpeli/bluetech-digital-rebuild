"use client";

// Imports
import {
	motion,
	useSpring,
	useTransform,
	useMotionValue,
	AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import {IHero} from "@/types/components";
import {FC, Fragment, useState} from "react";

// Styling
import styles from "@/components/Hero/styles/Hero.module.scss";

const ClientsImages: FC<IHero.IClientsImages> = ({clientsImages}) => {
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
	const springConfig = {stiffness: 100, damping: 5};
	const x = useMotionValue(0); // going to set this value on mouse move
	// rotate the tooltip
	const rotate = useSpring(
		useTransform(x, [-100, 100], [-45, 45]),
		springConfig
	);
	// translate the tooltip
	const translateX = useSpring(
		useTransform(x, [-100, 100], [-50, 50]),
		springConfig
	);
	const handleMouseMove = (event: any) => {
		const halfWidth = event.target.offsetWidth / 2;
		x.set(event.nativeEvent.offsetX - halfWidth); // set the x value, which is then used in transform and rotate
	};

	return (
		<div className={styles.clientsImages}>
			{clientsImages?.map((item: any, index: number) => (
				<Fragment key={index}>
					<div
						key={item.name}
						className={styles.contentGrid + " group"}
						onMouseLeave={() => setHoveredIndex(null)}
						onMouseEnter={() => setHoveredIndex(index)}
					>
						<AnimatePresence mode="popLayout">
							{hoveredIndex === index && (
								<motion.div
									initial={{opacity: 0, y: 20, scale: 0.6}}
									animate={{
										opacity: 1,
										y: 0,
										scale: 1,
										transition: {
											type: "spring",
											stiffness: 260,
											damping: 10,
										},
									}}
									exit={{opacity: 0, y: 20, scale: 0.6}}
									style={{
										rotate: rotate,
										whiteSpace: "nowrap",
										translateX: translateX,
									}}
									className={styles.content}
								>
									<div className={styles.div} />
									<div className={styles.divTwo} />
									<div className={styles.name}>{item.name}</div>
									<div className={styles.channelName}>{item.channelName}</div>
								</motion.div>
							)}
						</AnimatePresence>
						<Image
							className={styles.image}
							alt={item.image?.altText}
							onMouseMove={handleMouseMove}
							src={`${item.image?.sourceUrl}`}
							width={item.image?.mediaDetails?.width || 1000}
							height={item.image?.mediaDetails?.height || 1000}
						/>
					</div>
				</Fragment>
			))}
		</div>
	);
};

export default ClientsImages;
