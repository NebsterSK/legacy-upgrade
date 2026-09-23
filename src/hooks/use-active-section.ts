'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Scroll-spy for the anchor nav.
 *
 * The active section is the last one whose top has crossed a reading line 30% of the way
 * down the viewport (below the sticky header). Two edge cases the previous
 * first-visible-in-a-band IntersectionObserver got wrong:
 *
 * - **The last section.** At the bottom of the page Contact often cannot scroll up to
 *   the line, while the tail of Technology still sits in the band, so Contact never
 *   lit up. Reaching the bottom of the document now always selects the last section.
 * - **Clicks.** A smooth scroll to a far section passes through every section in
 *   between and the highlight would flicker through them. `select(id)` pins the clicked
 *   section until the scroll settles (`scrollend`, with a timeout fallback for browsers
 *   without it).
 *
 * Geometry is read at most once per frame (rAF-throttled), for a handful of sections.
 *
 * @param ids       section ids in document order
 * @param topOffset sticky header height in px
 */
export function useActiveSection(ids: readonly string[], topOffset: number) {
    const [active, setActive] = useState(ids[0] ?? '');
    const pinned = useRef<string | null>(null);

    // Join into a primitive so an inline array literal from the caller does not
    // re-run the effect on every render.
    const idsKey = ids.join(',');

    useEffect(() => {
        const list = idsKey.split(',');
        let frame = 0;

        const measure = () => {
            frame = 0;
            if (pinned.current) return;

            const doc = document.documentElement;
            if (window.scrollY + window.innerHeight >= doc.scrollHeight - 2) {
                setActive(list[list.length - 1]);
                return;
            }

            const line = topOffset + (window.innerHeight - topOffset) * 0.3;
            let current = list[0];
            for (const id of list) {
                const el = document.getElementById(id);
                if (el && el.getBoundingClientRect().top <= line) current = id;
            }
            setActive(current);
        };

        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(measure);
        };

        measure();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            if (frame) cancelAnimationFrame(frame);
        };
    }, [idsKey, topOffset]);

    const select = useCallback((id: string) => {
        setActive(id);
        pinned.current = id;

        const release = () => {
            pinned.current = null;
            window.removeEventListener('scrollend', release);
            window.clearTimeout(timer);
        };
        window.addEventListener('scrollend', release, { once: true });
        const timer = window.setTimeout(release, 1500);
    }, []);

    return [active, select] as const;
}
