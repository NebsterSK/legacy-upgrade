# CLAUDE.md

## Project Overview

Legacy Upgrade is a static company website for freelance web development business. Built with **Jigsaw** (Laravel-based static site generator) and **Vite 6**.

**Live URL:** https://legacy-upgrade.com  
**Local URL:** https://legacy-upgrade.test

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

## Static Assets

Fonts are copied to the build output by `vite-plugin-static-copy`:
- `source/_assets/fonts/*` → `assets/build/fonts/`

## Configuration Data

Site-wide data (company info, social links, contact details) is defined in `config.php` and accessed in Blade via `$page->` (e.g., `$page->company->email`, `$page->links->linkedin`).