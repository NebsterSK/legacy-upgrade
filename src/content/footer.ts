import { links } from './company.ts';

/** Verbatim from `source/_layouts/main.blade.php:81-98`. */
export const footer = {
    social: {
        heading: 'Social media',
        items: [
            { label: 'LinkedIn', href: links.linkedin },
            { label: 'GitHub', href: links.github },
        ],
    },

    logoAlt: 'Legacy Upgrade logo',
    logoHref: '#home',

    /**
     * Rendered as: `LEGACY UPGRADE © <year>`.
     *
     * The year is intentionally client-rendered JS (a documented project rule) —
     * it must NOT be baked in at build time. See Task 7.
     */
    wordmark: 'LEGACY UPGRADE',
} as const;
