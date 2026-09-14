import { test, expect } from "@playwright/test";
import { GRAPHQL_ORIGIN, NEXT_ORIGIN } from "./fixtures/env.mjs";

test.beforeEach(async ({ request, context }) => {
	await request.post(`${GRAPHQL_ORIGIN}/__reset`);
	await context.addCookies([{ name: "cookie-consent", value: "accepted", url: NEXT_ORIGIN }]);
});

test("a normal page renders its flexible-content blocks", async ({ page }) => {
	await page.goto("/en/about");
	await expect(page.getByText("About the fixture site")).toBeVisible();
});

test("a slug whose GraphQL query errors degrades to a clean 404, not a crash", async ({ page }) => {
	const response = await page.goto("/en/broken");
	expect(response?.status()).toBe(404);

	const errors: Error[] = [];
	page.on("pageerror", (error) => errors.push(error));
	await page.waitForLoadState("networkidle");
	expect(errors).toEqual([]);
});

test("a slug with no matching page in the CMS degrades to a clean 404", async ({ page }) => {
	const response = await page.goto("/en/does-not-exist");
	expect(response?.status()).toBe(404);
});
