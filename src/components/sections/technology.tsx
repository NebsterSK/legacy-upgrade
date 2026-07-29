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
 */
function LogoTile({ item, className }: { item: LogoItem; className: string }) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <div
                    tabIndex={0}
                    className={cn(
                        'flex cursor-default items-center justify-center opacity-60 grayscale transition duration-300 outline-none hover:opacity-100 hover:grayscale-0 focus-visible:opacity-100 focus-visible:grayscale-0',
                        className
                    )}
                >
                    <Image
                        src={logos[item.file]}
                        alt={item.label}
                        className="h-full w-full object-contain"
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

                    <div className="grid grid-cols-3 justify-items-center gap-6 px-2 md:grid-cols-6 md:gap-10">
                        {technology.stack.logos.map((item) => (
                            <LogoTile
                                key={item.file}
                                item={item}
                                className="mt-4 size-16 md:mt-0 md:size-24"
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <SubsectionHeader>{technology.infrastructure.heading}</SubsectionHeader>

                    <div className="flex flex-wrap justify-center gap-8 sm:gap-12">
                        {technology.infrastructure.logos.map((item) => (
                            <LogoTile
                                key={item.file}
                                item={item}
                                className="h-18 w-36 sm:h-24 sm:w-48"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
