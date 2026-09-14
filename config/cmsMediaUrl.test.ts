import { describe, it, expect, afterEach, vi } from "vitest";

const originalEnv = { ...process.env };

const importFresh = async () => {
	vi.resetModules();
	return import("./cmsMediaUrl");
};

// CMS_API_URL is the primary origin — the WPGraphQL endpoint lives under a
// path prefix (`/website_bffab4f5/graphql`), so `CMS_SITE_URL` is derived by
// dropping the trailing `/graphql`. CMS_URL/DEV_CMS_URL are kept as fallback
// origins for content that ever links to the production host directly.
const setCmsEnv = () => {
	process.env.CMS_API_URL = "https://vzt.nmy.mybluehost.me/website_bffab4f5/graphql";
	process.env.CMS_URL = "https://cmsbluetechdigital.co.uk";
	process.env.DEV_CMS_URL = "https://vzt.nmy.mybluehost.me";
};

describe("rewriteCmsMediaUrl", () => {
	afterEach(() => {
		process.env = { ...originalEnv };
	});

	it("rewrites a URL under the CMS_API_URL-derived site root to the media proxy path, dropping wp-content/uploads/", async () => {
		setCmsEnv();
		const { rewriteCmsMediaUrl } = await importFresh();
		expect(
			rewriteCmsMediaUrl("https://vzt.nmy.mybluehost.me/website_bffab4f5/wp-content/uploads/2025/01/hero.jpg"),
		).toBe("/api/media/2025/01/hero.jpg");
	});

	it("rewrites a URL under the production CMS_URL fallback origin too", async () => {
		setCmsEnv();
		const { rewriteCmsMediaUrl } = await importFresh();
		expect(rewriteCmsMediaUrl("https://cmsbluetechdigital.co.uk/wp-content/uploads/x.pdf")).toBe(
			"/api/media/x.pdf",
		);
	});

	it("passes through null/undefined/empty unchanged", async () => {
		setCmsEnv();
		const { rewriteCmsMediaUrl } = await importFresh();
		expect(rewriteCmsMediaUrl(null)).toBeNull();
		expect(rewriteCmsMediaUrl(undefined)).toBeUndefined();
		expect(rewriteCmsMediaUrl("")).toBe("");
	});

	it("passes through a URL on an unrelated host unchanged", async () => {
		setCmsEnv();
		const { rewriteCmsMediaUrl } = await importFresh();
		expect(rewriteCmsMediaUrl("https://example.com/img.jpg")).toBe("https://example.com/img.jpg");
	});

	it("rewrites a Jetpack-Photon-wrapped CMS upload to the media proxy path", async () => {
		setCmsEnv();
		const { rewriteCmsMediaUrl } = await importFresh();
		expect(
			rewriteCmsMediaUrl(
				"https://i0.wp.com/vzt.nmy.mybluehost.me/website_bffab4f5/wp-content/uploads/2025/01/logo-min.jpg?fit=2560%2C1661&ssl=1",
			),
		).toBe("/api/media/2025/01/logo-min.jpg");
	});

	it("rewrites a Photon URL on any of the i0-i3 subdomains", async () => {
		setCmsEnv();
		const { rewriteCmsMediaUrl } = await importFresh();
		expect(
			rewriteCmsMediaUrl("https://i3.wp.com/vzt.nmy.mybluehost.me/website_bffab4f5/wp-content/uploads/x.png"),
		).toBe("/api/media/x.png");
	});

	it("is a no-op on a Photon URL when no CMS origin env vars are set", async () => {
		delete process.env.CMS_API_URL;
		delete process.env.CMS_URL;
		delete process.env.DEV_CMS_URL;
		const { rewriteCmsMediaUrl } = await importFresh();
		const url = "https://i0.wp.com/vzt.nmy.mybluehost.me/website_bffab4f5/wp-content/uploads/hero.jpg";
		expect(rewriteCmsMediaUrl(url)).toBe(url);
	});

	it("passes through an already-proxied root-relative path unchanged (idempotent)", async () => {
		setCmsEnv();
		const { rewriteCmsMediaUrl } = await importFresh();
		expect(rewriteCmsMediaUrl("/api/media/x.jpg")).toBe("/api/media/x.jpg");
	});

	it("is a no-op when no CMS origin env vars are set", async () => {
		delete process.env.CMS_API_URL;
		delete process.env.CMS_URL;
		delete process.env.DEV_CMS_URL;
		const { rewriteCmsMediaUrl } = await importFresh();
		const url = "https://vzt.nmy.mybluehost.me/website_bffab4f5/wp-content/uploads/hero.jpg";
		expect(rewriteCmsMediaUrl(url)).toBe(url);
	});

	it("never leaves the WordPress-specific wp-content/uploads/ directory name in the rewritten path", async () => {
		setCmsEnv();
		const { rewriteCmsMediaUrl } = await importFresh();
		const bare = rewriteCmsMediaUrl("https://vzt.nmy.mybluehost.me/website_bffab4f5/wp-content/uploads/2025/hero.jpg");
		const photon = rewriteCmsMediaUrl(
			"https://i0.wp.com/vzt.nmy.mybluehost.me/website_bffab4f5/wp-content/uploads/2025/hero.jpg",
		);
		expect(bare).not.toContain("wp-content");
		expect(photon).not.toContain("wp-content");
	});
});

describe("rewriteCmsUrlsInHtml", () => {
	afterEach(() => {
		process.env = { ...originalEnv };
	});

	it("rewrites an <img src> pointing at the CMS origin, dropping wp-content/uploads/", async () => {
		setCmsEnv();
		const { rewriteCmsUrlsInHtml } = await importFresh();
		expect(
			rewriteCmsUrlsInHtml('<img src="https://vzt.nmy.mybluehost.me/website_bffab4f5/wp-content/uploads/a.jpg">'),
		).toBe('<img src="/api/media/a.jpg">');
	});

	it("rewrites a linked document's href pointing at the CMS origin", async () => {
		setCmsEnv();
		const { rewriteCmsUrlsInHtml } = await importFresh();
		expect(
			rewriteCmsUrlsInHtml(
				'<a href="https://vzt.nmy.mybluehost.me/website_bffab4f5/wp-content/uploads/report.pdf">Report</a>',
			),
		).toBe('<a href="/api/media/report.pdf">Report</a>');
	});

	it("rewrites multiple occurrences across both src and href in one pass", async () => {
		setCmsEnv();
		const { rewriteCmsUrlsInHtml } = await importFresh();
		const html =
			'<p>See <a href="https://vzt.nmy.mybluehost.me/website_bffab4f5/wp-content/uploads/a.pdf">A</a> and ' +
			'<img src="https://vzt.nmy.mybluehost.me/website_bffab4f5/wp-content/uploads/b.jpg"> and ' +
			'<a href="https://vzt.nmy.mybluehost.me/website_bffab4f5/wp-content/uploads/c.pdf">C</a></p>';
		const result = rewriteCmsUrlsInHtml(html);
		expect(result).not.toContain("vzt.nmy.mybluehost.me");
		expect(result).toContain('href="/api/media/a.pdf"');
		expect(result).toContain('src="/api/media/b.jpg"');
		expect(result).toContain('href="/api/media/c.pdf"');
	});

	it("rewrites a Photon-wrapped <img src> too, dropping its own resize query string", async () => {
		setCmsEnv();
		const { rewriteCmsUrlsInHtml } = await importFresh();
		expect(
			rewriteCmsUrlsInHtml(
				'<img src="https://i0.wp.com/vzt.nmy.mybluehost.me/website_bffab4f5/wp-content/uploads/a.jpg?fit=2560%2C1661&ssl=1">',
			),
		).toBe('<img src="/api/media/a.jpg">');
	});

	it("leaves markup with no CMS URLs untouched", async () => {
		setCmsEnv();
		const { rewriteCmsUrlsInHtml } = await importFresh();
		const html = "<p>Plain text with <strong>no links</strong>.</p>";
		expect(rewriteCmsUrlsInHtml(html)).toBe(html);
	});

	it("returns an empty string for a falsy input", async () => {
		setCmsEnv();
		const { rewriteCmsUrlsInHtml } = await importFresh();
		expect(rewriteCmsUrlsInHtml(null)).toBe("");
		expect(rewriteCmsUrlsInHtml(undefined)).toBe("");
	});
});

describe("rewriteCmsUrlsDeep", () => {
	afterEach(() => {
		process.env = { ...originalEnv };
	});

	it("rewrites a bare URL field nested inside an object", async () => {
		setCmsEnv();
		const { rewriteCmsUrlsDeep } = await importFresh();
		const input = {
			featuredImage: { node: { sourceUrl: "https://vzt.nmy.mybluehost.me/website_bffab4f5/wp-content/uploads/a.jpg" } },
		};
		expect(rewriteCmsUrlsDeep(input)).toEqual({
			featuredImage: { node: { sourceUrl: "/api/media/a.jpg" } },
		});
	});

	it("rewrites a WYSIWYG HTML field alongside a bare URL field in the same object", async () => {
		setCmsEnv();
		const { rewriteCmsUrlsDeep } = await importFresh();
		const input = {
			content: '<img src="https://vzt.nmy.mybluehost.me/website_bffab4f5/wp-content/uploads/body.jpg">',
			featuredImage: { sourceUrl: "https://vzt.nmy.mybluehost.me/website_bffab4f5/wp-content/uploads/hero.jpg" },
			title: "A perfectly ordinary title",
		};
		const result = rewriteCmsUrlsDeep(input) as typeof input;
		expect(result.content).toBe('<img src="/api/media/body.jpg">');
		expect(result.featuredImage.sourceUrl).toBe("/api/media/hero.jpg");
		expect(result.title).toBe("A perfectly ordinary title");
	});

	it("rewrites URLs inside arrays, including arrays of objects (flexible-content blocks)", async () => {
		setCmsEnv();
		const { rewriteCmsUrlsDeep } = await importFresh();
		const input = [
			{
				fieldGroupName: "Hero",
				backgroundImage: { sourceUrl: "https://vzt.nmy.mybluehost.me/website_bffab4f5/wp-content/uploads/hero.jpg" },
			},
			{ fieldGroupName: "TitleParagraph", title: "Nothing to rewrite here" },
		];
		const result = rewriteCmsUrlsDeep(input) as typeof input;
		expect(result[0]?.backgroundImage?.sourceUrl).toBe("/api/media/hero.jpg");
		expect(result[1]?.title).toBe("Nothing to rewrite here");
	});

	it("rewrites a Photon-wrapped bare URL field nested inside an object", async () => {
		setCmsEnv();
		const { rewriteCmsUrlsDeep } = await importFresh();
		const input = {
			featuredImage: {
				node: {
					sourceUrl:
						"https://i0.wp.com/vzt.nmy.mybluehost.me/website_bffab4f5/wp-content/uploads/2025/01/logo-min.jpg?fit=2560%2C1661&ssl=1",
				},
			},
		};
		expect(rewriteCmsUrlsDeep(input)).toEqual({
			featuredImage: { node: { sourceUrl: "/api/media/2025/01/logo-min.jpg" } },
		});
	});

	it("leaves numbers, booleans, and null untouched", async () => {
		setCmsEnv();
		const { rewriteCmsUrlsDeep } = await importFresh();
		const input = { count: 3, active: true, missing: null };
		expect(rewriteCmsUrlsDeep(input)).toEqual(input);
	});

	it("never mutates the original input", async () => {
		setCmsEnv();
		const { rewriteCmsUrlsDeep } = await importFresh();
		const input = { sourceUrl: "https://vzt.nmy.mybluehost.me/website_bffab4f5/wp-content/uploads/a.jpg" };
		const frozen = JSON.parse(JSON.stringify(input));
		rewriteCmsUrlsDeep(input);
		expect(input).toEqual(frozen);
	});
});
