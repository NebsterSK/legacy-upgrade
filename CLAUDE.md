# CLAUDE.md

## Project Overview

Legacy Upgrade is a static company website for a freelance software development business focused on **digitalization and automation through custom software for businesses**. Built with **Jigsaw** (Laravel-based static site generator) and **Vite 6**.

**Live URL:** https://legacy-upgrade.com
**Local URL:** https://legacy-upgrade.test

## Instructions

- Do not replace JS year rendering in footer for PHP, it is intentional.
- Escape `@` in JSON-LD with `@@` (e.g., `"@@context"`, `"@@type"`) — Blade interprets `@` as a directive.
- `@push` / `@stack` directives are NOT supported in Jigsaw — use `@section` / `@yield` instead.
- YAML front matter (`---`) in Blade files is NOT supported in this Jigsaw setup — use `@section('key', 'value')` for per-page variables.
- `$page` is hardcoded in Jigsaw's core and cannot be renamed.

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
- **Tailwind theme colors** are defined as CSS custom properties in `@theme` (e.g., `--color-primary`).
- **Remix Icon classes** (`ri-*`) are kept on `<i>` elements in Blade templates.

## SEO Architecture

- **Per-page meta** — Pages define `@section('pageTitle', '...')` and `@section('pageDescription', '...')`. The layout reads these via `$__env->yieldContent()` and computes `$metaTitle` (with `| Legacy Upgrade` suffix) and `$metaDescription` (falls back to `config.php` description).
- **Open Graph** — `source/_includes/og.blade.php` (uses `$metaTitle`, `$metaDescription` from layout).
- **Twitter Card** — `source/_includes/twitter.blade.php` (uses `$metaTitle`, `$metaDescription` from layout).
- **JSON-LD** — `source/_includes/ld-json.blade.php` (ProfessionalService schema on all pages). Per-page schemas via `@section('jsonld')` / `@yield('jsonld')` (e.g., FAQPage on services).
- **`robots.txt`** and **`sitemap.xml`** — Static files in `source/`.

## Static Assets

Fonts are copied to the build output by `vite-plugin-static-copy`:
- `source/_assets/fonts/*` → `assets/build/fonts/`

## Configuration Data

Site-wide data (company info, social links, contact details) is defined in `config.php` and accessed in Blade via `$page->` (e.g., `$page->company->email`, `$page->links->linkedin`).
