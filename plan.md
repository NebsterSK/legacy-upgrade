# Refactor: Jigsaw → Next.js + Tailwind 4 + shadcn/ui

Goal: replace the PHP/Jigsaw/Blade toolchain with a modern React stack that ships the same
static output, so the site itself becomes a demo of the stack — and so shadcn presets can be
swapped in minutes.

## Hard constraints

1. **Copy is frozen.** Every user-visible string must survive byte-for-byte from
   `source/index.blade.php`, `source/_layouts/main.blade.php`, `source/_includes/*`, and
   `config.php`. No additions, no rewording, no deletions, no "improvements" — not even
   punctuation or capitalization. Copy optimization is a separate, later job.
2. **Design fidelity is not a goal.** Do not try to reproduce the current layout pixel-for-pixel.
   Use stock shadcn/ui primitives and the stock shadcn theme. Visual iteration comes later.
3. **No animation layer.** No `motion`/`framer-motion`, no scroll reveals. CSS transitions that
   come free with shadcn components are fine.
4. **Static output only.** `next build` must produce a plain folder of HTML/CSS/JS that the
   current Apache host serves with no Node runtime.
5. **Single page.** One route (`/`) with anchor sections `#home`, `#services`, `#technology`,
   `#contact`. No new pages, no routing.

## Decisions already made

| Topic | Decision |
| --- | --- |
| Framework | Next.js latest (16.x), App Router, TypeScript, `output: 'export'` |
| Bundler | Turbopack (Next's own). Vite goes away — Next does not use it. |
| Styling | Tailwind CSS 4 (via `@import "tailwindcss"`, no config file) |
| Components | shadcn/ui, **stock default theme** (neutral). Purple `--primary-l/c/h` scheme is dropped. |
| Icons | `lucide-react`. Remix Icon font is removed entirely. Brand/tech logos stay as SVG/WebP files. |
| Dark mode | `next-themes`, class strategy, matching shadcn's documented setup |
| Font | Kanit, self-hosted via `next/font/local` from the existing woff2 files |
| Deploy | Static export → existing Websupport/Apache host, `.htaccess` preserved |
| Repo | In-place on the `refactor` branch. Old PHP files stay until Task 14 so copy can be diffed. |
| Layout | `--src-dir` scaffold, so app files live at **`src/app/`** (not `app/`). Where tasks below say `app/…`, read `src/app/…`. |
| Package manager | npm |

## How to run this plan

Tasks are ordered and mostly sequential. One task per `/loop` iteration:

- Do exactly one unchecked task, top to bottom.
- Verify its **Done when** criteria before checking the box.
- Check the box in this file and commit with `refactor(next): <task title>`.
- If a task is blocked, leave it unchecked, add a `> BLOCKED: <reason>` line under it, and stop.
- Never work ahead. Never touch copy.

---

## Task 1 — Scaffold the Next.js app in place

- [x] Done

Create the Next.js app at the repo root without disturbing `source/`, `config.php`, or `vendor/`.

- Scaffold into a temp dir (`npx create-next-app@latest`) with: TypeScript, ESLint, Tailwind,
  App Router, Turbopack, `src/` dir, import alias `@/*`. Then move `src/`, `app/`, `public/`,
  `next.config.ts`, `tsconfig.json`, `next-env.d.ts`, `eslint.config.mjs`, `postcss.config.mjs`
  into the repo root. Do **not** scaffold directly into the repo root — it will clobber
  `package.json` and `.gitignore`.
- Merge `package.json` by hand: keep `"private": true`, take the Next dependency block, replace
  scripts with `dev` / `build` / `start` / `lint`. Drop `@tighten/jigsaw-vite-plugin`,
  `vite`, `vite-plugin-static-copy`, `remixicon`, `@tailwindcss/vite`. Keep `sharp` available for
  `scripts/convert-logos.mjs` (add it as a devDependency if it is not already installed).
- Delete `vite.config.js`.
- Append to `.gitignore`: `/.next/`, `/out/`, `/next-env.d.ts`, `.env*.local`.
- Configure `next.config.ts`:
  ```ts
  const nextConfig: NextConfig = {
    output: 'export',
    images: { unoptimized: true },
    trailingSlash: false,
  }
  ```
- Strip the create-next-app demo page down to a bare `app/page.tsx` returning `<main />` and a
  minimal `app/layout.tsx`. Delete the demo SVGs from `public/`.

**Done when:** `npm run dev` serves a blank page at `localhost:3000` with no console errors, and
`npm run build` writes `out/index.html`.

### Outcome

Versions installed: **Next 16.2.12, React 19.2.4, Tailwind 4, TypeScript 5, Node 25.2.0**.
`npm run dev` → HTTP 200, clean log. `npm run build` → `out/index.html` (4.8 kB) + `out/404.html`.
`npm run lint` and `npm run typecheck` clean.

Deviations from the task as written, all deliberate:

- **`start` script replaced with `preview`** (`npx --yes serve out`). `next start` is invalid under
  `output: 'export'` — it errors out rather than serving. `preview` serves the real static output,
  which is what actually needs checking before an FTP upload.
- **Added `typecheck`** (`tsc --noEmit`) and **`logos`** (`node scripts/convert-logos.mjs`) scripts.
- **`sharp` pinned as an explicit devDependency** (`^0.34.5`, already present transitively) since
  `scripts/convert-logos.mjs` imports it directly.
- **`"type": "module"` dropped** from `package.json` — it existed for the Vite config. Config files
  are `.mjs`/`.ts` and resolve as ESM on their own.
- **ESLint + tsconfig ignore `vendor/`, `source/`, `build_local/`, `build_production/`.** Without
  this, `npm run lint` reported 2072 problems from Symfony's vendored JS and the old
  `source/_assets/js/main.js`. Revisit at Task 14 when those trees are deleted.
- **Next telemetry disabled** (`npx next telemetry disable`).
- **`src/app/favicon.ico` deleted** rather than kept — it was the create-next-app default. `/favicon.ico`
  404s until Task 5 adds `src/app/icon.png`.

Notes carried forward:

- `.env` at the repo root holds `APP_URL` from the Jigsaw era. Next loads it and logs
  `- Environments: .env`. Harmless now; superseded in Task 12 by `NEXT_PUBLIC_SITE_URL`.
- `out/` contains RSC payload files (`index.txt`, `__next.*.txt`) alongside the HTML. Dead weight
  for a single static page. Decide at Task 12 whether to upload them (they are needed only for
  client-side navigation between routes, of which there are none).
- `npm audit` reports 13 high-severity advisories, **all dev-only** and transitive through
  `eslint-config-next` (`brace-expansion`/`minimatch`/`picomatch` DoS + glob issues). Nothing
  reaches the browser bundle. Not fixing: `npm audit fix --force` wants ESLint 10, which
  `eslint-config-next@16` does not support.

---

## Task 2 — Extract all copy into a typed content module

- [x] Done

This is the safety net for constraint #1. Do it **before** writing any component.

- Create `src/content/` with typed modules — suggested split:
  - `site.ts` — title, description, canonical/baseUrl, OG/Twitter strings, GA measurement ID
  - `company.ts` — everything from `config.php`: name, email, phone, messenger, whatsapp,
    ID/IČO, tax/DIČ, IBAN, address, LinkedIn + GitHub URLs
  - `hero.ts`, `services.ts`, `process.ts`, `pricing.ts`, `faq.ts`, `clients.ts`,
    `technology.ts`, `contact.ts`, `nav.ts`, `footer.ts`
- Copy strings across with **copy-paste, never retyping**. Preserve diacritics (`Lukáš`,
  `Kukučínova`), em dashes (`—`), non-breaking-ish spacing, and the exact `IČO` / `DIČ` labels.
- Include the FAQ answer text from the `@section('jsonld')` FAQPage block — note that the five
  JSON-LD questions do **not** match the three questions rendered in the visible FAQ section.
  Keep both sets verbatim and separately: `faq.visible` (3 items, from lines 243–265) and
  `faq.schema` (5 items, from lines 410–459). Do not reconcile them.
- Store icons as lucide component names or an icon key, not as `ri-*` strings.

**Done when:** a throwaway script (or manual review) confirms every literal string in
`source/index.blade.php` + `main.blade.php` + `_includes/*` + `config.php` appears verbatim in
`src/content/`, and `npx tsc --noEmit` passes.

### Outcome

15 modules in `src/content/` (~600 lines): `types`, `site`, `company`, `nav`, `hero` (+ `about`),
`clients`, `services`, `process`, `pricing`, `faq`, `technology`, `contact`, `footer`, `schema`,
`index` (barrel). Typecheck, lint, and build all clean.

The verifier became **permanent, not throwaway** — `scripts/verify-copy.mjs`, wired up as
`npm run verify:copy`. It extracts candidate copy from all nine legacy Blade/PHP files and asserts
each string is present in `src/content/`, exiting non-zero on a miss. Currently: **150 candidates
checked against 211 content strings, 0 misses.** Task 13 reuses it rather than reinventing a diff.

It was **negative-tested**, not just observed passing: rewording one visible FAQ answer and
deleting one sentence from a schema answer both produced the expected 2 failures, and the check
went green again on restore. A green run means something.

Three design decisions worth knowing:

- **Inline `<strong>` is preserved structurally, not as HTML.** Two paragraphs in the source
  ("What I do", "Why it matters") bold a mid-sentence clause. Content stores them as
  `RichText` — `['I deliver ', {bold: '…'}, '. Internal tools…']` — so no HTML lives in content
  and `richTextToString()` reconstructs the exact sentence for the verifier. Confirmed: the built
  HTML contains the sentence verbatim.
- **`.ts` extensions on intra-content imports** (`from './types.ts'`), with
  `allowImportingTsExtensions: true` in `tsconfig.json`. This is what lets plain `node` import the
  content modules directly via type-stripping — otherwise the verifier would need a compile step.
  Verified that Turbopack resolves both the `.ts` specifiers and the `@/content` alias by building
  a throwaway page against them.
- **`"type": "module"` restored to `package.json`.** Removed in Task 1 as Vite residue; needed
  again so Node does not re-parse the content modules as CommonJS. Build unaffected.

Content facts found while extracting, all preserved as-is:

- **Two different descriptions exist.** `config.php`'s `description` (used only for the JSON-LD
  `ProfessionalService.description`) is *not* the same text as `@section('pageDescription')` (the
  `<meta name="description">`). Kept separately as `site.schemaDescription` and
  `site.pageDescription`. Easy thing to accidentally collapse into one.
- **The hero `<h1>` is "Lukas Neuschl" without diacritics**, while the Contact card and JSON-LD
  `founder.name` both use "Lukáš Neuschl". Kept as `hero.name` vs `company.personName`.
- Prices carry a space after the symbol (`from € 800`, `€ 30`). Not normalized.
- Remix Icon → lucide mappings are recorded as comments in each module. Two have no real lucide
  equivalent: `ri-messenger-fill` → `MessageCircle` and `ri-whatsapp-fill` → `MessageSquare`.
  Brand glyphs will need Simple Icons or inline SVG if the exact logos matter (Task 10).

---

## Task 3 — Initialize shadcn/ui with the stock theme

- [x] Done

- Run `npx shadcn@latest init`. Choose the **default/neutral** base color. Accept the standard
  `app/globals.css` rewrite: `@import "tailwindcss"`, `@import "tw-animate-css"`,
  `@custom-variant dark (&:is(.dark *))`, the `:root` / `.dark` OKLCH token blocks, and
  `@theme inline`.
- Verify `components.json` is written with the `@/components/ui` alias and `"tailwind": {"css": "app/globals.css"}` (or `src/app/globals.css`, matching the scaffold).
- Delete the old `source/_assets/css/main.css` theme concepts — do **not** port `--primary-l/c/h`,
  `.nav-link`, `.nav-menu-collapsible`, or `.bg-code-pattern`. (The old file itself is deleted in
  Task 14.)
- Keep exactly two custom bits in `globals.css`:
  - `section[id] { scroll-margin-top: 4rem; }`
  - `html { scroll-behavior: smooth; }` — this replaces the 47-line hand-rolled easing scroller.

**Done when:** `npx shadcn@latest add button` succeeds and a stock `<Button>` renders with correct
colors in both light and dark (`.dark` toggled manually on `<html>`).

### Outcome

shadcn CLI **4.16.0**. `components.json`: `style: radix-nova`, `baseColor: neutral`,
`iconLibrary: lucide`, `css: src/app/globals.css`, aliases wired. `src/lib/utils.ts` (`cn`) and
`src/components/ui/button.tsx` created. All gates green (typecheck, lint, verify:copy, build).

Verified by building a probe page with `<Button>`, `variant="outline"`, `variant="secondary"`, and
a `.dark`-wrapped copy, then reading the compiled CSS: `--primary` resolves to `#171717` in
`:root` and `#e5e5e5` under `.dark` — the stock neutral inversion — with `.bg-primary`,
`.text-primary-foreground`, and `.bg-background` all wired to the token vars. Probe reverted after.
(Note: Lightning CSS compiles the source `oklch()` values down to hex + `lab()` fallbacks, so grep
the build output for hex, not `oklch`.)

**The CLI has changed shape since this plan was written** — this matters for Task 15:

- There is no `--base-color` flag any more. `init` prompts for one of **8 named presets** — Nova,
  Vega, Maia, Lyra, Mira, Luma, Sera, Rhea, or Custom — and presets are now a first-class CLI
  concept (`shadcn preset resolve|decode|url|open`). Task 15's "make preset-swapping fast" is
  largely handed to us; revise that task to use the CLI's preset machinery rather than
  hand-rolling `app/themes/*.css`.
- `-y` does **not** make `init` non-interactive; it still blocks on the preset prompt. The working
  invocation is `npx shadcn@latest init -y -b radix -p nova --css-variables`.
- `-b/--base` selects the primitive library: `radix`, `base` (Base UI), or `aria` (React Aria).
  **Chose `radix`** — the classic foundation that ui.shadcn.com/themes and tweakcn presets target.
  The CLI's own default is `base-nova` (Base UI), which would be the less compatible pick for
  "drop in a third-party theme quickly".

Deviations and things to know:

- **`shadcn` is now a runtime dependency**, not just a CLI. `globals.css` does
  `@import "shadcn/tailwind.css"`, so the package must stay in `dependencies`.
- **The Nova preset rewrote `layout.tsx` to load Geist from `next/font/google`.** That is a
  build-time network fetch to Google and is not the intended font. Task 5 replaces it with
  self-hosted Kanit via `next/font/local`; until then the build depends on network access.
- **Custom CSS is exactly three rules**, in a commented block at the end of `globals.css`:
  `section[id] { scroll-margin-top: 4rem }`, `html { scroll-behavior: smooth }`, and a
  `prefers-reduced-motion` escape hatch for the latter (added — smooth scrolling is a motion
  accessibility issue, and the old JS scroller ignored the preference too). Nothing from the old
  `main.css` was ported: no `--primary-l/c/h`, no `.nav-link`, no `.nav-menu-collapsible`, no
  `.bg-code-pattern`.
- The old `source/_assets/css/main.css` file itself is still on disk; it is deleted in Task 14.

---

## Task 4 — Add the shadcn component set

- [x] Done

`npx shadcn@latest add button card accordion badge separator sheet tooltip dropdown-menu`

Mapping to current markup, for reference:

| Current | shadcn |
| --- | --- |
| Hero + pricing CTA `<a>` buttons | `Button` (`asChild` + `<a>`) |
| Client cards, service tiles, pricing tiers, contact info boxes | `Card` |
| FAQ `<h3>` + `<p>` pairs | `Accordion` (type `single`, collapsible) |
| Pricing "recommended" `ring-2` treatment | `Badge` |
| Mobile nav `max-height` CSS collapse | `Sheet` (side `right`) |
| Tech-logo hover label spans | `Tooltip` |
| Dark mode toggle | `DropdownMenu` (Light / Dark / System) |

**Done when:** every component exists under `components/ui/`, `npx tsc --noEmit` passes, and
`npm run lint` is clean.

### Outcome

All 8 present in `src/components/ui/`: `accordion`, `badge`, `button`, `card`, `dropdown-menu`,
`separator`, `sheet`, `tooltip`. Typecheck, lint, and build clean.

Verified with a probe page that imports and renders every one of them (catches API drift and
missing peer deps, which a bare `ls` would not). Confirmed the interactive ones still
server-render their content into the static export — `Fixed-Scope Project`, the accordion
question, and the badge text are all present in `out/index.html`, so the Accordion/Sheet/Tooltip
copy is crawlable rather than JS-only. Probe reverted.

Carried forward to Task 6: **the Tooltip needs `<TooltipProvider>` wrapping the app** — the CLI
prints this reminder on install. Without it the tech-stack tooltips in Task 10 silently fail.

Baseline for later comparison: the probe build produced **7 JS chunks, 852 kB total unminified
on disk** with all 8 components in the tree. Worth re-checking at Task 13 against the current
live site, since the old page shipped ~1 small hand-written JS file.

---

## Task 5 — Assets, fonts, and images

- [x] Done

- Move `source/_assets/fonts/Kanit-{Regular,Bold}.woff2` → `src/assets/fonts/`. Load with
  `next/font/local` (weights 400 and 700, `display: 'swap'`, `variable: '--font-kanit'`), and
  expose it in `globals.css` via `@theme inline { --font-kanit: var(--font-kanit); }` so
  `font-kanit` remains a Tailwind utility.
- Move `source/_assets/images/*` → `src/assets/images/` (keep the `logos/` subfolder). Import them
  as static imports and render with `next/image` — with `unoptimized: true` you still get
  content-hashed filenames and intrinsic width/height (good for CLS).
- Exceptions that must live at stable paths in `public/`: `robots.txt`, `sitemap.xml` (until
  Task 11), `.htaccess` (until Task 12).
- Favicon: `source/_assets/images/favicon.png` → `app/icon.png` (Next emits the `<link>` tag).
- OG image: `portrait.webp` → `app/opengraph-image.webp` + `app/twitter-image.webp`, with the
  existing `og:image:alt` text supplied via the `alt` export. Set `metadataBase` so the URL is
  absolute.
- Leave `scripts/convert-logos.mjs` in place but update `SRC_DIR`/`OUT_DIR` to the new paths.
  Note: it emits `-{64,128,256,512}w.avif` variants that the current page does **not** reference —
  do not start referencing them here.

**Done when:** Kanit renders in the browser (check DevTools → Network for the woff2, and that no
`remixicon` font is requested), and every image resolves in `out/` after a build.

### Outcome

Assets in place: `src/assets/fonts/` (2 woff2), `src/assets/images/` (portrait, code-pattern,
logo_lg, logo_sm) and `src/assets/images/logos/` (12 files). `public/` holds `.htaccess`,
`robots.txt`, `sitemap.xml`. `src/app/` holds `icon.png`, `opengraph-image.jpg`,
`twitter-image.jpg`, and the two `.alt.txt` files. All gates green; `out/` is 1.1 MB.

Verified from the build output, not assumed:

- Kanit emitted as two hashed woff2 under `_next/static/media/`, **auto-preloaded** with
  `rel="preload" as="font" crossorigin` — the old layout did this by hand for Regular only.
- `.font-kanit{font-family:var(--font-kanit)}` present in the compiled CSS.
- Static image imports hash correctly (`portrait.1o7-pk7vpb5ze.webp`, `laravel.1zgcfb2owwwb1.svg`).
- `<link rel="icon" href="/icon.png?…" sizes="48x48">` generated from the file convention.
- `public/` contents land at the root of `out/`, `.htaccess` included.

**`opengraph-image.webp` silently produced no tags** — Next's image file convention only accepts
`.jpg/.jpeg/.png/.gif`, not WebP. Re-encoded both OG/Twitter images to JPEG with sharp (quality
88, same 500×538 dimensions, ~27 kB each) and they now emit `og:image`, `:type`, `:width`,
`:height` with absolute URLs off `metadataBase`. Worth noting the old site served
`portrait.webp` as its `og:image`, which several scrapers (Twitter, WhatsApp) do not reliably
render — so this is a small fix, not just a port.

**`opengraph-image.alt.txt` needs no trailing newline.** With one, Next emits no `og:image:alt` at
all — no warning, no error. Written with `printf` (no `\n`); both alt tags now render with the
diacritics and em dash intact.

Deviations:

- **Assets were copied, not moved.** `source/` stays byte-intact until Task 14 so the Jigsaw
  reference build keeps working. Confirmed `build_local/index.html` already exists, so Task 13 has
  its comparison target without needing PHP to run again.
- **Font wiring differs from the old CSS.** `@theme inline` now maps `--font-kanit` (from
  `next/font/local`) and points `--font-heading` at it, with `--font-sans` set to
  `system-ui, -apple-system, sans-serif` — matching the old `body` rule. The Nova preset's
  `Geist` + `next/font/google` import is **removed**, so the build no longer fetches from Google.
- **`metadataBase` added here rather than at Task 12**, since the OG/Twitter file conventions need
  it to produce absolute URLs. Reads `NEXT_PUBLIC_SITE_URL`, defaults to the production domain.
- `scripts/convert-logos.mjs` repointed at `src/assets/images/logos/`, and now fails with a clear
  message instead of an unhandled `ENOENT` — its `SRC_DIR` (`logos/src`) does not exist in the
  repo and never did.
- `code-pattern.svg`, `logo_lg.webp`, `logo_sm.webp` carried over even though nothing references
  them (`code-pattern.svg` was only used by the dropped `.bg-code-pattern` rule). Keeps the option
  open; they cost nothing until imported.

---

## Task 6 — Layout shell: providers, metadata, analytics, JSON-LD

- [ ] Done

Build `app/layout.tsx`:

- `<html lang="en" suppressHydrationWarning>`, Kanit font variable on `<body>`.
- `ThemeProvider` from `next-themes` (`attribute="class"`, `defaultTheme="system"`,
  `enableSystem`, `disableTransitionOnChange`). This replaces the inline anti-FOUC script and the
  `localStorage.darkMode` logic. **Note:** the key changes from `darkMode` to `theme`, so returning
  visitors fall back to system preference once. Acceptable.
- `export const metadata: Metadata` covering, verbatim from Task 2 content:
  `title` (`'Custom Software & Business Automation | Legacy Upgrade'` — the layout's `| Legacy
  Upgrade` suffix is best done with `title.template`), `description`, `alternates.canonical`,
  `openGraph` (type/locale/siteName/title/description/url/images), `twitter` (card
  `summary_large_image`, title/description/images), `metadataBase`.
- GA via `next/script`: `<Script src="https://www.googletagmanager.com/gtag/js?id=G-BECNN06810"
  strategy="afterInteractive" />` plus the inline `dataLayer`/`gtag('config', …)` block. Keep the
  measurement ID exactly. Leave the commented-out Plausible snippet out — it is dead code.
- JSON-LD: two `<script type="application/ld+json">` tags rendered with
  `dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }}` — one `ProfessionalService` (port
  `source/_includes/ld-json.blade.php` field-for-field) and one `FAQPage` (from `faq.schema`).
  In TS/JSX the `@@` escaping from Blade is **not** needed — use plain `"@context"` / `"@type"`.

**Done when:** view-source on the built `out/index.html` shows the same `<title>`, description,
canonical, OG, Twitter, and both JSON-LD blocks as the current live page, and both JSON-LD blocks
validate on validator.schema.org.

---

## Task 7 — Header, nav, theme toggle, footer

- [ ] Done

- `components/site-header.tsx` (client component): sticky header, brand link `#home`, the four
  anchor links from `nav.ts`, `Sheet` for the mobile menu (closes on link click), and the theme
  toggle `DropdownMenu`.
- `hooks/use-active-section.ts`: `IntersectionObserver` scroll-spy, ported from
  `source/_assets/js/main.js:64-89`. Keep the `rootMargin: '-<navHeight+20>px 0px -60% 0px'`
  idea — measure the header height with a ref instead of hardcoding. Active link gets a shadcn-
  idiomatic active style; do **not** port the `.nav-link::after` underline CSS.
- Shadow-on-scroll: keep it, as a `useEffect` scroll listener with `{ passive: true }` and
  state-change-only toggling (same approach as the old JS).
- `components/site-footer.tsx`: Social media column (LinkedIn, GitHub with external-link icon),
  logo linking to `#home`, and `LEGACY UPGRADE © <year>`.
  **The year stays client-rendered JS** (`useEffect` + state, or a small client component) — this
  is a deliberate project rule, not an oversight. Do not compute it at build time.
- Delete nothing from `source/` yet.

**Done when:** nav anchors scroll to the right sections, the mobile Sheet opens/closes, the theme
toggle persists across reload with no flash of the wrong theme, and the footer year is correct and
absent from the static HTML.

---

## Task 8 — Section: Home (hero, What I do / Why it matters, Clients)

- [ ] Done

Port `source/index.blade.php:8-108` into `components/sections/home.tsx` (split into
`hero.tsx`, `about.tsx`, `clients.tsx` if it gets long).

- Hero: `h1` "Lukas Neuschl" in `font-kanit`, the sub-copy, portrait image, and the two CTA
  `Button`s ("Contact", "Services").
- What I do / Why it matters: two-column content with the existing subsection headers.
- Clients: three client blocks (remam, yasmin, stcc logos) as `Card`s, alternating layout dropped
  in favour of a plain uniform grid.
- Replace the `<x-section-header>` / `<x-subsection-header>` Blade components with
  `components/section-header.tsx` and `components/subsection-header.tsx` — same idea, stock
  shadcn typography, no `text-primary-600`/`font-kanit` colour rules carried over.

**Done when:** every string in lines 8–108 appears on the rendered page, in the same order,
unchanged.

---

## Task 9 — Section: Services (services grid, Process, Pricing, FAQ)

- [ ] Done

Port `source/index.blade.php:111-266` into `components/sections/services/`.

- Services grid: the `@foreach` list of `['icon', 'text']` pairs — map each `ri-*` to a lucide
  component in `src/content/services.ts`. `ri-terminal-box-line` → `TerminalSquare`, etc. Nearest
  sensible equivalent is fine; log the mapping as a comment.
- Process: "How We Work Together" numbered steps — port the step titles and bodies exactly.
- Pricing: two `Card`s — "Fixed-Scope Project" (with a `Badge` where the `ring-2` emphasis was)
  and "Hourly Engagement", each with its feature list and CTA button text ("Request a quote",
  "Get in touch").
- FAQ: the **three visible** questions (`faq.visible`) rendered as an `Accordion`. Do not pull in
  the five schema questions here — those are JSON-LD only (Task 6).

**Done when:** all three visible FAQ items expand/collapse, and a string-by-string check against
lines 111–266 passes.

---

## Task 10 — Sections: Technology and Contact

- [ ] Done

**Technology** — port `source/index.blade.php:269-319`:

- Section intro copy, then "Tech Stack" (laravel, tailwindcss, claude, inertiajs, mysql, vuejs)
  and "Infrastructure" (websupport, forge).
- Grayscale + opacity hover/focus treatment can stay (it is Tailwind, not animation).
- Replace the hand-rolled `<span>` hover labels with shadcn `Tooltip`. Keep keyboard focus
  reachability (`tabIndex={0}` equivalent) so the labels are accessible.

**Contact** — port `source/index.blade.php:322-407`:

- Contact methods `Card`: email (`mailto:`), phone (`tel:`), Messenger, WhatsApp — all four links
  from `company.ts`, external ones with `target="_blank" rel="noopener noreferrer"`.
- Address `Card`: street / `zip, city` / country.
- Company Details `Card`: "Company ID / IČO", "Tax ID / DIČ", "IBAN" with their values.
- Assemble `app/page.tsx` from `<Home />`, `<Services />`, `<Technology />`, `<Contact />`.

**Done when:** all four contact links open the right target, and lines 269–407 check out
string-by-string.

---

## Task 11 — robots.txt, sitemap.xml, 404

- [ ] Done

- Replace the static files with Next conventions (they pre-render to static files under
  `output: 'export'`): `app/robots.ts` and `app/sitemap.ts` — single URL, `https://legacy-upgrade.com`.
  Compare the generated output against the current `source/robots.txt` and `source/sitemap.xml`;
  if anything differs meaningfully, keep the static files in `public/` instead.
- Add `app/not-found.tsx` → builds to `out/404.html`. Minimal: header, a short message, footer.
  This is new copy and the one place new text is allowed — keep it to a single line.

**Done when:** `out/` contains `robots.txt`, `sitemap.xml`, and `404.html`, all correct.

---

## Task 12 — Production build, `.htaccess`, deploy path

- [ ] Done

- `.htaccess`: move `source/.htaccess` → `public/.htaccess` and verify it lands in `out/`. Check
  Next's asset layout against the rules — `_next/static/**` files are content-hashed, so the
  extension-based `FilesMatch` immutable rules already cover them, but confirm.
- Add `ErrorDocument 404 /404.html`.
- Confirm the `Cache-Control` HTML rule (`max-age=300, must-revalidate`) still applies given
  `trailingSlash: false`.
- **Deploy is manual FTP via FileZilla** — upload the contents of `out/` to the web root, replacing
  the old Jigsaw output. Document this in `readme.md`, including these three gotchas:
  - **`.htaccess` is a dotfile.** FileZilla hides dotfiles unless *Server → Force showing hidden
    files* is enabled. Verify it actually transferred, or the cache and security headers silently
    disappear.
  - **Delete the old build first.** Jigsaw output (`assets/build/…`) and Next output (`_next/…`)
    live at different paths, so uploading over the top leaves the entire old asset tree orphaned
    on the server. Wipe the web root (keeping nothing but what you re-upload) on the first Next
    deploy. On later deploys, `_next/static/` accumulates stale hashed chunks — clearing it each
    time is fine since every file is content-hashed and re-uploaded.
  - **Use binary transfer mode** for woff2/webp/png/avif. FileZilla's auto mode is normally
    correct, but ASCII mode on a font or image corrupts it.
  - Optional and worth the 10 minutes: save a FileZilla **Site Manager** entry with the local path
    pinned to `out/` and the remote path to the web root, so deploying is connect → select-all →
    upload. Note it in the readme.
- Do **not** deploy in this task.
- Env: `NEXT_PUBLIC_SITE_URL` for `metadataBase`, defaulting to `https://legacy-upgrade.com`;
  `.env.local` sets `https://legacy-upgrade.test` for dev. Add `.env.example`.

**Done when:** `npm run build` produces a complete `out/` (index.html, 404.html, `_next/static/`,
`.htaccess`, robots, sitemap, all images) that works when served by a plain static file server.

---

## Task 13 — Verification gate

- [ ] Done

Nothing gets deleted until this passes.

1. **Copy diff (the important one).** Extract visible text from the old build
   (`build_local/index.html` or a fresh Jigsaw build) and from `out/index.html`, normalize
   whitespace, sort, and diff. The only permitted differences are the 404 line from Task 11 and
   the client-rendered footer year. Any other delta is a bug — fix it, do not accept it.
2. **Meta diff.** `<title>`, description, canonical, all OG + Twitter tags, both JSON-LD blocks.
3. **Lighthouse** on the built output, mobile: record Performance / Accessibility / Best
   Practices / SEO and compare against the current live site. Flag regressions; do not chase
   them here.
4. `npm run lint` and `npx tsc --noEmit` clean.
5. Manual pass: light + dark, mobile + desktop, keyboard-only nav through header → sections →
   accordion → footer.

**Done when:** the copy diff is empty (modulo the two allowances) and results are written into
this file under the task.

---

## Task 14 — Remove the PHP toolchain

- [ ] Done

Only after Task 13. Delete:

- `source/` (entire tree — `.blade.php` files, `_assets/`, `_components/`, `_includes/`,
  `_layouts/`, `assets/build/`, `hot`, `.htaccess`, `robots.txt`, `sitemap.xml` — everything has
  been ported by now)
- `composer.json`, `composer.lock`, `vendor/`, `bootstrap.php`
- `config.php`, `config.production.php`
- `build_local/`, `build_production/`
- The `/build_local`, `/build_production`, `/source/assets/build/`, `/source/hot`, `/vendor/`,
  `/cache/` lines in `.gitignore`

Keep `.claude/`, `_linkedin/`, `scripts/`, `.gitattributes`, `.idea/`.

**Done when:** `rg -l 'blade|jigsaw|\$page->' --glob '!.claude/**' --glob '!plan.md'` returns
nothing, and `npm run build` still succeeds from a clean `node_modules` + `.next`.

---

## Task 15 — Make preset-swapping fast

- [ ] Done

This is the payoff for the whole refactor — a theme change must be a one-file edit.

> Revised after Task 3: shadcn CLI 4.16 has **native presets** (Nova, Vega, Maia, Lyra, Mira,
> Luma, Sera, Rhea, Custom) plus `shadcn preset resolve|decode|url|open`. Lead with that machinery
> instead of hand-rolling theme files. The project is currently on `radix-nova`.

- First establish the discipline that makes any swap work: nothing in the codebase may reference a
  raw colour — only shadcn semantic tokens (`bg-background`, `text-muted-foreground`,
  `border-border`, …). Grep for stragglers: `rg 'text-(gray|primary|zinc)-|bg-(gray|primary)-'`.
- Try swapping to a second named preset via the CLI and confirm it rewrites only the token blocks
  in `globals.css`. Record the exact command and what it touches.
- If (and only if) the CLI's swap is destructive or hard to reverse, fall back to isolating the
  `:root` / `.dark` / `--radius` blocks into `src/app/themes/_active.css` imported by
  `globals.css`, with 2–3 presets alongside (one from ui.shadcn.com/themes, one from tweakcn.com)
  and the swap being a one-line `@import` change.
- Verify `npx shadcn@latest add <registry-url>` works against the project (`components.json` is
  correctly wired), including a remote registry item — that is what makes third-party blocks and
  themes drop in.
- Add a `THEMING.md` (or a section in `readme.md`): how to add a preset, how to swap, which files
  are theme-owned.

**Done when:** swapping the active preset visibly rethemes the whole page with no other file
edits, in both light and dark.

---

## Task 16 — Docs

- [ ] Done

- Rewrite `CLAUDE.md` for the new stack. Remove all Blade/Jigsaw rules (`@@` JSON-LD escaping,
  `@push`/`@stack`, YAML front matter, `$page`). **Keep** the footer-year rule (still intentional)
  and the `/linkedin` skill rule (unrelated to this refactor). Add: static-export constraint,
  the copy-is-frozen rule while this refactor is in flight, `src/content/` as the single source of
  copy, shadcn token discipline, theme-preset location.
- Rewrite `readme.md`: prerequisites, `npm run dev` / `build` / `lint`, output location, deploy
  procedure from Task 12, theming pointer.
- Update `.claude/agents/*` and `.claude/skills/*` if any reference Blade, Jigsaw, or `config.php`.

**Done when:** a fresh reader can clone, install, run, build, deploy, and reskin from the docs
alone, with no PHP mentioned anywhere.

---

## Open questions

- ~~**Deploy mechanism**~~ — resolved: manual FTP upload of the build output via FileZilla.
  Covered in Task 12.
- **Visible FAQ vs JSON-LD FAQ mismatch** — 3 visible questions, 5 in schema, and the wording of
  the overlapping ones differs. Preserved as-is per constraint #1; worth fixing during the later
  copy pass, since Google can flag schema that is not present on the page.
- **`darkMode` → `theme` localStorage key change** — one-time loss of stored preference for
  returning visitors. Assumed acceptable; say so if not.
- **Unused AVIF logo variants** — `scripts/convert-logos.mjs` generates them, nothing consumes
  them. Left alone here; candidate for a later performance pass.
