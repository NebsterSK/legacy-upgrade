import Image from 'next/image';

import { SectionHeader, SubsectionHeader } from '@/components/section-header';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { technology } from '@/content';
import { logos } from '@/lib/logos';
import { cn } from '@/lib/utils';

type LogoItem = { readonly file: string; readonly label: string };

/**
 * The old markup used a hand-rolled `<span>` that faded in on hover/focus. Replaced with
 * the shadcn Tooltip, keeping the wrapper focusable so the label is reachable by keyboard.
 *
 * Sized by HEIGHT, not by a square box. Every mark shares a `0 0 24 24` viewBox but the
 * artwork inside it does not: Inertia is 1.79:1, Tailwind 1.67:1, MySQL 1.47:1, while
 * Laravel/Claude/Postgres are square. In a square tile `object-contain` binds on width, so
 * the wide marks could only ever render 56–68% as tall as the square ones. Fixed height +
 * `w-auto` equalises the cap height and lets each mark take the width its shape needs.
 */
function LogoTile({ item, className }: { item: LogoItem; className: string }) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <div
                    tabIndex={0}
                    className={cn(
                        'flex w-auto cursor-default items-center justify-center opacity-60 grayscale transition duration-300 outline-none hover:opacity-100 hover:grayscale-0 focus-visible:opacity-100 focus-visible:grayscale-0',
                        className
                    )}
                >
                    <Image
                        src={logos[item.file]}
                        alt={item.label}
                        className="h-full w-auto object-contain"
                    />
                </div>
            </TooltipTrigger>
            <TooltipContent>{item.label}</TooltipContent>
        </Tooltip>
    );
}

/** Ported from `source/index.blade.php:268-319`. */
export function Technology() {
    return (
        <section id="technology">
            <div className="bg-muted/50 py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <SectionHeader>{technology.heading}</SectionHeader>

                    <p className="text-muted-foreground mx-auto mb-12 max-w-2xl text-center">
                        {technology.intro}
                    </p>

                    <SubsectionHeader>{technology.stack.heading}</SubsectionHeader>

                    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-8 px-2 md:gap-x-10">
                        {technology.stack.logos.map((item) => (
                            <LogoTile key={item.file} item={item} className="h-12 md:h-20" />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
