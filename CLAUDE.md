# CLAUDE.md

## Project Overview

Legacy Upgrade is a **single-page** static company website for a freelance software development
business focused on **digitalization and automation through custom software for businesses**. Built
with **Next.js 16** (App Router) and **Tailwind CSS 4**, exported to static HTML and deployed by FTP.

**Live URL:** https://legacy-upgrade.com
**Local URL:** https://legacy-upgrade.test

Setup, commands, the Herd proxy and the deploy steps are in `README.md`; this file is the rules.

## Instructions

- **All user-visible copy lives in `src/content/`.** Components render those values and must never
  inline literal text. Change copy there, not in a component. `npm run verify:rendered` enforces it.
- **Do not replace the JS year rendering in the footer** with a build-time value — it is intentional,
  so the copyright line cannot go stale between deploys. See `src/components/current-year.tsx`.
- **Only semantic shadcn tokens** in components — `bg-background`, `text-muted-foreground`,
  `border-border`. Never raw Tailwind colours (`bg-gray-100`) or hex/rgb/oklch literals. Colour
  values belong exclusively in `src/app/themes/*.css`. See `THEMING.md`.
- **No one-off sizes either.** Headings, prices and big links use the type scale in `globals.css`
  (`text-display`, `text-h2`, `text-h3`, `text-h4`, `text-lead`), bands pad with `py-section`,
  paragraphs cap at `max-w-prose`, rectangles round with `rounded-lg`, and CTAs come from
  `src/lib/cta.ts`. A genuinely new value is added to the system (and `DESIGN.md`) first.
  `cn()` knows the custom text sizes; add any new one to `src/lib/utils.ts` too.
- **Motion runs for every visitor.** Never gate an animation on `prefers-reduced-motion`; that is
  the owner's decision. Don't add a reduced-motion override without asking.
- **Before calling a change done**, run `npm run lint`, `npm run typecheck`, `npm run build`, then
  `npm run verify:rendered` and `npm run verify:deploy`. Don't build while the user's `npm run dev`
  is running: it leaves the dev server serving stale CSS until `.next/` is deleted.
- **`output: 'export'` is a hard constraint.** No route handlers, no ISR, no middleware, no
  `next/image` optimizer, no server-side env vars. `src/app/robots.ts` and `src/app/sitemap.ts` need
  `export const dynamic = 'force-static'` or the build fails.
- **Never put `NEXT_PUBLIC_SITE_URL` in `.env.local`** — it is loaded by `next build` too, which
  ships `canonical` / `og:url` / sitemap pointing at the local domain. Use `.env.development`.
  `npm run verify:deploy` catches it.
- **Radix components that unmount hidden content need `forceMount`** if their text should be in the
  static HTML. This bit the old FAQ Accordion (the answers existed only in the RSC payload); the FAQ
  is plain markup now, but anything collapsed that must be crawlable needs the same treatment.
- For LinkedIn content, use the `/linkedin` skill (`.claude/skills/linkedin/`) — it is the single
  source of truth for LinkedIn voice and process. `_linkedin/YYYY_MM_DD.md` holds published posts as
  pure copy only (no frontmatter, no commentary); it is the voice corpus read before drafting.
- Comments referencing `source/*.blade.php` are **provenance notes** from the Jigsaw → Next refactor.
  Those files no longer exist; retrieve them with `git show 182782f:source/index.blade.php`.

## Tech Stack

- **Framework:** Next.js 16.2 (App Router, TypeScript, static export)
- **Bundler:** Turbopack (not Vite)
- **CSS framework:** Tailwind CSS 4 (no config file — CSS-first)
- **Components:** shadcn/ui, `radix-nova` style, `neutral` base colour
- **Icons:** `lucide-react`. It ships **no brand glyphs** — GitHub and LinkedIn are inlined Simple
  Icons paths in `src/components/brand-icons.tsx`.
- **Theming:** `next-themes`, class strategy
- **Fonts:** Kanit (headings, `next/font/local`) and Overpass (body, `@font-face`), both
  self-hosted woff2 — no Google Fonts request

## Local Dev Notes

- The `.test` domain is a Herd nginx proxy to the dev server, so `next.config.ts` needs
  `allowedDevOrigins` for it; changing `next.config.ts` needs a dev server restart.

## Site Structure

The site is one route (`/`) plus `not-found`. Sections live in `src/components/sections/` and are
assembled by `src/app/(site)/page.tsx` with anchor IDs (`#home`, `#services`, `#pricing`,
`#technology`, `#contact`), one per nav item.

- `src/app/layout.tsx` — html/body, fonts, metadata, `ThemeProvider`, `<SmoothAnchors>`.
- `src/app/(site)/layout.tsx` — header, footer and JSON-LD for the site route group.
  `not-found` renders the header and footer itself.
- `/brand` — internal asset sheet (logo, lockups, social covers) outside the group, so it has no
  site chrome; `noindex`, not in the sitemap. Exported PNGs live in `_brand/`.
- Anchor scrolling is JS (`src/components/smooth-anchors.tsx`, no URL hash), because browsers drop
  CSS smooth scroll when the OS animation setting is off. The scroll-spy is
  `src/hooks/use-active-section.ts`.
- Background motifs (arrows, €, ?) use a CSS scroll-driven parallax; distances are in
  `src/lib/parallax.ts`.

## Styling Architecture

- **`DESIGN.md`** — the design system: colour roles, the type scale, spacing, shapes, components
  and the named rules. Read it before any visual change; `PRODUCT.md` holds the product context
  (audience, voice, anti-references) the impeccable skill loads.
- **`src/app/globals.css`** — Tailwind entry, `@theme inline` token mapping, the type/spacing scale
  (`text-display|h2|h3|h4|lead`, `py-section`), keyframes and base rules. Contains **no colour
  values**.
- **`src/app/themes/`** — `upgrade.css` (neutral base) + `palettes/tighten.css` (active; `harbour`,
  `dusk` alternate) + `dosage-bands.css` (`dosage-neutral` alternate). See `THEMING.md`.
- **Dark mode** — `next-themes` with `attribute="class"`, `defaultTheme="system"`. Its inlined
  pre-paint script sets both the class and `style.colorScheme`. Storage key is `theme`.

## SEO Architecture

- **Metadata** — the Metadata API in `src/app/layout.tsx`, sourced from `src/content/site.ts`.
  Title template appends `| Legacy Upgrade`.
- **OG / Twitter images** — file conventions: `src/app/opengraph-image.jpg`, `twitter-image.jpg`,
  each with an `.alt.txt` sibling. **The alt file must have no trailing newline** or Next emits no
  `og:image:alt`. **WebP is not accepted** by these conventions.
- **Favicon** — `src/app/icon.png`.
- **JSON-LD** — `src/lib/jsonld.ts` builds ProfessionalService and FAQPage; rendered by
  `src/components/json-ld.tsx`. Plain `@context` / `@type` keys — the old `@@` escaping was a Blade
  artifact and is wrong here.
- **`robots.txt` / `sitemap.xml`** — generated by `src/app/robots.ts` and `src/app/sitemap.ts`. The
  sitemap's `lastModified` is a hardcoded constant, not the build date; bump it when copy changes.
- Note the visible FAQ (3 questions) and the FAQPage JSON-LD (5 questions) are **different sets with
  different wording**, inherited as-is. Worth reconciling during a copy pass.

## Static Assets

- `src/assets/images/`, `src/assets/images/logos/`, `src/assets/fonts/` — imported statically so
  Turbopack hashes them and `next/image` gets intrinsic dimensions.
- `src/lib/logos.ts` maps logo filenames to those imports, keeping `src/content/` dependency-free.
- `public/` — only files needing a stable path: `.htaccess`.

