/**
 * Single source of truth for every user-visible string on the site.
 *
 * Components render these values and never inline literal copy of their own; change
 * copy here. `npm run verify:rendered` checks that every string reaches the built page.
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
export { technology } from './technology.ts';
export { contact } from './contact.ts';
export { footer } from './footer.ts';
export { brand } from './brand.ts';
export { schema } from './schema.ts';
