"use client";

// Imports
import Link from "next/link";
import {FC, useEffect, useState} from "react";

// Styling
import styles from "@/components/Elements/BackToTopButton/styles/BackToTopButton.module.scss";

type IBackHoverButton = {
	link: string;
};

const BackToTopButton: FC<IBackHoverButton> = ({link}) => {
	// Background color scroll position change
	const [scrollPosition, setScrollPosition] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			const currentPosition = window.scrollY;
			setScrollPosition(currentPosition);
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<div
			className={
				scrollPosition > 1000
					? styles.backToTopButton
					: "hidden"
			}
		>
			<div className={styles.container}>
				<Link
					target="_self"
					href={`${link}`}
					className={styles.content}
					aria-label={`back to the top Button`}
				>
					<span className={styles.span}>
						<svg
							height="35"
							width="30.237"
							className={styles.svg}
							viewBox="0 0 30.237 35"
							xmlns="http://www.w3.org/2000/svg"
						>
							<g transform="translate(-4906.763 143)">
								<path
									d="M49.5,35a17.45,17.45,0,0,1-12.737-5.5h2.153a16,16,0,0,0,21.9-23.314,15.971,15.971,0,0,0-21.9-.687H36.763A17.5,17.5,0,1,1,49.5,35Z"
									transform="translate(4870 -143)"
									fill="#ffffff"
								></path>
								<g transform="translate(4890.311 -1111.861)">
									<path
										d="M36.2,985.886,32.392,981.6a.714.714,0,1,0-1.064.952l2.753,3.1H24.714a.714.714,0,1,0,0,1.428h9.367l-2.753,3.1a.731.731,0,0,0,.056,1.015.722.722,0,0,0,1.007-.063l3.809-4.286A.722.722,0,0,0,36.2,985.886Z"
										transform="translate(0 0)"
										fill="#ffffff"
									></path>
								</g>
							</g>
						</svg>
					</span>
				</Link>
			</div>
		</div>
	);
};

export default BackToTopButton;