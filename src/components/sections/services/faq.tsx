import { Container, SubsectionHeader } from '@/components/section-header';
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
    return (
        <div className="py-[clamp(4.5rem,3rem+6vw,8rem)]">
            <Container className="grid gap-10 lg:grid-cols-12">
                <SubsectionHeader className="max-w-[14ch] lg:col-span-4">
                    {faq.heading}
                </SubsectionHeader>

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
