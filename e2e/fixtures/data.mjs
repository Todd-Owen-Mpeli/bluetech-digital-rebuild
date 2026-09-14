// -----------------------------------------------------------------------------
// Canned CMS content the fake WPGraphQL server (server.mjs/router.mjs) serves.
// Shapes match what graphql/CMS/*.ts actually requests — confirmed against
// each query's field selection, not guessed.
// -----------------------------------------------------------------------------

export const menuLink = (label, url) => ({ node: { id: url, url, label } });

export const navbarMenuLinks = [menuLink("About", "/about"), menuLink("Home", "/")];
export const mobileLinks = [menuLink("About", "/about")];
export const copyrightLinks = [menuLink("Privacy Policy", "/privacy-policy")];
export const footerMenuLinks = [menuLink("About", "/about")];
export const ourServicesSublinks = [];

export const themeOptions = {
	email: "hello@example.test",
	address: "1 Fixture Street",
	emailTwo: "",
	phoneNumber: "01234 567890",
	phoneNumberTwo: "",
	copyrightText: "Bluetech Digital Ltd (fixture)",
	textarea: "<p>Fixture footer blurb.</p>",
	facebookLink: { url: "", title: "", target: "" },
	twitterLink: { url: "", title: "", target: "" },
	linkedinLink: { url: "", title: "", target: "" },
	navbarCtaLink: { url: "/about", title: "Get in touch", target: "" },
	displayNoticeBanner: false,
	noticeBannerTextarea: "",
	errorPageContent: {
		displaySection: true,
		title: "Page not found",
		paragraph: "<p>That page doesn't exist.</p>",
		buttonLink: { url: "/", title: "Back home", target: "" },
		backgroundImage: null,
	},
};

const image = {
	altText: "Fixture image",
	sourceUrl: `http://localhost:4310/wp-content/uploads/2025/01/fixture.jpg`,
	mediaDetails: { width: 800, height: 600 },
};

/**
 * Per-slug page fixtures — `blocks` is the raw `flexibleContent` array
 * `getAllFlexibleContentComponents` returns (each item's `fieldGroupName`
 * matches `RenderFlexibleContent.tsx`'s `${postTypeFlexibleContent}_<Name>`
 * shape). `seo` matches `GetAllSeoContent`'s selection.
 */
export const pages = {
	home: {
		seo: { title: "Home", metaDesc: "Fixture home page description." },
		blocks: [
			{
				fieldGroupName: "DefaultTemplate_Flexiblecontent_FlexibleContent_TitleParagraph",
				displaySection: true,
				title: "Welcome to the fixture site",
				paragraph: "<p>Fixture paragraph content.</p>",
				displayParagraph: true,
			},
			{
				fieldGroupName: "DefaultTemplate_Flexiblecontent_FlexibleContent_PartnersLogos",
				displaySection: true,
				logoGrid: [{ image }],
			},
		],
	},
	about: {
		seo: { title: "About", metaDesc: "Fixture about page description." },
		blocks: [
			{
				fieldGroupName: "DefaultTemplate_Flexiblecontent_FlexibleContent_TitleParagraph",
				displaySection: true,
				title: "About the fixture site",
				paragraph: "<p>More fixture paragraph content.</p>",
				displayParagraph: true,
			},
		],
	},
	// A page whose GraphQL query resolves with a GraphQL error — proves a
	// failing CMS query degrades to a clean 404 rather than a crash.
	broken: { errors: true },
};

export const pageSlugs = Object.entries(pages)
	.filter(([, page]) => !page.errors)
	.map(([slug]) => ({ slug, modified: "2026-01-01T00:00:00" }));
