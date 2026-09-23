import type { IconName } from './types.ts';

/**
 * From `source/index.blade.php:141-177`, cut from six steps to four (owner's request,
 * 2026-09-23): the Demo and Presentation & Testing steps were dropped; the remaining
 * four keep their original titles and descriptions.
 *
 * Remix Icon → lucide mapping:
 *   ri-chat-3-line      → MessageCircle
 *   ri-file-list-3-line → ClipboardList
 *   ri-code-s-slash-line→ Code
 *   ri-loop-left-line   → RotateCcw
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
            title: 'Planning & Estimation',
            desc: 'A clear proposal outlining the approach, broken down into milestones with a transparent timeline and budget, no surprises later.',
        },
        {
            icon: 'Code' as IconName,
            title: 'Implementation',
            desc: 'The solution is built milestone by milestone, with regular updates so you always know exactly where the project stands.',
        },
        {
            icon: 'RotateCcw' as IconName,
            title: 'Iteration & Support',
            desc: 'Refinements based on your feedback, fixes for edge cases, and ongoing support for as long as you need it.',
        },
    ],
} as const;
