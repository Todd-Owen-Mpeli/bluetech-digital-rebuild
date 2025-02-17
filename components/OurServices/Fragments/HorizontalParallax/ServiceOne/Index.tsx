"use client";

// Imports
import {
	initial,
	fadeInUp,
	arrayLoopStaggerChildren,
} from "@/animations/animations";
import Link from "next/link";
import {FC, Fragment, useRef, useState} from "react";
import {motion, useScroll, useTransform} from "framer-motion";
import {IOurServices} from "@/components/OurServices/types/index";

// Styling
import styles from "@/components/OurServices/styles/OurServices.module.scss";

// Components
import SlideInXLeftAnimation from "@/components/Animations/SlideInXLeftAnimation";
import ScrollYProgressReveal from "@/components/Animations/ScrollYProgressReveal";
import Roles from "@/components/OurServices/Fragments/HorizontalParallax/ServiceOne/Elements/Roles";
import Modal from "@/components/OurServices/Fragments/HorizontalParallax/ServiceOne/Elements/Modal";
import ContentSliceRevealMaskAnimation from "@/components/Animations/ContentSliceRevealMaskAnimation";

const ServiceOne: FC<IOurServices.IProps[`serviceOne`]> = ({
	title,
	roles,
	image,
	paragraph,
	buttonLink,
}) => {
	const container = useRef(null);
	const {scrollYProgress} = useScroll({
		target: container,

		offset: ["start start", "end end"],
	});

	// Scroll Opacity Div
	const scrollOpacity = useTransform(scrollYProgress, [0, 500], [1, 0]);

	// Modal
	const [modal, setModal] = useState({active: false, index: 0});

	return (
		<div ref={container} className={`${styles.serviceOne} panel`}>
			<SlideInXLeftAnimation className={styles.leftSection}>
				<div
					className={styles.image}
					style={{
						backgroundImage: `url("${image.sourceUrl}")`,
					}}
				/>
			</SlideInXLeftAnimation>
			<div className={styles.rightSection}>
				<div className={styles.top}>
					<div>
						<motion.h4
							initial={initial}
							whileInView={fadeInUp}
							viewport={{once: true}}
							className={title ? styles.subtitle : "hidden"}
						>
							Services
						</motion.h4>
						<ContentSliceRevealMaskAnimation>
							<motion.h2
								initial={initial}
								whileInView={fadeInUp}
								viewport={{once: true}}
								className={title ? styles.title : "hidden"}
							>
								{title}
							</motion.h2>
						</ContentSliceRevealMaskAnimation>
					</div>
					<Link
						href={`${buttonLink?.url}`}
						target={buttonLink?.target}
						aria-label={`${buttonLink?.title}`}
						className={styles.buttonLink}
					>
						{buttonLink?.title}
					</Link>
				</div>
				<div className={styles.bottom}>
					<div className={styles.main}>
						{roles?.length > 0 ? (
							roles?.map((item: any, index: number) => (
								<Fragment key={index}>
									<motion.div
										custom={index}
										initial={initial}
										className="w-full"
										whileInView="animate"
										viewport={{once: true}}
										variants={arrayLoopStaggerChildren}
									>
										<ScrollYProgressReveal>
											<Roles
												key={index}
												index={index}
												link={item?.link}
												title={item?.title}
												setModal={setModal}
												paragraph={item?.paragraph}
												scrollOpacity={scrollOpacity}
												backgroundColor={item?.backgroundColor}
											/>
										</ScrollYProgressReveal>
									</motion.div>
								</Fragment>
							))
						) : (
							<></>
						)}
					</div>
					<Modal modal={modal} roles={roles} />
				</div>
			</div>
		</div>
	);
};

export default ServiceOne;
