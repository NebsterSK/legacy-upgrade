import { Container, SubsectionHeader } from '@/components/section-header';
import { process } from '@/content';
import { getIcon } from '@/lib/icons';
import { cn } from '@/lib/utils';

/**
 * A real sequence, drawn as one: a vertical spine down the middle with the steps
 * alternating left and right of it (1 left, 2 right, …), each hung from an icon node on
 * the spine. Left-hand steps mirror toward the spine (right-aligned) so every step reads
 * outward from the same line. From md up each step after the first is pulled up so it
 * sits beside the tail of the previous one: a zigzag, not a staircase of half-empty rows.
 *
 * Below md the spine moves to the left edge and every step sits to its right, in order.
 * DOM order is the visual order at every width.
 *
 * The spine is drawn per step (node → bottom of that step) so it stays continuous
 * whatever the text lengths; the last step has none. From md up it stops 5rem short of
 * the step bottom, which is exactly where the next (pulled-up) node begins.
 */
export function Process() {
    return (
        <div className="py-[clamp(4.5rem,3rem+6vw,8rem)]">
            <Container>
                <SubsectionHeader>{process.heading}</SubsectionHeader>

                <ol className="mx-auto mt-14 max-w-5xl">
                    {process.steps.map((step, index) => {
                        const Icon = getIcon(step.icon);
                        const left = index % 2 === 0;
                        const last = index === process.steps.length - 1;
                        return (
                            <li
                                key={step.title}
                                className="relative grid grid-cols-[3.5rem_1fr] gap-x-5 md:grid-cols-[1fr_3.5rem_1fr] md:gap-x-10 md:not-first:-mt-20"
                            >
                                {!last && (
                                    <span
                                        aria-hidden
                                        className="bg-border absolute top-14 bottom-0 left-7 w-0.5 -translate-x-1/2 md:bottom-20 md:left-1/2"
                                    />
                                )}

                                <span className="bg-tint-2 text-tint-2-ink ring-background relative z-10 col-start-1 row-start-1 grid size-14 place-items-center self-start rounded-full ring-8 md:col-start-2">
                                    <Icon className="size-6" strokeWidth={1.75} aria-hidden />
                                </span>

                                <div
                                    className={cn(
                                        // The bottom padding is the gap to the next step (and where the
                                        // spine runs); the last step has none, or it would stack on top of
                                        // the section's own padding.
                                        'col-start-2 row-start-1 max-w-[30rem]',
                                        !last && 'pb-14 md:pb-24',
                                        left
                                            ? 'md:col-start-1 md:justify-self-end md:text-right'
                                            : 'md:col-start-3'
                                    )}
                                >
                                    <p
                                        className={cn(
                                            'flex items-baseline gap-2',
                                            left && 'md:justify-end'
                                        )}
                                    >
                                        <span className="text-muted-foreground text-sm font-semibold">
                                            {process.stepLabel}
                                        </span>
                                        <span className="font-kanit text-tint-2-ink text-5xl leading-none font-bold">
                                            {index + 1}
                                        </span>
                                    </p>
                                    <h4 className="font-kanit mt-4 text-2xl leading-tight font-bold">
                                        {step.title}
                                    </h4>
                                    <p className="text-muted-foreground mt-2 leading-relaxed">
                                        {step.desc}
                                    </p>
                                </div>
                            </li>
                        );
                    })}
                </ol>
            </Container>
        </div>
    );
}
