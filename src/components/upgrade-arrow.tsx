/**
 * The up-arrow from the logo square, as a scalable glyph. It is the brand's one motif:
 * the hero's backdrop, the contact finale, the header mark. Decorative everywhere it
 * appears, so it is always aria-hidden.
 */
export function UpgradeArrow({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden fill="currentColor">
            <polygon points="50,6 94,50 68,50 68,94 32,94 32,50 6,50" />
        </svg>
    );
}

/** The logo square: arrow knocked out of a brand-blue tile. */
export function UpgradeMark({ className }: { className?: string }) {
    return (
        <span
            className={`bg-brand text-brand-foreground inline-flex items-center justify-center ${className ?? ''}`}
            aria-hidden
        >
            <UpgradeArrow className="size-[62%]" />
        </span>
    );
}

/*
 * Section motifs drawn in the arrow's language: solid, heavy, flat-cut terminals, no
 * curves softer than a circle. Each sits cropped in the background of its section the
 * way the arrow sits behind the hero and contact: the euro behind Pricing, the question
 * mark behind the FAQ.
 */

/** A euro sign: a thick C with two bars crossing its left side. */
export function EuroGlyph({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden fill="currentColor">
            <path d="M89.7 23.2 A40 40 0 1 0 89.7 76.8 L74.1 62.7 A19 19 0 1 1 74.1 37.3 Z" />
            <rect x="4" y="36" width="58" height="11" />
            <rect x="4" y="53" width="58" height="11" />
        </svg>
    );
}

/**
 * A question mark: Kanit Bold's own glyph, outlined into a path (so it needs no font load
 * and renders identically everywhere). Kanit is the face the FAQ questions are set in, so
 * the background mark is the same "?" the questions end with, just enormous.
 */
export function QuestionGlyph({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden fill="currentColor">
            <path d="M58 71.9L30.8 71.9L30.8 69.1Q30.8 62.7 33.3 58.6Q35.7 54.6 40.7 50.2L40.7 50.2Q44.9 46.5 48.1 44.1Q51.3 41.7 53.2 39.4Q55.1 37 55.1 33.5L55.1 33.5Q55.1 28.6 51.2 26.5Q47.3 24.5 38.6 24.5L38.6 24.5Q31.9 24.5 25.8 26.1Q19.8 27.7 15.5 30.3L15.5 30.3L15.5 6.4Q21.5 3.4 29.3 1.7Q37.1 0 46.9 0L46.9 0Q65.1 0 74.8 7.8Q84.5 15.6 84.5 29.2L84.5 29.2Q84.5 37.6 81.3 43Q78.1 48.3 71.2 54L71.2 54Q66 58.3 62 61.6Q58 65 58 70L58 70L58 71.9M59.4 100L29.4 100L29.4 79.7L59.4 79.7L59.4 100" />
        </svg>
    );
}
