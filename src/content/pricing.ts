import type { IconName } from './types.ts';

/**
 * Verbatim from `source/index.blade.php:179-239`.
 *
 * Note the spacing inside the prices — `from € 800`, `€ 30` — space after the
 * currency symbol, exactly as written in the source. Do not normalize.
 *
 * Remix Icon → lucide mapping:
 *   ri-code-s-slash-line → Code
 *   ri-time-line         → Clock
 *   ri-check-line        → Check
 */
export const pricing = {
    heading: 'Pricing',

    /** The `ring-2` emphasis on the first tier becomes a Badge (Task 9). */
    tiers: [
        {
            icon: 'Code' as IconName,
            title: 'Fixed-Scope Project',
            price: 'from € 800',
            priceNote: null,
            featured: true,
            features: [
                'Consultation meetings and calls',
                'Written proposal with milestones and timeline',
                'Implementation and testing',
                'Deployment to production',
            ],
            body: null,
            cta: { label: 'Request a quote', href: '#contact' },
        },
        {
            icon: 'Clock' as IconName,
            title: 'Hourly Engagement',
            price: '€ 30',
            priceNote: 'per hour',
            featured: false,
            features: [],
            body: 'A flexible option for smaller tasks, technical consultations, ongoing maintenance, or extending an existing system without a full fixed-scope engagement.',
            cta: { label: 'Get in touch', href: '#contact' },
        },
    ],
} as const;
