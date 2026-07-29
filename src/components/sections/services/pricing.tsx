import { Check } from 'lucide-react';

import { SubsectionHeader } from '@/components/section-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { pricing } from '@/content';
import { getIcon } from '@/lib/icons';
import { cn } from '@/lib/utils';

/**
 * Ported from `source/index.blade.php:179-239`.
 *
 * The featured tier keeps the old `ring-2` emphasis rather than gaining a Badge: a badge
 * needs a label, and any label would be new user-visible copy the freeze does not allow.
 */
export function Pricing() {
    return (
        <div className="py-16">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                <SubsectionHeader>{pricing.heading}</SubsectionHeader>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {pricing.tiers.map((tier) => {
                        const Icon = getIcon(tier.icon);
                        return (
                            <Card
                                key={tier.title}
                                className={cn(
                                    'flex flex-col',
                                    tier.featured && 'ring-primary ring-2'
                                )}
                            >
                                <CardContent className="flex grow flex-col">
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="bg-muted flex size-10 items-center justify-center rounded-full">
                                            <Icon className="size-5" aria-hidden />
                                        </div>
                                        <h4 className="text-lg font-bold">{tier.title}</h4>
                                    </div>

                                    <p className="text-2xl font-bold">{tier.price}</p>

                                    {tier.priceNote && (
                                        <p className="text-muted-foreground mt-1 text-sm">
                                            {tier.priceNote}
                                        </p>
                                    )}

                                    <div className="mb-6" />

                                    {tier.features.length > 0 && (
                                        <ul className="text-muted-foreground mb-6 space-y-2 text-sm">
                                            {tier.features.map((feature) => (
                                                <li key={feature} className="flex items-start gap-2">
                                                    <Check
                                                        className="mt-0.5 size-4 shrink-0"
                                                        aria-hidden
                                                    />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    {tier.body && (
                                        <p className="text-muted-foreground mb-6 text-sm">
                                            {tier.body}
                                        </p>
                                    )}

                                    <Button
                                        asChild
                                        variant={tier.featured ? 'default' : 'outline'}
                                        className="mt-auto w-full"
                                    >
                                        <a href={tier.cta.href}>{tier.cta.label}</a>
                                    </Button>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
