import { Container, SubsectionHeader } from '@/components/section-header';
import { QuestionGlyph } from '@/components/upgrade-arrow';
import { faq } from '@/content';
import { PARALLAX_DRIFT } from '@/lib/parallax';

/**
 * The three original questions from `source/index.blade.php:241-265`, now preceded by the
 * four a prospect actually asks. This list is also the FAQPage JSON-LD — one set, so the
 * markup never claims copy the page does not show.
 *
 * Always open, no accordion: the answers are the punchline, so making people click for
 * them cost more than it saved. Plain markup also means every answer is in the static
 * HTML without any forceMount workaround — which is the whole point, since this list is
 * also the FAQPage structured data.
 */
export function Faq() {
    // overflow-clip, not overflow-hidden: hidden makes this div a scroll container, which
    // traps the sticky heading inside it. clip crops the glyph without that side effect.
    return (
        <div className="parallax-scope relative isolate overflow-clip py-section">
            <QuestionGlyph
                className="parallax text-tint-2 absolute bottom-[16%] -left-[10%] -z-10 w-[min(26rem,70vw)] md:-left-[2%]"
                style={PARALLAX_DRIFT}
            />

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
                            <dt className="font-kanit text-h4 font-bold">
                                {item.question}
                            </dt>
                            <dd className="text-muted-foreground mt-3 max-w-prose leading-relaxed">
                                {item.answer}
                            </dd>
                        </div>
                    ))}
                </dl>
            </Container>
        </div>
    );
}
