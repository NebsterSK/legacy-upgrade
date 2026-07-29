import type { RichText } from './types.ts';

/** Verbatim from `source/index.blade.php:8-108` (hero + What I do / Why it matters). */
export const hero = {
    /** `<h1>` — spelled without diacritics in the source. */
    name: 'Lukas Neuschl',

    tagline: 'Custom software, automation, and digitalization for businesses',

    /** `title` attributes on the two hero social icons. */
    social: [
        { label: 'LinkedIn', icon: 'Linkedin' },
        { label: 'GitHub', icon: 'Github' },
    ],

    ctas: {
        primary: { label: 'Contact', href: '#contact' },
        secondary: { label: 'Services', href: '#services' },
    },

    portraitAlt:
        'Lukáš Neuschl, custom software developer based in Bratislava, Slovakia',
} as const;

export const about = {
    columns: [
        {
            heading: 'What I do',
            body: [
                'I deliver ',
                { bold: 'custom software that fits the way your business actually works' },
                '. Internal tools, dashboards, API integrations, and automated workflows that remove repetitive work and give you a clear view of your operations.',
            ] as RichText,
            link: { label: 'Services', href: '#services' },
        },
        {
            heading: 'Why it matters',
            body: [
                'Well-built software ',
                { bold: 'saves hours, prevents mistakes, and scales with your company' },
                '. My goal is straightforward: reduce manual work, consolidate fragmented systems, and leave you with a dependable long-term foundation.',
            ] as RichText,
            link: { label: 'Technology', href: '#technology' },
        },
    ],
} as const;
