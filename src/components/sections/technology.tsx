import Image from 'next/image';

import { Container, SectionHeader } from '@/components/section-header';
import { technology } from '@/content';
import { logos } from '@/lib/logos';
import { cn } from '@/lib/utils';

type LogoItem = { readonly file: string; readonly label: string };

/**
 * One technology as a node: the logo alone on a white plate (several marks are
 * dark-on-transparent and vanish on the plum band otherwise). The name lives in the alt
 * text, so screen readers still read the whole stack in flow order.
 *
 * Logos are sized by height: every mark shares a `0 0 24 24` viewBox but the artwork does
 * not (Inertia 1.79:1, Tailwind 1.67:1, MySQL 1.47:1 vs square Laravel/Claude/Postgres).
 */
function Node({ item, className }: { item: LogoItem; className?: string }) {
    return (
        <div
            className={cn(
                'bg-plate relative z-10 grid size-20 place-items-center rounded-lg p-4 shadow-md md:size-24 md:p-5',
                className
            )}
        >
            <Image
                src={logos[item.file]}
                alt={item.label}
                className="max-h-full w-auto max-w-full object-contain"
            />
        </div>
    );
}

/*
 * Grid placement per node. Mobile: the flow runs top to bottom, one row per layer, a
 * pair split into two columns. md+: left to right, one column per layer, a pair split into
 * two rows. Literal class lists so Tailwind can see every one of them.
 */
const SINGLE = [
    'col-span-2 row-start-1 md:col-span-1 md:col-start-1 md:row-span-2 md:row-start-1',
    'col-span-2 row-start-2 md:col-span-1 md:col-start-2 md:row-span-2 md:row-start-1',
    'col-span-2 row-start-3 md:col-span-1 md:col-start-3 md:row-span-2 md:row-start-1',
    'col-span-2 row-start-4 md:col-span-1 md:col-start-4 md:row-span-2 md:row-start-1',
    'col-span-2 row-start-5 md:col-span-1 md:col-start-5 md:row-span-2 md:row-start-1',
];
const PAIR = [
    [
        'col-start-1 row-start-1 md:col-start-1 md:row-start-1',
        'col-start-2 row-start-1 md:col-start-1 md:row-start-2',
    ],
    [
        'col-start-1 row-start-2 md:col-start-2 md:row-start-1',
        'col-start-2 row-start-2 md:col-start-2 md:row-start-2',
    ],
    [
        'col-start-1 row-start-3 md:col-start-3 md:row-start-1',
        'col-start-2 row-start-3 md:col-start-3 md:row-start-2',
    ],
    [
        'col-start-1 row-start-4 md:col-start-4 md:row-start-1',
        'col-start-2 row-start-4 md:col-start-4 md:row-start-2',
    ],
    [
        'col-start-1 row-start-5 md:col-start-5 md:row-start-1',
        'col-start-2 row-start-5 md:col-start-5 md:row-start-2',
    ],
];

/*
 * Connectors, in the same coordinates as the grid: a 0–100 box where layer centres sit
 * at 10/30/50/70/90 along the flow and the two halves of a pair at 25/75 across it.
 * Right-angle branches (split, merge, split) read as wiring rather than a doodle. Drawn
 * centre to centre; the opaque nodes cover the ends.
 */
const FLOW_DESKTOP = [
    'M10 50 H20 V25 H30',
    'M20 50 V75 H30',
    'M30 25 H40 V50 H50',
    'M30 75 H40 V50',
    'M50 50 H70',
    'M70 50 H80 V25 H90',
    'M80 50 V75 H90',
];
/** Same wiring for the vertical phone layout: axes swapped, so H and V swap too. */
const FLOW_MOBILE = FLOW_DESKTOP.map((d) =>
    d.replace(/M(\d+) (\d+)/, 'M$2 $1').replace(/[HV]/g, (c) => (c === 'H' ? 'V' : 'H'))
);

function Wires({ paths, className }: { paths: readonly string[]; className: string }) {
    return (
        <svg
            aria-hidden
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className={cn('text-second-accent absolute inset-0 size-full', className)}
        >
            {/* The wire itself: solid and quiet, so it can't be mistaken for the dashed
                Forge boundary around it. */}
            {paths.map((d) => (
                <path
                    key={d}
                    d={d}
                    fill="none"
                    stroke="currentColor"
                    strokeOpacity={0.45}
                    strokeWidth={2}
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                />
            ))}
            {/* Packets travelling along it, in the direction of the flow. */}
            {paths.map((d) => (
                <path
                    key={`${d}-flow`}
                    d={d}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                    className="flow-line"
                />
            ))}
        </svg>
    );
}

/**
 * The stack as an architecture diagram on the plum band: the request path Tailwind →
 * React / Vue → Inertia → Laravel → MySQL / PostgreSQL, wired left to right (top to bottom
 * on phones), inside a dashed Laravel Forge boundary (it hosts and deploys all of it),
 * with Claude above the boundary and wired into it, since it works across the whole
 * stack. Small packets travel along the wires in the direction of the flow.
 */
export function Technology() {
    const { stack } = technology;

    return (
        <section
            id="technology"
            className="bg-second text-second-foreground py-section"
        >
            <Container>
                <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
                    <SectionHeader className="lg:col-span-5">{technology.heading}</SectionHeader>
                    <p className="text-second-muted-foreground max-w-prose text-lg leading-relaxed lg:col-span-7 lg:pt-3">
                        {technology.intro}
                    </p>
                </div>

                <div className="border-second-accent mt-16 border-t-[3px] pt-8">
                    <h3 className="font-kanit text-h4 font-bold">{stack.heading}</h3>

                    <figure className="mx-auto mt-10 max-w-5xl">
                        {/* Claude: on top of everything, wired into the boundary. */}
                        <div className="flex flex-col items-center">
                            <Node item={stack.overseer} />
                            <span aria-hidden className="bg-second-accent h-10 w-0.5" />
                        </div>

                        {/* Laravel Forge: the boundary the whole flow runs inside. */}
                        <div className="border-second-accent relative rounded-xl border-2 border-dashed px-3 pt-14 pb-6 sm:px-6 md:px-8 md:pt-16 md:pb-8">
                            <div className="bg-plate absolute -top-5 left-5 flex h-10 items-center rounded-lg px-4 shadow-md md:left-8">
                                <Image
                                    src={logos[stack.host.file]}
                                    alt={stack.host.label}
                                    className="h-4 w-auto"
                                />
                            </div>

                            <div className="relative grid h-[40rem] grid-cols-2 grid-rows-5 md:h-72 md:grid-cols-5 md:grid-rows-2">
                                <Wires paths={FLOW_MOBILE} className="md:hidden" />
                                <Wires paths={FLOW_DESKTOP} className="hidden md:block" />

                                {stack.flow.map((layer, column) =>
                                    layer.map((item, index) => (
                                        <Node
                                            key={item.file}
                                            item={item}
                                            className={cn(
                                                'place-self-center',
                                                layer.length === 1
                                                    ? SINGLE[column]
                                                    : PAIR[column][index]
                                            )}
                                        />
                                    ))
                                )}
                            </div>
                        </div>
                    </figure>
                </div>
            </Container>
        </section>
    );
}
