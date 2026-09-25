import { Check } from 'lucide-react';

import { Container, SectionHeader } from '@/components/section-header';
import { EuroGlyph } from '@/components/upgrade-arrow';
import { pricing } from '@/content';
import { cta } from '@/lib/cta';
import { PARALLAX_DRIFT } from '@/lib/parallax';
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
        <div className="parallax-scope bg-muted relative isolate overflow-hidden py-section">
            <EuroGlyph
                className="parallax text-brand-tint absolute -top-[12%] -right-[10%] -z-10 w-[min(44rem,95vw)] md:-right-[4%]"
                style={PARALLAX_DRIFT}
            />

            <Container>
                <SectionHeader>{pricing.heading}</SectionHeader>

                <div className="mt-10 grid gap-5 md:grid-cols-2">
                    {pricing.tiers.map((tier) => {
                        const Icon = getIcon(tier.icon);
                        return (
                            <div
                                key={tier.title}
                                className={cn(
                                    'flex flex-col rounded-lg p-8 sm:p-10',
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
                                    <h3 className="text-lg font-bold">{tier.title}</h3>
                                </div>

                                <p className="mt-8 flex flex-wrap items-baseline gap-x-3">
                                    <span className="font-kanit text-h2 leading-none font-bold">
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
                                    <p className="text-muted-foreground mt-8 max-w-prose leading-relaxed">
                                        {tier.body}
                                    </p>
                                )}

                                <div className="mt-auto pt-10">
                                    <a
                                        href={tier.cta.href}
                                        className={tier.featured ? cta.solidOnBrand : cta.solid}
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
