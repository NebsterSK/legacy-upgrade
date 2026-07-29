import { CircleHelp, Info, X } from 'lucide-react';

import { SubsectionHeader } from '@/components/section-header';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { faq, type FaqTone } from '@/content';

/**
 * Ported from `source/index.blade.php:241-265` — the THREE visible questions only.
 * The five FAQPage questions are JSON-LD only and live in `faq.schema` (see Task 6).
 *
 * The old answers were prefixed with a red/blue/yellow Remix icon. Tone is preserved
 * semantically; the raw colours are not, since only shadcn tokens may be referenced.
 */
const toneIcons: Record<FaqTone, typeof Info> = {
    no: X,
    info: Info,
    maybe: CircleHelp,
};

export function Faq() {
    return (
        <div className="py-16">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                <SubsectionHeader>{faq.heading}</SubsectionHeader>

                <Accordion type="single" collapsible className="w-full">
                    {faq.visible.map((item, index) => {
                        const Icon = toneIcons[item.tone];
                        return (
                            <AccordionItem key={item.question} value={`item-${index}`}>
                                <AccordionTrigger className="text-left text-lg font-semibold">
                                    {item.question}
                                </AccordionTrigger>
                                {/*
                                    forceMount keeps the answer in the DOM while collapsed
                                    (Radix applies `hidden` instead of unmounting). Without
                                    it the answers exist only in the RSC payload, so they
                                    are absent from the static HTML — a real regression
                                    against the old page, where all three were plain <p>.
                                */}
                                <AccordionContent forceMount>
                                    <p className="text-muted-foreground flex items-start gap-2">
                                        <Icon
                                            className={
                                                item.tone === 'no'
                                                    ? 'text-destructive mt-0.5 size-4 shrink-0'
                                                    : 'mt-0.5 size-4 shrink-0'
                                            }
                                            aria-hidden
                                        />
                                        {item.answer}
                                    </p>
                                </AccordionContent>
                            </AccordionItem>
                        );
                    })}
                </Accordion>
            </div>
        </div>
    );
}
