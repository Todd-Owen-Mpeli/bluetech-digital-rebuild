import { describe, it, expect } from "vitest";
import { getDictionary } from "./dictionaries";

describe("getDictionary", () => {
	it("loads the English dictionary", async () => {
		const dict = await getDictionary("en");
		expect(dict.cookiePolicy.accept).toBe("Accept Cookies");
	});

	it("loads the French dictionary", async () => {
		const dict = await getDictionary("fr");
		expect(dict.cookiePolicy.accept).toBe("Accepter les cookies");
	});

	it("loads the German dictionary", async () => {
		const dict = await getDictionary("de");
		expect(dict.cookiePolicy.accept).toBe("Cookies akzeptieren");
	});

	it("falls back to English for an unrecognized locale rather than throwing", async () => {
		const dict = await getDictionary("ja");
		expect(dict.cookiePolicy.accept).toBe("Accept Cookies");
	});

	it("every locale's dictionary has the same key shape as English", async () => {
		const en = await getDictionary("en");
		const fr = await getDictionary("fr");
		const de = await getDictionary("de");

		expect(Object.keys(fr).sort()).toEqual(Object.keys(en).sort());
		expect(Object.keys(fr.cookiePolicy).sort()).toEqual(Object.keys(en.cookiePolicy).sort());
		expect(Object.keys(de.cookiePolicy).sort()).toEqual(Object.keys(en.cookiePolicy).sort());
	});
});
