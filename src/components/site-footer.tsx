import { ArrowUpRight } from 'lucide-react';

import { CurrentYear } from '@/components/current-year';
import { Container } from '@/components/section-header';
import { UpgradeMark } from '@/components/upgrade-arrow';
import { footer } from '@/content';

/**
 * Continues the contact finale on the darker plate colour, so the page ends in one block
 * of blue instead of dropping back to a grey utility strip. The logo square doubles as
 * the back-to-top link it always was.
 */
export function SiteFooter() {
    return (
        <footer className="bg-deep-plate text-deep-foreground">
            <Container className="flex flex-col gap-8 py-10 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-deep-muted-foreground text-sm font-semibold">
                        {footer.social.heading}
                    </p>
                    <ul className="mt-2 flex gap-6">
                        {footer.social.items.map((item) => (
                            <li key={item.href}>
                                <a
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="focus-visible:ring-deep-foreground inline-flex items-center gap-1 rounded-sm font-semibold underline-offset-4 outline-none hover:underline focus-visible:ring-2"
                                >
                                    {item.label}
                                    <ArrowUpRight className="size-4" aria-hidden />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex items-center gap-4">
                    <p className="text-deep-muted-foreground text-sm">
                        <span className="font-kanit text-deep-foreground font-bold tracking-wide">
                            {footer.wordmark}
                        </span>{' '}
                        © <CurrentYear />
                    </p>
                    <a
                        href={footer.logoHref}
                        aria-label={footer.logoAlt}
                        className="group focus-visible:ring-deep-foreground rounded-[4px] outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-(--deep-plate)"
                    >
                        <UpgradeMark className="size-11 rounded-[4px] transition-transform duration-300 ease-(--ease-out-expo) group-hover:-translate-y-1" />
                    </a>
                </div>
            </Container>
        </footer>
    );
}
