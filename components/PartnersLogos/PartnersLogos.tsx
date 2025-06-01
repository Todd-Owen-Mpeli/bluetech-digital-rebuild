"use client";

// Imports
import Image from "next/image";
import { FC, Fragment} from "react";
import {IPartnersLogos} from "@/components/PartnersLogos/types/index";

// Styling
import styles from "@/components/PartnersLogos/styles/PartnersLogos.module.scss";

// Components
import InfiniteSlider from "@/components/PartnersLogos/fragments/InfiniteSlider";

const PartnersLogos: FC<IPartnersLogos.IProps> = ({
	logoGrid,
}) => {
	return (
		<div className={styles.partnersLogos}>
			<div className={styles.container}>
				<div className={styles.partnersLogosGrid + ` hidden lg:flex`}>
					<InfiniteSlider className={styles.infiniteSlider}>
						{logoGrid?.slice(0, 10)?.map((item: any, index: number) => (
							<Fragment key={index}>
								<Image
									alt={item?.image?.altText}
									src={item?.image?.sourceUrl}
									width={item?.image?.mediaDetails?.width || 1000}
									height={item?.image?.mediaDetails?.height || 1000}
									className={item?.image?.sourceUrl ? styles.image : `hidden`}
								/>
							</Fragment>
						))}
					</InfiniteSlider>
					<InfiniteSlider className={styles.infiniteSlider} reverse={true}>
						{logoGrid?.slice(11, 21)?.map((item: any, index: number) => (
							<Fragment key={index}>
								<Image
									alt={item?.image?.altText}
									src={item?.image?.sourceUrl}
									width={item?.image?.mediaDetails?.width || 1000}
									height={item?.image?.mediaDetails?.height || 1000}
									className={item?.image?.sourceUrl ? styles.image : `hidden`}
								/>
							</Fragment>
						))}
					</InfiniteSlider>
				</div>
				<div className={styles.partnersLogosGrid + ` flex lg:hidden`}>
					<InfiniteSlider className={styles.infiniteSlider}>
						{logoGrid?.slice(0, 7)?.map((item: any, index: number) => (
							<Fragment key={index}>
								<Image
									alt={item?.image?.altText}
									src={item?.image?.sourceUrl}
									width={item?.image?.mediaDetails?.width || 1000}
									height={item?.image?.mediaDetails?.height || 1000}
									className={item?.image?.sourceUrl ? styles.image : `hidden`}
								/>
							</Fragment>
						))}
					</InfiniteSlider>
					<InfiniteSlider className={styles.infiniteSlider} reverse={true}>
						{logoGrid?.slice(8, 14)?.map((item: any, index: number) => (
							<Fragment key={index}>
								<Image
									alt={item?.image?.altText}
									src={item?.image?.sourceUrl}
									width={item?.image?.mediaDetails?.width || 1000}
									height={item?.image?.mediaDetails?.height || 1000}
									className={item?.image?.sourceUrl ? styles.image : `hidden`}
								/>
							</Fragment>
						))}
					</InfiniteSlider>
					<InfiniteSlider className={styles.infiniteSlider}>
						{logoGrid?.slice(15, 21)?.map((item: any, index: number) => (
							<Fragment key={index}>
								<Image
									alt={item?.image?.altText}
									src={item?.image?.sourceUrl}
									width={item?.image?.mediaDetails?.width || 1000}
									height={item?.image?.mediaDetails?.height || 1000}
									className={item?.image?.sourceUrl ? styles.image : `hidden`}
								/>
							</Fragment>
						))}
					</InfiniteSlider>
				</div>
			</div>
		</div>
	);
};

export default PartnersLogos;
