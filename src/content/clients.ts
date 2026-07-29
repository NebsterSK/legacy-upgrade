/** Verbatim from `source/index.blade.php:61-107`. */
export const clients = {
    heading: 'Clients',

    items: [
        {
            logos: [{ file: 'brackets.svg', alt: 'Brackets' }],
            body: 'Long-term collaboration on a range of products: a service desk, an e-learning system, an investment portal, and backend services powering mobile applications.',
            links: [{ label: 'meetbrackets.com', href: 'https://meetbrackets.com/' }],
        },
        {
            logos: [{ file: 'remam.webp', alt: 'RemaM' }],
            body: 'A custom e-commerce platform for a Slovak importer and distributor of leatherworking, shoemaking, and craft materials. Built to serve wholesale and retail customers.',
            links: [{ label: 'remam.sk', href: 'https://remam.sk/' }],
        },
        {
            logos: [
                { file: 'yasmin.png', alt: 'Yasmin Trade' },
                { file: 'stcc.png', alt: 'STCC' },
            ],
            body: 'Corporate websites for a Central European trading company bridging businesses between East Asia and the CEE region, and for the Slovakia-Taiwan Chamber of Commerce supporting cross-border investment and networking.',
            links: [
                { label: 'yasmin-trade.com', href: 'https://yasmin-trade.com/' },
                { label: 'stcham.com', href: 'https://stcham.com/' },
            ],
        },
    ],
} as const;
