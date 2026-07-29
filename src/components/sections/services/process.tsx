import { SubsectionHeader } from '@/components/section-header';
import { process } from '@/content';
import { getIcon } from '@/lib/icons';

/** Ported from `source/index.blade.php:141-177`. */
export function Process() {
    return (
        <div className="py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SubsectionHeader>{process.heading}</SubsectionHeader>

                <div className="mx-auto max-w-3xl">
                    <div className="relative">
                        {/* Vertical timeline line */}
                        <div className="bg-border absolute top-0 bottom-0 left-5 w-px sm:left-6" />

                        <ol className="space-y-10">
                            {process.steps.map((step, index) => {
                                const Icon = getIcon(step.icon);
                                return (
                                    <li
                                        key={step.title}
                                        className="relative flex items-start gap-5 sm:gap-6"
                                    >
                                        <div className="bg-muted ring-background relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full ring-4 sm:size-12">
                                            <Icon className="size-5" aria-hidden />
                                        </div>

                                        <div className="pt-1">
                                            <p className="text-muted-foreground mb-1 text-xs font-semibold tracking-wider uppercase">
                                                {process.stepLabel} {index + 1}
                                            </p>
                                            <h4 className="text-lg font-bold">{step.title}</h4>
                                            <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                                                {step.desc}
                                            </p>
                                        </div>
                                    </li>
                                );
                            })}
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
}
