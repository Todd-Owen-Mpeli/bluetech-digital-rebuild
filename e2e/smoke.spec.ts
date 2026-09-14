import { test, expect } from "@playwright/test";
import { GRAPHQL_ORIGIN, NEXT_ORIGIN } from "./fixtures/env.mjs";

test.beforeEach(async ({ request, context }) => {
	await request.post(`${GRAPHQL_ORIGIN}/__reset`);
	// Pre-accept cookie consent so the banner never intercepts a click below it.
	await context.addCookies([{ name: "cookie-consent", value: "accepted", url: NEXT_ORIGIN }]);
});

// A smoke test per top-level route (home + the fixture's "about" page),
// across every configured locale.
const ROUTES = ["/en", "/en/about", "/fr", "/fr/about", "/de", "/de/about", "/robots.txt", "/sitemap.xml"];

for (const route of ROUTES) {
	test(`${route} returns 200 with no uncaught client exception or CSP violation`, async ({ page }) => {
		const errors: Error[] = [];
		page.on("pageerror", (error) => errors.push(error));

		// A CSP violation (e.g. a nonce mismatch on GTM's inline script) surfaces
		// as a console message, not a pageerror — reading the nonce-based CSP's
		// code isn't proof it actually works in a real browser; this is.
		// "Refused to execute inline script" / "violates the following Content
		// Security Policy directive" is Chromium's exact wording for a blocked
		// inline <script>.
		const cspViolations: string[] = [];
		page.on("console", (message) => {
			const text = message.text();
			if (/violates the following content security policy directive|refused to execute inline script/i.test(text)) {
				cspViolations.push(text);
			}
		});

		const response = await page.goto(route);
		expect(response?.status()).toBe(200);
		expect(errors).toEqual([]);
		expect(cspViolations).toEqual([]);
	});
}

test("the homepage renders the fixture's flexible-content blocks", async ({ page }) => {
	await page.goto("/en");
	await expect(page.getByText("Welcome to the fixture site")).toBeVisible();
});

test("a page fetched by slug renders that page's own content", async ({ page }) => {
	await page.goto("/en/about");
	await expect(page.getByText("About the fixture site")).toBeVisible();
});
