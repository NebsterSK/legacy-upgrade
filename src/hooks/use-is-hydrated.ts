'use client';

import { useSyncExternalStore } from 'react';

const noopSubscribe = () => () => {};

/**
 * True only after hydration, false during SSR/prerender.
 *
 * Uses useSyncExternalStore rather than the usual `useState(false)` +
 * `useEffect(() => setMounted(true))`, which the `react-hooks/set-state-in-effect`
 * rule (correctly) rejects.
 */
export function useIsHydrated() {
    return useSyncExternalStore(
        noopSubscribe,
        () => true,
        () => false
    );
}
