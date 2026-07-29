import { createElement } from 'react';

import { getIcon } from '@/lib/icons';

/**
 * Renders a lucide icon from an `IconName` string in `src/content/`.
 *
 * Uses `createElement` rather than `const Icon = getIcon(name)` because the
 * `react-hooks/static-components` rule (correctly) rejects binding a component to a
 * capitalized variable in a render body — that pattern defeats reconciliation if the
 * lookup ever changes between renders.
 */
export function ContentIcon({ name, className }: { name: string; className?: string }) {
    return createElement(getIcon(name), { className, 'aria-hidden': true });
}
