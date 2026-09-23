/** Verbatim from `source/_layouts/main.blade.php`. */
export const nav = {
    brand: 'Legacy Upgrade',

    /** Order matters — it drives the scroll-spy in Task 7. */
    items: [
        { label: 'Home', href: '#home' },
        { label: 'Services', href: '#services' },
        { label: 'Technology', href: '#technology' },
        { label: 'Contact', href: '#contact' },
    ],

    toggleAriaLabel: 'Toggle navigation',

    theme: {
        /** The toggle is an icon-only switch; this is its accessible name. */
        ariaLabel: 'Toggle dark mode',
    },
} as const;
