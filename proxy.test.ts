import { describe, it, expect } from "vitest";
import { NextRequest } from "next/server";
import { proxy } from "./proxy";

const request = (path: string, init?: { acceptLanguage?: string; cookie?: string }) => {
	const headers = new Headers();
	if (init?.acceptLanguage) headers.set("accept-language", init.acceptLanguage);
	if (init?.cookie) headers.set("cookie", init.cookie);

	return new NextRequest(new URL(`https://example.test${path}`), { headers });
};

describe("proxy", () => {
	it("does not redirect a pathname that already has a supported locale prefix", () => {
		const responseOne = proxy(request("/fr/about"));
		const responseTwo = proxy(request("/en"));

		expect(responseOne?.headers.get("location")).toBeNull();
		expect(responseTwo?.headers.get("location")).toBeNull();
	});

	it("attaches a nonce-based CSP with no 'unsafe-inline' in script-src, on every response", () => {
		for (const response of [proxy(request("/en")), proxy(request("/about"))]) {
			const csp = response?.headers.get("content-security-policy") ?? "";
			const scriptSrc = /script-src([^;]*);/.exec(csp)?.[1] ?? "";
			expect(scriptSrc).toMatch(/'nonce-[0-9a-f-]{36}'/);
			// style-src still legitimately carries 'unsafe-inline' (unchanged,
			// out of scope here) — this checks script-src specifically.
			expect(scriptSrc).not.toContain("'unsafe-inline'");
		}
	});

	it("uses a fresh nonce for every request", () => {
		const nonceFrom = (response: ReturnType<typeof proxy>) =>
			/'nonce-([0-9a-f-]{36})'/.exec(response?.headers.get("content-security-policy") ?? "")?.[1];

		expect(nonceFrom(proxy(request("/en")))).not.toBe(nonceFrom(proxy(request("/en"))));
	});

	it("redirects to the default locale when there's no cookie or Accept-Language match", () => {
		const response = proxy(request("/about"));

		expect(response?.status).toBe(307);
		expect(response?.headers.get("location")).toBe("https://example.test/en/about");
	});

	it("redirects to the Accept-Language-preferred locale when no cookie is set", () => {
		const response = proxy(request("/about", { acceptLanguage: "fr-FR,fr;q=0.9,en;q=0.5" }));

		expect(response?.headers.get("location")).toBe("https://example.test/fr/about");
	});

	it("falls back to the default locale when Accept-Language has no supported match", () => {
		const response = proxy(request("/", { acceptLanguage: "ja-JP,ja;q=0.9" }));

		expect(response?.headers.get("location")).toBe("https://example.test/en");
	});

	it("prefers the NEXT_LOCALE cookie over the Accept-Language header", () => {
		const response = proxy(
			request("/about", {
				acceptLanguage: "en-US,en;q=0.9",
				cookie: "NEXT_LOCALE=de",
			})
		);

		expect(response?.headers.get("location")).toBe("https://example.test/de/about");
	});

	it("ignores an unsupported NEXT_LOCALE cookie value and falls through to the header", () => {
		const response = proxy(
			request("/about", {
				acceptLanguage: "de-DE,de;q=0.9",
				cookie: "NEXT_LOCALE=ja",
			})
		);

		expect(response?.headers.get("location")).toBe("https://example.test/de/about");
	});

	it("preserves the search string across the redirect", () => {
		const response = proxy(request("/about?ref=news"));

		expect(response?.headers.get("location")).toBe("https://example.test/en/about?ref=news");
	});
});
