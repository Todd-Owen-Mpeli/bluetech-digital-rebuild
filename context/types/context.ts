// Imports
import {
	ILinks,
	IContent,
	INewsCaseStudies,
	ICustomPostTypes
} from "@/types/context";

/* CONTEXT PROVIDERS  */
/* POST: Project Types, Content 
& Content Provider Interface */
export namespace IPost {
	export type ITypes = {
		pages: string;
		posts: string;
		previewPage: string;
		previewPost: string;
		caseStudies: string;
		testimonials: string;
	};
}

/* PAGE: Project Types, Content 
& Content Provider Interface */
export namespace IPage {
	export type ITypes = {
		home: string;
		services: string;
	};
	export type IContext = {
		memoizedValues: {
			content: IContent;
			postTypeFlexibleContent: string;
		}
	};
	export type IContextProvider = {
		content: IContent;
		children: React.ReactNode;
		postTypeFlexibleContent: string;
	};
}

/* GLOBAL: Project Props, Content 
& Content Provider Interface */
export namespace IGlobal {
    export type IProps = {
        // Custom Post Types
		themesOptionsContent: ICustomPostTypes.IThemesOptions;
		
		// Case Studies, News & Testimonials Custom Post Types
		caseStudies: INewsCaseStudies.ICaseStudies;
		testimonials: ICustomPostTypes.ITestimonials;
		newsInsights: INewsCaseStudies.INewsInsights;
		newsInsightsThreeCards: INewsCaseStudies.INewsInsights;
		
		// Website Links
		mobileLinks: ILinks.IMobileLinks;
		copyrightLinks: ILinks.ICopyrightLinks;
		navbarMenuLinks: ILinks.INavbarMenuLinks;
		footerMenuLinks: ILinks.IFooterMenuLinks;
		ourServicesLinks: ILinks.IOurServicesLinks;


	};
	export type IContext = IProps;

	export type IContextProvider = {
		globalProps: IProps;
		children: React.ReactNode;
	};  
}

/* APOLLO CLIENT: Content Provider Interface */
export namespace IApollo {
	export type IContextProvider = {
		children: React.ReactNode;
	};
}

/* GOOGLE TRANSLATE: Content 
& Content Provider Interface */
export namespace IGoogleTranslate {
	export type IContext = {
        isGoogleTranslateScriptLoaded: boolean;
        initializeGoogleTranslateWidget: () => void;
	};
	export type IContextProvider = {
		children: React.ReactNode;
	};
    
}

/* COOKIE POLICY: Content 
& Content Provider Interface */
export namespace ICookiePolicy {
	export type IContext = {
		acceptCookies: () => void;
		refuseCookies: () => void;
		hasConsent: boolean | null;
	};
	export type IContextProvider = {
		children: React.ReactNode;
	};
    
}

export namespace IFlexibleContentType {
	export type ITypes = {
		pages: string;
		previewPage: string;
		previewPost: string;
	};
}