// Imports
import { Suspense } from "react";
import type {AppProps} from "next/app";
import {IGlobal} from "@/context/types/context";

// Global Styling
import "@/styles/globals.scss";

// Queries Functions
import {
	getMobileLinks,
	getCopyrightLinks,
	getFooterMenuLinks,
	getNavbarMenuLinks,
	getOurServicesSublinks,
} from "@/graphql/CMS/GetAllMenuLinks";
import {
	getAllNewsInsightsContent,
	getThreeNewsInsightsContent,
} from "@/graphql/CMS/GetAllNewsInsights";
import {getThemesOptionsContent} from "@/graphql/CMS/GetAllThemesOptions";
import {getAllCaseStudiesContent} from "@/graphql/CMS/GetAllCaseStudies";
import {getAllTestimonialsContent} from "@/graphql/CMS/GetAllTestimonials";

// Context Providers Components
import GlobalContextProvider from "@/context/providers/GlobalContextProvider";
import ApolloContextProvider from "@/context/providers/ApolloContextProvider";
import CookiePolicyContextProvider from "@/context/providers/CookiePolicyContextProvider";
import GoogleTranslateContextProvider from "@/context/providers/GoogleTranslateContextProvider";

// Components
// import Footer from "@/components/Global/Footer";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "@/components/Global/Navbar/Navbar";
import { SpeedInsights } from "@vercel/speed-insights/next";
import SmoothScrolling from "@/components/Global/SmoothScrolling";
import CookiePolicy from "@/components/Global/CookiePolicy/CookiePolicy";
import BlurryCursorMouse from "@/components/Global/BlurryCursorMouse/BlurryCursorMouse";
import BackToTopButton from "@/components/Global/Elements/BackToTopButton/BackToTopButton";
import GoogleTagManager, { GoogleTagManagerNoScript } from "@/components/Global/Analytics/GoogleTagManager";

const App = async ({children}: AppProps | any) => {
	// PUBLIC PAGES //
	/* Fetch all global content
	remaining content simultaneously */
	const promises: Promise<any>[] = [

		// Custom Post Types
		getThemesOptionsContent(),

		// Case Studies, News & Testimonials Custom Post Types
		getAllCaseStudiesContent(),
		getAllNewsInsightsContent(),
		getAllTestimonialsContent(),
		getThreeNewsInsightsContent(),

		// Website Links
		getMobileLinks(),
		getCopyrightLinks(),
		getNavbarMenuLinks(),
		getFooterMenuLinks(),
		getOurServicesSublinks(),
	];

	const [

		// Custom Post Types
		themesOptionsContent,
		
		// Case Studies, News & Testimonials Custom Post Types
		caseStudies,
		newsInsights,
		testimonials,
		newsInsightsThreeCards,

		// Website Links
		mobileLinks,
		copyrightLinks,
		navbarMenuLinks,
		footerMenuLinks,
		ourServicesLinks,
	] = await Promise.all(promises);

	const globalProps: IGlobal.IProps = {
		// Custom Post Types
		themesOptionsContent: themesOptionsContent,
		
		// Case Studies, News & Testimonials Custom Post Types
		caseStudies: caseStudies,
		newsInsights: newsInsights,
		testimonials: testimonials,
		newsInsightsThreeCards: newsInsightsThreeCards,
		
		// Website Links
		mobileLinks: mobileLinks,
		copyrightLinks: copyrightLinks,
		navbarMenuLinks: navbarMenuLinks,
		footerMenuLinks: footerMenuLinks,
		ourServicesLinks: ourServicesLinks,
	};

	return (
		<html lang="en">
			<head>
				<Suspense fallback={null}>
					<GoogleTagManager />
				</Suspense>
			</head>
			<GoogleTagManagerNoScript />
			{/* Vercel Analytics */}
			<Analytics />
			{/* Vercel Speed Insights */}
			<SpeedInsights />
			<body>
				<ApolloContextProvider>
					<CookiePolicyContextProvider>
						<GlobalContextProvider globalProps={globalProps}>
							<GoogleTranslateContextProvider>
								<SmoothScrolling>
									<main>
										<Navbar />
										{children}
										{/* <Footer /> */}
									</main>
									<BlurryCursorMouse />
									<BackToTopButton link={`#`} />
									<CookiePolicy />
								</SmoothScrolling>
							</GoogleTranslateContextProvider>
						</GlobalContextProvider>
					</CookiePolicyContextProvider>
				</ApolloContextProvider>
			</body>
		</html>
	);
};

export default App;
