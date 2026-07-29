/**
 * Single source of truth for every user-visible string on the site.
 *
 * COPY IS FROZEN (plan.md constraint #1): every string was lifted verbatim from the
 * Jigsaw/Blade source. Components must render these values and never inline literal
 * copy of their own. `scripts/verify-copy.mjs` enforces this against the old source.
 */
export * from './types.ts';

export { site } from './site.ts';
export { company, links } from './company.ts';
export { nav } from './nav.ts';
export { hero, about } from './hero.ts';
export { clients } from './clients.ts';
export { services } from './services.ts';
export { process } from './process.ts';
export { pricing } from './pricing.ts';
export { faq } from './faq.ts';
export type { FaqTone } from './faq.ts';
export { technology } from './technology.ts';
export { contact } from './contact.ts';
export { footer } from './footer.ts';
export { schema } from './schema.ts';
