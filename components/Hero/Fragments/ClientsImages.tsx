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
import {FC, Fragment, useState} from "react";
import {IHero} from "@/components/Hero/types/index";
import {
	slideInLeftInitial,
	slideInRightFinish,
	slideInRightInitial,
} from "@/animations/animations";

// Styling
import styles from "@/components/Hero/styles/Hero.module.scss";

// Components
import RenderStars from "@/components/Hero/Elements/RenderStars";

const ClientsImages: FC<IHero.IClientsImages> = ({title, clientsImages}) => {
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
		<div className={styles.trustedClients}>
			<motion.div
				viewport={{once: true}}
				initial={slideInLeftInitial}
				whileInView={slideInRightFinish}
				className={styles.clientsImages}
			>
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
										className={
											styles.content + ` ${item.channelName ? "py-8" : "py-4"}`
										}
									>
										<div className={styles.div} />
										<div className={styles.divTwo} />
										<div className={item.name ? styles.name : "hidden"}>
											{item.name}
										</div>
										<div
											className={
												item.channelName ? styles.channelName : "hidden"
											}
										>
											{item.channelName}
										</div>
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
			</motion.div>
			<motion.div
				viewport={{once: true}}
				className={styles.stats}
				initial={slideInRightInitial}
				whileInView={slideInRightFinish}
			>
				<div className={styles.starsWrapper}>
					<h5 className={styles.rating}>4.9</h5>
					<div className={styles.stars}>
						<RenderStars rating={5} color="Yellow" />
					</div>
				</div>
				<h5 className={styles.title}>{title}</h5>
			</motion.div>
		</div>
	);
};

export default ClientsImages;
