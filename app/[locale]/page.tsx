// Imports
import {Metadata} from "next";
import {pageType, postType, flexibleContentType} from "@/context/pages";
import { translateFields, translateFlexibleContent } from "@/i18n/translateContent";
import { buildLocaleAlternates } from "@/i18n/buildAlternates";

// Queries Functions
import {getAllSeoContent} from "@/graphql/CMS/GetAllSeoContent";
import {getAllFlexibleContentComponents} from "@/graphql/CMS/GetAllFlexibleContentComponents";

// Components
import PageContextProvider from "@/context/providers/PageContextProvider";
import RenderFlexibleContent from "@/components/FlexibleContent/RenderFlexibleContent";
import PreloaderAnimation from "@/components/Global/PreloaderAnimation/PreloaderAnimation";

type IParams = { params: Promise<{ locale: string }> };

// Home Page Generated Metadata
export const generateMetadata = async ({ params }: IParams): Promise<Metadata> => {
	const { locale } = await params;
	const seo: any = await getAllSeoContent(pageType?.home, postType?.pages);

	// Yoast's `canonical`/`opengraphUrl` are absolute URLs on the CMS's own
	// origin, with no locale segment — rendering either directly would leak
	// the real CMS hostname and point at the wrong (un-prefixed) page.
	// buildLocaleAlternates builds canonical + hreflang from SITE_URL instead.
	const translated = await translateFields(
		{ title: seo?.title, metaDesc: seo?.metaDesc, opengraphTitle: seo?.opengraphTitle, opengraphDescription: seo?.opengraphDescription },
		locale
	);
	const alternates = buildLocaleAlternates(locale, "");

	return {
		title: translated.title,
		description: translated.metaDesc,
		openGraph: {
			type: 'website',
			url: alternates.canonical,
			title: translated.opengraphTitle,
			siteName: seo?.opengraphSiteName,
			description: translated.opengraphDescription
		},
		alternates,
		robots: {
			follow: true,
			index: true
		}
	};
};

const HomePage = async ({ params }: IParams): Promise<React.JSX.Element> => {
	const { locale } = await params;

	// Fetch priority content
	const flexibleContentComponents: any = await getAllFlexibleContentComponents(
		pageType?.home,
		postType?.pages,
		flexibleContentType?.pages
	);

	const translatedContent: any = await translateFlexibleContent(flexibleContentComponents?.content, locale);

	return (
		<PageContextProvider
			content={translatedContent}
			postTypeFlexibleContent={flexibleContentType?.pages}
		>
			<PreloaderAnimation />
			<RenderFlexibleContent />
		</PageContextProvider>
	);
};

export default HomePage;
