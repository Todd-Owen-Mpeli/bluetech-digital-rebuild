# Security

## Nonce-based Content-Security-Policy

The CSP header is built and set in `proxy.ts`, not `next.config.ts`. A
static `headers()` entry in `next.config.ts` produces one value shared by
every response — a nonce is only meaningful per-request, so it has to be
generated and attached on each request individually.

`proxy()` generates a fresh `crypto.randomUUID()` nonce on every request and:

- Sets it as the `x-nonce` **request** header, so a Server Component
  downstream (`app/[locale]/layout.tsx`) can read it via `headers()` and
  pass it to `GoogleTagManager` (the only component in the app that renders
  an inline `<script>` — confirmed by grepping the whole app, not assumed).
- Sets the built `Content-Security-Policy` **response** header, on both the
  locale-redirect response and the pass-through response.

`script-src` is `'self' 'nonce-<value>' 'strict-dynamic'` plus the explicit
GTM host (a fallback for browsers that don't support `'strict-dynamic'`) —
no `'unsafe-inline'`. This is a real change from the pre-upgrade state: the
CSP block in `next.config.ts` was present but fully commented out, and would
have shipped `script-src 'unsafe-inline' 'unsafe-eval'` if uncommented as-is.

`img-src`/`media-src` only need `'self'` (plus GTM/GA's tracking-pixel hosts
for `img-src`) — every CMS media URL is rewritten to the same-origin
`/api/media` proxy before it reaches a component (see below), so the real
CMS host never has to be allow-listed.

## CMS-origin masking

`config/cmsMediaUrl.ts` rewrites every CMS-origin media URL
(`sourceUrl`/`mediaItemUrl`, or one embedded in a WYSIWYG HTML field) to
`/api/media/<path under wp-content/uploads/>`, applied once inside
`fetchCmsGraphQL` so every query function's caller already gets safe data —
there's no per-field "did I remember to rewrite this one" failure mode as
new blocks are added.

`app/api/media/[...path]/route.ts` is what actually serves that path: it
always fetches from `wp-content/uploads/<path>` on the real CMS, regardless
of what `path` looks like — a request shaped like `wp-admin` or `wp-json`
can only ever resolve to `wp-content/uploads/wp-admin`/`wp-content/uploads/wp-json`
on the real CMS (which don't exist there), never the real admin/API surface.

This CMS's WPGraphQL endpoint lives under a path prefix
(`.../website_bffab4f5/graphql`), not a host's root, confirmed against a
live query — `wp-content/uploads/...` is under that same prefix, not the
bare host. Both `config/cmsMediaUrl.ts` and the proxy route derive this
"site root" from `CMS_API_URL` (stripping the trailing `/graphql`) rather
than trusting `CMS_URL`/`DEV_CMS_URL` alone, which are kept only as fallback
origins for content that might ever link at the production host directly.

Two real bugs were found and fixed while building this layer (both were
leaking the CMS's real hostname into rendered pages before the fix):

- `seo.canonical`/`seo.opengraphUrl` are absolute URLs on the CMS's own
  origin (Yoast computes them for WordPress being the site, which it isn't
  here) — both page `generateMetadata`s now build the canonical/hreflang
  URLs from `SITE_URL` via `i18n/buildAlternates.ts` instead.
- `SITE_URL` in `.env.local` carries a trailing slash, and several files
  (`app/robots.ts`, `app/sitemap.ts`, both `generateMetadata`s) concatenated
  a leading `/` onto it unconditionally, producing a double slash. All now
  strip a trailing slash first.

## reCAPTCHA

`react-google-recaptcha` was a dependency but was never imported or wired
into `lib/contactForm.tsx` (or anywhere else) — confirmed by grepping the
whole app. Removed as dead weight; nothing currently depends on reCAPTCHA in
this codebase. If/when the contact-form pipeline is actually built out
(see [architecture.md](./architecture.md#known-gaps-carried-over-from-the-upgrade-plan-audit)),
score-based reCAPTCHA v3 with server-side verification that fails closed in
production is the recommended approach, not the removed v2 checkbox
dependency.
