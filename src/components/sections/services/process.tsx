import { Container, SubsectionHeader } from '@/components/section-header';
import { process } from '@/content';
import { getIcon } from '@/lib/icons';

/**
 * The one place on the page where numbers earn their place: this IS a sequence, and the
 * order carries meaning (you see a demo before the full build). Six steps on a 3×2 grid,
 * each hung from a rule, with the step number set large in the brand colour.
 */
export function Process() {
    return (
        <div className="py-[clamp(4.5rem,3rem+6vw,8rem)]">
            <Container>
                <SubsectionHeader className="max-w-[18ch]">{process.heading}</SubsectionHeader>

                <ol className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                    {process.steps.map((step, index) => {
                        const Icon = getIcon(step.icon);
                        return (
                            <li key={step.title} className="border-border border-t-2 pt-6">
                                <div className="flex items-start justify-between">
                                    <p className="flex items-baseline gap-2">
                                        <span className="text-muted-foreground text-sm font-semibold">
                                            {process.stepLabel}
                                        </span>
                                        <span className="font-kanit text-primary text-5xl leading-none font-bold">
                                            {index + 1}
                                        </span>
                                    </p>
                                    <Icon className="text-muted-foreground size-6" strokeWidth={1.75} aria-hidden />
                                </div>
                                <h4 className="font-kanit mt-5 text-2xl leading-tight font-bold">{step.title}</h4>
                                <p className="text-muted-foreground mt-2 max-w-[40ch] leading-relaxed">
                                    {step.desc}
                                </p>
                            </li>
                        );
                    })}
                </ol>
            </Container>
        </div>
    );
}
