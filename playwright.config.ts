import { defineConfig, devices } from "@playwright/test";
import { nextEnv, GRAPHQL_PORT, NEXT_PORT, NEXT_ORIGIN } from "./e2e/fixtures/env.mjs";

const isCI = !!process.env.CI;

export default defineConfig({
	testDir: "./e2e",
	testMatch: "**/*.spec.ts",
	fullyParallel: true,
	forbidOnly: isCI,
	retries: isCI ? 2 : 0,
	// The fake CMS's requestLog (e2e/fixtures/router.mjs) is shared, in-memory
	// state across the single `next dev` process every worker's requests hit —
	// parallel workers would race on it. The suite is small enough that this
	// costs little.
	workers: 1,
	reporter: isCI ? [["github"], ["html", { open: "never" }]] : [["list"], ["html", { open: "never" }]],
	use: { baseURL: NEXT_ORIGIN, trace: "on-first-retry", screenshot: "only-on-failure" },
	projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
	webServer: [
		{
			command: "node e2e/fixtures/server.mjs",
			url: `http://localhost:${GRAPHQL_PORT}/__health`,
			reuseExistingServer: !isCI,
			timeout: 30_000,
		},
		{
			// Wipes the WHOLE .next directory, not just .next/cache, before every
			// `next dev` start. Next's on-disk Data Cache survives a dev-server
			// restart and even survives a leftover `next build` output sitting
			// elsewhere in .next — a stale directory can make next dev serve
			// build-time/previously-cached content without ever hitting the fake
			// backend, so the fixture's request log stays empty while pages render
			// real-looking content.
			command: `node -e "require('fs').rmSync('.next',{recursive:true,force:true})" && npx next dev --port ${NEXT_PORT}`,
			url: `${NEXT_ORIGIN}/en`,
			reuseExistingServer: !isCI,
			timeout: 120_000,
			env: nextEnv,
		},
	],
});
