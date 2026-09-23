import Image from 'next/image';

import { Container, SectionHeader, SubsectionHeader } from '@/components/section-header';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { technology } from '@/content';
import { logos } from '@/lib/logos';
import { cn } from '@/lib/utils';

type LogoItem = { readonly file: string; readonly label: string };

/**
 * Sized by HEIGHT, not by a square box. Every mark shares a `0 0 24 24` viewBox but the
 * artwork inside it does not: Inertia is 1.79:1, Tailwind 1.67:1, MySQL 1.47:1, while
 * Laravel/Claude/Postgres are square. In a square tile `object-contain` binds on width, so
 * the wide marks could only ever render 56–68% as tall as the square ones.
 *
 * Logos stay in colour. Grayscale-until-hover hid the one bit of visual variety this
 * section has behind an interaction touch users never get.
 */
function LogoTile({ item, className }: { item: LogoItem; className: string }) {
    return (
        <Tooltip delayDuration={600}>
            <TooltipTrigger asChild>
                <div
                    tabIndex={0}
                    className={cn(
                        'focus-visible:ring-ring flex w-auto cursor-default items-center justify-center rounded-sm transition-transform duration-300 ease-(--ease-out-expo) outline-none hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-offset-(--plate)',
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

export function Technology() {
    return (
        <section
            id="technology"
            className="bg-second text-second-foreground py-[clamp(4.5rem,3rem+6vw,8rem)]"
        >
            <Container>
                <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
                    <SectionHeader className="lg:col-span-5">{technology.heading}</SectionHeader>
                    <p className="text-second-muted-foreground max-w-[58ch] text-lg leading-relaxed lg:col-span-7 lg:pt-3">
                        {technology.intro}
                    </p>
                </div>

                <div className="border-second-accent mt-16 border-t-[3px] pt-8">
                    <SubsectionHeader className="text-2xl sm:text-2xl">
                        {technology.stack.heading}
                    </SubsectionHeader>

                    {/* On a plate, like the client logos: MySQL's dark teal wordmark disappears on the dark theme otherwise. */}
                    <div className="bg-plate mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-8 rounded-(--radius) border px-6 py-10 sm:justify-between sm:px-12 md:gap-x-14">
                        {technology.stack.logos.map((item) => (
                            <LogoTile key={item.file} item={item} className="h-11 md:h-14" />
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}
