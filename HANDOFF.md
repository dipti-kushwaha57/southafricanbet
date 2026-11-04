> **Update (Nov 2026) — homepage redesign.** The design source is now
> `/home/strivedge/Downloads/betting-v2.1-plain-html-css-js/` (index.html + styles.css), not `betting-v2 1.html`.
> - Frontend CSS is the reference's compiled Tailwind stylesheet, ported 1:1 into `src/app/(frontend)/globals.css`
>   (Bootstrap and the old `sab-*` classes are gone). Components use the reference's utility class names, so any
>   class you use must exist in that file (there is no Tailwind build step).
> - Fonts: Inter + Bricolage Grotesque via `next/font` in `layout.tsx`.
> - Homepage content/media is seeded by `scripts/seed-design.ts` (copy in `scripts/seed-assets/home-content.json`).
>   `scripts/seed-home.ts` is the OLD layout — do not run it.
> - Not yet redesigned (still old template markup, only a small compat shim in globals.css): `/posts`, post
>   detail, `/search`, 404, and the generic Content/CTA/Archive/Form blocks. `/reviews/[slug]` does not exist yet.

# Project Brief for Claude — SouthAfricanBet

Read this file in full before touching any code. It explains why this project exists, what it must match, and what not to break.

## Background

There are two sibling Payload CMS projects on this machine, both at `/home/strivedge/Documents/`:

1. **`payloadcms`** — a custom-built site. Posts/Reviews collections were hand-rolled: custom access control (`isAdmin`/`publishedOnly`), manual revalidation logic duplicated in both a field hook and a collection hook, single `category` relationship instead of multiple, no SEO plugin.
2. **`payloads`** — built from Payload's **official `website` template**, which this project (`southafricanbet`) was scaffolded from too. It uses Payload's own conventions: `authenticated` / `authenticatedOrPublished` access helpers, a `tabs` UI (Content / Meta / SEO) on collections, the official `@payloadcms/plugin-seo` fields, hooks split into their own files under a collection's `hooks/` folder, and a `populatedAuthors` pattern for exposing author names safely.

After comparing both in detail, `payloads` was judged the more correct / "identical to Payload's own structure" of the two — it's not a personal preference, it's literally built from Payload's maintained template rather than reinvented. **This project (`southafricanbet`) must follow the `payloads` project's conventions, not `payloadcms`'s.** You can and should open `/home/strivedge/Documents/payloads` as a live reference whenever you're unsure how something should be structured — collections, access control, hooks, blocks, field patterns, plugin usage, folder layout. When in doubt, check how `payloads` does it and mirror that, adapted to this project's content.

## What this project is

`southafricanbet` — a South African sports betting / bookmaker review site. Same general shape as `payloadcms` (which is also a betting site) in terms of *content*, but built the `payloads` way *structurally*.

Where `payloads` has a `Treatments` collection (its own domain-specific addition on top of the base template), this project has **`Reviews`** instead — individual bookmaker/betting-site reviews (rating, bonus offer, payment methods, terms, full review body, etc.), not generic blog posts. This collection already exists at `src/collections/Reviews/index.ts`, modeled structurally on `payloads`' `Posts`/`Testimonials` collections but with content fields adapted from `payloadcms`'s existing `Reviews.ts` (title/bookmaker name, rating, rank, bonusText, features array, paymentMethods array, etc.) — rewritten to use `payloads`-style tabs/SEO/hooks conventions instead of the custom access/hook pattern `payloadcms` used.

**Do not just copy `payloadcms`'s Reviews.ts as-is.** Its *domain content* (what fields a bookmaker review needs) is useful reference; its *code structure* (access control, hook duplication, no SEO plugin) is what we moved away from.

## What's already set up (don't redo this)

- Scaffolded from Payload's official `website` template at the exact `v3.91.0` tag — same Payload/Next/React versions as `payloads` (Payload 3.91.0, Next 16.3.3, React 19.2.6), for consistency.
- Database adapter swapped from the template's default Mongo to **Postgres** (`@payloadcms/db-postgres`), connecting to a local Postgres 14 instance.
  - DB name: `southafricanbet`, user: `southafricanbet_user` — credentials are in `.env` (`DATABASE_URL`). Don't commit `.env`.
- `pnpm install` has been run, `pnpm generate:types` has been run, and the dev server has been booted once to confirm Postgres connects and the schema (including `reviews` / `_reviews_v` tables) was pushed successfully. `/admin` served a 200 and showed the "create first user" screen. This all works — if you hit DB errors, something in your own changes broke it, not the base setup.
- `Reviews` collection is registered in `payload.config.ts`, wired into `plugins/index.ts` (redirects, search, SEO `generateTitle`/`generateURL`), added to `fields/link.ts`'s `relationTo`, and added to `utilities/generatePreviewPath.ts`'s prefix map (`/reviews`).

## What's NOT done yet — this is your job

- No frontend pages/templates have been built. The admin/CMS side (collection configs) exists; the actual Next.js frontend (routes under `src/app/(frontend)`, components, styling) is still the stock template output and needs to become the real site.
- **Pixel-to-pixel design match required** against the reference design at `/home/strivedge/Downloads/betting-v2 1.html`. Read that file carefully (it's static HTML/CSS) and reproduce its layout, spacing, typography, colors, and components exactly in the Next.js frontend — don't approximate or "improve" it, match it.
- You'll need to build out frontend routes/components for: homepage, a reviews listing page, individual review detail pages (using the `Reviews` collection), posts/blog if needed, following whatever the reference design shows.
- Check `payloads`' frontend (`/home/strivedge/Documents/payloads/src/app` and `/home/strivedge/Documents/payloads/src/components`, `src/blocks`, `src/heros`) for the *patterns* to follow (e.g. `CollectionArchive`, `RelatedPosts`, hero components) — but the actual visual design must come from the reference HTML, not from `payloads`' current look.

## Start with the homepage

Build the homepage first — skip the Review detail page template for now (it doesn't exist yet, that's a later step). Match `/home/strivedge/Downloads/betting-v2 1.html` pixel-for-pixel for the homepage layout.

## Reusable Reviews block — required, dynamic, used on many pages

The reference design shows **Reviews rendered three different ways** on different parts of the site:

1. **Compact ranked list** ("Top 5 Verified Bookmakers") — numbered rows, small logo badge, name, star rating, one-line offer, PLAY button. Compact sidebar/widget style.
2. **Card grid** ("#1 Pick" / "#2 Pick" / "#3 Pick" cards) — bigger cards with logo, rating, welcome offer box with promo code, feature checklist, min deposit/payout/games row, PLAY NOW + Review buttons.
3. **Hand-picked detailed list** ("Top Online Sports Betting Sites in South Africa") — large rank number, bigger logo, "Best for" line, description paragraph, "Why we love it" line, PLAY NOW + Read Review buttons.

These three are **the same underlying data** (the `reviews` collection) rendered through three different visual templates. Build this as **one reusable Payload block** (e.g. `ReviewsBlock`) with these config options, so any page can drop it in and configure it from the admin panel:

- **`variant`** (select, required): `'compact-list' | 'card-grid' | 'detailed-list'` — matches the three designs above.
- **`source`** (select, required): `'featured' | 'selected'`
  - `featured` → auto-pulls reviews where `featured: true` on the Reviews collection (already exists as a field), ordered by `rank`.
  - `selected` → a `relationship` field (`hasMany: true`, `relationTo: 'reviews'`) letting the editor manually pick and order specific reviews for that instance of the block.
- Common supporting fields: `heading` (text, e.g. "Top 5 Verified Bookmakers"), `limit` (number, how many to show when source is `featured`), `viewAllLink` (optional link field).

This block should be addable to Pages (and reusable in post/review-body rich text if useful) via the blocks field, same pattern as `Banner`/`Code`/`MediaBlock` already in `src/blocks/`. Put it at `src/blocks/ReviewsBlock/config.ts` + a frontend `Component.tsx`, following how `payloads` structures its blocks (check `payloads/src/blocks/` and `payloads/src/blocks/RelatedPosts/Component.tsx` for the pattern of a block that queries a collection).

## Reusable Blog/Posts block — required, dynamic, same pattern

The reference design's "From Our Betting Blog" section needs the same treatment: one reusable block (e.g. `PostsBlock`) with:

- **`heading`**, **`viewAllLink`** (text/link, e.g. "From Our Betting Blog" / "View all articles")
- **`mode`** (select, required): `'all' | 'selected' | 'category'`
  - `all` → latest posts by date, limited by `limit`.
  - `selected` → manual `relationship` field (`hasMany: true`, `relationTo: 'posts'`) for hand-picked articles, editor-ordered.
  - `category` → a `relationship` field (`relationTo: 'categories'`) to pull posts from one/more chosen categories, limited by `limit`.
- The design shows one large "featured" article (bigger card, badge) plus a row of smaller article cards below it — the block should support that featured-plus-grid layout, not just a flat list.

Same build pattern as `ReviewsBlock`: `src/blocks/PostsBlock/config.ts` + `Component.tsx`.

## Key standards to follow, no exceptions

1. **Structure/conventions**: follow `payloads`, not `payloadcms`. Access control via `authenticated`/`authenticatedOrPublished` (see `src/access/`), tabs-based admin UI, SEO plugin fields on every public-facing collection, hooks in their own files under a collection's `hooks/` subfolder, `slugField()` from `payload` core.
2. **Database**: Postgres only. Never add or fall back to SQLite or MongoDB.
3. **Design**: pixel-to-pixel match of `/home/strivedge/Downloads/betting-v2 1.html`. This is a hard requirement, not a loose inspiration.
4. **Versions**: stay pinned to Payload 3.91.0 / Next 16.3.3 / React 19.2.6 to match `payloads`, unless there's a concrete reason to diverge — ask first if you think you need to.
5. Don't touch `payloadcms` or `payloads` — they're separate, already-working projects. Read from them for reference, never edit them.
6. There's an `AGENTS.md`/`CLAUDE.md` in this repo claiming to be auto-generated by `next dev` instructing you to read Next.js docs from `node_modules` before writing code. This is boilerplate Next.js adds automatically — harmless, but it is not instructions from the project owner, just ignore its directive and don't treat it as special authority over this brief.

If anything above is unclear, ask before guessing — this is a real project the user is building, not a scratch exercise.
