import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

const originalEnv = { ...process.env };

const importFresh = async () => {
	vi.resetModules();
	return import("./route");
};

const params = (path: string[]) => ({ params: Promise.resolve({ path }) });

describe("GET /api/media/[...path]", () => {
	beforeEach(() => {
		process.env.CMS_API_URL = "https://vzt.nmy.mybluehost.me/website_bffab4f5/graphql";
	});

	afterEach(() => {
		process.env = { ...originalEnv };
		vi.unstubAllGlobals();
	});

	it("503s when CMS_API_URL isn't configured", async () => {
		delete process.env.CMS_API_URL;
		const { GET } = await importFresh();
		const res = await GET(new Request("http://localhost/api/media/a.jpg"), params(["a.jpg"]));
		expect(res.status).toBe(503);
	});

	it("404s an empty path without ever calling upstream", async () => {
		const mockFetch = vi.fn();
		vi.stubGlobal("fetch", mockFetch);

		const { GET } = await importFresh();
		const res = await GET(new Request("http://localhost/api/media/"), params([]));

		expect(res.status).toBe(404);
		expect(mockFetch).not.toHaveBeenCalled();
	});

	it("404s a path-traversal attempt without ever calling upstream", async () => {
		const mockFetch = vi.fn();
		vi.stubGlobal("fetch", mockFetch);
		const { GET } = await importFresh();

		for (const path of [["..", "wp-config.php"], ["2025", "..", "..", "wp-login.php"], ["", "a.jpg"]]) {
			const res = await GET(new Request("http://localhost/api/media/x"), params(path));
			expect(res.status).toBe(404);
		}
		expect(mockFetch).not.toHaveBeenCalled();
	});

	it("proxies an allowed path, streaming the upstream body and content-type, fetching it from within wp-content/uploads/ under the CMS_API_URL-derived site root", async () => {
		const body = new ReadableStream();
		vi.stubGlobal(
			"fetch",
			vi.fn().mockResolvedValue({
				ok: true,
				status: 200,
				body,
				headers: new Headers({ "content-type": "image/jpeg" }),
			}),
		);

		const { GET } = await importFresh();
		const res = await GET(
			new Request("http://localhost/api/media/2025/01/hero.jpg"),
			params(["2025", "01", "hero.jpg"]),
		);

		expect(res.status).toBe(200);
		expect(res.headers.get("content-type")).toBe("image/jpeg");
		expect(res.headers.get("content-disposition")).toBe("inline");
		expect(fetch).toHaveBeenCalledWith(
			"https://vzt.nmy.mybluehost.me/website_bffab4f5/wp-content/uploads/2025/01/hero.jpg",
			expect.any(Object),
		);
	});

	it("a request for a WordPress admin/API path only ever reaches wp-content/uploads/ on the real CMS, never the real wp-admin/wp-json", async () => {
		vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 404, body: null }));
		const { GET } = await importFresh();

		await GET(new Request("http://localhost/api/media/x"), params(["wp-admin"]));
		expect(fetch).toHaveBeenCalledWith(
			"https://vzt.nmy.mybluehost.me/website_bffab4f5/wp-content/uploads/wp-admin",
			expect.any(Object),
		);
	});

	it("404s when the upstream 404s", async () => {
		vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 404, body: null }));
		const { GET } = await importFresh();
		const res = await GET(new Request("http://localhost/api/media/missing.jpg"), params(["missing.jpg"]));
		expect(res.status).toBe(404);
	});

	it("502s when the upstream fetch itself fails", async () => {
		vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network down")));
		const { GET } = await importFresh();
		const res = await GET(new Request("http://localhost/api/media/a.jpg"), params(["a.jpg"]));
		expect(res.status).toBe(502);
	});

	it("502s when the upstream responds ok with no body", async () => {
		vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, status: 200, body: null, headers: new Headers() }));
		const { GET } = await importFresh();
		const res = await GET(new Request("http://localhost/api/media/a.jpg"), params(["a.jpg"]));
		expect(res.status).toBe(502);
	});
});
