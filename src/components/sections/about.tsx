import { ArrowDown } from 'lucide-react';

import { RichText } from '@/components/rich-text';
import { Container, SubsectionHeader } from '@/components/section-header';
import { about } from '@/content';

/**
 * What I do / Why it matters. Two plain statements under a heavy rule, the way a sign
 * or a spec plate is laid out: heading, claim, where to read more. The bold runs in the
 * copy carry the argument, so they are set in full ink against muted body text.
 */
export function About() {
    return (
        <div className="py-section">
            <Container className="grid gap-14 md:grid-cols-2 md:gap-12 lg:gap-20">
                {about.columns.map((column) => (
                    <div key={column.heading} className="border-foreground border-t-[3px] pt-8">
                        <SubsectionHeader>{column.heading}</SubsectionHeader>

                        <p className="text-muted-foreground mt-5 max-w-prose text-lg leading-relaxed [&_strong]:text-foreground [&_strong]:font-semibold">
                            <RichText content={column.body} />
                        </p>

                        <a
                            href={column.link.href}
                            className="text-primary decoration-primary/30 hover:text-primary-hover hover:decoration-primary-hover group mt-6 inline-flex items-center gap-2 font-bold underline decoration-2 transition-[color,text-decoration-color] duration-200"
                        >
                            {column.link.label}
                            <ArrowDown
                                className="size-4 transition-transform duration-300 ease-(--ease-out-expo) group-hover:translate-y-0.5"
                                aria-hidden
                            />
                        </a>
                    </div>
                ))}
            </Container>
        </div>
    );
}
