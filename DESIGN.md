---
name: Legacy Upgrade
description: A one-page shop window for a freelance developer, laid out like a machine's spec plate.
colors:
  slate-blue: "#3c6492"
  slate-blue-deep: "#2f5079"
  slate-blue-line: "#5479a3"
  slate-blue-mist: "#dbe5f1"
  slate-blue-wash: "#d3dfee"
  dusty-plum: "#7d4a86"
  dusty-plum-mist: "#efe1f2"
  plum-line: "#93629b"
  harbour-navy: "#13294a"
  harbour-navy-plate: "#0d2039"
  harbour-navy-line: "#2a4468"
  navy-mist: "#b9c7da"
  blush: "#f8d6df"
  blush-ink: "#9c3558"
  lavender: "#e5dbf7"
  lavender-ink: "#5b3f91"
  paper: "oklch(0.985 0.004 262)"
  card-white: "oklch(1 0 0)"
  cool-grey: "oklch(0.955 0.012 262)"
  ink: "oklch(0.2 0.03 262)"
  ink-muted: "oklch(0.45 0.03 262)"
  hairline: "oklch(0.9 0.015 262)"
  plate-white: "oklch(1 0 0)"
  plate-dark: "oklch(0.22 0.03 262)"
typography:
  display:
    fontFamily: "Kanit, sans-serif"
    fontSize: "clamp(3.25rem, 1.9rem + 6vw, 6rem)"
    fontWeight: 700
    lineHeight: 0.92
    letterSpacing: "-0.03em"
  h2:
    fontFamily: "Kanit, sans-serif"
    fontSize: "clamp(2.5rem, 1.6rem + 3.6vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.02em"
  h3:
    fontFamily: "Kanit, sans-serif"
    fontSize: "clamp(1.75rem, 1.3rem + 1.6vw, 2.625rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.015em"
  h4:
    fontFamily: "Kanit, sans-serif"
    fontSize: "clamp(1.25rem, 1.1rem + 0.5vw, 1.5rem)"
    fontWeight: 700
    lineHeight: 1.25
  lead:
    fontFamily: "Overpass, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 1.05rem + 0.9vw, 1.75rem)"
    fontWeight: 500
    lineHeight: 1.375
  body-lg:
    fontFamily: "Overpass, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  body:
    fontFamily: "Overpass, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Overpass, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
rounded:
  sm: "0.225rem"
  lg: "0.375rem"
  xl: "0.525rem"
  full: "9999px"
spacing:
  section: "clamp(4.5rem, 3rem + 6vw, 8rem)"
  header: "4rem"
  gutter-sm: "1.25rem"
  gutter-md: "2rem"
  gutter-lg: "2.5rem"
  container: "80rem"
components:
  button-solid-on-brand:
    backgroundColor: "{colors.card-white}"
    textColor: "{colors.slate-blue}"
    rounded: "{rounded.lg}"
    padding: "0 1.75rem"
    height: "3.25rem"
  button-solid-on-brand-hover:
    backgroundColor: "{colors.slate-blue-mist}"
  button-solid:
    backgroundColor: "{colors.slate-blue}"
    textColor: "{colors.card-white}"
    rounded: "{rounded.lg}"
    padding: "0 1.75rem"
    height: "3.25rem"
  button-solid-hover:
    backgroundColor: "{colors.slate-blue-deep}"
  button-outline-on-brand:
    textColor: "{colors.card-white}"
    rounded: "{rounded.lg}"
    padding: "0 1.75rem"
    height: "3.25rem"
  button-outline-on-brand-hover:
    backgroundColor: "{colors.card-white}"
    textColor: "{colors.slate-blue}"
  contact-chip:
    backgroundColor: "{colors.harbour-navy-plate}"
    textColor: "{colors.card-white}"
    rounded: "{rounded.lg}"
    padding: "0 1.25rem"
    height: "3rem"
  contact-chip-hover:
    backgroundColor: "{colors.blush}"
    textColor: "{colors.harbour-navy}"
  icon-chip:
    backgroundColor: "{colors.blush}"
    textColor: "{colors.blush-ink}"
    rounded: "{rounded.lg}"
    size: "2.5rem"
  step-node:
    backgroundColor: "{colors.lavender}"
    textColor: "{colors.lavender-ink}"
    rounded: "{rounded.full}"
    size: "3.5rem"
  price-card-featured:
    backgroundColor: "{colors.slate-blue}"
    textColor: "{colors.card-white}"
    rounded: "{rounded.lg}"
    padding: "2.5rem"
  price-card:
    backgroundColor: "{colors.card-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "2.5rem"
  logo-plate:
    backgroundColor: "{colors.plate-white}"
    rounded: "{rounded.lg}"
    height: "6rem"
---

# Design System: Legacy Upgrade

## Overview

**Creative North Star: "The Spec Plate"**

The rating plate riveted to a machine: a flat field of colour, heavy lettering, ruled lines, and the
facts stated once with nothing around them. That is how every section is laid out. Services is a
spec sheet, clients are a ledger of line items, the prices are printed as large as the section
headings, and the FAQ answers sit open under a heavy rule. Nothing is hidden behind a click and
nothing is dressed up; the page reads like equipment that tells you what it does.

The plate's colour comes from the logo: the blue square with the white up-arrow. The hero is that
square blown up to full width, and the arrow, a euro and a question mark come back as oversized,
cropped background motifs that drift slowly as the page scrolls. The page runs as a sequence of
full-width bands: blue hero, paper, cool grey, paper, grey Pricing, paper FAQ, plum Technology, navy
Contact and a darker navy footer. Colour is spent a whole band at a time, never sprinkled.

Density is low and the type is large. Headings are Kanit Bold, the logo's own face, set tight;
body copy is Overpass, drawn from the Highway Gothic road-sign lettering, so it stays plain and
legible for someone reading in a hurry. Confidence comes from commitment (one colour per band, big
type, stated prices), not from decoration.

**Key Characteristics:**
- Full-width colour bands, one colour kit per band, and no gradients.
- Kanit Bold headings on a fluid five-step scale; Overpass body at 17px.
- Ruled lists and ledgers instead of card grids.
- One brand motif (the upgrade arrow) plus two siblings drawn to match it (€, ?), used large and
  cropped with parallax.
- Flat surfaces; a shadow appears only on things that sit on top of a band or lift on hover.
- Light and dark modes are both first-class; motion runs for every visitor.

## Colors

A matte, muted palette: slate blue leads, dusty plum is the second voice, harbour navy closes the
page, and pale pastels act as chip grounds, all on cool, faintly blue neutrals (hue 262).

Colours are organised in **kits**. Each kit is a band colour plus everything that sits on it: a
foreground, a muted foreground, a line and sometimes an accent. A component on a band uses only
that band's kit. The values here are the light-mode `tighten` palette; `harbour` and `dusk` are
alternate palettes with the same token names, and every kit has a dark-mode counterpart in
`src/app/themes/`.

### Primary
- **Slate Blue** (`slate-blue`): the brand. It fills the hero, the featured price card, the
  phone menu and the logo square, and is the `primary` colour for links, solid buttons, focus rings
  and the active nav underline on paper.
- **Deep Slate** (`slate-blue-deep`): hover for solid buttons and links (`primary-hover`) and
  the hover ground of the hero's social icons.
- **Slate Line** (`slate-blue-line`): rules and dividers on the blue band, the hero divider, and
  the hero and menu arrow motifs (at 60% opacity).
- **Slate Mist** (`slate-blue-mist`): secondary text and icons on blue, and the hover fill of the
  white button on blue.
- **Slate Wash** (`slate-blue-wash`): the euro motif behind Pricing, a pale echo of the featured
  card beside it.

### Secondary
- **Dusty Plum** (`dusty-plum`): the Technology band.
- **Plum Mist** (`dusty-plum-mist`): the intro text on the plum band.
- **Blush accent** (`blush`, reused as `second-accent`): the wires, the dashed Forge boundary and
  the heavy rule on the plum band.

### Tertiary
- **Harbour Navy** (`harbour-navy`): the Contact band.
- **Navy Plate** (`harbour-navy-plate`): the footer, the contact-chip ground and the
  company-details panel, a step darker than the band so the paperwork reads as its own plate.
- **Navy Line** (`harbour-navy-line`): the Contact arrow motif (at 60% opacity).
- **Navy Mist** (`navy-mist`): secondary text on navy.
- **Blush** (`blush`, as `deep-accent`): icons, the email underline and the chip hover on navy.

### Pastel chip grounds
- **Blush / Blush Ink** (`blush`, `blush-ink`): the service icon chips.
- **Lavender / Lavender Ink** (`lavender`, `lavender-ink`): the process step nodes and numerals,
  and the question-mark motif behind the FAQ. The motif is a hint of the plum Technology band
  that follows.

### Neutral
- **Paper** (`paper`): the default page background, the header and the plain bands (About,
  Clients, Process, FAQ).
- **Cool Grey** (`cool-grey`): the alternate band (Services, Pricing).
- **Card White** (`card-white`): the hourly price card.
- **Ink** (`ink`): headings and body text; also the heavy rule above the About columns.
- **Ink Muted** (`ink-muted`): body copy under headings, answers, descriptions and inactive nav.
- **Hairline** (`hairline`): every 1px divider, card border and ledger rule.
- **Logo plates** (`plate-white`, `plate-dark`): fixed tiles behind client and technology logos,
  identical in both modes, because several logos are dark-on-transparent. `plate-dark` exists for
  the one white-on-transparent logo.

In dark mode the neutrals step up in lightness for depth: paper becomes a slate navy
(`oklch(0.25 0.028 262)`), cool grey and cards sit darker at `oklch(0.2 0.025 262)`, and the kits
deepen rather than glow.

### Named Rules
**The Kit Rule.** A component on a colour band takes its colours from that band's kit and no other.
A blue-band element never borrows the navy accent, and a plum-band element never borrows the brand
blue.

**The Tokens-Only Rule.** Components name semantic tokens (`bg-brand`, `text-muted-foreground`) and
never a raw colour. Colour values live only in `src/app/themes/*.css`.

**The Whole-Band Rule.** Colour is spent a section at a time. Within a band, emphasis comes from
weight and size, not from a new colour.

## Typography

**Display Font:** Kanit Bold (self-hosted; sans-serif fallback)
**Body Font:** Overpass, variable 100–900 (self-hosted; system-ui fallback)

**Character:** Kanit is the logo's wordmark face: squat, heavy and set tight, like stamped letters
on a plate. Overpass descends from the Highway Gothic road-sign face: plain and quick to read,
built for someone moving past at speed.

### Hierarchy
- **Display** (700, `clamp(3.25rem, 1.9rem + 6vw, 6rem)`, line-height 0.92, -0.03em): the hero
  name only.
- **H2** (700, `clamp(2.5rem, 1.6rem + 3.6vw, 4.5rem)`, 0.95, -0.02em): section headings (one per
  nav item), both prices, and the phone menu links.
- **H3** (700, `clamp(1.75rem, 1.3rem + 1.6vw, 2.625rem)`, 1.05, -0.015em): subsection headings
  (What I do, Clients, Process, FAQ) and the process step numerals.
- **H4** (700, `clamp(1.25rem, 1.1rem + 0.5vw, 1.5rem)`, 1.25): item titles, meaning process
  steps, FAQ questions and the Tech Stack label.
- **Lead** (Overpass 500, `clamp(1.25rem, 1.05rem + 0.9vw, 1.75rem)`, 1.375): the hero tagline.
- **Body large** (Overpass 400, 1.125rem, 1.625): statements and section intros (About, Services,
  Technology, Contact).
- **Body** (Overpass 400, 1.0625rem, 1.6): detail copy, meaning answers, client descriptions,
  step descriptions and the price-card body. Every paragraph is held to 65ch (`max-w-prose`).
- **Label** (Overpass 600, 0.875rem): small captions such as "Step" and "Find me on". The
  company-detail field names use the same size at regular weight; the price-card titles and
  contact block headings are bold at body size.

Headings balance their line breaks (`text-wrap: balance`), and paragraphs use
`text-wrap: pretty`. Tabular figures are used for phone numbers, IBAN and company IDs.

### Named Rules
**The Five-Step Rule.** Every heading, price and big link uses one of the five scale steps
(display, h2, h3, h4, lead). A new size is added to the scale first, never inlined. The one
exception is the contact email address, which is fitted so the whole address stays on one line
from a 320px phone to desktop.

**The One-Face-Per-Job Rule.** Kanit is for headings, prices and numerals; Overpass is for
everything read as sentences. No italics, no monospace and no letter-spaced caps.

## Layout

- **Container:** one page-width wrapper for every band and the header: centred, max 80rem, with
  gutters of 1.25rem, 2rem from 640px and 2.5rem from 1024px. Every section shares one left edge.
- **Bands:** full-bleed colour bands, each padded by one token, `section`
  (`clamp(4.5rem, 3rem + 6vw, 8rem)`) top and bottom. A band that continues the previous one
  (Clients after About) takes only the bottom padding.
- **Header:** sticky, 4rem tall, on paper; a hairline appears once the page scrolls. Anchored
  sections land flush under it (`scroll-margin-top` = header height + 1px).
- **Grid:** a 12-column grid from 1024px. The Services and FAQ headings take the left 5 or 4
  columns and stay pinned (sticky at 7rem from the top) while the content scrolls in the right 7
  or 8.
- **Rhythm:** heading to first block is 2.5rem; heading to intro is 1.5rem; groups inside a band
  are 3.5–4rem apart. The spacing is tight inside a group and generous between groups.
- **Breakpoints:** Tailwind defaults (640, 768, 1024, 1280). Desktop nav from 768px; below
  that, a full-height phone menu.
- **Responsive shifts:** the process timeline moves its spine from the centre (alternating sides)
  to the left edge; the tech diagram turns from left-to-right into top-to-bottom; the pricing
  cards and About columns stack.

### Named Rules
**The Ledger Rule.** Where content is a list, it is set as a ruled list (hairline rows) rather than
a grid of identical cards. Cards exist only where two things are being compared (the prices).

## Elevation & Depth

Flat by default. Depth comes from tonal bands and plates (navy plate on navy, white logo plates on
colour), not shadows. A shadow appears only on an object that physically sits on top of a band,
or as a response to hover.

### Shadow Vocabulary
- **Rest** (`0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)`): solid buttons at
  rest.
- **Lift** (`0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)`): solid buttons
  on hover, paired with a 2px rise.
- **Plate** (`0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)`): the white logo
  tiles in the tech diagram and the Forge label.
- **Frame** (`0 25px 50px -12px rgb(0 0 0 / 0.25)`): the portrait's white frame on the hero, the
  one deep shadow on the page.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. No shadow on cards, bands or panels; depth
comes from a darker or lighter plate of the same kit.

## Shapes

Mostly square: one small radius everywhere (`lg`, 0.375rem) for buttons, chips, cards, panels and
logo plates. `sm` (0.225rem) is for small insets such as the portrait inside its frame and focus
outlines on links. `xl` (0.525rem) is used only for the dashed Forge boundary. Circles (`full`) are
used only for the process step nodes and the theme switch. The logo square rounds its corners at
10% of its size so it keeps its shape at every scale.

Two rule weights: a 1px hairline for dividers and ledgers, and a 3px heavy rule (in ink, or in the
band's accent) that opens a block like the top edge of a plate. Underlines are 2px (3px on the
contact email) and sit 0.3em below the text.

The motifs are solid, flat-cut silhouettes with no outlines: the upgrade arrow (from the logo), a
heavy-cut euro and Kanit's own question mark. Each is oversized, cropped by its band's edge and
drifts about 20% of its scroll distance.

## Components

The controls are solid and dependable. They use heavy type and full colour fills, lift slightly on
hover, and carry no decoration; like the copy, they say what they do.

### Buttons
- **Shape:** gently squared (0.375rem), one size: 3.25rem tall, 1.75rem side padding, 16px bold
  Overpass.
- **Solid:** the primary action. On blue it is white with slate-blue text (hover: slate mist). On
  paper or a card it is slate blue with white text (hover: deep slate). Both rest with a small
  shadow, rise 2px on hover with the lift shadow, and press down to 98% scale; 200ms.
- **Outline:** the secondary action beside a solid one, on blue only: a 2px border in white at
  70%, which fills white with blue text on hover.
- **Focus:** a 2px ring in the band's foreground, offset 2px from the band colour.
- All CTAs are links and come from one definition (`src/lib/cta.ts`).

### Chips
- **Contact chips:** phone, Messenger, WhatsApp on navy. Navy plate ground, 3rem tall, icon plus
  semibold label, with an up-right arrow for external links. Hover fills blush with navy text.
- **Icon chips:** a 2.5rem square in a pastel ground with its ink-coloured icon (stroke 1.75),
  leading each service row.

### Cards / Containers
- **Price cards:** only used for the two prices, side by side from 768px. Corner 0.375rem;
  padding 2rem (2.5rem from 640px); no shadow. The featured card takes the brand blue; the other
  is card white with a hairline border.
- **Plates:** the company-details panel (navy plate on navy) and the logo plates (fixed white
  tiles, 6rem tall in the client ledger, 5–6rem squares in the diagram).

### Navigation
- **Desktop:** 16px medium Overpass in ink-muted; hover goes to ink with a faint underline bar;
  the active section is ink with a 2px slate-blue bar on the header's bottom edge. The scroll-spy
  sets the active item, and a click pins it while the smooth scroll runs.
- **Phone:** a full-width sheet in the brand blue with the arrow motif rising from the corner.
  Links are set at h2 in Kanit, separated by slate-line rules and entering in a 90ms stagger. The
  active link is white and marked with the arrow turned sideways; the rest are slate mist. Email
  and phone sit at the bottom with slate-mist icons.
- **Theme switch:** a pill track with a sliding thumb that carries the sun or moon icon; filled
  slate blue when dark mode is on.

### Links
- Inline text links are underlined (2px, 0.3em offset). On paper the underline is the link
  colour at 30% and turns solid on hover; on navy it is the foreground at 30% and turns blush.
  Trailing arrows nudge in their direction on hover.

### Process Timeline
A centred spine with steps alternating left and right, each hung from a 3.5rem lavender circle
ringed in the page colour. Step numerals in lavender ink at h3, titles at h4. Below 768px, the
spine moves to the left edge.

### Tech Stack Diagram
The stack drawn as wiring on the plum band: white logo plates on a grid, joined by right-angle
blush wires with small packets travelling along them, all inside a dashed Forge boundary.

## Do's and Don'ts

### Do:
- **Do** take every heading, price and big link size from the five-step scale (display, h2, h3,
  h4, lead).
- **Do** pad every band with the `section` token and wrap content in the shared container.
- **Do** use the 0.375rem radius for anything rectangular; reserve circles for step nodes and the
  theme switch.
- **Do** hold paragraphs to 65ch.
- **Do** keep components on a band inside that band's colour kit.
- **Do** build new CTAs from `src/lib/cta.ts` (solid, or outline on blue).
- **Do** run motion for every visitor; animations are never gated on `prefers-reduced-motion`.
- **Do** let a new section motif follow the arrow's language: solid, flat-cut, oversized, cropped,
  and drifting about 20% with the scroll.

### Don't:
- **Don't** inline a colour value, a font size or a section padding in a component.
- **Don't** add gradients, glass or blurred decoration, or "AI agency" purple-to-blue washes.
- **Don't** set content as a grid of identical icon cards; use a ruled list or ledger.
- **Don't** put a shadow on a resting card, band or panel.
- **Don't** add italic serifs, monospace labels or letter-spaced eyebrow caps; this is a trade,
  not a magazine or a terminal.
- **Don't** introduce a second button size or a new radius without adding it to the system first.
