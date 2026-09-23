import { CircleHelp, Info, X } from 'lucide-react';

import { Container, SubsectionHeader } from '@/components/section-header';
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
 * Heading holds the left column; the questions are set large in Kanit, because they are
 * the funniest and most on-voice lines on the page and deserve to be read, not skimmed.
 * The answer's tone icon keeps the old red/blue/yellow meaning semantically.
 */
const toneIcons: Record<FaqTone, typeof Info> = {
    no: X,
    info: Info,
    maybe: CircleHelp,
};

export function Faq() {
    return (
        <div className="py-[clamp(4.5rem,3rem+6vw,8rem)]">
            <Container className="grid gap-10 lg:grid-cols-12">
                <SubsectionHeader className="max-w-[14ch] lg:col-span-4">
                    {faq.heading}
                </SubsectionHeader>

                <Accordion type="single" collapsible className="border-t lg:col-span-8">
                    {faq.visible.map((item, index) => {
                        const Icon = toneIcons[item.tone];
                        return (
                            <AccordionItem
                                key={item.question}
                                value={`item-${index}`}
                                className="border-b"
                            >
                                <AccordionTrigger className="font-kanit py-6 text-left text-[clamp(1.25rem,1.1rem+0.5vw,1.5rem)] leading-snug font-bold hover:no-underline **:data-[slot=accordion-trigger-icon]:mt-1.5 **:data-[slot=accordion-trigger-icon]:size-5">
                                    {item.question}
                                </AccordionTrigger>
                                {/*
                                    forceMount keeps the answer in the DOM while collapsed.
                                    Without it the answers exist only in the RSC payload, so
                                    they are absent from the static HTML.
                                */}
                                <AccordionContent forceMount>
                                    <p className="text-muted-foreground flex max-w-[62ch] items-start gap-3 pb-4 text-base leading-relaxed">
                                        <Icon
                                            className={
                                                item.tone === 'no'
                                                    ? 'text-destructive mt-1 size-4 shrink-0'
                                                    : 'text-primary mt-1 size-4 shrink-0'
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
            </Container>
        </div>
    );
}
