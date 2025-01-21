"use client";

// Imports
import {FC, Fragment, useRef, useState} from "react";
import {motion, useScroll, useTransform} from "framer-motion";
import {IOurServices} from "@/components/OurServices/types/index";
import {initial, arrayLoopStaggerChildren} from "@/animations/animations";

// Styling
import styles from "@/components/OurServices/styles/OurServices.module.scss";

// Components
import ScrollYProgressReveal from "@/components/Animations/ScrollYProgressReveal";
import Roles from "@/components/OurServices/Fragments/HorizontalParallax/ServiceOne/Elements/Roles";
import Modal from "@/components/OurServices/Fragments/HorizontalParallax/ServiceOne/Elements/Modal";

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
	);
};

export default ServiceOne;
