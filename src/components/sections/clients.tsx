import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

import { Container, SubsectionHeader } from '@/components/section-header';
import { clients } from '@/content';
import { logos } from '@/lib/logos';
import { cn } from '@/lib/utils';

/**
 * Named clients as a ledger, not a card grid: one row per engagement, logo on a fixed
 * white plate (several logos are dark-on-transparent and vanish in dark mode without it),
 * what was built, and where to see it. Rows read like line items on an invoice, which
 * suits a page whose argument is "real work, plainly stated".
 */
export function Clients() {
    return (
        <div className="pb-section">
            <Container>
                <SubsectionHeader>{clients.heading}</SubsectionHeader>

                <ul className="mt-10 border-b">
                    {clients.items.map((item) => (
                        <li
                            key={item.body}
                            className="grid gap-5 border-t py-8 md:grid-cols-[12rem_1fr] md:items-center md:gap-x-10 md:gap-y-4 lg:grid-cols-[16rem_1fr_12rem]"
                        >
                            <div
                                className={cn(
                                    'flex h-24 items-center justify-center gap-6 rounded-lg border px-6',
                                    item.logos.some((logo) => 'inverse' in logo && logo.inverse)
                                        ? 'bg-plate-inverse'
                                        : 'bg-plate'
                                )}
                            >
                                {item.logos.map((logo) => (
                                    <Image
                                        key={logo.file}
                                        src={logos[logo.file]}
                                        alt={logo.alt}
                                        className="h-14 w-auto max-w-[80%] object-contain"
                                    />
                                ))}
                            </div>

                            <p className="text-muted-foreground max-w-prose">{item.body}</p>

                            <div className="flex flex-col gap-1.5 md:col-start-2 md:flex-row md:gap-6 lg:col-start-auto lg:flex-col lg:items-end lg:gap-1.5">
                                {item.links.map((link) => (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="decoration-foreground/30 hover:text-primary hover:decoration-primary group inline-flex items-center gap-1 font-semibold underline decoration-2 transition-[color,text-decoration-color] duration-200"
                                    >
                                        {link.label}
                                        <ArrowUpRight
                                            className="text-primary size-4 transition-transform duration-300 ease-(--ease-out-expo) group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                            aria-hidden
                                        />
                                    </a>
                                ))}
                            </div>
                        </li>
                    ))}
                </ul>
            </Container>
        </div>
    );
}
