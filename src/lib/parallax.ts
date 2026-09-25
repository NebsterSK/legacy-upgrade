import type { CSSProperties } from 'react';

/**
 * Parallax settings for the four background motifs (the .parallax / .parallax-scope rules
 * in globals.css). Each motif moves on its own section's scroll timeline:
 *
 * - RISE: the logo arrows travel UP faster than the page, so they keep rising as you
 *   scroll: the "upgrade" reads as motion, and they feel in front of the ground.
 * - DRIFT: the euro and question mark move slower than the page, so they sit further
 *   back.
 *
 * Every motif travels about 20% of the scroll distance it is animated over (owner's
 * pick after trying 7-15%). Measured at 1440x900: hero ~740px of scroll, contact ~1140px,
 * pricing and FAQ ~1600-1700px.
 */
type ParallaxStyle = CSSProperties & Record<`--parallax-${string}`, string>;

/** Hero: at rest on page load, then rises as the hero scrolls away. */
export const PARALLAX_HERO: ParallaxStyle = {
    '--parallax-from': '0px',
    '--parallax-to': '-150px',
    '--parallax-range': 'exit',
};

/**
 * Contact: the last section can never scroll fully out of view (the page ends), so the
 * travel is mapped onto the part of its pass that actually happens.
 */
export const PARALLAX_RISE: ParallaxStyle = {
    '--parallax-from': '115px',
    '--parallax-to': '-115px',
    '--parallax-range': 'cover 0% cover 60%',
};

export const PARALLAX_DRIFT: ParallaxStyle = {
    '--parallax-from': '-165px',
    '--parallax-to': '165px',
    '--parallax-range': 'cover',
};
