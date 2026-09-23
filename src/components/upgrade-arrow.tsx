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
