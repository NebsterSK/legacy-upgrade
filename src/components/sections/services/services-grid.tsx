import { Container, SectionHeader } from '@/components/section-header';
import { services } from '@/content';
import { getIcon } from '@/lib/icons';

/**
 * Services as a spec sheet: the heading and the one paragraph of positioning hold the left
 * column while the nine offerings run down the right as a ruled list. A list is what this
 * is (nine short noun phrases), so it is set as one instead of nine identical cards.
 */
export function ServicesGrid() {
    return (
        <div className="bg-muted py-[clamp(4.5rem,3rem+6vw,8rem)]">
            <Container className="grid gap-12 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-5">
                    <div className="lg:sticky lg:top-28">
                        <SectionHeader>{services.heading}</SectionHeader>
                        <p className="text-muted-foreground mt-6 max-w-[46ch] text-lg leading-relaxed">
                            {services.intro}
                        </p>
                    </div>
                </div>

                <ul className="grid content-start sm:grid-cols-2 sm:gap-x-10 lg:col-span-7">
                    {services.items.map((item) => {
                        const Icon = getIcon(item.icon);
                        return (
                            <li
                                key={item.text}
                                className="border-foreground/15 flex items-center gap-4 border-b py-5"
                            >
                                <span className="bg-tint-1 text-tint-1-ink grid size-10 shrink-0 place-items-center rounded-(--radius)">
                                    <Icon className="size-5" strokeWidth={1.75} aria-hidden />
                                </span>
                                <span className="text-lg leading-snug font-semibold">{item.text}</span>
                            </li>
                        );
                    })}
                </ul>
            </Container>
        </div>
    );
}
