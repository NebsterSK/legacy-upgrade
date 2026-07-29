# CLAUDE.md

## Project Overview

Legacy Upgrade is a **single-page** static company website for a freelance software development business focused on **digitalization and automation through custom software for businesses**. Built with **Jigsaw** (Laravel-based static site generator) and **Vite 6**.

**Live URL:** https://legacy-upgrade.com
**Local URL:** https://legacy-upgrade.test

## Instructions

- Do not replace JS year rendering in footer for PHP, it is intentional.
- Escape `@` in JSON-LD with `@@` (e.g., `"@@context"`, `"@@type"`) — Blade interprets `@` as a directive.
- `@push` / `@stack` directives are NOT supported in Jigsaw — use `@section` / `@yield` instead.
- YAML front matter (`---`) in Blade files is NOT supported in this Jigsaw setup — use `@section('key', 'value')` for per-page variables.
- `$page` is hardcoded in Jigsaw's core and cannot be renamed.
- For LinkedIn content, use the `/linkedin` skill (`.claude/skills/linkedin/`) — it is the single source of truth for LinkedIn voice and process. `_linkedin/YYYY_MM_DD.md` holds published posts as pure copy only (no frontmatter, no commentary); it is the voice corpus read before drafting.

## Tech Stack

- **Static site generator:** Jigsaw 1.8 (PHP, Blade templates)
- **Build tool:** Vite 6
- **CSS framework:** Tailwind CSS 4
- **Icons:** Remix Icon (via `remixicon` npm package)
- **Custom font:** Kanit (self-hosted TTF in `source/_assets/fonts/`)
- **Static file copying:** `vite-plugin-static-copy` (images, fonts)

## Build Commands

```bash
npm run watch    # Vite dev server with hot reload
npm run build    # Vite build + Jigsaw build (local/development)
```

## Styling Architecture

- **`source/_assets/css/main.css`** — Plain CSS file containing all Tailwind CSS v4 directives (`@import "tailwindcss"`, `@theme`, `@utility`, `@layer`).
- **Tailwind theme colors** are defined as CSS custom properties in `@theme` (only shades actually used: 100, 300, 400, 600, 700, 950).
- **Custom utilities** — `font-kanit` (font family), `bg-code-pattern` (hero background texture via SVG pseudo-element).
- **Remix Icon classes** (`ri-*`) are kept on `<i>` elements in Blade templates.
- **Dark mode** — class-based (`.dark` on `<html>`), detected from OS preference and stored in `localStorage`. Custom variant defined via `@custom-variant dark`.

## Site Structure

All content lives in `source/index.blade.php` as sections with anchor IDs (`#home`, `#services`, `#technology`, `#contact`). Navigation uses smooth-scroll anchor links. There are no separate page files.

## SEO Architecture

- **Meta tags** — `@section('pageTitle', '...')` and `@section('pageDescription', '...')` in `index.blade.php`. The layout appends `| Legacy Upgrade` to the title.
- **Open Graph** — `source/_includes/og.blade.php`.
- **Twitter Card** — `source/_includes/twitter.blade.php`.
- **JSON-LD** — `source/_includes/ld-json.blade.php` (ProfessionalService schema). FAQPage schema defined inline in `index.blade.php` via `@section('jsonld')` / `@yield('jsonld')`.
- **`robots.txt`** and **`sitemap.xml`** — Static files in `source/`. Sitemap contains a single URL (`/`).

## Static Assets

Fonts are copied to the build output by `vite-plugin-static-copy`:
- `source/_assets/fonts/*` → `assets/build/fonts/`

## Configuration Data

Site-wide data (company info, social links, contact details) is defined in `config.php` and accessed in Blade via `$page->` (e.g., `$page->company->email`, `$page->links->linkedin`).
