import { describe, it, expect, afterEach, vi } from "vitest";

const originalEnv = { ...process.env };

const importFresh = async () => {
	vi.resetModules();
	return import("./fetchCmsGraphQL");
};

describe("fetchCmsGraphQL", () => {
	afterEach(() => {
		process.env = { ...originalEnv };
		vi.unstubAllGlobals();
	});

	it("rewrites CMS-origin URLs anywhere in the response before returning it", async () => {
		process.env.CMS_API_URL = "https://vzt.nmy.mybluehost.me/website_bffab4f5/graphql";

		vi.stubGlobal(
			"fetch",
			vi.fn().mockResolvedValue({
				ok: true,
				json: async () => ({
					data: {
						testimonialsContent: {
							edges: [
								{
									node: {
										testimonialReview: {
											name: "A reviewer",
											image: {
												sourceUrl:
													"https://vzt.nmy.mybluehost.me/website_bffab4f5/wp-content/uploads/a.jpg",
											},
										},
									},
								},
							],
						},
					},
				}),
			}),
		);

		const { fetchCmsGraphQL } = await importFresh();
		const data = await fetchCmsGraphQL<{
			testimonialsContent: { edges: { node: { testimonialReview: { name: string; image: { sourceUrl: string } } } }[] };
		}>("{ testimonialsContent { edges { node { testimonialReview { name image { sourceUrl } } } } } }");

		expect(data?.testimonialsContent.edges[0].node.testimonialReview.name).toBe("A reviewer");
		expect(data?.testimonialsContent.edges[0].node.testimonialReview.image.sourceUrl).toBe("/api/media/a.jpg");
	});

	it("returns null on an HTTP failure without calling the rewrite", async () => {
		process.env.CMS_API_URL = "https://vzt.nmy.mybluehost.me/website_bffab4f5/graphql";
		vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 500, json: async () => ({}) }));

		const { fetchCmsGraphQL } = await importFresh();
		expect(await fetchCmsGraphQL("{ testimonialsContent { edges { node { testimonialReview { name } } } } }")).toBeNull();
	});

	it("returns null when the response carries GraphQL errors", async () => {
		process.env.CMS_API_URL = "https://vzt.nmy.mybluehost.me/website_bffab4f5/graphql";
		vi.stubGlobal(
			"fetch",
			vi.fn().mockResolvedValue({ ok: true, json: async () => ({ errors: [{ message: "bad query" }] }) }),
		);

		const { fetchCmsGraphQL } = await importFresh();
		expect(await fetchCmsGraphQL("{ testimonialsContent { edges { node { testimonialReview { name } } } } }")).toBeNull();
	});

	it("posts the query (and variables, when given) as JSON with next.revalidate set", async () => {
		process.env.CMS_API_URL = "https://vzt.nmy.mybluehost.me/website_bffab4f5/graphql";
		const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ data: { ok: true } }) });
		vi.stubGlobal("fetch", fetchMock);

		const { fetchCmsGraphQL } = await importFresh();
		await fetchCmsGraphQL("{ ok }", { id: "1" }, 3600);

		expect(fetchMock).toHaveBeenCalledWith(
			"https://vzt.nmy.mybluehost.me/website_bffab4f5/graphql",
			expect.objectContaining({
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ query: "{ ok }", variables: { id: "1" } }),
				next: { revalidate: 3600 },
			}),
		);
	});

	it("throws at import time when CMS_API_URL is not defined", async () => {
		delete process.env.CMS_API_URL;
		await expect(importFresh()).rejects.toThrow("CMS_API_URL not defined.");
	});
});
