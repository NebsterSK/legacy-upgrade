# Theming

How the theme files are wired and how to change them. What each colour, size and component is
*for* lives in [DESIGN.md](DESIGN.md).

## Three layers

The theme is three imports in `src/app/globals.css`, applied in order:

```css
@import "./themes/upgrade.css";            /* neutral base */
@import "./themes/palettes/tighten.css";   /* tighten | harbour | dusk */
@import "./themes/dosage-bands.css";       /* bands | neutral */
```

- **Base** (`upgrade.css`): the neutral surfaces, text, borders, the logo plates and the radius,
  for light and dark. Faintly blue neutrals on hue 262.
- **Palette** (`palettes/*.css`): owns `--primary` / `--primary-hover` and the colour kits:
  - `brand`: the hero, featured price, phone menu (`-foreground`, `-muted-foreground`, `-deep`,
    `-line`, `-tint`)
  - `second`: the Technology band (`-foreground`, `-muted-foreground`, `-line`, `-accent`)
  - `deep`: Contact and the footer (`-foreground`, `-muted-foreground`, `-plate`, `-line`,
    `-accent`)
  - `tint-1..3`: pastel chip grounds, each with an `-ink` for text and icons on it
- **Dosage** (`dosage-*.css`): how many sections the kits colour. `bands` (active) uses them as
  they are; `neutral` collapses `second` and `deep` onto the grey surfaces.

`tighten` + `bands` is the chosen combination. `harbour` and `dusk` are alternates with the same
token names. Every text pair in all three palettes is at least 4.5:1 in light and dark.

`.theme-light` re-applies the light values to a subtree even when `<html>` is `.dark`; `/brand`
uses it so its exported assets always come out in the light colours.

## Swapping

Change the palette or dosage import to another file in the same folder and rebuild. Nothing else
needs to change.

## Adding a palette

1. Copy `palettes/tighten.css` to `palettes/<name>.css`.
2. Replace the values in its `:root, .theme-light` and `.dark` blocks. Keep every token: a missing
   one falls back to nothing, not to a default.
3. Point the palette `@import` at it, run `npm run build`, and check contrast in both modes.

A new token has to be added to every palette and mapped in the `@theme inline` block of
`globals.css` (`--color-<name>: var(--<name>)`) before components can use it.

## The rule that makes this work

**Theme files are the only place a colour value may appear.** Components reference semantic
tokens:

```tsx
✓ className="bg-brand text-brand-foreground border-border"
✗ className="bg-blue-600 text-white border-gray-200"
```

Audit it:

```bash
grep -rnE '\b(bg|text|border|ring|fill|stroke|decoration)-(slate|gray|zinc|neutral|stone|red|blue|green|yellow|white|black)(-[0-9]{2,3})?\b' src/ --include=*.tsx --include=*.ts
grep -rnE '#[0-9a-fA-F]{3,8}\b|rgb\(|oklch\(' src/ --include=*.tsx --include=*.ts
```

Both return nothing.

## Fonts

Both faces are self-hosted from `src/assets/fonts/`, with no third-party request:

- **Kanit** (headings) through `next/font/local` in `src/app/layout.tsx`, exposed as
  `--font-kanit`.
- **Overpass** (body) through `@font-face` in `globals.css`, split into latin and latin-ext so
  the Slovak diacritics come from the same family.

## What the shadcn CLI presets do NOT do

`shadcn init -p <preset>` (Nova, Vega, Maia, …) is **not** a colour switcher, and running it on
this project is destructive. Tested by swapping Nova → Vega:

- **Colours did not change.** Colour comes from `baseColor` at the first init; re-running doesn't
  touch it.
- **It rewrote `src/app/layout.tsx`**: it injected `Inter` from `next/font/google` and replaced
  `className={kanit.variable}`. That drops the Kanit variable (so `font-kanit` resolves to nothing)
  and re-adds a Google Fonts request.
- **It reverted the `@theme inline` font mappings.**

If you ever do want a preset's component style, expect to re-apply the font wiring in `layout.tsx`
and `globals.css` afterwards, and diff before committing.
