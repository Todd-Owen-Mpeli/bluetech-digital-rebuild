		// Imports
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { Suspense, JSX, ReactNode } from "react";
import { IGlobal } from "@/context/types/context";
import { locales, defaultLocale } from "@/context/constants";

// Global Styling
import "@/styles/globals.css";

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

// Static UI dictionary + global CMS chrome translation
import { getDictionary } from "@/i18n/dictionaries";
import { translateGlobalChrome } from "@/i18n/translateContent";

// Context Providers Components
import GlobalContextProvider from "@/context/providers/GlobalContextProvider";
import CookiePolicyContextProvider from "@/context/providers/CookiePolicyContextProvider";

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

/**
 * Pre-render only the default locale — English needs no translation calls, so
 * it's free to build statically. Every other locale renders on demand
 * (`dynamicParams` stays true, Next's default) so the build never storms
 * Azure Translator, and each translated fetch is cached for 7 days after the
 * first request.
 */
export const generateStaticParams = async (): Promise<{ locale: string }[]> => [{ locale: defaultLocale }];

/**
 * Root layout for every route (there is no `app/layout.tsx` above this — the
 * `[locale]` segment owns `<html>`). `proxy.ts` guarantees every request
 * already carries a valid, supported locale segment before this ever runs —
 * the `notFound()` guard below is genuinely defensive, not expected in normal
 * operation.
 *
 * Fetches site-wide CMS content (theme options, menu links, the current
 * locale's static UI dictionary) once here via `Promise.all`, then
 * machine-translates the menu labels + theme-options prose in exactly two
 * Azure calls total via `translateGlobalChrome` (a no-op for English).
 *
 * `testimonials`/`caseStudies`/`newsInsights` are fetched globally here but
 * have no consuming component anywhere in this codebase yet (flagged in the
 * upgrade-plan audit) — left untranslated for now since there's nothing that
 * renders them to see the difference; wire `translatePostSummaries` in once
 * a real consumer exists.
 */
const App = async ({
	children,
	params,
}: {
	children: ReactNode;
	params: Promise<{ locale: string }>;
}): Promise<JSX.Element> => {
	const { locale } = await params;

	if (!locales.includes(locale)) {
		notFound();
	}

	// proxy.ts generates this per-request and sets it as a request header;
	// GoogleTagManager (a Client Component, can't call headers() itself) needs
	// it to satisfy the nonce-based CSP's script-src.
	const nonce = (await headers()).get("x-nonce") ?? undefined;

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

		// Static UI dictionary
		getDictionary(locale),
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

		// Static UI dictionary
		dict,
	] = await Promise.all(promises);

	const { menus: localizedMenus, themeOptions: localizedThemeOptions } = await translateGlobalChrome(
		locale,
		{
			mobileLinks: mobileLinks ?? [],
			copyrightLinks: copyrightLinks ?? [],
			navbarMenuLinks: navbarMenuLinks ?? [],
			footerMenuLinks: footerMenuLinks ?? [],
			ourServicesLinks: ourServicesLinks ?? [],
		},
		themesOptionsContent ?? {}
	);

	const globalProps: IGlobal.IProps = {
		locale,

		// Custom Post Types
		themesOptionsContent: localizedThemeOptions,

		// Case Studies, News & Testimonials Custom Post Types
		caseStudies: caseStudies,
		newsInsights: newsInsights,
		testimonials: testimonials,
		newsInsightsThreeCards: newsInsightsThreeCards,

		// Website Links
		mobileLinks: localizedMenus.mobileLinks,
		copyrightLinks: localizedMenus.copyrightLinks,
		navbarMenuLinks: localizedMenus.navbarMenuLinks,
		footerMenuLinks: localizedMenus.footerMenuLinks,
		ourServicesLinks: localizedMenus.ourServicesLinks,
	};

	return (
		<html lang={locale}>
			<head>
				<Suspense fallback={null}>
					<GoogleTagManager nonce={nonce} />
				</Suspense>
			</head>
			<body>
				<GoogleTagManagerNoScript />
				{/* Vercel Analytics */}
				<Analytics />
				{/* Vercel Speed Insights */}
				<SpeedInsights />
				<CookiePolicyContextProvider>
					<GlobalContextProvider globalProps={globalProps}>
						<SmoothScrolling>
							<main>
								<Navbar />
								{children}
								{/* <Footer /> */}
							</main>
							<BlurryCursorMouse />
							<BackToTopButton link={`#`} />
							<CookiePolicy dict={dict.cookiePolicy} />
						</SmoothScrolling>
					</GlobalContextProvider>
				</CookiePolicyContextProvider>
			</body>
		</html>
	);
};

export default App;
