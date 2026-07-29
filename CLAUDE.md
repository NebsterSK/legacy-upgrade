# CLAUDE.md

## Project Overview

Legacy Upgrade is a **single-page** static company website for a freelance software development
business focused on **digitalization and automation through custom software for businesses**. Built
with **Next.js 16** (App Router) and **Tailwind CSS 4**, exported to static HTML and deployed by FTP.

**Live URL:** https://legacy-upgrade.com
**Local URL:** https://legacy-upgrade.test

## Instructions

- **All user-visible copy lives in `src/content/`.** Components render those values and must never
  inline literal text. Change copy there, not in a component. `npm run verify:rendered` enforces it.
- **Do not replace the JS year rendering in the footer** with a build-time value — it is intentional,
  so the copyright line cannot go stale between deploys. See `src/components/current-year.tsx`.
- **Only semantic shadcn tokens** in components — `bg-background`, `text-muted-foreground`,
  `border-border`. Never raw Tailwind colours (`bg-gray-100`) or hex/rgb/oklch literals. Colour
  values belong exclusively in `src/app/themes/*.css`. See `THEMING.md`.
- **`output: 'export'` is a hard constraint.** No route handlers, no ISR, no middleware, no
  `next/image` optimizer, no server-side env vars. `src/app/robots.ts` and `src/app/sitemap.ts` need
  `export const dynamic = 'force-static'` or the build fails.
- **Never put `NEXT_PUBLIC_SITE_URL` in `.env.local`** — it is loaded by `next build` too, which
  ships `canonical` / `og:url` / sitemap pointing at the local domain. Use `.env.development`.
  `npm run verify:deploy` catches it.
- **Radix components that unmount hidden content need `forceMount`** if their text should be in the
  static HTML. This already bit the FAQ Accordion: without it the answers existed only in the RSC
  payload. Anything relying on collapsed content being crawlable needs the same treatment.
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
- **Custom font:** Kanit, self-hosted woff2 via `next/font/local` — no Google Fonts request

## Commands

```bash
npm run dev              # dev server (loads .env.development)
npm run build            # production build → out/
npm run preview          # serve out/ as a plain static site
npm run lint             # ESLint
npm run typecheck        # tsc --noEmit
npm run verify:rendered  # every src/content/ string reaches the built HTML
npm run verify:deploy    # out/ is safe to upload (run after build)
```

## Site Structure

One route (`/`) plus `not-found`. Sections live in `src/components/sections/` and are assembled by
`src/app/page.tsx` with anchor IDs (`#home`, `#services`, `#technology`, `#contact`). Header, footer,
providers, metadata, and JSON-LD are in `src/app/layout.tsx`. Smooth scrolling is CSS
(`scroll-behavior`), and the scroll-spy is `src/hooks/use-active-section.ts`.

## Styling Architecture

- **`src/app/globals.css`** — Tailwind entry, `@theme inline` token mapping, and three
  project-specific base rules (`section[id]` scroll margin, `scroll-behavior: smooth`, and a
  `prefers-reduced-motion` escape hatch). Contains **no colour values**.
- **`src/app/themes/*.css`** — the `:root` / `.dark` token blocks. Swap the single `@import` in
  `globals.css` to change theme: `neutral` (active), `brand`, `slate`.
- **Fonts** — `--font-kanit` from `next/font/local`; `--font-heading` points at it, `--font-sans` is
  the system stack.
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

## Deploying

Manual FTP upload of `out/` via FileZilla. `npm run build && npm run verify:deploy` first. The
gotchas (hidden dotfiles, wiping the old Jigsaw asset tree, binary transfer mode) are in `readme.md`.
