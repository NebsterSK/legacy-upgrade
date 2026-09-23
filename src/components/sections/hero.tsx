import Image from 'next/image';

import portrait from '@/assets/images/portrait.webp';
import { GithubIcon, LinkedinIcon } from '@/components/brand-icons';
import { Container } from '@/components/section-header';
import { UpgradeArrow } from '@/components/upgrade-arrow';
import { hero, links } from '@/content';

const socialIcons = {
    Linkedin: LinkedinIcon,
    Github: GithubIcon,
} as const;

const socialHrefs: Record<string, string> = {
    LinkedIn: links.linkedin,
    GitHub: links.github,
};

/**
 * The hero is the logo square, blown up to full width: brand blue drench, the up-arrow
 * pushing up from below the fold, the name set big in Kanit. This is the page's one
 * orchestrated entrance (`rise` / `lift` in globals.css).
 */
export function Hero() {
    return (
        <div className="bg-brand text-brand-foreground relative isolate overflow-hidden">
            <UpgradeArrow className="lift text-brand-line absolute -right-[12%] -bottom-[38%] -z-10 w-[min(62rem,110vw)] opacity-60 md:-right-[6%]" />

            <Container className="grid items-end gap-12 pt-14 pb-16 md:grid-cols-12 md:gap-8 md:pt-24 md:pb-24">
                <div className="md:col-span-7">
                    <h1
                        className="font-kanit rise text-[clamp(3.25rem,1.9rem+6vw,6rem)] leading-[0.92] font-bold tracking-[-0.03em]"
                        style={{ '--i': 0 } as React.CSSProperties}
                    >
                        {hero.name}
                    </h1>

                    <p
                        className="rise text-brand-muted-foreground mt-6 max-w-[26ch] text-[clamp(1.25rem,1.05rem+0.9vw,1.75rem)] leading-snug font-medium"
                        style={{ '--i': 1 } as React.CSSProperties}
                    >
                        {hero.tagline}
                    </p>

                    <div
                        className="rise mt-10 flex flex-wrap items-center gap-3"
                        style={{ '--i': 2 } as React.CSSProperties}
                    >
                        <a
                            href={hero.ctas.primary.href}
                            className="bg-brand-foreground text-brand focus-visible:ring-brand-foreground focus-visible:ring-offset-brand inline-flex h-13 items-center rounded-(--radius) px-7 text-base font-bold transition-transform duration-200 outline-none hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-offset-2"
                        >
                            {hero.ctas.primary.label}
                        </a>
                        <a
                            href={hero.ctas.secondary.href}
                            className="border-brand-foreground/70 hover:border-brand-foreground focus-visible:ring-brand-foreground focus-visible:ring-offset-brand inline-flex h-13 items-center rounded-(--radius) border-2 px-7 text-base font-bold transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                        >
                            {hero.ctas.secondary.label}
                        </a>

                        <span className="bg-brand-line mx-2 hidden h-8 w-px sm:block" aria-hidden />

                        <span className="flex w-full gap-1 sm:w-auto">
                            {hero.social.map((item) => {
                                const Icon = socialIcons[item.icon as keyof typeof socialIcons];
                                return (
                                    <a
                                        key={item.label}
                                        href={socialHrefs[item.label]}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title={item.label}
                                        aria-label={item.label}
                                        className="text-brand-muted-foreground hover:text-brand-foreground focus-visible:ring-brand-foreground inline-flex size-11 items-center first:-ml-2.5 sm:first:ml-0 justify-center rounded-(--radius) transition-colors outline-none focus-visible:ring-2"
                                    >
                                        <Icon className="size-6" />
                                    </a>
                                );
                            })}
                        </span>
                    </div>
                </div>

                <div
                    className="rise mx-auto w-full max-w-xs sm:max-w-sm md:col-span-5 md:mr-0 md:max-w-md"
                    style={{ '--i': 3 } as React.CSSProperties}
                >
                    <div className="bg-brand-foreground rounded-(--radius) p-2 shadow-2xl">
                        <Image
                            src={portrait}
                            alt={hero.portraitAlt}
                            priority
                            sizes="(min-width: 768px) 28rem, 24rem"
                            className="aspect-[5/5.4] w-full rounded-[calc(var(--radius)-2px)] object-cover"
                        />
                    </div>
                </div>
            </Container>
        </div>
    );
}
