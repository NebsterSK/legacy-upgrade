import type { ReactNode } from 'react';

/** Replaces `source/_components/section-header.blade.php`. */
export function SectionHeader({ children }: { children: ReactNode }) {
    return (
        <h2 className="font-kanit mb-6 text-center text-4xl">{children}</h2>
    );
}

/** Replaces `source/_components/subsection-header.blade.php`. */
export function SubsectionHeader({ children }: { children: ReactNode }) {
    return (
        <h3 className="font-kanit mb-6 text-center text-2xl">{children}</h3>
    );
}
