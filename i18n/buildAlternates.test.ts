import { describe, it, expect, afterEach, vi } from "vitest";

const originalEnv = { ...process.env };

const importFresh = async () => {
	vi.resetModules();
	return import("./buildAlternates");
};

describe("buildLocaleAlternates", () => {
	afterEach(() => {
		process.env = { ...originalEnv };
	});

	it("builds the canonical URL for the given locale and path", async () => {
		process.env.SITE_URL = "https://bluetech-digital.co.uk/";
		const { buildLocaleAlternates } = await importFresh();

		expect(buildLocaleAlternates("fr", "/about").canonical).toBe("https://bluetech-digital.co.uk/fr/about");
	});

	it("strips a trailing slash from SITE_URL before concatenating (no double slash)", async () => {
		process.env.SITE_URL = "https://bluetech-digital.co.uk/";
		const { buildLocaleAlternates } = await importFresh();

		expect(buildLocaleAlternates("en", "/").canonical).not.toContain("co.uk//");
	});

	it("builds a `languages` entry for every supported locale plus x-default", async () => {
		process.env.SITE_URL = "https://bluetech-digital.co.uk";
		const { buildLocaleAlternates } = await importFresh();

		const { languages } = buildLocaleAlternates("de", "/about");
		expect(languages.en).toBe("https://bluetech-digital.co.uk/en/about");
		expect(languages.fr).toBe("https://bluetech-digital.co.uk/fr/about");
		expect(languages.de).toBe("https://bluetech-digital.co.uk/de/about");
		expect(languages["x-default"]).toBe("https://bluetech-digital.co.uk/about");
	});

	it("the home page's empty path produces a bare-root x-default", async () => {
		process.env.SITE_URL = "https://bluetech-digital.co.uk";
		const { buildLocaleAlternates } = await importFresh();

		expect(buildLocaleAlternates("en", "").languages["x-default"]).toBe("https://bluetech-digital.co.uk");
	});
});
