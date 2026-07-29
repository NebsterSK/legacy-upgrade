# Theming

## Swapping the theme

One line, in `src/app/globals.css`:

```css
@import "./themes/neutral.css";   /* ← change this */
```

Available in `src/app/themes/`:

| File | What it is |
| --- | --- |
| `neutral.css` | **Active.** Stock shadcn, `baseColor: neutral`. Greyscale primary. |
| `brand.css` | The original Legacy Upgrade accent — `oklch(0.5 0.2 260)`, `#0559d2`. |
| `slate.css` | Cool grey neutrals with a blue primary, hue 250. |

Verified: each one changes the compiled `--primary` in both light and dark with no other edit.

| Theme | light `--primary` | dark `--primary` |
| --- | --- | --- |
| `neutral` | `#171717` | near-white |
| `brand` | `#0559d2` | lightened, chroma reduced |
| `slate` | `#0074c9` | lightened, chroma reduced |

## The rule that makes this work

**Theme files are the only place a colour value may appear.** Everything else references
semantic tokens:

```tsx
✓ className="bg-background text-muted-foreground border-border"
✗ className="bg-gray-100 text-zinc-500 border-slate-200"
```

Audit it:

```bash
grep -rnE '\b(bg|text|border|ring)-(slate|gray|zinc|neutral|stone|red|blue|green|yellow)-[0-9]{2,3}\b' src/
grep -rnE '#[0-9a-fA-F]{3,8}\b|rgb\(|oklch\(' src/ --include=*.tsx --include=*.ts
```

Both currently return nothing outside `src/app/themes/`.

This is also why the FAQ tone icons dropped their red/blue/yellow: `no` uses `text-destructive`,
the others inherit. A raw `text-blue-600` would survive a theme swap unchanged and look broken.

## Adding a theme

1. Copy `neutral.css` to `src/app/themes/<name>.css`.
2. Replace the values in the `:root` and `.dark` blocks. Keep every token — a missing one falls
   back to nothing, not to a default.
3. Point the `@import` at it and run `npm run build`.

Sources of ready-made token blocks: [ui.shadcn.com/themes](https://ui.shadcn.com/themes) and
[tweakcn.com](https://tweakcn.com). Both emit `:root` / `.dark` blocks in exactly this shape —
paste and go.

## What the shadcn CLI presets do NOT do

`shadcn init -p <preset>` (Nova, Vega, Maia, Lyra, Mira, Luma, Sera, Rhea) is **not** a colour
theme switcher, and running it on this project is destructive. Tested by swapping Nova → Vega:

- **Colours did not change at all.** Every OKLCH token value came out byte-identical; only the
  block order shifted. Colour comes from `baseColor` at first init and re-running does not touch it.
- **It rewrote `src/app/layout.tsx`** — injected `Inter` from `next/font/google` and replaced
  `className={kanit.variable}` with `cn("font-sans", inter.variable)`. That drops the Kanit
  variable from `<html>` (so `font-kanit` resolves to nothing) and re-adds the Google Fonts request
  that Task 5 deliberately removed.
- **It reverted the `@theme inline` font mappings** back to `var(--font-sans)`.

What presets actually change: the primitive/component style (`style: radix-nova` → `radix-vega`)
and the bundled font. If you ever do want one, expect to re-apply the font wiring in `layout.tsx`
and `globals.css` afterwards, and diff before committing.

## Fonts

Kanit is self-hosted from `src/assets/fonts/` via `next/font/local` — no third-party request. It is
exposed as `--font-kanit` and mapped in `globals.css`:

```css
--font-kanit: var(--font-kanit);
--font-heading: var(--font-kanit);
--font-sans: system-ui, -apple-system, sans-serif;
```

Body copy stays on the system stack, matching the old site's `body` rule. Use `font-kanit` for
display type.
