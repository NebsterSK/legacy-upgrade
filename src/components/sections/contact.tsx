import { ArrowUpRight } from 'lucide-react';

import { ContentIcon } from '@/components/content-icon';
import { Container, SectionHeader } from '@/components/section-header';
import { UpgradeArrow } from '@/components/upgrade-arrow';
import { contact } from '@/content';

/**
 * The finale, and the bookend to the hero: the page closes on the same blue drench it
 * opened with. The email address is the single biggest piece of type on the page after
 * the name, because sending one is the whole point of the site. Phone and messengers
 * follow as secondary actions; address and company details sit on a darker plate as the
 * paperwork they are.
 */
export function Contact() {
    const [primary, ...secondary] = contact.person.methods;

    return (
        <section
            id="contact"
            className="bg-brand text-brand-foreground relative isolate overflow-hidden"
        >
            <UpgradeArrow className="text-brand-line absolute top-[6%] -right-[14%] -z-10 hidden w-[min(40rem,50vw)] opacity-50 lg:block" />

            <Container className="py-[clamp(4.5rem,3rem+6vw,8rem)]">
                <SectionHeader>{contact.heading}</SectionHeader>

                <p className="text-brand-muted-foreground mt-6 max-w-[52ch] text-xl leading-relaxed">
                    {contact.intro}
                </p>

                <div className="mt-14">
                    <p className="flex items-center gap-2 font-semibold">
                        <ContentIcon name={contact.person.icon} className="size-5" />
                        {contact.person.name}
                    </p>

                    <a
                        href={primary.href}
                        className="font-kanit decoration-brand-line hover:decoration-brand-foreground focus-visible:ring-brand-foreground mt-3 inline-flex max-w-full items-center gap-3 rounded-sm text-[clamp(1.25rem,0.5rem+4vw,4rem)] leading-tight font-bold tracking-[-0.02em] underline decoration-[3px] underline-offset-[0.18em] transition-colors outline-none focus-visible:ring-2"
                    >
                        <ContentIcon name={primary.icon} className="hidden size-[0.75em] shrink-0 sm:block" />
                        {primary.label}
                    </a>

                    <div className="mt-8 flex flex-wrap gap-3">
                        {secondary.map((method) => (
                            <a
                                key={method.href}
                                href={method.href}
                                {...(method.external
                                    ? { target: '_blank', rel: 'noopener noreferrer' }
                                    : {})}
                                className="bg-brand-deep hover:bg-brand-foreground hover:text-brand focus-visible:ring-brand-foreground inline-flex h-12 items-center gap-2.5 rounded-(--radius) px-5 font-semibold transition-colors outline-none focus-visible:ring-2"
                            >
                                <ContentIcon name={method.icon} className="size-4 shrink-0" />
                                {method.label}
                                {method.external && (
                                    <ArrowUpRight className="size-4 opacity-70" aria-hidden />
                                )}
                            </a>
                        ))}
                    </div>
                </div>

                <div className="bg-brand-deep mt-16 grid gap-10 rounded-(--radius) p-8 sm:p-10 md:grid-cols-[1fr_2fr]">
                    <div>
                        <p className="flex items-center gap-2 font-bold">
                            <ContentIcon name={contact.address.icon} className="size-4" />
                            {contact.address.heading}
                        </p>
                        <address className="text-brand-muted-foreground mt-3 leading-relaxed not-italic">
                            {contact.address.lines.map((line) => (
                                <span key={line} className="block">
                                    {line}
                                </span>
                            ))}
                        </address>
                    </div>

                    <div>
                        <p className="flex items-center gap-2 font-bold">
                            <ContentIcon name={contact.details.icon} className="size-4" />
                            {contact.details.heading}
                        </p>
                        <dl className="mt-3 grid gap-x-8 gap-y-4 sm:grid-cols-3">
                            {contact.details.fields.map((field) => (
                                <div key={field.label}>
                                    <dt className="text-brand-muted-foreground text-sm">
                                        {field.label}
                                    </dt>
                                    <dd className="mt-0.5 font-semibold tabular-nums">
                                        {field.value}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </Container>
        </section>
    );
}
