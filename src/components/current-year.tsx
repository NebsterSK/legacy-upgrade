'use client';

import { useSyncExternalStore } from 'react';

const noopSubscribe = () => () => {};

/**
 * The footer year is rendered by JS on the client, on purpose — a documented project
 * rule. It must NOT be baked into the static HTML at build time, or the copyright line
 * goes stale the next New Year without a redeploy.
 *
 * The server snapshot is `null`, so the year is absent from `out/index.html` and appears
 * on hydration.
 */
export function CurrentYear() {
    const year = useSyncExternalStore(
        noopSubscribe,
        () => new Date().getFullYear(),
        () => null
    );

    return <>{year}</>;
}
