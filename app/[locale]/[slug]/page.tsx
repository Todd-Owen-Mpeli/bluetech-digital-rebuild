// Imports
import { JSX } from "react";
import {Metadata} from "next";
import {notFound} from "next/navigation";
import {flexibleContentType, postType} from "@/context/pages";
import { translateFields, translateFlexibleContent } from "@/i18n/translateContent";
import { buildLocaleAlternates } from "@/i18n/buildAlternates";

// Queries Functions
import {getAllSeoContent} from "@/graphql/CMS/GetAllSeoContent";
import {getAllFlexibleContentComponents} from "@/graphql/CMS/GetAllFlexibleContentComponents";

// Components
import PageContextProvider from "@/context/providers/PageContextProvider";
import BackToTopButton from "@/components/Global/Elements/BackToTopButton/BackToTopButton";
import RenderFlexibleContent from "@/components/FlexibleContent/RenderFlexibleContent";

// Dynamic Pages Generated Metadata
export const generateMetadata = async ({params}: any): Promise<Metadata> => {
	const { locale, slug } = await params;
	const seo: any = await getAllSeoContent(slug, postType?.pages);

	// Yoast's `canonical`/`opengraphUrl` are absolute URLs on the CMS's own
	// origin, with no locale segment — rendering either directly would leak
	// the real CMS hostname and point at the wrong (un-prefixed) page.
	// buildLocaleAlternates builds canonical + hreflang from SITE_URL instead.
	const translated = await translateFields(
		{ title: seo?.title, metaDesc: seo?.metaDesc, opengraphTitle: seo?.opengraphTitle, opengraphDescription: seo?.opengraphDescription },
		locale
	);
	const alternates = buildLocaleAlternates(locale, `/${slug}`);

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

const DynamicPages = async ({params}: any): Promise<JSX.Element> => {
	const { locale, slug } = await params;

	// Fetch priority content
	const flexibleContentComponents: any = await getAllFlexibleContentComponents(
		slug,
		postType?.pages,
		flexibleContentType?.pages
	);

	// A nonexistent slug and a failing GraphQL query (fetchCmsGraphQL returns
	// null on any GraphQL-level error) both resolve `content` to `undefined` —
	// neither should render an empty shell page or crash; a clean 404 instead.
	if (!flexibleContentComponents?.content?.length) {
		notFound();
	}

	const translatedContent: any = await translateFlexibleContent(flexibleContentComponents?.content, locale);

	return (
		<>
			<PageContextProvider
				content={translatedContent}
				postTypeFlexibleContent={flexibleContentType?.pages}
			>
				<BackToTopButton link={`#`} />
				<RenderFlexibleContent />
			</PageContextProvider>
		</>
	);
};

export default DynamicPages;
