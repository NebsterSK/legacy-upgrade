import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

/**
 * Section and subsection headings. Left-aligned, set in Kanit (the logo's wordmark face),
 * and sized on a fluid scale: the page reads as a sequence of plain signs rather than a
 * stack of centred template blocks.
 */
export function SectionHeader({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <h2
            className={cn(
                'font-kanit text-h2 font-bold',
                className
            )}
        >
            {children}
        </h2>
    );
}

/**
 * `level` sets the heading TAG only; the visual size stays `text-h3` either way.
 *
 * The two are deliberately decoupled. On a one-route site the document outline has to be
 * valid on its own — no h3 before the first h2, no skipped levels — but a block being
 * top-level in the outline does not mean it should shout at `text-h2` on screen. Pass
 * `level={2}` for a block that sits directly under the h1; leave it alone inside a
 * section that already has its own SectionHeader.
 */
export function SubsectionHeader({
    children,
    className,
    level = 3,
}: {
    children: ReactNode;
    className?: string;
    level?: 2 | 3;
}) {
    const Tag = level === 2 ? 'h2' : 'h3';
    return (
        <Tag
            className={cn(
                'font-kanit text-h3 font-bold',
                className
            )}
        >
            {children}
        </Tag>
    );
}

/** Page-width wrapper, so every section shares one grid edge. */
export function Container({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <div className={cn('mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10', className)}>
            {children}
        </div>
    );
}
