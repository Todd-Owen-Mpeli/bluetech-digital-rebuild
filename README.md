# Bluetech Digital Ltd — rebuild

A Next.js 16 (App Router) / React 19 / Tailwind v4 front end for
[bluetech-digital.co.uk](https://bluetech-digital.co.uk), backed by a
headless WordPress + WPGraphQL CMS. See
[docs/architecture.md](./docs/architecture.md) for how the CMS
flexible-content pipeline works and how a new block gets registered.

## Requirements

- Node.js (see `package.json` for the Next/React versions this targets)
- npm (the repo ships a `package-lock.json`)
- A WordPress instance running WPGraphQL, with ACF flexible-content field
  groups matching the block names in `components/CMS/`

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in real values
npm run dev                  # http://localhost:3000
```

## Scripts

| Command                 | Purpose                                    |
| ------------------------ | ------------------------------------------- |
| `npm run dev`            | Next.js dev server                          |
| `npm run build`          | Production build                            |
| `npm start`              | Serve the production build                  |
| `npm run lint`           | ESLint                                      |
| `npm test`               | Vitest, once                                |
| `npm run test:watch`     | Vitest, watch mode                          |
| `npm run test:coverage`  | Vitest with coverage                        |
| `npm run e2e`            | Playwright end-to-end tests, once           |
| `npm run e2e:ui`         | Playwright's interactive UI mode            |

`npm run e2e` needs the Chromium browser binary once:
`npx playwright install chromium`. See
[docs/testing.md](./docs/testing.md) for what the two suites cover and why
the E2E layer runs against a local fake CMS rather than the real one.

## Environment variables

Every variable the app reads (and a few it will read once later
upgrade-plan steps are picked up, like the Azure Translator keys) is
documented with placeholders in [`.env.example`](./.env.example). Copy it to
`.env.local` (git-ignored) and fill in real credentials.
`NEXT_PUBLIC_`-prefixed variables are bundled into client JavaScript — never
put a secret behind that prefix.

## Adding a new CMS block

Every block under `components/CMS/` follows the same shape:

```
components/CMS/<Name>/
├── <Name>.tsx              — the block itself
├── <Name>.test.tsx         — Vitest unit test
├── fragments/               — only if the block has reusable sub-parts
├── graphql/
│   └── index.ts             — the GraphQL fragment string, exported as `<Name>`
├── styles/
│   └── <Name>.module.css    — a CSS module; `@import "tailwindcss/theme";`
│                               then the project's `styles/theme.css`, so
│                               `@apply` can see both Tailwind's and this
│                               project's custom design tokens
└── types/
    └── <name>.ts            — camelCase, e.g. `titleParagraph.ts`
```

To register it: add the fragment to `graphql/CMS/GetAllFlexibleContentComponents.ts`
(one line per block, matching the ACF `fieldGroupName` suffix), and add the
component to `RenderFlexibleContent.tsx`'s `componentMapping`.

## Security headers

`next.config.ts` sets HSTS, `X-Content-Type-Options`, `X-Frame-Options`,
`Referrer-Policy`, `Permissions-Policy` and `Expect-CT` on every route, and
forces HTTPS in production. The Content-Security-Policy itself is set
per-request in `proxy.ts`, not `next.config.ts` — see
[docs/security.md](./docs/security.md) for why, and for how CMS media is
kept off the rendered page entirely.

## Internationalisation

The site supports English (default), French, and German under
`app/[locale]/`. See [docs/i18n.md](./docs/i18n.md) for the locale-routing
design, the static UI dictionary, and the Azure Translator pipeline's
fail-soft behaviour.
