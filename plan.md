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

- [x] Done

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

### Outcome

New files: `src/components/theme-provider.tsx`, `json-ld.tsx`, `analytics.tsx`, and
`src/lib/jsonld.ts`. `next-themes@0.4.6` installed. All gates green.

Everything below was read out of the built `out/index.html`, not inferred:

- `<title>Custom Software &amp; Business Automation | Legacy Upgrade</title>`, matching
  description, `<link rel="canonical">`.
- **11 `og:*` tags and 8 `twitter:*` tags**, including `og:image:alt` / `twitter:image:alt` with
  diacritics and em dash intact, and image type/width/height. Declaring `openGraph`/`twitter` in
  `metadata` without an `images` key correctly *merges* with the file-convention images rather
  than overriding them.
- GA loads `gtag/js?id=G-BECNN06810` with `strategy="afterInteractive"` plus the inline
  `gtag('config', 'G-BECNN06810')` block.
- **Both JSON-LD blocks parse and are field-complete.** Verified programmatically:
  ProfessionalService has 6 `serviceType`, 9 `knowsAbout`, 2 `areaServed`, the full
  `PostalAddress` with `addressCountry: SK`, founder + jobTitle, `priceRange: €€`, and 4
  `hasOfferCatalog` offers. FAQPage has all 5 questions. Diacritics survive
  (`Kukučínova 42`, `Lukáš Neuschl - Legacy Upgrade`).
- **next-themes' anti-FOUC script is inlined** ahead of paint — reads `localStorage.getItem("theme")`,
  falls back to `matchMedia('(prefers-color-scheme: dark)')`, sets the class *and*
  `style.colorScheme`. Better than the old hand-written script, which did not set `colorScheme`.
  (It is minified, so grepping for `localStorage.getItem("theme")` finds nothing — the key is a
  mangled variable. Parse the inline scripts instead.)

Two intentional diffs from the old output, both to be allowed at Task 13:

- **`ProfessionalService.image` is now `/opengraph-image.jpg`**, not
  `/assets/build/images/portrait.webp` — a knock-on of the Task 5 WebP→JPEG re-encode.
- **Canonical and `og:url` have no trailing slash** (`https://legacy-upgrade.com`), where Blade
  emitted `https://legacy-upgrade.com/`. Next normalizes this from `trailingSlash: false`. Per
  RFC 3986 an empty path is equivalent to `/` for the root, so there is no SEO consequence; not
  worth fighting the framework over.

Also note: `grep -c 'application/ld+json' out/index.html` returns 4, not 2 — the RSC flight
payload embedded in the HTML repeats each script. There are 2 real `<script>` tags.

---

## Task 7 — Header, nav, theme toggle, footer

- [x] Done

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

### Outcome

New: `site-header.tsx`, `site-footer.tsx`, `theme-toggle.tsx`, `current-year.tsx`,
`brand-icons.tsx`, `hooks/use-active-section.ts`, `hooks/use-is-hydrated.ts`. Header and footer
wired into `layout.tsx` around `<main className="grow">`. All gates green; dev server renders
200 with a clean log.

Verified in `out/index.html`: all four nav labels, the brand, `Social media`, both social links,
`Legacy Upgrade logo`, `LEGACY UPGRADE`, and both `aria-label`s (`Toggle dark mode`,
`Toggle navigation`). **The `©` is present but no 4-digit year is anywhere near it** — the year is
correctly client-only.

Three findings that changed the implementation:

- **`lucide-react` 1.x has no brand icons.** `Linkedin` and `Github` are simply not exported
  (6014 icons, neither of them). Added `src/components/brand-icons.tsx` with the canonical Simple
  Icons paths (CC0) inlined — no extra dependency for two glyphs. All 33 other icons the remaining
  tasks need do exist; verified by probing the package exports.
  Messenger and WhatsApp keep their generic lucide stand-ins: I am confident in the GitHub and
  LinkedIn path data, less so in reconstructing those two from memory, and a wrong brand path
  renders a visibly broken glyph. If exact marks matter, add `simple-icons` at Task 10.
- **The theme control is a binary toggle, not a Light/Dark/System dropdown.** "System" would be
  new user-visible copy, which the copy freeze forbids. It reproduces the old behaviour exactly:
  shows the icon and label of the theme you would switch *to* (sun + "Light" while dark is active),
  with the old `aria-label`. Consequence: **`dropdown-menu` from Task 4 is now unused** — decide at
  Task 16 whether to delete it.
- **`react-hooks/set-state-in-effect` rejects the usual `mounted` pattern.** The standard
  `useState(false)` + `useEffect(() => setMounted(true), [])` is a lint error under Next 16's
  ruleset. Replaced with `useSyncExternalStore(noopSubscribe, () => true, () => false)` in
  `use-is-hydrated.ts`, and the same shape in `CurrentYear` (server snapshot `null`, client
  snapshot the year). Cleaner than the pattern it replaces and it is what keeps the year out of the
  static HTML.

Also ported: scroll-spy via `IntersectionObserver` with the old
`-(headerHeight + 20)px 0px -60% 0px` rootMargin, but measuring the header with a ref instead of
hardcoding; and shadow-on-scroll as a `{ passive: true }` listener that only touches the DOM on
state change. The `.nav-link::after` underline was **not** ported — active state is a shadcn-
idiomatic weight/colour change.

> **Gotcha for later tasks: `TaskStop` does not kill `next dev`.** It stops the `npm` wrapper; the
> child `next dev` process keeps the port. A stale server from Task 1 was still holding :3000 and
> serving **HTTP 500** (its module graph predated every file added since), which silently broke a
> smoke test. Kill it by port instead:
> `netstat -ano | grep ":3000.*LISTENING"` → `taskkill //PID <pid> //T //F`.

Not verified here, deferred to the Task 13 manual pass: actual scroll behaviour, Sheet
open/close, and no-flash theme persistence. Those need a real browser — the static HTML and a
clean dev log cannot prove them.

---

## Task 8 — Section: Home (hero, What I do / Why it matters, Clients)

- [x] Done

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

### Outcome

New: `sections/home.tsx`, `hero.tsx`, `about.tsx`, `clients.tsx`, plus `section-header.tsx`
(both `SectionHeader` and `SubsectionHeader`), `rich-text.tsx`, and `src/lib/logos.ts`.
`page.tsx` now renders `<Home />`. All gates green.

**Added `scripts/verify-rendered.mjs` (`npm run verify:rendered`)** — the counterpart to
`verify-copy.mjs`. That one checks content against the *legacy source*; this one checks content
against the *built output*, so a string can no longer be present in `src/content/` yet quietly
never reach the page. It doubles as a progress dashboard, and Task 13 step 1 is now largely this
script. Current state:

```
OK   site         11/11      todo services     14/20
todo company      10/14      todo process       6/20
OK   nav          13/13      todo pricing       4/17
OK   hero         11/11      todo faq          11/20
OK   about        14/14      todo technology   12/20
OK   clients      20/20      todo contact      17/30
OK   footer         8/8
```

Two real bugs it caught immediately, which is the point of building it:

- **Both `about` paragraphs read as missing.** They render fine — but they wrap `<strong>`, so the
  full sentence is not a contiguous substring of the markup. Fixed by checking a tag-stripped copy
  of the HTML as well as the raw markup (attributes like `alt`/`title` only exist in the latter).
  A naive substring check over raw HTML would have silently under-reported for the rest of the
  port.
- **`nav.theme.light` ("Light") reads as missing** and legitimately is: the toggle only renders
  that label once dark mode is active, so it is never in prerendered HTML. Added to the
  not-rendered skip list with a comment rather than papering over it.

`src/lib/logos.ts` maps logo filename → static import for all 12 logos. `src/content/` keeps
filenames as plain strings so it stays dependency-free; this is the single place they become
hashed assets with intrinsic dimensions. Task 10 reuses it for the tech-stack grid.

Deviation: **the Clients block is a uniform 3-column Card grid.** The old markup alternated
logo-left / logo-right / stacked-pair per client. Flattened deliberately — design fidelity is
explicitly not a goal — but it is the most visible layout departure so far, so expect it to look
different from the live site while reading identically.

---

## Task 9 — Section: Services (services grid, Process, Pricing, FAQ)

- [x] Done

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

### Outcome

New: `src/lib/icons.ts` and `components/sections/services/` — `index.tsx`, `services-grid.tsx`,
`process.tsx`, `pricing.tsx`, `faq.tsx`. All gates green, and every module in this section now
reports **100% rendered**: services 20/20, process 20/20, pricing 17/17, faq 20/20.

Spot-checked in the built HTML: `from € 800`, `€ 30`, `per hour`, `Step 1` through `Step 6`, all
six process titles, all three visible FAQ answers including the apostrophe in
`my client's needs`. Accordion content is present in the static HTML while closed
(`data-state="closed"` × 13), so it stays crawlable.

`src/lib/icons.ts` maps the `IconName` strings from content to lucide components via an explicit
named registry rather than a dynamic lookup — the bundle only carries the 23 icons actually used,
and an unknown name throws at render instead of silently rendering nothing.

Two deviations, both to avoid inventing copy:

- **No Badge on the featured pricing tier.** The plan called for a Badge where the old `ring-2`
  emphasis was, but a badge needs a label and any label ("Recommended", "Popular") would be new
  user-visible copy. Kept the ring.
- **FAQ answer icons keep their tone semantically but not their colours.** The old answers were
  prefixed with red / blue / yellow Remix icons. `no` maps to `X` with `text-destructive`; `info`
  and `maybe` use `Info` / `CircleHelp` with the default colour. Raw `blue-600` / `yellow-500`
  would break the token discipline Task 15 depends on.

**Three shadcn components are now unused**: `badge` (superseded by the ring above),
`dropdown-menu` (superseded by the binary theme toggle in Task 7), and `separator` (never needed).
Decide at Task 16 whether to delete them — they cost nothing in the bundle since nothing imports
them, but they are dead files.

Process note: an ad-hoc `node -e` check reported `Iteration & Support` as missing, which was a
shell-quoting artifact in the throwaway command, not a real miss — re-checked properly and all
five `&`-containing strings are present. `verify:rendered` is the authoritative check; ad-hoc greps
over HTML entities are not.

---

## Task 10 — Sections: Technology and Contact

- [x] Done

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

### Outcome

New: `sections/technology.tsx`, `sections/contact.tsx`, `components/content-icon.tsx`.
`page.tsx` now renders all four sections. All gates green.

**Every content module is at 100% rendered — 13 of 13 OK:**

```
OK site 11/11    OK company 14/14   OK nav 13/13      OK hero 11/11
OK about 14/14   OK clients 20/20   OK services 20/20 OK process 20/20
OK pricing 17/17 OK faq 20/20       OK technology 20/20
OK contact 30/30 OK footer 8/8
```

Spot-checked in the built HTML: all four contact hrefs (`mailto:`, `tel:`, `m.me`, `wa.me`) with
`target="_blank" rel="noopener noreferrer"` on the two external ones; `Company ID / IČO`,
`Tax ID / DIČ`, `IBAN` and all three values; `Kukučínova 42`, `831 03, Bratislava`,
`Slovak Republic`; `alt="Laravel"` and `alt="Laravel Forge"`; and `tabindex="0"` preserved on each
tooltip trigger tile so the logo labels stay keyboard-reachable.

**`react-hooks/static-components` blocked the obvious icon pattern.** `const PersonIcon =
getIcon(...)` in a render body is a lint error — binding a component to a capitalized variable
during render defeats reconciliation if the lookup changes. Note it only fires at the top level of
a render body, not inside a `.map()` callback, which is why Task 9 passed with the same shape.
Fixed with `ContentIcon`, which resolves the name via `createElement` instead of a variable
binding. Worth reusing in Tasks 9's components if they are ever touched again.

Deviations: the Technology logo tooltips replace the hand-rolled fade-in `<span>` with the shadcn
`Tooltip`, keeping the wrapper focusable. The Contact grid is a plain 1/2-column Card layout.

Pre-existing issue carried over faithfully, **not** fixed: `href="tel:+421 949 746 983"` contains
spaces, because the old Blade did `tel:{{ $page->company->contact->phone }}` against a
space-formatted number. Most dialers cope, but a `tel:` URI should be `tel:+421949746983`. Left
alone here since it is behaviour, not copy — worth a one-line fix during the later polish pass.

---

## Task 11 — robots.txt, sitemap.xml, 404

- [x] Done

- Replace the static files with Next conventions (they pre-render to static files under
  `output: 'export'`): `app/robots.ts` and `app/sitemap.ts` — single URL, `https://legacy-upgrade.com`.
  Compare the generated output against the current `source/robots.txt` and `source/sitemap.xml`;
  if anything differs meaningfully, keep the static files in `public/` instead.
- Add `app/not-found.tsx` → builds to `out/404.html`. Minimal: header, a short message, footer.
  This is new copy and the one place new text is allowed — keep it to a single line.

**Done when:** `out/` contains `robots.txt`, `sitemap.xml`, and `404.html`, all correct.

### Outcome

`src/app/robots.ts`, `src/app/sitemap.ts`, `src/app/not-found.tsx` added; the static
`public/robots.txt` and `public/sitemap.xml` deleted. All gates green, all 13 content modules
still 100% rendered.

**Both route conventions need `export const dynamic = 'force-static'` under `output: 'export'`.**
Without it the build fails outright — *"export const dynamic = force-static / export const
revalidate not configured on route /sitemap.xml with output: export"*. Not optional, and not
mentioned in most examples.

Diffed the generated files against the old static ones. Differences are cosmetic only, so the
generated versions were kept:

- `robots.txt`: `User-Agent:` vs `User-agent:` (the header is case-insensitive per the standard)
  and a blank line before `Sitemap:`.
- `sitemap.xml`: indentation dropped, and `<priority>1.0</priority>` serialized as
  `<priority>1</priority>` — the same number, and Google has ignored `priority` for years anyway.

`lastModified` is a **hardcoded `2026-04-19` constant, not the build date** — carried over from the
old sitemap unchanged. A `lastmod` should track when content last changed, not when the site was
last deployed; using `new Date()` would make every FTP upload churn the sitemap for no reason. This
refactor changes no copy, so the old date is still the truthful value. Bump it when copy actually
changes.

The 404 renders inside the root layout, so it gets the real header and footer for free. It carries
the one line of new copy the plan allows plus a `Home` link reusing `nav.items[0].label`.
`@next/next/no-html-link-for-pages` correctly flagged `<a href="/">` — that is a route navigation,
unlike the `#anchor` links everywhere else — so it uses `next/link`.

Two things noted for Task 12:

- **The 404 inherits the home page's `<title>`.** `not-found.tsx` cannot export its own `metadata`
  in the App Router, and a dedicated title would be new copy. Harmless since 404s are excluded by
  status code, but it is a diff from a hand-written 404.
- `out/` also contains `_not-found/`, `_not-found.html`, `_not-found.txt` — Next's internal
  not-found route, duplicating `404.html`. Fold into the Task 12 decision about which files
  actually need uploading.

---

## Task 12 — Production build, `.htaccess`, deploy path

- [x] Done

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

### Outcome

`public/.htaccess` updated, `.env.example` + `.env.development` added, vestigial `.env` removed,
`readme.md` rewritten, and **`scripts/verify-deploy.mjs` (`npm run verify:deploy`)** added as a
pre-upload gate. **22/22 checks pass.** Served `out/` on a plain static server: index 200, CSS/JS/
font/portrait/robots/sitemap/icon/OG all 200, unknown path 404.

**Found and fixed a live footgun.** I first put `NEXT_PUBLIC_SITE_URL` in `.env.local` — and
`.env.local` is loaded by `next build`, not just `next dev`. The production build came out with
`<link rel="canonical" href="https://legacy-upgrade.test">`. On a manual FTP deploy that ships
silently: the page looks perfect and the canonical points at a domain that does not resolve.
Fixed by using **`.env.development`**, which Next loads only when `NODE_ENV=development`.

`verify:deploy` exists because of that near-miss, and it was **negative-tested**: building with
`NEXT_PUBLIC_SITE_URL=https://legacy-upgrade.test` in scope produces
`3 check(s) failed — do NOT upload out/`, naming canonical and og:url. It checks 8 required files,
that no dev origin appears anywhere, canonical / og:url / sitemap `<loc>` / robots sitemap line, the
three `.htaccess` behaviours, both JSON-LD blocks, all four section ids, and that the footer year is
*not* baked in.

Note `sitemap.xml` and `robots.txt` were unaffected by the bad env, because they read `site.url`
directly rather than the env var. Only `metadataBase` consumes it. Left as-is — those two always
pointing at production is the safe direction.

`.htaccess` changes:

- Added `ErrorDocument 404 /404.html`.
- Added a cache rule for the **RSC `.txt` payloads** giving them the 300s HTML TTL instead of the
  1-day `text/plain` default — they mirror page content, so a day-old copy could be served after a
  deploy. It is deliberately placed *above* the `robots.txt` rule, since later `Header set`
  directives win in Apache and robots must keep its 1-day TTL.
- Reworded the fingerprint comment (was "hashed by Vite") and confirmed the immutable rule is
  correct for Next: everything under `_next/static/` is content-hashed, and `/icon.png`,
  `/opengraph-image.jpg`, `/twitter-image.jpg` carry a hash query string, which browsers key
  cache on.

**Decision on the RSC payload files: upload them.** Measured at **251 kB of 1.61 MB — 15.6% of the
deploy**, with `index.txt` and `__next._full.txt` being identical 68.6 kB duplicates. My earlier
instinct was to exclude them, but they are the only thing making the 404 page's `Home` link a
client navigation rather than a full reload, and "upload everything except `*.txt` except
`robots.txt`" is a rule that gets fumbled by hand over FTP. Simplicity wins; the readme documents
the option if upload time ever matters.

Also removed the tracked `.env` (contained only `APP_URL=https://legacy-upgrade.test`, referenced
nowhere in the codebase — a Jigsaw-era leftover).

---

## Task 13 — Verification gate

- [x] Done — with one caveat: the manual browser pass (item 5) is **still outstanding** and is
      the user's to do. Everything machine-checkable passes.

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

### Outcome

Added `scripts/verify-parity.mjs`, which diffs the built Next output against a freshly built
Jigsaw reference on visible text, head metadata, and both JSON-LD blocks, with every allowed
difference declared inline. **Verdict: PARITY OK.**

#### The gate caught a real regression

**FAQ answers were missing from the static HTML.** Radix Accordion *unmounts* collapsed content, so
all three answers existed only inside the RSC flight payload — not in the markup. The old page had
them as plain `<p>`. Fixed with `forceMount` on `AccordionContent`, which makes Radix apply
`hidden` instead of unmounting.

**And it exposed a flaw in my own verifier.** `verify-rendered.mjs` had been checking the raw
`out/index.html`, which embeds every rendered string in the RSC payload as JSON — so it reported
`faq 20/20 OK` for answers that were never in the DOM. It now strips all `<script>` blocks except
`application/ld+json` (kept as a separate haystack, since `site.schemaDescription`, `company.name`
and the five `faq.schema` questions are structured data only). Task 9 and 10's green results were
partly false confidence; re-verified after the fix and they hold.

Two process notes worth keeping:

- **Compare against `build_production`, not `build_local`.** The local build bakes in
  `legacy-upgrade.test`, which makes every URL look like a regression.
- **Delete `source/hot` before building the reference.** It was left over from `npm run watch` and
  made Jigsaw emit `legacy-upgrade.test:5173` URLs for every asset — which would have made the
  Lighthouse comparison meaningless.

#### 1. Visible text — PASS

645 words old, 635 new; nothing from the old page missing, no unexpected new text. Declared
allowances: the 404 line; `Dark` appearing twice (desktop + mobile toggle vs one before); `Light`
absent (the old toggle rendered both labels and hid one, next-themes renders only the active one);
and the eight tech/infrastructure logo labels, which moved from hover-revealed `<span>` text into
`alt` attributes — verified present on all eight.

#### 2. Metadata and JSON-LD — PASS

Title, description, both `og:`/`twitter:` sets, and **both JSON-LD blocks field-identical** after
normalizing the OG image path. Allowed: trailing-slash normalization on canonical/`og:url`, and the
WebP→JPEG image re-encode. New additions: `og:image:type/width/height` and the Twitter equivalents.

#### 3. Lighthouse (mobile, both builds served locally) — MIXED, net better

|                          | OLD (Jigsaw) | NEW (Next) |
| --- | --- | --- |
| Performance              | 65    | **78** |
| Accessibility            | 95    | **98** |
| Best Practices           | 96    | **100** |
| SEO                      | 100   | 100 |
| First Contentful Paint   | 1.8 s | 1.8 s |
| Largest Contentful Paint | 4.2 s | **5.6 s** |
| Total Blocking Time      | 20 ms | 90 ms |
| Cumulative Layout Shift  | **0.447** | **0** |
| Total transfer           | 705 KiB | 1202 KiB |
| Script requests          | 2     | 13 |

**The old site has a failing CLS of 0.447** — the Core Web Vitals threshold is 0.1. That is a live
problem on production today, not something this refactor introduced, and eliminating it (0) is why
the performance score rose despite shipping far more JavaScript. Most likely cause: the old markup
sized images with CSS classes only, where `next/image` emits intrinsic `width`/`height`.

**LCP regressed 4.2 s → 5.6 s** and is the one genuine performance cost. First-party JS goes from
~3 KiB to **229 KiB gzipped** (771 KiB raw across 13 chunks) — the price of React + Radix. Worth a
dedicated pass later; do not treat 78 as the finish line.

Measurement caveats, stated because the numbers deserve them: both builds were served from
`localhost` by `serve`, which negotiates **brotli**, whereas the real host uses Apache
`mod_deflate` (**gzip**) over the public internet. Lighthouse's script-transfer figure (830 KiB)
exceeds the raw on-disk total of first-party JS (771 KiB), so it is evidently mixing compressed and
uncompressed accounting and should not be quoted as a real-world byte count. Treat the *scores* as
comparable — same harness, same throttling, same machine — and the absolute byte counts as
indicative only.

#### 4. `lint` and `typecheck` — PASS

#### 5. Manual browser pass — NOT DONE

Deliberately left to the user. Scroll behaviour, the mobile Sheet, no-flash theme persistence,
keyboard traversal, and whether the plainer layout is acceptable cannot be established from static
HTML or a clean build log. **This is the checkpoint before Task 14 deletes `source/`.**

---

## Task 14 — Remove the PHP toolchain

- [x] Done

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

### Outcome

Ran the full gate one last time before deleting anything — build, `verify:copy`, `verify:parity`,
`verify:rendered` 13/13, `verify:deploy` 22/22, lint, typecheck: **all green**. Then removed:

- **36 tracked files**: `source/` (all Blade templates, `_assets/`, `_components/`, `_includes/`,
  `_layouts/`), `composer.json`, `composer.lock`, `bootstrap.php`, `config.php`,
  `config.production.php`
- **On disk**: `vendor/` (20 MB), `build_local/` (5.1 MB), `build_production/` (5.1 MB),
  `source/` (5.3 MB)
- **`scripts/verify-copy.mjs` and `scripts/verify-parity.mjs`** plus their npm scripts — both read
  the Blade source, so they became meaningless rather than merely unused. `verify-copy` would have
  reported "skipped (gone)" for all nine inputs and passed trivially, which is worse than not
  existing.
- The legacy block from `.gitignore`

Then verified from a **completely clean slate** — `rm -rf .next out node_modules && npm ci &&
npm run build` — that the build succeeds with no PHP, no Composer, and no `vendor/` present.
Repo is now **13 MB** excluding `node_modules`/`.git` (down from ~48 MB) across **103 tracked
files**. `verify:rendered` still 13/13, `verify:deploy` still 22/22.

**Deviation on the done-when criterion.** The `rg` check does *not* return nothing: **28 files under
`src/` still match**, because every ported component and content module carries a provenance comment
like ``/** Ported from `source/index.blade.php:39-59`. */``. Those are comments, not dependencies —
the criterion's intent ("no live dependency on Blade/Jigsaw remains") is satisfied, and the
comments are genuinely useful for tracing where a string came from. Kept them deliberately rather
than mutilating 28 files to satisfy a grep. Task 16 adds a note explaining that those paths refer
to the pre-refactor tree, recoverable via `git show 182782f:source/index.blade.php`.

`.idea/php.xml` and `.idea/legacy-upgrade.iml` also still reference PHP. That is the user's IDE
configuration, which the task explicitly says to keep — worth cleaning up in PhpStorm, but not
mine to touch.

**What is now permanently lost:** the ability to re-run `verify:parity`. The Jigsaw reference build
has no source to regenerate from. Its final verdict (PARITY OK, recorded under Task 13) is the
last word, and the old tree lives on at commit `182782f` and earlier.

---

## Task 15 — Make preset-swapping fast

- [x] Done

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

### Outcome

**The Task 3 revision was wrong, and testing it is what proved that.** I had rewritten this task to
lead with the shadcn CLI's named presets. They are not a colour theme switcher. Swapped Nova → Vega
and diffed:

- **Zero colour change.** Every OKLCH token value came out byte-identical; only block order moved.
  Colour comes from `baseColor` at first init and re-running `init` does not touch it. What presets
  actually change is the primitive style (`radix-nova` → `radix-vega`) and the bundled font.
- **It rewrote `src/app/layout.tsx` destructively** — injected `Inter` from `next/font/google` and
  replaced `className={kanit.variable}` with `cn("font-sans", inter.variable)`, dropping the Kanit
  variable from `<html>` entirely (so `font-kanit` resolves to nothing) and re-adding the Google
  Fonts request Task 5 deliberately removed.
- **It reverted the `@theme inline` font mappings** back to `var(--font-sans)`.

Reverted, and implemented the fallback the task specified instead.

Token blocks now live in `src/app/themes/`, and `globals.css` contains **zero colour values** —
just one import:

```css
@import "./themes/neutral.css";   /* neutral | brand | slate */
```

Three themes, each verified to change the compiled `--primary` in both light and dark with no other
edit:

| Theme | light `--primary` | notes |
| --- | --- | --- |
| `neutral.css` | `#171717` | **active**; stock shadcn, extracted verbatim |
| `brand.css` | `#0559d2` | the old site's `oklch(0.5 0.2 260)` accent, restored |
| `slate.css` | `#0074c9` | cool-grey neutrals, hue 250 |

**Correction:** I have been calling the old brand colour "purple" throughout this plan. Compiled, it
is `#0559d2` — a vivid blue-violet. Hue 260 in OKLCH sits on the blue side. The theme file is named
`brand.css` rather than `violet.css` for that reason.

Token discipline audited and **already clean before this task** — no raw Tailwind colour utilities
and no hex/rgb/oklch literals anywhere in `src/` outside `src/app/themes/`, including inside
`src/components/ui/`. The FAQ tone-icon decision at Task 9 is what kept it that way.

Also added **`THEMING.md`** covering the swap procedure, the no-raw-colour rule with its audit
commands, how to add a theme from ui.shadcn.com/themes or tweakcn.com, and a warning about what
`shadcn init -p` does to this project. `readme.md` now points at it.

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
