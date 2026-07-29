/**
 * TWO SEPARATE FAQ SETS. They are not the same content and must not be merged.
 *
 * - `visible`  — the 3 questions actually rendered on the page
 *                (`source/index.blade.php:241-265`).
 * - `schema`   — the 5 questions in the FAQPage JSON-LD
 *                (`source/index.blade.php:410-459`).
 *
 * The overlapping questions are worded differently in each. Both are preserved
 * verbatim per plan.md constraint #1. This mismatch is a real SEO issue (Google
 * can flag FAQPage markup whose content is not present on the page) and is
 * logged under "Open questions" in plan.md — to be resolved in the later copy
 * pass, NOT here.
 */

/** The `<i>` icon + colour on each visible answer, kept as a semantic tone. */
export type FaqTone = 'no' | 'info' | 'maybe';

export const faq = {
    heading: 'Frequently Asked Questions',

    visible: [
        {
            tone: 'no' as FaqTone,
            question:
                'Do you work with Wix / Webflow / Squarespace / Framer / Wordpress / Drupal / Joomla or similar?',
            answer: "No. I know how to code and I use that knowledge to my advantage in building custom software solutions based on my client's needs.",
        },
        {
            tone: 'info' as FaqTone,
            question: 'Can you make me a BEAUTIFUL website?',
            answer: "I prefer to make GOOD websites that don't take seconds to load, don't crash and are maintainable for the long future.",
        },
        {
            tone: 'maybe' as FaqTone,
            question: 'Can you fix my website ASAP?',
            answer: 'No. Well... maybe. Yes, but it will cost you extra.',
        },
    ],

    /** JSON-LD only. Never rendered as visible text. */
    schema: [
        {
            question:
                'Do you build websites on WordPress, Wix, Webflow, or similar platforms?',
            answer: 'No. I build custom software from the ground up. Template-based platforms work for simple brochure sites, but they become a bottleneck the moment your business needs something specific — a workflow, an integration, or a reliable way to handle your own data.',
        },
        {
            question: 'Can you design a visually impressive website?',
            answer: 'My priority is dependable software: fast, stable, and maintainable for years. Visual design is part of that, but never at the expense of performance or long-term reliability. For heavily design-driven marketing pages, I am happy to collaborate with a dedicated designer.',
        },
        {
            question: 'How long does a typical project take?',
            answer: 'It depends on the scope. Smaller internal tools and integrations typically take two to six weeks. Larger custom platforms run from two to six months. A concrete timeline is part of the written proposal before any work begins.',
        },
        {
            question: 'Do you offer support after the project is delivered?',
            answer: 'Yes. Ongoing maintenance, improvements, and on-demand support are available on an hourly basis. Software evolves with your business, and I stay involved for as long as you need.',
        },
        {
            question: 'Can you urgently fix an existing website or system?',
            answer: 'Urgent fixes on unfamiliar systems are possible, but they require a quick assessment first and are handled at a priority rate. Get in touch and I will tell you honestly whether I can help and how quickly.',
        },
    ],
} as const;
