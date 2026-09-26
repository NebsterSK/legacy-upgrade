import Image from 'next/image';

import portrait from '@/assets/images/portrait.webp';
import { GithubIcon, LinkedinIcon } from '@/components/brand-icons';
import { Container } from '@/components/section-header';
import { UpgradeArrow } from '@/components/upgrade-arrow';
import { hero, links } from '@/content';
import { cta } from '@/lib/cta';
import { PARALLAX_HERO } from '@/lib/parallax';

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
 * pushing up from below the fold, the name set big in Kanit. The text and buttons are
 * static (owner's call: the staggered text entrance was too much); only the portrait
 * rises and the arrow lifts on load (`rise` / `lift` in globals.css).
 */
export function Hero() {
    return (
        <div className="parallax-scope bg-brand text-brand-foreground relative isolate overflow-hidden">
            {/* Parallax on the wrapper, the load-time lift on the arrow: two animations, two elements. */}
            <div
                aria-hidden
                className="parallax absolute -right-[12%] -bottom-[38%] -z-10 w-[min(62rem,110vw)] md:-right-[6%]"
                style={PARALLAX_HERO}
            >
                <UpgradeArrow className="lift text-brand-line w-full opacity-60" />
            </div>

            <Container className="grid items-end gap-12 pt-14 pb-16 md:grid-cols-12 md:gap-8 md:pt-24 md:pb-24">
                <div className="md:col-span-7">
                    <h1
                        className="font-kanit text-display font-bold"
                    >
                        {hero.name}
                    </h1>

                    <p className="text-brand-muted-foreground mt-6 max-w-[40ch] text-lead font-medium">
                        {hero.tagline}
                    </p>

                    <div
                        className="mt-10 flex flex-wrap items-center gap-3"
                    >
                        <a
                            href={hero.ctas.primary.href}
                            className={cta.solidOnBrand}
                        >
                            {hero.ctas.primary.label}
                        </a>
                        <a
                            href={hero.ctas.secondary.href}
                            className={cta.outlineOnBrand}
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
                                        className="text-brand-muted-foreground hover:text-brand-foreground hover:bg-brand-deep focus-visible:ring-brand-foreground inline-flex size-11 items-center first:-ml-2.5 sm:first:ml-0 justify-center rounded-lg transition-colors outline-none focus-visible:ring-2"
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
                    <div className="bg-brand-foreground rounded-lg p-2 shadow-2xl">
                        <Image
                            src={portrait}
                            alt={hero.portraitAlt}
                            priority
                            sizes="(min-width: 768px) 28rem, 24rem"
                            className="aspect-[5/5.4] w-full rounded-sm object-cover"
                        />
                    </div>
                </div>
            </Container>
        </div>
    );
}
