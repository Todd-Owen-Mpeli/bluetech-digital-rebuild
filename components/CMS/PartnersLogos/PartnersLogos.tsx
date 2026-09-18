"use client";

// Imports
import Image from "next/image";
import { FC, Fragment } from "react";
import { IPartnersLogos } from "@/components/CMS/PartnersLogos/types/partnersLogos";
import useWindowSize from "@/hooks/useWindowSize";

// Styling
import styles from "@/components/CMS/PartnersLogos/styles/PartnersLogos.module.css";

// Components
import InfiniteSlider from "@/components/CMS/PartnersLogos/fragments/InfiniteSlider";

// Must match the `lg` breakpoint this component's CSS previously toggled on
// (`hidden lg:flex` / `flex lg:hidden`).
const DESKTOP_BREAKPOINT = 1024;

/**
 * Previously rendered both a desktop logo set (2 sliders, 20 logos) and a
 * mobile logo set (3 sliders, ~19 logos) simultaneously, toggled only by CSS
 * (`hidden lg:flex` / `flex lg:hidden`) — but a CSS `display:none` element's
 * `<img>` still fetches regardless of its own computed display, so every
 * visitor downloaded *both* sets on every page load, on every device.
 *
 * Rendering only the current breakpoint's set — once `useWindowSize` reports
 * a real width post-mount — avoids ever fetching the other one.
 * `width === undefined` is the SSR/pre-hydration state; rendering nothing
 * yet (rather than guessing) avoids a hydration mismatch, at the cost of a
 * brief layout shift once the real set mounts — a fixed min-height on
 * `.partnersLogosGrid` would remove that if it becomes a concern.
 */
const PartnersLogos: FC<IPartnersLogos.IProps> = ({
	logoGrid,
}) => {
	const { width } = useWindowSize();

	if (width === undefined) return null;

	const isDesktop = width >= DESKTOP_BREAKPOINT;

	return (
		<div className={styles.partnersLogos}>
			<div className={styles.container}>
				{isDesktop ? (
					<div className={styles.partnersLogosGrid + " flex"}>
						<InfiniteSlider className={styles.infiniteSlider}>
							{logoGrid?.slice(0, 10)?.map((item: any, index: number) => (
								<Fragment key={index}>
									<Image
										alt={item?.image?.altText}
										src={item?.image?.sourceUrl}
										width={item?.image?.mediaDetails?.width || 1000}
										height={item?.image?.mediaDetails?.height || 1000}
										// .image is a fixed-height logo (max 225px tall at
										// lg) with an intrinsic (auto) width inside a flex
										// slider — 300px comfortably covers realistic logo
										// aspect ratios at that height without requesting
										// the CMS-native full resolution.
										sizes="300px"
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
										sizes="300px"
										className={item?.image?.sourceUrl ? styles.image : `hidden`}
									/>
								</Fragment>
							))}
						</InfiniteSlider>
					</div>
				) : (
					<div className={styles.partnersLogosGrid + " flex"}>
						<InfiniteSlider className={styles.infiniteSlider}>
							{logoGrid?.slice(0, 7)?.map((item: any, index: number) => (
								<Fragment key={index}>
									<Image
										alt={item?.image?.altText}
										src={item?.image?.sourceUrl}
										width={item?.image?.mediaDetails?.width || 1000}
										height={item?.image?.mediaDetails?.height || 1000}
										// .image is a fixed 125px box below the md
										// breakpoint.
										sizes="125px"
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
										sizes="125px"
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
										sizes="125px"
										className={item?.image?.sourceUrl ? styles.image : `hidden`}
									/>
								</Fragment>
							))}
						</InfiniteSlider>
					</div>
				)}
			</div>
		</div>
	);
};

export default PartnersLogos;
