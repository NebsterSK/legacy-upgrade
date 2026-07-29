# Legacy Upgrade

Single-page static site for https://legacy-upgrade.com — Next.js 16 (App Router) + Tailwind CSS 4
+ shadcn/ui, built to a plain folder of HTML/CSS/JS and deployed by FTP.

## Prerequisites

- Node.js 22+ (developed on 25.2)
- npm

```bash
npm install
```

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server at http://localhost:3000 |
| `npm run build` | Production build → `out/` |
| `npm run preview` | Serve the built `out/` folder as a plain static site |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run verify:copy` | Every legacy Blade/PHP string is present in `src/content/` |
| `npm run verify:rendered` | Every `src/content/` string reaches the built HTML |
| `npm run verify:deploy` | `out/` is safe to upload (run after `build`) |
| `npm run logos` | Regenerate AVIF logo variants (needs `src/assets/images/logos/src/`) |

## Content

**All user-visible copy lives in `src/content/`.** Components render those values and never
inline literal text. Change copy there, not in a component.

`npm run verify:copy` and `npm run verify:rendered` bracket that rule from both sides — one checks
content against the original Jigsaw source, the other checks content against the built output.

## Environment

There is no server-side environment on the host, so anything URL-shaped is **baked in at build
time**.

- **Production needs no env vars.** `src/content/site.ts` defaults to `https://legacy-upgrade.com`.
- `.env.development` points `NEXT_PUBLIC_SITE_URL` at `https://legacy-upgrade.test`. It is loaded by
  `next dev` only.
- **Do not put `NEXT_PUBLIC_SITE_URL` in `.env.local`.** `.env.local` is loaded by `next build` too,
  which would ship `canonical`, `og:url`, and the sitemap pointing at the local domain.
  `npm run verify:deploy` catches this, but the safe habit is to leave it out.

See `.env.example`.

## Deploying

Manual FTP upload via FileZilla.

```bash
npm run build
npm run verify:deploy    # refuses if out/ is not deployable
```

Then upload **the contents of `out/`** to the web root.

### Four things that will bite you

1. **`.htaccess` is a dotfile.** FileZilla hides dotfiles unless *Server → Force showing hidden
   files* is enabled. If it does not transfer you silently lose all cache headers, the security
   headers, and the 404 mapping. Verify it arrived.
2. **Wipe the web root on the first Next deploy.** The old Jigsaw build served assets from
   `assets/build/`; Next serves from `_next/`. Uploading on top leaves the entire old asset tree
   orphaned on the server. On later deploys, clearing `_next/static/` each time is also fine —
   every file there is content-hashed and re-uploaded.
3. **Use binary transfer mode** for `woff2` / `webp` / `png` / `jpg`. FileZilla's auto mode
   normally gets this right; ASCII mode on a font or image corrupts it.
4. **Upload everything in `out/`, including the `.txt` files.** They are React Server Component
   payloads (~250 kB, 15% of the deploy) used for client-side navigation. Skipping them works —
   the router falls back to a full page load — but selective exclusion over manual FTP is how
   mistakes happen. Upload the lot.

Worth doing once: save a FileZilla **Site Manager** entry with the local path pinned to `out/` and
the remote path set to the web root. Deploying then becomes connect → select all → upload.

## Theming

Stock shadcn `radix-nova` preset, neutral base colour. The theme lives entirely in the
`:root` / `.dark` token blocks in `src/app/globals.css`.

Components must only reference semantic tokens (`bg-background`, `text-muted-foreground`,
`border-border`, …) and never raw colours — that discipline is what makes swapping a preset a
single-file change. shadcn CLI 4.x ships named presets (Nova, Vega, Maia, Lyra, Mira, Luma, Sera,
Rhea) plus `shadcn preset resolve|decode|url|open`.

Kanit is self-hosted from `src/assets/fonts/` via `next/font/local` — no Google Fonts request.

## Notes

- The footer year is rendered client-side on purpose, so the copyright line cannot go stale
  between deploys. Do not replace it with a build-time value.
- `output: 'export'` rules out route handlers, ISR, middleware, and the `next/image` optimizer.
  `src/app/robots.ts` and `src/app/sitemap.ts` therefore need `export const dynamic = 'force-static'`.
- The sitemap's `lastModified` is a hardcoded constant, not the build date. Bump it when the copy
  actually changes.
