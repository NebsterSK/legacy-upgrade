import type { IconName } from './types.ts';

/**
 * Verbatim from `source/index.blade.php:111-137`.
 *
 * Remix Icon → lucide mapping (nearest equivalent; no exact twins for some):
 *   ri-terminal-box-line → SquareTerminal
 *   ri-dashboard-line    → LayoutDashboard
 *   ri-link              → Link
 *   ri-robot-2-line      → Bot
 *   ri-flow-chart        → Workflow
 *   ri-refresh-line      → RefreshCw
 *   ri-speed-up-line     → Gauge
 *   ri-scissors-cut-line → Scissors
 *   ri-hammer-line       → Hammer
 */
export const services = {
    heading: 'Services',

    intro: 'I help businesses digitalize and automate the way they operate. Each project is a custom-built solution focused on measurable outcomes: less manual work, fewer errors, and systems you can rely on for years.',

    items: [
        { icon: 'SquareTerminal' as IconName, text: 'Custom business software' },
        { icon: 'LayoutDashboard' as IconName, text: 'Dashboards & back-office systems' },
        { icon: 'Link' as IconName, text: 'API & system integrations' },
        { icon: 'Bot' as IconName, text: 'AI integrations' },
        { icon: 'Workflow' as IconName, text: 'Process & workflow automation' },
        { icon: 'RefreshCw' as IconName, text: 'Legacy system modernization' },
        { icon: 'Gauge' as IconName, text: 'Performance optimization' },
        { icon: 'Scissors' as IconName, text: 'Reducing technical debt' },
        { icon: 'Hammer' as IconName, text: 'Long-term maintenance & support' },
    ],
} as const;
