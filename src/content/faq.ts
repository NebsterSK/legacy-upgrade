/**
 * The FAQ. ONE set: the questions rendered on the page are also the questions in the
 * FAQPage JSON-LD (`src/lib/jsonld.ts`).
 *
 * The first four answer the questions every prospect asks before making contact — what
 * it is, who it is for, what it costs, how it runs. They are deliberately phrased the
 * way people actually search, because this list is the site's most retrievable content:
 * visible copy and structured data in one place. The last three are the original
 * Jigsaw questions, kept for voice.
 *
 * History: the old site carried a *second*, five-question set that existed only in the
 * structured data, worded differently from the visible copy. FAQPage markup that is not
 * on the page is exactly what Google flags, so it was removed on 2026-09-26. Those
 * longer answers are still worth mining — `git show 3aa7672:src/content/faq.ts`.
 */

export const faq = {
    heading: 'Frequently Asked Questions',

    visible: [
        {
            question: 'What exactly do you build?',
            answer: 'Custom software for the way your business already runs: internal tools and back-office systems, dashboards that pull your numbers into one place, integrations between tools that do not talk to each other, and automation for the processes still done by hand. Not templates, and not a website builder.',
        },
        {
            question: 'Who do you work with?',
            answer: 'Small and mid-sized businesses across Europe, typically 5 to 50 people, that have outgrown spreadsheets and off-the-shelf tools. Usually there is no in-house developer, the owner or an operations lead makes the call, and at least one core process is still eating hours every week.',
        },
        {
            question: 'What does a project cost?',
            answer: 'Fixed-scope projects start at € 800, and hourly work is € 30 per hour. Which one fits depends on the job: a defined piece of work gets a fixed scope with milestones, while smaller tasks, consultations and ongoing maintenance run hourly. You get a written proposal with the full cost before any work starts.',
        },
        {
            question: 'How does a project work?',
            answer: 'Four steps. A free consultation to understand the problem, a written proposal broken into milestones with a timeline and budget, implementation milestone by milestone with regular updates, then iteration and support for as long as you need it.',
        },
        {
            question:
                'Do you work with Wix / Webflow / Squarespace / Framer / Wordpress / Drupal / Joomla or similar?',
            answer: "No. I know how to code and I use that knowledge to my advantage in building custom software solutions based on my client's needs.",
        },
        {
            question: 'Can you make me a BEAUTIFUL website?',
            answer: "I prefer to make GOOD websites that don't take seconds to load, don't crash and are maintainable for the long future.",
        },
        {
            question: 'Can you fix my website ASAP?',
            answer: 'No. Well... maybe. Yes, but it will cost you extra.',
        },
    ],
} as const;
