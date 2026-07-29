import { ArrowRight } from 'lucide-react';

import { RichText } from '@/components/rich-text';
import { SubsectionHeader } from '@/components/section-header';
import { about } from '@/content';

/** Ported from `source/index.blade.php:39-59` (What I do / Why it matters). */
export function About() {
    return (
        <div className="bg-muted/50 py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                    {about.columns.map((column) => (
                        <div key={column.heading} className="text-center md:text-left">
                            <SubsectionHeader>{column.heading}</SubsectionHeader>

                            <p className="text-muted-foreground">
                                <RichText content={column.body} />
                            </p>

                            <a
                                href={column.link.href}
                                className="mt-4 inline-flex items-center gap-1 font-semibold transition-colors hover:underline"
                            >
                                {column.link.label}
                                <ArrowRight className="size-4" aria-hidden />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
