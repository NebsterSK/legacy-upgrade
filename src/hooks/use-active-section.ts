'use client';

import { useEffect, useState } from 'react';

/**
 * Scroll-spy. Ported from `source/_assets/js/main.js:64-89` — same IntersectionObserver
 * approach and the same `-(headerHeight + 20)px 0px -60% 0px` rootMargin, so no
 * per-scroll geometry reads.
 *
 * @param ids       section ids in document order; the first visible one wins
 * @param topOffset sticky header height in px
 */
export function useActiveSection(ids: readonly string[], topOffset: number) {
    const [active, setActive] = useState(ids[0] ?? '');

    // Join into a primitive so an inline array literal from the caller does not
    // re-run the effect on every render.
    const idsKey = ids.join(',');

    useEffect(() => {
        const list = idsKey.split(',');
        const elements = list
            .map((id) => document.getElementById(id))
            .filter((el): el is HTMLElement => el !== null);

        if (elements.length === 0) return;

        const visible = new Set<string>();

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) visible.add(entry.target.id);
                    else visible.delete(entry.target.id);
                }
                const firstVisible = list.find((id) => visible.has(id));
                if (firstVisible) setActive(firstVisible);
            },
            { rootMargin: `-${topOffset + 20}px 0px -60% 0px`, threshold: 0 }
        );

        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [idsKey, topOffset]);

    return active;
}
