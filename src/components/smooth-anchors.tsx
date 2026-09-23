'use client';

import { useEffect } from 'react';

/** Fired on `window` so the scroll-spy can pin the target while the page is moving. */
export const ANCHOR_SCROLL_START = 'anchor-scroll-start';
export const ANCHOR_SCROLL_END = 'anchor-scroll-end';

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

/**
 * Animated in-page anchor navigation, for every `<a href="#section">` on the page (nav,
 * hero buttons, section links, the footer's back-to-top square).
 *
 * CSS `scroll-behavior: smooth` alone is not enough: browsers turn it into an instant
 * jump when the OS animation setting is off (Windows "Animation effects"), and the owner
 * wants the slide for everyone. So the scroll is driven frame by frame here, with
 * `behavior: 'instant'` on each step so the CSS rule doesn't double-smooth it.
 *
 * - Lands where the browser would: the target's top minus its `scroll-margin-top`.
 * - Duration scales with distance (350–900ms), eased in and out.
 * - Any wheel, touch or key input cancels the animation and hands control back.
 * - Leaves the URL alone (no #hash, no history entry): the page is one screen of
 *   sections, not a set of addresses.
 * - Moves focus to the section so keyboard and screen-reader users continue from where
 *   they landed.
 */
export function SmoothAnchors() {
    useEffect(() => {
        let frame = 0;
        let running: string | null = null;

        const finish = () => {
            if (frame) cancelAnimationFrame(frame);
            frame = 0;
            if (running) {
                window.dispatchEvent(new CustomEvent(ANCHOR_SCROLL_END, { detail: running }));
                running = null;
            }
            window.removeEventListener('wheel', finish);
            window.removeEventListener('touchstart', finish);
            window.removeEventListener('keydown', finish);
        };

        const onClick = (event: MouseEvent) => {
            if (event.defaultPrevented || event.button !== 0) return;
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

            const link = (event.target as Element | null)?.closest?.('a[href^="#"]');
            const id = link?.getAttribute('href')?.slice(1);
            const target = id ? document.getElementById(id) : null;
            if (!id || !target) return;

            event.preventDefault();
            finish();

            const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
            const maxY = document.documentElement.scrollHeight - window.innerHeight;
            const from = window.scrollY;
            const to = Math.min(maxY, Math.max(0, target.getBoundingClientRect().top + from - margin));
            const distance = to - from;
            const duration = Math.min(900, Math.max(350, Math.abs(distance) * 0.25));
            const start = performance.now();

            running = id;
            window.dispatchEvent(new CustomEvent(ANCHOR_SCROLL_START, { detail: id }));
            window.addEventListener('wheel', finish, { passive: true });
            window.addEventListener('touchstart', finish, { passive: true });
            window.addEventListener('keydown', finish);

            const step = (now: number) => {
                const t = Math.min(1, (now - start) / duration);
                window.scrollTo({ top: from + distance * easeInOutCubic(t), behavior: 'instant' });
                if (t < 1) {
                    frame = requestAnimationFrame(step);
                    return;
                }
                finish();
                if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
                target.focus({ preventScroll: true });
            };
            frame = requestAnimationFrame(step);
        };

        document.addEventListener('click', onClick);
        return () => {
            document.removeEventListener('click', onClick);
            finish();
        };
    }, []);

    return null;
}
