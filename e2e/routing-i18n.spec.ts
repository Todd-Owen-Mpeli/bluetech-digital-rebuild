import { test, expect } from "@playwright/test";
import { GRAPHQL_ORIGIN, NEXT_ORIGIN } from "./fixtures/env.mjs";

test.beforeEach(async ({ request }) => {
	await request.post(`${GRAPHQL_ORIGIN}/__reset`);
});

test("redirects an un-prefixed path to the default locale", async ({ page }) => {
	// maxRedirects: 0 + a string/regex check on Location, not `new URL(header)` —
	// a relative Location header throws "Invalid URL" if you try to parse it.
	const response = await page.request.get("/", { maxRedirects: 0 });
	expect(response.status()).toBe(307);
	expect(response.headers()["location"]).toMatch(/\/en$/);
});

test("prefers the NEXT_LOCALE cookie over Accept-Language", async ({ browser }) => {
	const context = await browser.newContext({
		extraHTTPHeaders: { "accept-language": "fr" },
	});
	await context.addCookies([{ name: "NEXT_LOCALE", value: "de", url: NEXT_ORIGIN }]);
	const page = await context.newPage();
	const response = await page.request.get("/", { maxRedirects: 0 });
	expect(response.headers()["location"]).toMatch(/\/de$/);
	await context.close();
});

test("falls back to Accept-Language when there is no locale cookie", async ({ browser }) => {
	const context = await browser.newContext({ extraHTTPHeaders: { "accept-language": "fr-FR,fr;q=0.9" } });
	const page = await context.newPage();
	const response = await page.request.get("/", { maxRedirects: 0 });
	expect(response.headers()["location"]).toMatch(/\/fr$/);
	await context.close();
});

test("falls back to the default locale when Accept-Language matches nothing supported", async ({ browser }) => {
	const context = await browser.newContext({ extraHTTPHeaders: { "accept-language": "ja-JP,ja;q=0.9" } });
	const page = await context.newPage();
	const response = await page.request.get("/", { maxRedirects: 0 });
	expect(response.headers()["location"]).toMatch(/\/en$/);
	await context.close();
});

test("static asset paths are not redirected", async ({ page }) => {
	for (const path of ["/robots.txt", "/sitemap.xml"]) {
		const response = await page.request.get(path, { maxRedirects: 0 });
		expect(response.status(), `${path} should not redirect`).toBe(200);
	}
});

test("<html lang> matches the active locale", async ({ page }) => {
	await page.goto("/de");
	await expect(page.locator("html")).toHaveAttribute("lang", "de");
});

test("an extension-less /api route is never locale-redirected", async ({ page }) => {
	// A unit test on proxy() alone can't catch this — the matcher config runs
	// as framework-level routing before proxy() is even invoked. `_next` and a
	// dotted-extension check alone don't exclude /api: an extension-less path
	// like /api/media/2025/hero has no `.` for that second clause to catch, so
	// without an explicit `api` exclusion it would 307 to
	// `/en/api/media/2025/hero` — a route that doesn't exist.
	const response = await page.request.get("/api/media/no-extension-path", { maxRedirects: 0 });
	expect(response.status()).not.toBe(307);
});

test("the LocaleSwitcher changes the page's locale and sets the NEXT_LOCALE cookie", async ({ page, context }) => {
	await context.addCookies([{ name: "cookie-consent", value: "accepted", url: NEXT_ORIGIN }]);
	await page.goto("/en");

	await page.getByRole("button", { name: /change language/i }).click();
	await page.getByRole("option", { name: "Deutsch" }).click();

	await expect(page).toHaveURL(/\/de$/);
	const cookies = await context.cookies();
	expect(cookies.find((cookie) => cookie.name === "NEXT_LOCALE")?.value).toBe("de");
});
