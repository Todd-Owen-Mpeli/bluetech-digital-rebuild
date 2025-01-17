// Imports
import {FC, useRef} from "react";
import {motion, useScroll, useTransform} from "framer-motion";
import {IOurServices} from "@/components/OurServices/types/index";

// Styling
import styles from "@/components/OurServices/styles/OurServices.module.scss";
// Components
import Title from "@/components/Elements/Title";
import Paragraph from "@/components/Elements/Paragraph";
import TextRevealBlurEffect from "@/components/Elements/TextRevealBlurEffect";
import SlideInXLeftAnimation from "@/components/Animations/SlideInXLeftAnimation";
import SlideInXRightAnimation from "@/components/Animations/SlideInXRightAnimation";

const ServiceOne: FC<IOurServices.IProps[`serviceOne`] | any> = ({
	serviceOne,
}) => {
	const container = useRef(null);
	const {scrollYProgress} = useScroll({
		target: container,

		offset: ["start start", "end end"],
	});

	// Scroll Opacity Div
	const scrollOpacity = useTransform(scrollYProgress, [0, 500], [1, 0]);

	return (
		<div ref={container} className={`${styles.serviceOne} panel`}>
			<div className={styles.container}>
				<div className={styles.main}>
					<SlideInXLeftAnimation className={styles.imageContainer}>
						<div
							className={styles.image}
							style={{
								backgroundImage: `url("${serviceOne.image.sourceUrl}")`,
							}}
						/>
					</SlideInXLeftAnimation>
					<div className="w-full xl:w-1/2 px-4">
						<div className="flex flex-wrap h-full -mx-4">
							<div className="w-full md:w-1/2 px-4 mb-8 md:mb-0">
								<div className="flex flex-col h-full">
									<a
										className="relative block h-full mb-7 pt-8 px-8 pb-5 bg-lightGreyTwo hover:bg-lightGreyTwo /80 transition duration-200"
										href="#"
									>
										<div className="flex flex-col h-full justify-between max-w-sm pr-16">
											<Paragraph
												className="text-sm text-pureBlack mb-10 md:mb-6"
												// className={styles.paragraph}
												content={`We specialize in designing websites that provide
												seamless and enjoyable experiences for users. By
												understanding how people interact with websites, we
												create intuitive layouts and features that make
												navigation easy and engaging.`}
											/>
											<span className="text-3xl font-semibold text-pureBlack">
												User Interaction (UI)
											</span>
										</div>
										<img
											className="absolute bottom-0 right-0 m-5"
											src="saturn-assets/images/features/arrow.svg"
											alt=""
										/>
									</a>
									<a
										className="relative block h-full pt-8 px-8 pb-5 bg-tertiary-default hover:bg-tertiary-default/80 transition duration-200"
										href="#"
									>
										<div className="flex flex-col h-full justify-between max-w-sm pr-16">
											<Paragraph
												className="text-sm text-white mb-10 md:mb-6"
												// className={styles.paragraph}
												content={`We specialize in designing websites that provide
												seamless and enjoyable experiences for users. By
												understanding how people interact with websites, we
												create intuitive layouts and features that make
												navigation easy and engaging.`}
											/>
											<span className="text-3xl font-semibold text-white">
												User Experience (UX)
											</span>
										</div>
										<img
											className="absolute bottom-0 right-0 m-5"
											src="saturn-assets/images/features/arrow.svg"
											alt=""
										/>
									</a>
								</div>
							</div>
							<SlideInXRightAnimation className="w-full md:w-1/2 px-4">
								<a
									className="relative block h-full pt-8 px-8 pb-5 bg-accent-default hover:bg-accent-default/80 transition duration-200"
									href="#"
								>
									<div className="flex h-full flex-col items-start justify-between max-w-sm pr-16">
										<Paragraph
											className="text-sm text-pureBlack mb-10 md:mb-6"
											// className={styles.paragraph}
											content={`We specialize in designing websites that provide
												seamless and enjoyable experiences for users. By
												understanding how people interact with websites, we
												create intuitive layouts and features that make
												navigation easy and engaging.`}
										/>
										<span className="text-3xl font-semibold text-gray-900">
											Website Design
										</span>
									</div>
									<img
										className="absolute bottom-0 right-0 m-5"
										src="saturn-assets/images/features/arrow.svg"
										alt=""
									/>
								</a>
							</SlideInXRightAnimation>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ServiceOne;
