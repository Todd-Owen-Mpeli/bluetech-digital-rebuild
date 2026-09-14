import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

/* -----------------------------------------------------------------------------
XXXXXXXXXXXXXXXXXXXXXXXXXXXX Default test environment XXXXXXXXXXXXXXXXXXXXXXXXXX
----------------------------------------------------------------------------- */

// graphql/CMS/fetchCmsGraphQL.ts reads CMS_API_URL at module scope and throws
// if it's missing — so any test that transitively imports a data-fetching CMS
// query needs a value present just to import cleanly. Individual query tests
// asserting the "missing env" behaviour still `delete` this and re-import a
// fresh module.
process.env.CMS_API_URL ??= "https://example.test/graphql";

// api/Translation/GetTranslatedContent.ts reads these when actually called;
// tests exercising the "missing Azure env" path still `delete` and re-import.
process.env.AZURE_TRANSLATOR_KEY ??= "test-azure-key";
process.env.AZURE_TRANSLATOR_REGION ??= "westeurope";
process.env.AZURE_TRANSLATOR_ENDPOINT ??= "https://example.test/translator";

// Not running with vitest's `globals: true`, so Testing Library's own
// auto-cleanup (which only self-registers when it finds a global `afterEach`)
// never kicks in. Without this, every render() in a test file leaks into the
// same document.body and screen.getByText(...) starts matching multiple
// elements across unrelated tests.
afterEach(() => {
	cleanup();
});

/* -----------------------------------------------------------------------------
XXXXXXXXXXXXXXXXXXX Browser API polyfills for jsdom XXXXXXXXXXXXXXXXXXXXXXXXXXXX
----------------------------------------------------------------------------- */

// framer-motion (used across most CMS blocks) relies on ResizeObserver/
// IntersectionObserver/matchMedia for scroll- and viewport-tracking hooks
// (useScroll, whileInView). jsdom doesn't implement any of these, so every
// component that renders motion.* elements needs them stubbed — this is
// shared setup, not specific to any one test.

class ObserverStub {
	observe(): void {}
	unobserve(): void {}
	disconnect(): void {}
}

if (typeof window !== "undefined") {
	window.ResizeObserver ??= ObserverStub as unknown as typeof ResizeObserver;
	window.IntersectionObserver ??= ObserverStub as unknown as typeof IntersectionObserver;

	window.matchMedia ??= (query: string): MediaQueryList => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: () => {},
		removeListener: () => {},
		addEventListener: () => {},
		removeEventListener: () => {},
		dispatchEvent: () => false,
	} as MediaQueryList);
}
