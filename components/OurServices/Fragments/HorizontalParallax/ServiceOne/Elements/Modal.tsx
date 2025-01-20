"use client";

// Imports
import gsap from "gsap";
import {useRef} from "react";
import Image from "next/image";
import {FC, useEffect} from "react";
import {motion} from "framer-motion";
import {IOurServices} from "@/components/OurServices/types/index";

// Styling
import styles from "@/components/OurServices/styles/OurServices.module.scss";

type IScaleAnimation = {
	initial: {
		scale: number;
		x: string;
		y: string;
	};
	enter: {
		scale: number;
		x: string;
		y: string;
		transition: {
			duration: number;
			ease: number[];
		};
	};
	closed: {
		scale: number;
		x: string;
		y: string;
		transition: {
			duration: number;
			ease: number[];
		};
	};
};

export const scaleAnimation: IScaleAnimation = {
	initial: {scale: 0, x: "-50%", y: "-50%"},
	enter: {
		scale: 1,
		x: "-50%",
		y: "-50%",
		transition: {duration: 0.4, ease: [0.76, 0, 0.24, 1]},
	},
	closed: {
		scale: 0,
		x: "-50%",
		y: "-50%",
		transition: {duration: 0.4, ease: [0.32, 0, 0.67, 0]},
	},
};

const Modal: FC<IOurServices.IServicesOneModal> = ({modal, servicesRoles}) => {
	const {active, index} = modal;

	const modalContainer = useRef(null);
	const cursor = useRef(null);
	const cursorLabel = useRef(null);

	useEffect(() => {
		//Move Container

		const xMoveContainer = gsap.quickTo(modalContainer.current, "left", {
			duration: 0.8,
			ease: "power3",
		});
		const yMoveContainer = gsap.quickTo(modalContainer.current, "top", {
			duration: 0.8,
			ease: "power3",
		});

		//Move cursor
		const xMoveCursor = gsap.quickTo(cursor.current, "left", {
			duration: 0.5,
			ease: "power3",
		});
		const yMoveCursor = gsap.quickTo(cursor.current, "top", {
			duration: 0.5,
			ease: "power3",
		});

		//Move cursor label
		const xMoveCursorLabel = gsap.quickTo(cursorLabel.current, "left", {
			duration: 0.45,
			ease: "power3",
		});
		const yMoveCursorLabel = gsap.quickTo(cursorLabel.current, "top", {
			duration: 0.45,
			ease: "power3",
		});

		window.addEventListener("mousemove", (e) => {
			const {pageX, pageY} = e;

			// Move Container
			xMoveContainer(pageX);
			yMoveContainer(pageY);

			// Move cursor
			xMoveCursor(pageX);
			yMoveCursor(pageY);

			// Move cursor label
			xMoveCursorLabel(pageX);
			yMoveCursorLabel(pageY);
		});
	}, []);

	return (
		<>
			<motion.div
				initial="initial"
				ref={modalContainer}
				variants={scaleAnimation}
				className={styles.modalContainer}
				animate={active ? "enter" : "closed"}
			>
				<div style={{top: index * -100 + "%"}} className={styles.modalSlider}>
					{servicesRoles?.length > 0 ? (
						servicesRoles?.map((item: any, index: number) => {
							return (
								<div
									key={`modal_${index}`}
									className={styles.modal}
									style={{backgroundColor: `${item?.backgroundColor}`}}
								>
									<Image
										alt={item?.image?.altText}
										src={item?.image?.sourceUrl}
										width={
											item?.image?.mediaDetails?.width
												? item?.image?.mediaDetails?.width
												: 500
										}
										height={
											item?.image?.mediaDetails?.height
												? item?.image?.mediaDetails?.height
												: 0
										}
									/>
								</div>
							);
						})
					) : (
						<></>
					)}
				</div>
			</motion.div>
			<motion.div
				ref={cursor}
				initial="initial"
				className={styles.cursor}
				variants={scaleAnimation}
				animate={active ? "enter" : "closed"}
			/>
			<motion.div
				ref={cursorLabel}
				initial="initial"
				variants={scaleAnimation}
				className={styles.cursorLabel}
				animate={active ? "enter" : "closed"}
			>
				<button aria-label="View Projects">View</button>
			</motion.div>
		</>
	);
};

export default Modal;
