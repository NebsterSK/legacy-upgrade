import { Container, SubsectionHeader } from '@/components/section-header';
import { QuestionGlyph } from '@/components/upgrade-arrow';
import { faq } from '@/content';

/**
 * Ported from `source/index.blade.php:241-265` — the THREE visible questions only.
 * The five FAQPage questions are JSON-LD only and live in `faq.schema` (see Task 6).
 *
 * Always open, no accordion: three short answers don't need hiding, and the answers are
 * the punchline, so making people click for them cost more than it saved. Plain markup
 * also means the answers are in the static HTML without any forceMount workaround.
 */
export function Faq() {
    // overflow-clip, not overflow-hidden: hidden makes this div a scroll container, which
    // traps the sticky heading inside it. clip crops the glyph without that side effect.
    return (
        <div className="relative isolate overflow-clip py-[clamp(4.5rem,3rem+6vw,8rem)]">
            <QuestionGlyph className="text-tint-2 absolute bottom-[6%] -left-[10%] -z-10 w-[min(26rem,70vw)] md:-left-[2%]" />

            <Container className="grid gap-10 lg:grid-cols-12">
                {/* From lg up the heading sticks while the questions scroll past, like Services. */}
                <div className="lg:col-span-4">
                    <SubsectionHeader className="max-w-[14ch] lg:sticky lg:top-28">
                        {faq.heading}
                    </SubsectionHeader>
                </div>

                <dl className="border-t lg:col-span-8">
                    {faq.visible.map((item) => (
                        <div key={item.question} className="border-b py-6">
                            <dt className="font-kanit text-[clamp(1.25rem,1.1rem+0.5vw,1.5rem)] leading-snug font-bold">
                                {item.question}
                            </dt>
                            <dd className="text-muted-foreground mt-3 max-w-[62ch] leading-relaxed">
                                {item.answer}
                            </dd>
                        </div>
                    ))}
                </dl>
            </Container>
        </div>
    );
}
