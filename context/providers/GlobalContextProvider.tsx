"use client";

// Imports
import {FC} from "react";
import {m} from "framer-motion";
import {GlobalContext} from "@/context/global";
import {IGlobal} from "@/context/types/context";

const GlobalContextProvider: FC<IGlobal.IContextProvider> = ({
	children,
	globalProps,
}) => {
	return (
		<GlobalContext.Provider
			value={{
				locale: globalProps?.locale,

				// Custom Post Types
				themesOptionsContent: globalProps?.themesOptionsContent,
				
				// Case Studies, News & Testimonials Custom Post Types
				caseStudies: globalProps?.caseStudies,
				newsInsights: globalProps?.newsInsights,
				testimonials: globalProps?.testimonials,
				newsInsightsThreeCards: globalProps?.newsInsightsThreeCards,
				
				// Website Links
				mobileLinks: globalProps?.mobileLinks,
				copyrightLinks: globalProps?.copyrightLinks,
				navbarMenuLinks: globalProps?.navbarMenuLinks,
				footerMenuLinks: globalProps?.footerMenuLinks,
				ourServicesLinks: globalProps?.ourServicesLinks,
			}}
		>
			<m.div
				exit={{
					opacity: 0,
				}}
				initial="initial"
				animate="animate"
			>
				{children}
			</m.div>
		</GlobalContext.Provider>
	);
};

export default GlobalContextProvider;
