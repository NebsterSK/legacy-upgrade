import Image from 'next/image';

import portrait from '@/assets/images/portrait.webp';
import { GithubIcon, LinkedinIcon } from '@/components/brand-icons';
import { Button } from '@/components/ui/button';
import { hero, links } from '@/content';

const socialIcons = {
    Linkedin: LinkedinIcon,
    Github: GithubIcon,
} as const;

const socialHrefs: Record<string, string> = {
    LinkedIn: links.linkedin,
    GitHub: links.github,
};

/** Ported from `source/index.blade.php:8-37`. */
export function Hero() {
    return (
        <div className="mx-auto flex max-w-7xl flex-col-reverse items-center gap-10 px-4 py-16 sm:px-6 md:flex-row md:gap-16 md:py-24 lg:px-8">
            <div className="text-center md:w-3/5 md:text-left">
                <h1 className="font-kanit text-4xl sm:text-5xl lg:text-6xl">{hero.name}</h1>

                <p className="text-muted-foreground mt-2 text-lg font-bold sm:text-xl">
                    {hero.tagline}
                </p>

                <p className="mt-5 flex justify-center gap-4 md:justify-start">
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
                                className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <Icon className="size-8" />
                            </a>
                        );
                    })}
                </p>

                <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row md:justify-start">
                    <Button asChild size="lg">
                        <a href={hero.ctas.primary.href}>{hero.ctas.primary.label}</a>
                    </Button>

                    <Button asChild size="lg" variant="outline">
                        <a href={hero.ctas.secondary.href}>{hero.ctas.secondary.label}</a>
                    </Button>
                </div>
            </div>

            <div className="md:w-2/5">
                <Image
                    src={portrait}
                    alt={hero.portraitAlt}
                    priority
                    className="size-48 rounded-full object-cover shadow sm:size-64 md:size-full md:rounded-2xl"
                />
            </div>
        </div>
    );
}
