'use client';

import { useEffect } from 'react';

import { ANCHOR_SCROLL_END, ANCHOR_SCROLL_START } from '@/components/smooth-anchors';

/**
 * Fraction of the remaining distance covered each frame. This is the ONLY knob that
 * matters for how the page feels:
 *
 *   0.30  barely smoothed, almost native
 *   0.22  current: the notch is visibly eased but lands in ~120ms
 *   0.10  the Lenis default; floats for the best part of a second (what the owner dislikes)
 *
 * The tail is cut by SNAP rather than left to converge asymptotically, so the animation
 * always ENDS instead of trailing off, which is most of what reads as "laggy".
 */
const LERP = 0.22;

/** Pixels left at which we jump the remainder and stop. */
const SNAP = 0.5;

/** Firefox reports notched wheels in lines, not pixels; 3 lines is one notch. */
const PX_PER_LINE = 40;

/** True if the wheel is over something that can still scroll itself in this direction. */
function overScrollable(node: EventTarget | null, dy: number): boolean {
    let el = node instanceof Element ? node : null;
    while (el && el !== document.body && el !== document.documentElement) {
        const overflowY = getComputedStyle(el).overflowY;
        if (
            (overflowY === 'auto' || overflowY === 'scroll') &&
            el.scrollHeight > el.clientHeight
        ) {
            const atTop = el.scrollTop <= 0;
            const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
            if (!((dy < 0 && atTop) || (dy > 0 && atBottom))) return true;
        }
        el = el.parentElement;
    }
    return false;
}

/**
 * Eased mouse-wheel scrolling.
 *
 * Deliberately short. Smoothing IS delay — the two are the same mechanism — so the design
 * goal here is the smallest amount that removes the 100px staircase of a Windows wheel
 * without the page continuing to move after the input stops. See LERP above.
 *
 * It drives the REAL scroll position (`window.scrollTo`), never a transform on a wrapper.
 * That is load-bearing: the background motifs animate on CSS scroll timelines
 * (`view-timeline-name` in globals.css), the header and the FAQ heading are `position:
 * sticky`, and `use-active-section` watches scroll. A wrapper-transform library would
 * break all four.
 *
 * It stays out of the way of:
 * - trackpads and precision mice, which the OS already smooths (see the deltaMode checks);
 * - ctrl/cmd + wheel, which is zoom;
 * - anything scrollable under the cursor, such as the open phone menu;
 * - a locked body (Radix sets `data-scroll-locked` while a sheet is open);
 * - <SmoothAnchors>, which owns the scroll during an anchor jump. The first notch of a
 *   cancelling wheel passes through natively, which is what ends that animation anyway.
 */
export function SmoothWheel() {
    useEffect(() => {
        let frame = 0;
        let target = window.scrollY;
        let anchorRunning = false;

        /**
         * Wheel smoothing is a MOUSE feature. A touch device scrolls itself, with its own
         * momentum, and our loop has no way to know about that gesture — it would keep
         * lerping toward a target the finger has already moved away from, so the page
         * oscillates in place instead of scrolling. Some mobile browsers do synthesise
         * wheel events, so the guard has to be the input device, not the event.
         */
        const mouse = window.matchMedia('(hover: hover) and (pointer: fine)');

        const maxScroll = () =>
            document.documentElement.scrollHeight - window.innerHeight;

        const step = () => {
            const current = window.scrollY;
            const diff = target - current;

            if (Math.abs(diff) < SNAP) {
                window.scrollTo({ top: target, behavior: 'instant' });
                frame = 0;
                return;
            }

            window.scrollTo({ top: current + diff * LERP, behavior: 'instant' });
            frame = requestAnimationFrame(step);
        };

        /** Hand the scroll back: something else is driving now. */
        const stop = () => {
            if (frame) cancelAnimationFrame(frame);
            frame = 0;
        };

        const onWheel = (event: WheelEvent) => {
            if (!mouse.matches) return;
            if (anchorRunning) return;
            if (event.ctrlKey || event.metaKey) return;
            if (document.body.hasAttribute('data-scroll-locked')) return;

            let delta: number;

            if (event.deltaMode === 1) {
                // Firefox, notched wheel.
                delta = event.deltaY * PX_PER_LINE;
            } else if (event.deltaMode === 0) {
                // Chromium reports a classic wheel as a multiple of 120 here and something
                // irregular for a trackpad. Anything we can't positively identify as a
                // notched wheel is left to the browser.
                const raw = (event as WheelEvent & { wheelDeltaY?: number }).wheelDeltaY;
                if (!raw || Math.abs(raw) % 120 !== 0) return;
                delta = event.deltaY;
            } else {
                return;
            }

            if (overScrollable(event.target, delta)) return;

            event.preventDefault();

            // Idle means the last move came from somewhere else (scrollbar drag, keyboard,
            // an anchor jump), so re-read rather than continuing from a stale target.
            if (!frame) target = window.scrollY;

            target = Math.min(maxScroll(), Math.max(0, target + delta));
            if (!frame) frame = requestAnimationFrame(step);
        };

        const onAnchorStart = () => {
            anchorRunning = true;
            stop();
        };
        const onAnchorEnd = () => {
            anchorRunning = false;
        };

        window.addEventListener('wheel', onWheel, { passive: false });
        // A hybrid laptop can do both: if a finger or a key takes over mid-animation, get
        // out of the way rather than fighting it for the scroll position.
        window.addEventListener('touchstart', stop, { passive: true });
        window.addEventListener('keydown', stop);
        window.addEventListener(ANCHOR_SCROLL_START, onAnchorStart);
        window.addEventListener(ANCHOR_SCROLL_END, onAnchorEnd);

        return () => {
            window.removeEventListener('wheel', onWheel);
            window.removeEventListener('touchstart', stop);
            window.removeEventListener('keydown', stop);
            window.removeEventListener(ANCHOR_SCROLL_START, onAnchorStart);
            window.removeEventListener(ANCHOR_SCROLL_END, onAnchorEnd);
            stop();
        };
    }, []);

    return null;
}
