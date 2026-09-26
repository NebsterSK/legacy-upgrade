/**
 * Literal strings for the ProfessionalService JSON-LD, assembled by `src/lib/jsonld.ts`.
 *
 * These are structured-data only and never render as visible text, but they must stay
 * TRUE TO THE PAGE: `serviceType` / `offerCatalog` mirror `services.items`, `knowsAbout`
 * mirrors the stack drawn in `technology.stack`. Change one, change the other.
 */
export const schema = {
    alternateName: 'Legacy Upgrade',

    /**
     * Kept alongside the concrete `offers` in `jsonld.ts`: `priceRange` is the property
     * Google documents for LocalBusiness, the offers carry the actual numbers.
     */
    priceRange: '€€',

    /** One per entry in `services.items`. */
    serviceType: [
        'Custom business software',
        'Dashboards & back-office systems',
        'API & system integrations',
        'AI integrations',
        'Process & workflow automation',
        'Legacy system modernization',
        'Performance optimization',
        'Reducing technical debt',
        'Long-term maintenance & support',
    ],

    /** Disciplines first, then the stack as drawn in the Technology section. */
    knowsAbout: [
        'Custom software development',
        'Business automation',
        'Digital transformation',
        'Legacy system modernization',
        'REST API integration',
        'AI integration',
        'Laravel',
        'Inertia.js',
        'Vue.js',
        'React',
        'Tailwind CSS',
        'MySQL',
        'PostgreSQL',
        'Laravel Forge',
    ],

    areaServed: [
        { type: 'Country', name: 'Slovakia' },
        { type: 'Place', name: 'Europe' },
    ],

    /**
     * The ideal customer, machine-readable. Mirrors the "Who do you work with?" answer in
     * `faq.visible` — keep the two in step, they are the same claim in two formats.
     */
    audience: {
        name: 'Small and mid-sized businesses in Europe',
        description:
            'Small and mid-sized businesses across Europe, typically 5 to 50 people, that have outgrown spreadsheets and off-the-shelf tools and have no in-house development team.',
        employees: { min: 5, max: 50 },
    },

    /** `addressCountry` is the ISO code, not the `config.php` country string. */
    addressCountry: 'SK',

    founder: {
        name: 'Lukáš Neuschl',
        jobTitle: 'Software Developer',
    },

    offerCatalog: {
        name: 'Custom software services',
        /** Same nine, same order, as the Services section. */
        items: [
            {
                name: 'Custom business software',
                description:
                    'Internal tools and back-office systems built to match your operations instead of forcing them into someone else’s template.',
            },
            {
                name: 'Dashboards & back-office systems',
                description:
                    'A single clear view of your numbers and day-to-day operations, assembled from the data you already have.',
            },
            {
                name: 'API & system integrations',
                description:
                    'Connecting existing tools, databases, and third-party services into a single reliable system.',
            },
            {
                name: 'AI integrations',
                description:
                    'Language models applied where they measurably help — drafting, classification, extraction — wired into the systems you already run.',
            },
            {
                name: 'Process & workflow automation',
                description:
                    'Automated workflows that remove repetitive manual tasks and reduce errors.',
            },
            {
                name: 'Legacy system modernization',
                description:
                    'Replacing or upgrading outdated software without disrupting ongoing business operations.',
            },
            {
                name: 'Performance optimization',
                description:
                    'Finding and fixing what makes an existing system slow, so it stays usable as your data and traffic grow.',
            },
            {
                name: 'Reducing technical debt',
                description:
                    'Refactoring and cleanup that makes an existing codebase cheaper to change and safer to deploy.',
            },
            {
                name: 'Long-term maintenance & support',
                description:
                    'Ongoing fixes, improvements, and on-demand support, so the software keeps pace with the business.',
            },
        ],
    },
} as const;
