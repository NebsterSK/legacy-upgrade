import { Check } from 'lucide-react';

import { Container, SubsectionHeader } from '@/components/section-header';
import { pricing } from '@/content';
import { getIcon } from '@/lib/icons';
import { cn } from '@/lib/utils';

/**
 * Two prices, stated plainly. The featured tier takes the brand drench (the same blue as
 * the hero) so emphasis comes from commitment, not from a badge, which would need new copy.
 * The price is the largest thing in each block: the copy is blunt about money, so the
 * design doesn't bury the number under the feature list.
 */
export function Pricing() {
    return (
        <div className="bg-muted py-[clamp(4.5rem,3rem+6vw,8rem)]">
            <Container>
                <SubsectionHeader>{pricing.heading}</SubsectionHeader>

                <div className="mt-10 grid gap-5 md:grid-cols-[1.15fr_1fr]">
                    {pricing.tiers.map((tier) => {
                        const Icon = getIcon(tier.icon);
                        return (
                            <div
                                key={tier.title}
                                className={cn(
                                    'flex flex-col rounded-(--radius) p-8 sm:p-10',
                                    tier.featured
                                        ? 'bg-brand text-brand-foreground'
                                        : 'bg-card text-card-foreground border'
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon
                                        className={cn(
                                            'size-6',
                                            tier.featured
                                                ? 'text-brand-muted-foreground'
                                                : 'text-primary'
                                        )}
                                        strokeWidth={1.75}
                                        aria-hidden
                                    />
                                    <h4 className="text-lg font-bold">{tier.title}</h4>
                                </div>

                                <p className="mt-8 flex flex-wrap items-baseline gap-x-3">
                                    <span className="font-kanit text-[clamp(3rem,2.4rem+2.4vw,4.25rem)] leading-none font-bold tracking-[-0.02em]">
                                        {tier.price}
                                    </span>
                                    {tier.priceNote && (
                                        <span
                                            className={cn(
                                                'text-lg',
                                                tier.featured
                                                    ? 'text-brand-muted-foreground'
                                                    : 'text-muted-foreground'
                                            )}
                                        >
                                            {tier.priceNote}
                                        </span>
                                    )}
                                </p>

                                {tier.features.length > 0 && (
                                    <ul className="mt-8 space-y-3">
                                        {tier.features.map((feature) => (
                                            <li key={feature} className="flex items-start gap-3">
                                                <Check
                                                    className="text-brand-muted-foreground mt-1 size-4 shrink-0"
                                                    strokeWidth={3}
                                                    aria-hidden
                                                />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {tier.body && (
                                    <p className="text-muted-foreground mt-8 max-w-[48ch] leading-relaxed">
                                        {tier.body}
                                    </p>
                                )}

                                <div className="mt-auto pt-10">
                                <a
                                    href={tier.cta.href}
                                    className={cn(
                                        'inline-flex h-12 items-center justify-center rounded-(--radius) px-6 font-bold transition-transform duration-200 outline-none hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-offset-2',
                                        tier.featured
                                            ? 'bg-brand-foreground text-brand focus-visible:ring-brand-foreground focus-visible:ring-offset-brand'
                                            : 'bg-primary text-primary-foreground focus-visible:ring-ring focus-visible:ring-offset-card'
                                    )}
                                >
                                    {tier.cta.label}
                                </a>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Container>
        </div>
    );
}
