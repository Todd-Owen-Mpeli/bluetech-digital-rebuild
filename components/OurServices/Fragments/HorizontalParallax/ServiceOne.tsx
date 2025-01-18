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
					<div className={styles.contentContainer}>
						<div className={styles.content}>
							<div className="w-full md:w-2/3 px-4 mb-8 md:mb-0">
								<div className="flex flex-col h-full">
									<a
										className="relative block h-full mb- pt-8 px-8 pb-5 bg-lightGreyTwo transition duration-200"
										href="#"
									>
										<div className="flex flex-col h-full justify-between max-w-2xl pr-16">
											<Paragraph
												className="text-paragraph text-pureBlack mb-10 md:mb-6 font-BGAPLight"
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
										className="relative block h-full pt-8 px-8 pb-5 bg-lightGreyTwo transition duration-200"
										href="#"
									>
										<div className="flex flex-col h-full justify-between max-w-2xl pr-16">
											<Paragraph
												className="text-paragraph text-pureBlack mb-10 md:mb-6 font-BGAPLight"
												// className={styles.paragraph}
												content={`We specialize in designing websites that provide
												seamless and enjoyable experiences for users. By
												understanding how people interact with websites, we
												create intuitive layouts and features that make
												navigation easy and engaging.`}
											/>
											<span className="text-3xl font-semibold text-pureBlack">
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
							<SlideInXRightAnimation className="w-full md:w-1/3 px-4">
								<a
									className="relative block h-full pt-8 px-8 pb-5 bg-lightGreyTwo transition duration-200"
									href="#"
								>
									<div className="flex h-full flex-col items-start justify-between max-w-sm pr-16">
										<Paragraph
											className="text-paragraph text-pureBlack mb-10 md:mb-6 font-BGAPLight"
											// className={styles.paragraph}
											content={`Our team creates visually striking and professionally branded websites tailored to your business goals. We focus on designs that look great on all devices and effectively communicate your brand’s message.`}
										/>
										<span className="text-3xl font-semibold text-pureBlack">
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
