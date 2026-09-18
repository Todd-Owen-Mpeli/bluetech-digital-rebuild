/* -----------------------------------------------------------------------------
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX Import XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
----------------------------------------------------------------------------- */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale } from "@/context/constants";

/* -----------------------------------------------------------------------------
XXXXXXXXXXXXXXXXXXXXXXXXXXXXX Accept-Language Parsing XXXXXXXXXXXXXXXXXXXXXXXXXX
----------------------------------------------------------------------------- */

/**
 * Picks the best supported locale from a raw `Accept-Language` header value —
 * hand-rolled rather than pulling in a BCP-47 quality-matching library, since
 * this project's fixed three locale codes (`en`/`fr`/`de`, no `en-US` vs
 * `en-GB` disambiguation to resolve) don't need that. Every other integration
 * in this codebase is a hand-rolled, zero-dependency `fetch` call, and this
 * follows the same convention.
 *
 * `Accept-Language` looks like `"fr-FR,fr;q=0.9,en;q=0.8"` — entries in
 * preference order, each optionally carrying a `;q=` weight this function
 * ignores (order already reflects preference) and a region subtag this
 * function also ignores (`fr-FR` and `fr` are both just `fr` here).
 * @param header The raw `Accept-Language` request header value, or `null`.
 * @returns The first supported locale found, or `undefined` if none match.
 */
const getLocaleFromAcceptLanguage = (header: string | null): string | undefined => {
	if (!header) return undefined;

	const preferred = header
		.split(",")
		.map((entry) => entry.split(";")[0].trim().split("-")[0].toLowerCase());

	return preferred.find((lang) => locales.includes(lang));
};

/* -----------------------------------------------------------------------------
XXXXXXXXXXXXXXXXXXXXXXXXXX Nonce-based Content-Security-Policy XXXXXXXXXXXXXXXXXXX
----------------------------------------------------------------------------- */

// `'unsafe-eval'` is only needed by Next's dev/HMR runtime — never ship it.
const cspAllowUnsafeEval = process.env.NODE_ENV !== "production" ? " 'unsafe-eval'" : "";

/**
 * Builds the per-request Content-Security-Policy header value. The equivalent
 * block in `next.config.ts` was left fully commented out, and would have
 * shipped `script-src 'unsafe-inline' 'unsafe-eval'` if uncommented as-is —
 * `'unsafe-inline'` allows *any* inline script, which is exactly the XSS
 * class CSP exists to close off.
 *
 * The fix has to live here, not in `next.config.ts`, because a nonce is only
 * meaningful per-request — `next.config.ts`'s `headers()` produces one static
 * value shared by every response. A fresh, single-use nonce is generated on
 * every request; `script-src 'nonce-<value>'` then trusts only a `<script>`
 * tag carrying that exact value for that exact response — `GoogleTagManager.tsx`
 * (the only component in this app that renders an inline `<script>` — confirmed
 * by grepping the whole app, not assumed) reads it via the `x-nonce` request
 * header this function's caller sets. `'strict-dynamic'` additionally lets a
 * nonce'd script (GTM's bootstrap) dynamically inject further
 * `<script src="...">` tags of its own (the real `gtm.js`) without those
 * needing their own nonce or host-allowlist entry; the explicit hosts stay
 * listed too as a fallback for browsers that don't support `'strict-dynamic'`,
 * which then just ignore that token and fall back to the allowlist. Next.js
 * automatically nonces its own framework scripts once it sees this header.
 *
 * `img-src`/`media-src` only need `'self'` (plus GTM/GA's tracking-pixel
 * hosts for `img-src`) — every ACF media field (`sourceUrl`, the Hero
 * video's `mediaItemUrl`) is rewritten to the same-origin `/api/media` proxy
 * before it ever reaches a component (`config/cmsMediaUrl.ts`, applied inside
 * `fetchCmsGraphQL`), so the real CMS host never appears in rendered markup.
 * @param nonce This request's single-use nonce.
 */
const buildCspHeader = (nonce: string): string =>
	`
		default-src 'self';
		img-src 'self' https://www.googletagmanager.com https://www.google-analytics.com data:;
		media-src 'self';
		script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${cspAllowUnsafeEval} https://www.googletagmanager.com;
		style-src 'self' 'unsafe-inline';
		connect-src 'self' ${process.env.CMS_API_URL} https://www.googletagmanager.com https://www.google-analytics.com https://analytics.google.com;
		frame-src 'self' https://www.googletagmanager.com;
		object-src 'none';
		base-uri 'none';
		form-action 'self';
		frame-ancestors 'none';`
		.replace(/\s{2,}/g, " ")
		.trim();

/* -----------------------------------------------------------------------------
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX Proxy XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
----------------------------------------------------------------------------- */

/**
 * Redirects any request without a locale-prefixed pathname to one. Locale is
 * resolved cookie-first (`NEXT_LOCALE`, set by `LocaleSwitcher.tsx` on every
 * explicit choice, so it sticks across visits even to a bare, un-prefixed
 * URL), then falls back to the browser's `Accept-Language` header, then
 * `defaultLocale`.
 *
 * A 307 (temporary) redirect, not permanent — a visitor's language preference
 * can change, unlike the HTTPS-enforcing redirect in `next.config.ts`, which
 * is genuinely permanent.
 *
 * Also generates this request's CSP nonce and attaches it — as the `x-nonce`
 * request header (so a Server Component downstream can read it via
 * `headers()` and pass it to `GoogleTagManager`) and as the response's
 * `Content-Security-Policy` header (see `buildCspHeader`) — to every response
 * this function returns, redirect or pass-through alike. A 3xx redirect
 * executes no script itself, but setting it there too costs nothing and
 * keeps the logic in one place.
 * @param request The incoming request.
 */
export function proxy(request: NextRequest) {
	const nonce = crypto.randomUUID();
	const contentSecurityPolicy = buildCspHeader(nonce);

	const { pathname } = request.nextUrl;

	const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));

	if (hasLocale) {
		const requestHeaders = new Headers(request.headers);
		requestHeaders.set("x-nonce", nonce);
		requestHeaders.set("Content-Security-Policy", contentSecurityPolicy);

		const response = NextResponse.next({ request: { headers: requestHeaders } });
		response.headers.set("Content-Security-Policy", contentSecurityPolicy);
		return response;
	}

	const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
	const locale =
		cookieLocale && locales.includes(cookieLocale)
			? cookieLocale
			: (getLocaleFromAcceptLanguage(request.headers.get("accept-language")) ?? defaultLocale);

	const url = request.nextUrl.clone();
	url.pathname = `/${locale}${pathname}`;

	const redirectResponse = NextResponse.redirect(url, 307);
	redirectResponse.headers.set("Content-Security-Policy", contentSecurityPolicy);
	return redirectResponse;
}

export const config = {
	matcher: [
		// Skip _next internals, /api routes, and any request for a file with an
		// extension (favicon.ico, robots.txt, sitemap.xml, static assets) — none
		// of those need a per-request nonce, and (once locale-redirect logic
		// lands here) none of those should ever be locale-redirected either —
		// an extension-less `/api` route with no exclusion here would silently
		// 307 to a route that doesn't exist.
		"/((?!_next|api|.*\\..*).*)",
	],
};
