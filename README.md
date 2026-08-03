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
| `npm run verify:rendered` | Every `src/content/` string reaches the built HTML |
| `npm run verify:deploy` | `out/` is safe to upload (run after `build`) |
| `npm run logos` | Regenerate AVIF logo variants (needs `src/assets/images/logos/src/`) |

## Local development with Laravel Herd

`E:\webs` is a **parked** Herd path, so Herd used to serve `legacy-upgrade.test` straight off the
directory. That no longer works: there is no PHP entry point, and Herd's
`BasicWithPublicValetDriver` would serve `public/` — which now holds only `.htaccess`.

Point the domain at the Next dev server with an nginx proxy instead. One-time setup:

```bash
herd proxy legacy-upgrade http://localhost:3000 --secure
```

Then, for every session:

```bash
npm run dev
```

and open **https://legacy-upgrade.test**. The existing TLS certificate is reused, HMR works over the
proxy, and `.env.development` makes `canonical` / `og:url` resolve to the `.test` origin.

To inspect the **production build** on the same domain, run `npm run build` then serve `out/` on the
same port — the proxy does not care what is behind it:

```bash
npm run build
npx serve out -l 3000
```

Housekeeping:

- `herd proxies` lists it, `herd unproxy legacy-upgrade` removes it.
- `next.config.ts` sets `allowedDevOrigins: ['legacy-upgrade.test', …]`. Without it Next 16 rejects
  dev requests arriving from a non-localhost origin and HMR breaks.
- Changing `next.config.ts` needs a dev server restart. If `next dev` says *"Another next dev server
  is already running"*, kill the orphan by port:
  `netstat -ano | grep ":3000.*LISTENING"` → `taskkill /PID <pid> /T /F`.

## Content

**All user-visible copy lives in `src/content/`.** Components render those values and never
inline literal text. Change copy there, not in a component.

`npm run verify:rendered` enforces it: every string in `src/content/` must appear in the built
HTML (or in the JSON-LD, for schema-only copy). It strips the RSC payload first, so a string that
only exists in React's flight data does not count as rendered.

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

Swapping the theme is one line in `src/app/globals.css`:

```css
@import "./themes/neutral.css";   /* neutral | brand | slate */
```

Theme files under `src/app/themes/` are the only place colour values may appear; everything else
references semantic tokens. **See [THEMING.md](THEMING.md)** — including why
`shadcn init -p <preset>` is not a colour switcher and is destructive on this project.

Kanit is self-hosted from `src/assets/fonts/` via `next/font/local` — no Google Fonts request.

## Notes

- The footer year is rendered client-side on purpose, so the copyright line cannot go stale
  between deploys. Do not replace it with a build-time value.
- `output: 'export'` rules out route handlers, ISR, middleware, and the `next/image` optimizer.
  `src/app/robots.ts` and `src/app/sitemap.ts` therefore need `export const dynamic = 'force-static'`.
- The sitemap's `lastModified` is a hardcoded constant, not the build date. Bump it when the copy
  actually changes.
