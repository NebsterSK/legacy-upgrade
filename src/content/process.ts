import type { IconName } from './types.ts';

/**
 * From `source/index.blade.php:141-177`. Steps 2+3 and 5+6 were merged into one step
 * each (2026-09-23, owner's request); the descriptions are the originals joined.
 *
 * Remix Icon → lucide mapping:
 *   ri-chat-3-line      → MessageCircle
 *   ri-file-list-3-line → ClipboardList
 *   ri-code-s-slash-line→ Code
 *   ri-presentation-line→ Presentation
 *
 * The "Step N" label is derived from the array index (`Step {{ $index + 1 }}`).
 */
export const process = {
    heading: 'Process',

    /** Prefix for the per-step eyebrow label: `Step 1`, `Step 2`, … */
    stepLabel: 'Step',

    steps: [
        {
            icon: 'MessageCircle' as IconName,
            title: 'Consultation',
            desc: 'A free, no-obligation call to understand your business, your goals, and the problem you need solved.',
        },
        {
            icon: 'ClipboardList' as IconName,
            title: 'Planning, Estimation & Demo',
            desc: 'A clear proposal outlining the approach, broken down into milestones with a transparent timeline and budget, no surprises later. Before committing to the full build, you see an early working prototype. This keeps the project on track and confirms we are aligned on the direction.',
        },
        {
            icon: 'Code' as IconName,
            title: 'Implementation',
            desc: 'The solution is built milestone by milestone, with regular updates so you always know exactly where the project stands.',
        },
        {
            icon: 'Presentation' as IconName,
            title: 'Presentation, Testing & Support',
            desc: 'The finished result is presented for your review. You test it in real conditions, with real data, and share feedback. Refinements based on your feedback, fixes for edge cases, and ongoing support for as long as you need it.',
        },
    ],
} as const;
