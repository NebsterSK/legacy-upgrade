/**
 * Literal strings for the ProfessionalService JSON-LD.
 * Verbatim from `source/_includes/ld-json.blade.php`.
 *
 * Task 6 assembles the actual JSON-LD object from these + `company`/`site`.
 * In TSX the Blade `@@` escaping is not needed — use plain `"@context"`/`"@type"`.
 */
export const schema = {
    alternateName: 'Legacy Upgrade',
    priceRange: '€€',

    serviceType: [
        'Custom software development',
        'Business process automation',
        'Digitalization',
        'Legacy system modernization',
        'API integration',
        'AI integration',
    ],

    knowsAbout: [
        'Custom software development',
        'Business automation',
        'Digital transformation',
        'Legacy system modernization',
        'Laravel',
        'Vue.js',
        'REST API integration',
        'MySQL',
        'AI integration',
    ],

    areaServed: [
        { type: 'Country', name: 'Slovakia' },
        { type: 'Place', name: 'European Union' },
    ],

    /** `addressCountry` is the ISO code, not the `config.php` country string. */
    addressCountry: 'SK',

    founder: {
        name: 'Lukáš Neuschl',
        jobTitle: 'Software Developer',
    },

    offerCatalog: {
        name: 'Custom software services',
        items: [
            {
                name: 'Custom business software',
                description:
                    'Internal tools, dashboards, and back-office systems built to match your operations.',
            },
            {
                name: 'Process & workflow automation',
                description:
                    'Automated workflows that remove repetitive manual tasks and reduce errors.',
            },
            {
                name: 'API & system integrations',
                description:
                    'Connecting existing tools, databases, and third-party services into a single reliable system.',
            },
            {
                name: 'Legacy system modernization',
                description:
                    'Replacing or upgrading outdated software without disrupting ongoing business operations.',
            },
        ],
    },
} as const;
