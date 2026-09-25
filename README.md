# Legacy Upgrade

The one-page site for https://legacy-upgrade.com: Next.js 16 and Tailwind CSS 4, exported to
plain static files and deployed by FTP.

## Setup

Node.js 22+ (developed on 25.2).

```bash
npm install
npm run dev
```

The dev server runs at http://localhost:3000. No env vars are needed; `.env.development` already
points the site URL at the local domain.

### Local domain (Laravel Herd)

To use **https://legacy-upgrade.test** instead, proxy it to the dev server once:

```bash
herd proxy legacy-upgrade http://localhost:3000 --secure
```

Then run `npm run dev` as usual. `herd proxies` lists the proxy and `herd unproxy legacy-upgrade`
removes it. To check the production build on the same domain, run `npm run build`, then
`npx serve out -l 3000`.

If `next dev` says *"Another next dev server is already running"*, find the process with
`netstat -ano | grep ":3000.*LISTENING"` and stop it with `taskkill /PID <pid> /T /F`. If the dev
server shows stale styles after a build, stop it, delete `.next/` and start it again.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build into `out/` |
| `npm run preview` | Serve `out/` as a plain static site |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |
| `npm run verify:rendered` | Check that every string in `src/content/` reaches the built HTML |
| `npm run verify:deploy` | Check that `out/` is safe to upload (run after `build`) |
| `npm run logos` | Regenerate AVIF logo variants (needs `src/assets/images/logos/src/`) |

## Where things are

- **Copy:** `src/content/` (all visible text).
- **Sections:** `src/components/sections/`, assembled in `src/app/(site)/page.tsx`.
- **Colours:** `src/app/themes/`. See [THEMING.md](THEMING.md).
- **`/brand`:** an internal page with the logo and social covers; exported PNGs are in `_brand/`.

| Doc | What it is |
| --- | --- |
| [CLAUDE.md](CLAUDE.md) | Coding rules and architecture notes for AI agents (and humans) |
| [DESIGN.md](DESIGN.md) | The design system: colours, type scale, spacing, components |
| [PRODUCT.md](PRODUCT.md) | Audience, purpose, voice; read by the impeccable design skill |
| [THEMING.md](THEMING.md) | How the theme files work and how to swap a palette |
| [schedule.md](schedule.md) | LinkedIn posting cadence; published posts are in `_linkedin/` |

## Deploying

```bash
npm run build
npm run verify:deploy    # refuses if out/ is not deployable
```

Then upload **the contents of `out/`** to the web root with FileZilla. Four things to watch:

1. **`.htaccess` is a dotfile.** Enable *Server → Force showing hidden files*, or it silently
   doesn't upload and you lose the cache headers, security headers and 404 page.
2. **The first Next deploy needs a clean web root.** The old Jigsaw build's `assets/build/` tree
   would otherwise stay orphaned. Later deploys can just clear `_next/static/`.
3. **Use binary mode** for `woff2` / `webp` / `png` / `jpg`. ASCII mode corrupts them.
4. **Upload everything, including the `.txt` files.** They are React payloads for client-side
   navigation.

A FileZilla Site Manager entry with the local path set to `out/` and the remote path set to the
web root makes each deploy connect → select all → upload.
