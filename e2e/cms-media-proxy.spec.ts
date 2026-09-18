import { test, expect } from "@playwright/test";
import { GRAPHQL_ORIGIN, NEXT_ORIGIN } from "./fixtures/env.mjs";

/**
 * Proves the CMS-origin-masking rewrite end to end, not just that a URL
 * string got rewritten somewhere. The fixture's PartnersLogos block links
 * directly at this fake CMS's own origin (`e2e/fixtures/data.mjs`'s `image`)
 * — the app's `CMS_API_URL` points at that same origin, so this stands in
 * for a real block linking at the real CMS.
 */

test.beforeEach(async ({ request, context }) => {
	await request.post(`${GRAPHQL_ORIGIN}/__reset`);
	await context.addCookies([{ name: "cookie-consent", value: "accepted", url: NEXT_ORIGIN }]);
});

test("a PartnersLogos image is rewritten to the /api/media proxy, and the CMS origin never appears in the page", async ({
	page,
}) => {
	await page.goto("/en");

	const img = page.getByRole("img", { name: "Fixture image" }).first();
	const src = await img.getAttribute("src");
	expect(src).toContain("%2Fapi%2Fmedia%2F2025%2F01%2Ffixture.jpg");

	// The strongest form of the assertion — catches anything the rewrite
	// layer missed, not just the one image this test happens to check.
	const html = await page.content();
	expect(html).not.toContain(new URL(GRAPHQL_ORIGIN).host);
	// Not just the hostname: the WordPress-specific directory name itself is
	// stripped too, so the rendered page never even hints the CMS is WordPress.
	expect(html).not.toContain("wp-content");
});

test("the proxied path actually serves the real file from the CMS, fetched from wp-content/uploads/ even though the public path never says so", async ({
	page,
}) => {
	const response = await page.request.get("/api/media/2025/01/fixture.jpg");
	expect(response.status()).toBe(200);
	expect(response.headers()["content-type"]).toBe("image/jpeg");
});

// Neither a WordPress admin/API-shaped request nor a path-traversal attempt is
// tested for a 404 here — both are already unit-tested in route.test.ts,
// calling the route handler directly with a raw `path` array (the only way to
// exercise a shape no real HTTP client would ever produce; the WHATWG URL
// parser collapses `..` segments during URL construction itself, before a
// real request carrying one could ever reach this route).
