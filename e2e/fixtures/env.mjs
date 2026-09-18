// -----------------------------------------------------------------------------
// The full env object handed to `next dev` (via playwright.config.ts's
// webServer) and to the CI build step. EVERY key `.env.example` documents is
// listed here explicitly, even the ones we want blank/inert.
//
// Why every key must be explicit (not just the ones a spec touches): next
// dev's own .env.local loading only fills in keys that are NOT already
// present in process.env. If a key is left out of this object, and this
// machine's git-ignored .env.local happens to have a real value for it, that
// real value silently leaks into the test run — a spec could end up hitting
// the real production CMS instead of the fixture. Never trim this list down
// to "just what a spec touches".
// -----------------------------------------------------------------------------

export const GRAPHQL_PORT = 4310;
export const NEXT_PORT = 4300;

export const GRAPHQL_ORIGIN = `http://localhost:${GRAPHQL_PORT}`;
export const NEXT_ORIGIN = `http://localhost:${NEXT_PORT}`;

/** @type {Record<string, string>} */
export const nextEnv = {
	// ---- Website settings ----
	VERCEL_SCRIPT_URL: "",
	SITE_URL: NEXT_ORIGIN,

	// ---- CMS (WPGraphQL) — the one that matters most: point it at the fixture.
	// CMS_API_URL includes a trailing /graphql, matching the real CMS's own
	// subdirectory-install shape that config/cmsMediaUrl.ts derives against.
	CMS_URL: GRAPHQL_ORIGIN,
	DEV_CMS_URL: GRAPHQL_ORIGIN,
	CMS_API_URL: `${GRAPHQL_ORIGIN}/graphql`,
	IMAGE_DIR_URL: "",
	WORDPRESS_CMS_USERNAME: "",
	WORDPRESS_CMS_PASSWORD: "",

	// ---- next/image remotePatterns ----
	// `.invalid` (RFC 2606) rather than "" — next.config.ts interpolates these
	// directly into images.remotePatterns[].hostname; an empty string there is
	// more likely to trip Next's own config validation than a syntactically
	// valid, never-resolving placeholder host. Nothing in the fixtures ever
	// requests an image from these directly (media goes through /api/media).
	IMAGE_REMOTE_PATTERNS_HOSTNAME_ONE: "images-one.invalid",
	IMAGE_REMOTE_PATHNAME_ONE: "/**",
	IMAGE_REMOTE_PATTERNS_HOSTNAME_TWO: "images-two.invalid",
	IMAGE_REMOTE_PATHNAME_TWO: "/**",

	// ---- i18n / Azure Translator — blank key means every translate call fails
	// soft to English (its own documented behaviour), verified live in the
	// upgrade session. Pointed at localhost rather than the real Azure host as
	// a second line of defence.
	AZURE_TRANSLATOR_KEY: "",
	AZURE_TRANSLATOR_REGION: "",
	AZURE_TRANSLATOR_ENDPOINT: `${GRAPHQL_ORIGIN}/translate`,

	// ---- Other integrations ----
	NEXT_PUBLIC_GTM_ID: "",
	GOOGLE_REVIEWS_PLACE_ID: "",
	GOOGLE_REVIEWS_API_KEY: "",

	// ---- Nodemailer (contact form) — the contact-form pipeline is broken in
	// this codebase as-is (no app/api/email route exists, sendMail is never
	// called — flagged in the upgrade-plan audit) so no spec exercises it;
	// these are set only so config/nodemailer.ts's module-scope reads don't
	// see undefined.
	EMAIL_USER: "no-reply@example.test",
	EMAIL_PASS: "test-smtp-password",
	EMAIL_HOST: "localhost",
};
