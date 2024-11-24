"use client";

// Imports
import {
	fadeIn,
	initialTwo,
	slideInLeftInitial,
	slideInRightFinish,
	slideInRightInitial,
} from "@/animations/animations";
import {FC} from "react";
import Link from "next/link";
import Image from "next/image";
import {motion} from "framer-motion";
import {useGlobalContext} from "@/context/global";

// Styling
import styles from "@/styles/components/global/Error.module.scss";

// Components
import Paragraph from "@/components/Elements/Paragraph";

const Error: FC = () => {
	const globalContext = useGlobalContext();

	return (
		<>
			<section className={styles.error}>
				<div className={styles.container}>
					<div className={styles.contentWrapper}>
						<motion.div
							viewport={{once: false}}
							initial={slideInLeftInitial}
							whileInView={slideInRightFinish}
							className={styles.topContent}
						>
							<motion.h1
								initial={initialTwo}
								whileInView={fadeIn}
								viewport={{once: true}}
								className={styles.title}
							>
								{globalContext?.themesOptionsContent?.errorPageContent?.title}
							</motion.h1>
							<Paragraph
								className={styles.paragraph}
								content={
									globalContext?.themesOptionsContent?.errorPageContent
										?.paragraph
								}
							/>
						</motion.div>
						<motion.div
							viewport={{once: false}}
							initial={slideInRightInitial}
							whileInView={slideInRightFinish}
							className={styles.bottomContent}
						>
							<Link
								href={`${globalContext?.themesOptionsContent?.errorPageContent?.buttonLink?.url}`}
								aria-label={`${globalContext?.themesOptionsContent?.errorPageContent?.buttonLink?.title}`}
								target={
									globalContext?.themesOptionsContent?.errorPageContent
										?.buttonLink?.target
								}
								className={
									globalContext?.themesOptionsContent?.errorPageContent
										?.buttonLink?.url
										? styles.link + " group"
										: "hidden"
								}
							>
								<span className={styles.text}>
									{
										globalContext?.themesOptionsContent?.errorPageContent
											?.buttonLink?.title
									}
								</span>
								<span className={styles.svgWrapper + " group-hover:rotate-45"}>
									<svg
										width="11"
										height="11"
										fill="none"
										viewBox="0 0 11 11"
										className={styles.svg}
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M9.5 1.5L1.5 9.5"
											stroke="black"
											strokeWidth="1.3"
											strokeMiterlimit="10"
											strokeLinecap="round"
											strokeLinejoin="round"
										></path>
										<path
											d="M9.5 8.83571V1.5H2.16429"
											stroke="black"
											strokeWidth="1.3"
											strokeMiterlimit="10"
											strokeLinecap="round"
											strokeLinejoin="round"
										></path>
									</svg>
								</span>
							</Link>
						</motion.div>
					</div>
					<Image
						className={styles.image}
						alt={
							globalContext?.themesOptionsContent?.errorPageContent
								?.backgroundImage?.altText
						}
						src={
							globalContext?.themesOptionsContent?.errorPageContent
								?.backgroundImage?.sourceUrl
						}
						width={
							globalContext?.themesOptionsContent?.errorPageContent
								?.backgroundImage?.mediaDetails?.width
								? globalContext?.themesOptionsContent?.errorPageContent
										?.backgroundImage?.mediaDetails?.width
								: 1000
						}
						height={
							globalContext?.themesOptionsContent?.errorPageContent
								?.backgroundImage?.mediaDetails?.height
								? globalContext?.themesOptionsContent?.errorPageContent
										?.backgroundImage?.mediaDetails?.height
								: 1000
						}
					/>
				</div>
			</section>
		</>
	);
};

export default Error;
