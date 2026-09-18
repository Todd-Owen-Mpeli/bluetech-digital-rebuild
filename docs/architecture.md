# Architecture

## Rendering pipeline

Every route lives under `app/[locale]/` — there is no bare `app/layout.tsx`
above it; the `[locale]` segment owns `<html>` (see
[docs/i18n.md](./i18n.md) for why). Two page shapes exist:

- `app/[locale]/page.tsx` — the homepage, fetching its flexible content by
  the WordPress page **title** `"Home"` (`context/pages.ts`'s `pageType.home`),
  not a slug.
- `app/[locale]/[slug]/page.tsx` — every other page, fetched by its actual
  URL slug.

Both call `getAllFlexibleContentComponents()` (`graphql/CMS/`), which
returns the page's ACF flexible-content array — an array of objects, each
carrying a `fieldGroupName` like
`DefaultTemplate_Flexiblecontent_FlexibleContent_Hero`. If that array comes
back empty (a nonexistent slug, or a GraphQL-level error — `fetchCmsGraphQL`
resolves errors to `null` rather than throwing), the page calls
`notFound()` rather than rendering an empty shell.

## The ACF block registry

`components/FlexibleContent/RenderFlexibleContent.tsx` holds a
`componentMapping`: a plain object keyed by the exact `fieldGroupName` string
(interpolated from `postTypeFlexibleContent` + the block's simple name, e.g.
`TitleParagraph`) pointing at that block's default export. For each item in
the content array whose `displaySection` is `true` and whose
`fieldGroupName` has a registered mapping, it renders that component with
the item's own fields spread in as props.

**A block with no registered mapping is silently skipped** — no error, no
placeholder. This is why Step 8 of the original upgrade plan (auditing the
CMS schema against this map) matters: a new ACF flexible-content type added
in WordPress needs both a component built *and* a line added here before any
page using it will show anything.

Every existing block follows the canonical folder shape documented in the
[README](../README.md#adding-a-new-cms-block).

## The GraphQL data layer

There is no client-side GraphQL library (Apollo Client was removed — see the
upgrade-plan history). Every `graphql/CMS/*.ts` file is a plain
`async`/`await` function that:

1. Builds a raw GraphQL query string (not a `gql`-tagged template — there's
   nothing to parse client-side).
2. Calls `fetchCmsGraphQL<T>(query, variables?, revalidate?)`
   (`graphql/CMS/fetchCmsGraphQL.ts`), which POSTs to `CMS_API_URL` using
   Next's own fetch cache (`next: { revalidate }`, default 24h) and returns
   `null` on any HTTP or GraphQL-level error.
3. Returns whatever shape that specific query needs from the response.

`fetchCmsGraphQL` also applies `rewriteCmsUrlsDeep` (`config/cmsMediaUrl.ts`)
to every response before returning it — see
[docs/security.md](./security.md#cms-origin-masking) for what that does and
why it lives at this one choke point rather than in each query file.

All of this runs server-side only (Server Components, `generateMetadata`,
`app/sitemap.ts`) — there is no code path where a browser talks to the CMS
directly.

## Internationalisation layer

See [docs/i18n.md](./i18n.md) for the full design. In one sentence: `proxy.ts`
resolves and redirects to a locale-prefixed path, `app/[locale]/layout.tsx`
fetches the static UI dictionary and machine-translates global CMS chrome,
and each page machine-translates its own SEO fields and flexible-content
prose via `i18n/translateContent.ts` — all of it failing soft to English on
any Azure error.

## Known gaps (carried over from the upgrade-plan audit)

- `testimonials`/`caseStudies`/`newsInsights` are fetched globally in
  `app/[locale]/layout.tsx` on every request but have **no consuming
  component anywhere** in the codebase — dead fetching, not a missing
  feature per se, but worth resolving one way or the other (build the
  widget, or stop fetching).
- `components/CMS/InstagramFeed/` is a structure-only placeholder (renders
  `null`) — the ACF field group exists on the WordPress side (confirmed) and
  it's registered in `RenderFlexibleContent.tsx`'s `componentMapping`, but
  the real field shape isn't known yet (WPGraphQL introspection is disabled
  on both CMS hosts). Build it out for real using cbf-rebuild's
  `SocialMediaGrid` as the reference implementation once the fields are
  confirmed.
- The contact-form pipeline (`lib/contactForm.tsx`) posts to `/api/email`,
  which does not exist in this codebase — `config/nodemailer.ts`'s
  transporter is defined but never called from anywhere.
