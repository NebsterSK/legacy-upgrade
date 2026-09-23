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
                'font-kanit text-[clamp(2.5rem,1.6rem+3.6vw,4.5rem)] leading-[0.95] font-bold tracking-[-0.02em]',
                className
            )}
        >
            {children}
        </h2>
    );
}

export function SubsectionHeader({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <h3
            className={cn(
                'font-kanit text-[clamp(1.75rem,1.3rem+1.6vw,2.625rem)] leading-[1.05] font-bold tracking-[-0.015em]',
                className
            )}
        >
            {children}
        </h3>
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
