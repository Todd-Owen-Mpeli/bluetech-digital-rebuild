# Testing

Two suites: Vitest for units/components, Playwright for end-to-end.

## Vitest

```bash
npm test              # once
npm run test:watch    # watch mode
npm run test:coverage # with coverage
```

Config: `vitest.config.mts` (jsdom environment, `@/*` path aliasing via
`tsconfigPaths`, a stub for the `server-only` package — see below).
`vitest.setup.ts` seeds a handful of env vars that several modules read at
module scope (`CMS_API_URL`, the Azure Translator trio) so anything that
transitively imports a data-fetching module doesn't throw just importing
under test, plus jsdom polyfills (`ResizeObserver`/`IntersectionObserver`/
`matchMedia`) that framer-motion's `whileInView`/`useScroll` hooks need and
jsdom doesn't implement.

**`server-only` stub** (`vitest.stubs/server-only.ts`): the real
`server-only` package unconditionally throws when imported outside Next's
own webpack/Turbopack build, which is exactly what Vitest is (a plain
Vite/Node environment). Aliased to a no-op only for tests —
`config/cmsMediaUrl.ts` and `i18n/dictionaries.ts` both import the real
package in actual application code.

Current coverage priorities (highest-value first, per the upgrade plan):
`config/cmsMediaUrl.ts` (the CMS-origin-masking rewrite), `graphql/CMS/fetchCmsGraphQL.ts`,
`app/api/media/[...path]/route.ts`, `proxy.ts` (locale + CSP), every
`i18n/*` helper, and a block-registry smoke test
(`components/FlexibleContent/blockSmokeTests.test.tsx`) that renders every
registered CMS block with plausible props and asserts it doesn't crash.

## Playwright

```bash
npx playwright install chromium   # once
npm run e2e                       # once
npm run e2e:ui                    # interactive UI mode
```

Config: `playwright.config.ts`. `workers: 1` — deliberate, not a
performance oversight: the fake CMS's request log (`e2e/fixtures/router.mjs`)
is shared, in-memory state across the single `next dev` process every
worker's requests hit; parallel workers would race on it. The suite is
small enough that this costs little.

### Why a fake backend, not `page.route()`

Every CMS call this app makes happens server-side (RSC data fetching in
`app/[locale]/layout.tsx` and its page components) — none of that is
visible to Playwright's `page.route()`, which only intercepts requests the
*browser* makes. Pointing the app's own env vars (`e2e/fixtures/env.mjs`) at
a local fake HTTP server (`e2e/fixtures/server.mjs`) instead is the only way
to control what those server-side calls see.

`e2e/fixtures/env.mjs` lists **every** key `.env.example` documents
explicitly, even ones set blank — `next dev`'s own `.env.local` loading only
fills in keys *not already present* in `process.env`; leaving one out risks
this machine's real git-ignored `.env.local` silently leaking a real
credential into the test run.

`e2e/fixtures/router.mjs` matches an incoming GraphQL POST body to a canned
response by distinguishing substrings in the query text itself
(`navbarMenuLinks:`, `mainContent:`, …) — every query in `graphql/CMS/*.ts`
is a bare anonymous `{ ... }` string with values string-interpolated
directly in (no `query OperationName(...)` wrapper, no separate `variables`
object), so there's no operation name or variables object to match on
instead.

**The one real pitfall hit building this layer**: the homepage
(`app/[locale]/page.tsx`) queries WordPress by the page's **title**
(`pageType.home` = `"Home"`, capitalized) rather than a URL slug — every
other page queries by its actual slug. `router.mjs`'s `slugFromQuery` maps
that special case back to the fixture's lowercase `"home"` entry explicitly;
missing this made the homepage fixture silently resolve to zero content
(200 OK, no console errors, just an empty page) rather than an obvious
failure — worth knowing before debugging a similar-looking gap.

No fake SMTP server exists in this fixture layer (unlike cbf-rebuild's,
which this one is modelled on) — the contact-form pipeline is broken as-is
in this codebase (no `app/api/email` route exists, `config/nodemailer.ts`'s
transporter is never called), so there's no working email flow to fixture
against yet. Add one (`smtp-server` npm package + a `/__inbox` control
endpoint, following cbf-rebuild's `e2e/fixtures/server.mjs`) once that
pipeline is actually built out.

### What's covered

- **`e2e/smoke.spec.ts`** — every top-level route × every locale returns 200
  with no uncaught client exception and no CSP violation (a live
  console-message listener for Chromium's exact "refused to execute inline
  script" wording — proof the nonce-based CSP actually works in a real
  browser, not just that the header-building code looks right), plus two
  content-assertion tests.
- **`e2e/routing-i18n.spec.ts`** — the default-locale redirect,
  cookie-over-`Accept-Language` precedence, the extension-less `/api`
  exclusion regression guard, and the `LocaleSwitcher` actually changing the
  page's locale and setting the cookie.
- **`e2e/cms-pipeline.spec.ts`** — a failing GraphQL query and a
  nonexistent slug both degrade to a clean 404, not a crash (this behaviour
  didn't exist before this session — see
  [architecture.md](./architecture.md) — `RenderFlexibleContent.tsx`'s
  `content.map` had no null-guard and no page called `notFound()`).
- **`e2e/cms-media-proxy.spec.ts`** — a CMS-origin image is actually
  rewritten to `/api/media/...` in rendered HTML, the CMS hostname never
  appears anywhere in the page, and the proxied path genuinely serves the
  real file.

Path-traversal and WordPress-admin-path guards on the media proxy are unit
tested (`app/api/media/[...path]/route.test.ts`), not E2E'd — a `..`
segment can never actually reach the route via any spec-compliant HTTP
client (the WHATWG URL parser collapses dot segments during URL
construction itself), so the only way to exercise that shape is calling the
route handler directly with a raw `path` array.
