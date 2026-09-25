/**
 * The page's call-to-action buttons, in one place so the hero and the pricing cards can't
 * drift apart. They are links (every CTA navigates), so these are class strings for an
 * `<a>`, not a component. One size; the variant is picked by the surface it sits on.
 *
 *   solid   filled, lifts on hover: the primary action
 *   outline bordered, fills on hover: the secondary action next to a solid one
 */
const base =
    'inline-flex h-13 items-center justify-center rounded-lg px-7 text-base font-bold duration-200 outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

const solid = `${base} shadow-sm transition-[translate,scale,background-color,box-shadow] hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-[0.98]`;

const outline = `${base} border-2 transition-colors`;

export const cta = {
    /** Solid on the brand drench (hero, featured price). */
    solidOnBrand: `${solid} bg-brand-foreground text-brand hover:bg-brand-muted-foreground focus-visible:ring-brand-foreground focus-visible:ring-offset-brand`,
    /** Solid on the page canvas or a card. */
    solid: `${solid} bg-primary text-primary-foreground hover:bg-primary-hover focus-visible:ring-ring focus-visible:ring-offset-card`,
    /** Outline on the brand drench. */
    outlineOnBrand: `${outline} border-brand-foreground/70 hover:border-brand-foreground hover:bg-brand-foreground hover:text-brand focus-visible:ring-brand-foreground focus-visible:ring-offset-brand`,
};
