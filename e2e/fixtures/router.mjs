// -----------------------------------------------------------------------------
// Matches an incoming WPGraphQL POST body to a canned response.
//
// Every query in graphql/CMS/*.ts is a bare, anonymous `{ ... }` string (no
// `query OperationName(...)` wrapper, no separate `variables` object — values
// like `slug` are string-interpolated directly into the query text). So
// matching happens on distinguishing substrings within the query text itself
// — each top-level field alias (`navbarMenuLinks:`, `mainContent:`, …) is
// unique enough per query file — rather than on an operation name or a
// `variables` object, neither of which this codebase's queries carry.
// -----------------------------------------------------------------------------

import * as data from "./data.mjs";

/** @type {{ query: string }[]} */
export const requestLog = [];

export const resetLog = () => {
	requestLog.length = 0;
};

const ok = (payload) => ({ status: 200, body: { data: payload } });
const errored = (message) => ({ status: 200, body: { errors: [{ message }] } });

// GetAllSeoContent.ts / GetAllFlexibleContentComponents.ts both string-interpolate
// `slug` into `where: {name: "<slug>", ...}` rather than using a GraphQL variable.
// The homepage is the one exception: app/[locale]/page.tsx queries by
// `pageType.home` ("Home", the WordPress page's *title*), not a URL slug —
// confirmed against context/pages.ts — so it's mapped back to the fixture's
// "home" entry explicitly rather than needing its own oddly-capitalized key.
const slugFromQuery = (query) => {
	const name = /name:\s*"([^"]+)"/.exec(query ?? "")?.[1];
	return name === "Home" ? "home" : name;
};

/**
 * @param {{ query?: string; variables?: Record<string, unknown> }} body
 */
export const handleGraphQL = (body) => {
	const query = body?.query ?? "";
	requestLog.push({ query });

	// ---- Menu links (GetAllMenuLinks.ts) --------------------------------------
	if (query.includes("navbarMenuLinks:")) return ok({ navbarMenuLinks: { edges: data.navbarMenuLinks } });
	if (query.includes("mobileLinks:")) return ok({ mobileLinks: { edges: data.mobileLinks } });
	if (query.includes("ourServicesSublinks:")) return ok({ ourServicesSublinks: { edges: data.ourServicesSublinks } });
	if (query.includes("copyrightLinks:")) return ok({ copyrightLinks: { edges: data.copyrightLinks } });
	if (query.includes("footerMenuLinks:")) return ok({ footerMenuLinks: { edges: data.footerMenuLinks } });

	// ---- Theme options (GetAllThemesOptions.ts) --------------------------------
	if (query.includes("themeOptions(")) {
		return ok({ themeOptions: { edges: [{ node: { themeOptions: data.themeOptions } }] } });
	}

	// ---- Global custom-post-type feeds (no consuming component — see the
	// upgrade-plan audit — but still fetched on every layout render) -----------
	if (query.includes("testimonialsContent:")) return ok({ testimonialsContent: { edges: [] } });
	if (query.includes("caseStudiesSlugs:")) return ok({ caseStudiesSlugs: { nodes: [] } });
	if (query.includes("caseStudiesContent:")) return ok({ caseStudiesContent: { edges: [] } });
	if (query.includes("newsInsightsSlugs:")) return ok({ newsInsightsSlugs: { nodes: [] } });
	if (query.includes("newsInsightsContent:")) return ok({ newsInsightsContent: { edges: [] } });

	// ---- Page slugs (GetAllPagesSlugs.ts) --------------------------------------
	if (query.includes("pageURLs:")) return ok({ pageURLs: { nodes: data.pageSlugs } });

	// ---- Per-page SEO / flexible content (both alias "mainContent") -----------
	if (query.includes("mainContent:")) {
		const slug = slugFromQuery(query);
		const page = data.pages[slug];

		if (query.includes("seo {")) {
			if (!page || page.errors) return ok({ mainContent: { edges: [] } });
			return ok({ mainContent: { edges: [{ node: { seo: page.seo } }] } });
		}

		if (query.includes("template {")) {
			if (!page) return ok({ mainContent: { edges: [] } });
			if (page.errors) return errored("Simulated CMS error");
			return ok({
				mainContent: {
					edges: [{ node: { template: { flexibleContent: { flexibleContent: page.blocks } } } }],
				},
			});
		}
	}

	return errored(`Unhandled fixture query: ${query.slice(0, 160)}`);
};
