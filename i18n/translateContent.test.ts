import { describe, it, expect, vi, beforeEach } from "vitest";

const getTranslatedContentMock = vi.fn();

vi.mock("@/api/Translation/GetTranslatedContent", () => ({
	getTranslatedContent: (...args: unknown[]) => getTranslatedContentMock(...args),
}));

const { translateFields, translateUiStrings, translatePostSummaries, translateBlockProse, translateFlexibleContent } =
	await import("./translateContent");

describe("translateFields", () => {
	beforeEach(() => {
		getTranslatedContentMock.mockReset();
	});

	it("is a no-op for the default locale — never calls the translator", async () => {
		const fields = { title: "Hello", metaDesc: "A description" };
		const result = await translateFields(fields, "en");

		expect(result).toBe(fields);
		expect(getTranslatedContentMock).not.toHaveBeenCalled();
	});

	it("translates plain and html fields in separate batches for a non-default locale", async () => {
		getTranslatedContentMock.mockImplementation((texts: string[], _locale: string, isHtml: boolean) =>
			Promise.resolve(texts.map((t) => (isHtml ? `<html>${t}</html>` : `[fr]${t}`)))
		);

		const result = await translateFields({ title: "Hello", paragraph: "<p>Body</p>" }, "fr", ["paragraph"]);

		expect(result.title).toBe("[fr]Hello");
		expect(result.paragraph).toBe("<html><p>Body</p></html>");
		expect(getTranslatedContentMock).toHaveBeenCalledTimes(2);
	});

	it("skips falsy fields entirely rather than round-tripping an empty string", async () => {
		getTranslatedContentMock.mockResolvedValue(["translated"]);

		await translateFields({ title: "Hello", subtitle: "" }, "fr");

		expect(getTranslatedContentMock).toHaveBeenCalledWith(["Hello"], "fr", false);
	});

	it("fails soft to the English source on a translator error", async () => {
		getTranslatedContentMock.mockRejectedValue(new Error("Azure is down"));
		const fields = { title: "Hello" };

		const result = await translateFields(fields, "fr");

		expect(result).toEqual(fields);
	});
});

describe("translateUiStrings", () => {
	beforeEach(() => {
		getTranslatedContentMock.mockReset();
	});

	it("is a no-op for the default locale", async () => {
		const strings = { showMore: "Show more" };
		expect(await translateUiStrings(strings, "en")).toBe(strings);
		expect(getTranslatedContentMock).not.toHaveBeenCalled();
	});

	it("translates every value, keyed the same way", async () => {
		getTranslatedContentMock.mockResolvedValue(["Voir plus"]);

		const result = await translateUiStrings({ showMore: "Show more" }, "fr");

		expect(result.showMore).toBe("Voir plus");
	});

	it("fails soft to the English source on a translator error", async () => {
		getTranslatedContentMock.mockRejectedValue(new Error("Azure is down"));
		const strings = { showMore: "Show more" };

		expect(await translateUiStrings(strings, "fr")).toEqual(strings);
	});
});

describe("translatePostSummaries", () => {
	beforeEach(() => {
		getTranslatedContentMock.mockReset();
	});

	it("is a no-op for the default locale", async () => {
		const posts = [{ title: "A", excerpt: "B" }];
		expect(await translatePostSummaries(posts, "en")).toBe(posts);
	});

	it("translates title/excerpt for every post, preserving other fields", async () => {
		getTranslatedContentMock.mockImplementation((texts: string[]) => Promise.resolve(texts.map((t) => `[fr]${t}`)));

		const posts = [{ title: "A", excerpt: "B", slug: "a-post" }];
		const result = await translatePostSummaries(posts, "fr");

		expect(result[0].title).toBe("[fr]A");
		expect(result[0].excerpt).toBe("[fr]B");
		expect(result[0].slug).toBe("a-post");
	});
});

describe("translateBlockProse", () => {
	beforeEach(() => {
		getTranslatedContentMock.mockReset();
	});

	it("is a no-op for the default locale", async () => {
		const item = { title: "Hello" };
		expect(await translateBlockProse(item, { plain: ["title"] }, "en")).toBe(item);
	});

	it("returns item unchanged when no spec is registered for the block", async () => {
		const item = { title: "Hello" };
		expect(await translateBlockProse(item, undefined, "fr")).toBe(item);
	});

	it("translates flat, nested, and repeater fields in one plain + one html batch", async () => {
		getTranslatedContentMock.mockImplementation((texts: string[], _locale: string, isHtml: boolean) =>
			Promise.resolve(texts.map((t) => (isHtml ? `<t>${t}</t>` : `[fr]${t}`)))
		);

		const item = {
			title: "Top title",
			buttonLink: { title: "Click me", url: "/x" },
			service: [{ title: "Service one", paragraph: "<p>Detail</p>" }],
		};

		const result = await translateBlockProse(
			item,
			{ plain: ["title"], nested: { buttonLink: { plain: ["title"] } }, repeaters: { service: { plain: ["title"], html: ["paragraph"] } } },
			"fr"
		);

		expect(result.title).toBe("[fr]Top title");
		expect((result.buttonLink as any).title).toBe("[fr]Click me");
		expect((result.buttonLink as any).url).toBe("/x");
		expect((result.service as any[])[0].title).toBe("[fr]Service one");
		expect((result.service as any[])[0].paragraph).toBe("<t><p>Detail</p></t>");
		expect(getTranslatedContentMock).toHaveBeenCalledTimes(2);
	});

	it("never mutates the original item", async () => {
		getTranslatedContentMock.mockResolvedValue(["[fr]Hello"]);
		const item = { title: "Hello" };

		await translateBlockProse(item, { plain: ["title"] }, "fr");

		expect(item.title).toBe("Hello");
	});

	it("fails soft to the English item on a translator error", async () => {
		getTranslatedContentMock.mockRejectedValue(new Error("Azure is down"));
		const item = { title: "Hello" };

		expect(await translateBlockProse(item, { plain: ["title"] }, "fr")).toBe(item);
	});
});

describe("translateFlexibleContent", () => {
	beforeEach(() => {
		getTranslatedContentMock.mockReset();
	});

	it("is a no-op for the default locale", async () => {
		const content = [{ fieldGroupName: "X_TitleParagraph", title: "Hello" }];
		expect(await translateFlexibleContent(content, "en")).toBe(content);
	});

	it("derives each block's simple name from fieldGroupName and translates its registered prose", async () => {
		getTranslatedContentMock.mockResolvedValue(["[fr]Hello"]);

		const content = [
			{ fieldGroupName: "DefaultTemplate_Flexiblecontent_FlexibleContent_TitleParagraph", title: "Hello", paragraph: "" },
		];
		const result = await translateFlexibleContent(content, "fr");

		expect(result?.[0].title).toBe("[fr]Hello");
	});

	it("leaves a block with no registered PROSE_FIELDS entry untouched", async () => {
		const content = [{ fieldGroupName: "DefaultTemplate_Flexiblecontent_FlexibleContent_PartnersLogos", logoGrid: [] }];
		const result = await translateFlexibleContent(content, "fr");

		expect(result?.[0]).toEqual(content[0]);
		expect(getTranslatedContentMock).not.toHaveBeenCalled();
	});
});
