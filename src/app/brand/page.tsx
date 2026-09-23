import type { Metadata } from 'next';

import { Globe, Mail, Phone } from 'lucide-react';

import { UpgradeArrow } from '@/components/upgrade-arrow';
import { brand, company, footer, hero, nav, site } from '@/content';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
    title: brand.pageTitle,
    alternates: { canonical: '/brand' },
    // An internal asset sheet, not a page for search results.
    robots: { index: false, follow: false },
};

const domain = site.url.replace(/^https?:\/\//, '');

/*
 * The brand system these assets are built from, all on the site's own tokens:
 * the logo square (slate blue, white up-arrow) and the owner's own LinkedIn cover layout,
 * redrawn in the new palette.
 *
 * The page is wrapped in `.theme-light`, so screenshots come out in the light brand
 * colours even when the browser is in dark mode.
 */

function Frame({
    label,
    size,
    width,
    height,
    note,
    children,
}: {
    label: string;
    size: string;
    width: number;
    height: number;
    note: string;
    children: React.ReactNode;
}) {
    return (
        <section className="space-y-4">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <h2 className="font-kanit text-2xl font-bold">{label}</h2>
                <p className="text-muted-foreground tabular-nums">{size}</p>
                <p className="text-muted-foreground basis-full text-sm">{note}</p>
            </div>
            {/* Wide frames scroll sideways rather than scaling, so a screenshot stays 1:1. */}
            <div className="overflow-x-auto pb-2">
                <div data-asset={label} className="relative shrink-0 overflow-hidden" style={{ width, height }}>
                    {children}
                </div>
            </div>
        </section>
    );
}

function Lockup({ dark }: { dark?: boolean }) {
    return (
        <div
            className={cn(
                'flex size-full items-center justify-center gap-10',
                dark ? 'bg-deep text-deep-foreground' : 'bg-plate text-foreground'
            )}
        >
            <span className="bg-brand text-brand-foreground grid size-36 place-items-center rounded-[16px]">
                <UpgradeArrow className="size-[62%]" />
            </span>
            <span className="font-kanit text-[4.25rem] leading-none font-bold tracking-[0.04em]">
                {footer.wordmark}
            </span>
        </div>
    );
}

/**
 * The owner's existing LinkedIn cover, redrawn: white ground, right-aligned name,
 * tagline, a short plum rule and the contact row, with the right-edge colour bar split
 * into the three brand colours. The old grey code-symbol texture is replaced by one faint
 * logo arrow, cropped at bottom-left behind where the profile photo sits.
 *
 * One layout, two scales. Facebook is taller, so everything is set larger, and the text
 * ends 280px in from the right: phones crop a Facebook cover's sides to roughly the
 * middle 1110px.
 */
const COVER = {
    linkedin: {
        right: 'right-[92px]',
        arrow: 'w-[560px] -bottom-[38%] -left-[4%]',
        name: 'text-[5rem]',
        tagline: 'mt-5 text-[1.75rem]',
        rule: 'mt-6 w-24',
        row: 'mt-6 gap-10 text-xl',
        icon: 'size-5',
    },
    facebook: {
        right: 'right-[280px]',
        arrow: 'w-[560px] -bottom-[40%] -left-[6%]',
        name: 'text-[6.5rem]',
        tagline: 'mt-6 text-[2.25rem]',
        rule: 'mt-8 w-32',
        row: 'mt-8 gap-12 text-[1.625rem]',
        icon: 'size-6',
    },
} as const;

function SocialCover({ size }: { size: keyof typeof COVER }) {
    const c = COVER[size];
    return (
        <div className="bg-plate relative size-full">
            <UpgradeArrow className={cn('text-muted absolute', c.arrow)} />

            <div className="absolute inset-y-0 right-0 flex w-4 flex-col">
                <span className="bg-brand grow" />
                <span className="bg-second grow" />
                <span className="bg-deep grow" />
            </div>

            <div
                className={cn(
                    'absolute top-1/2 flex -translate-y-1/2 flex-col items-end text-right',
                    c.right
                )}
            >
                <p className={cn('font-kanit text-primary leading-none', c.name)}>{nav.brand}</p>
                <p className={cn('text-muted-foreground leading-snug', c.tagline)}>{hero.tagline}</p>
                <span aria-hidden className={cn('bg-second h-[3px]', c.rule)} />
                <p className={cn('text-muted-foreground flex items-center', c.row)}>
                    <span className="flex items-center gap-2.5">
                        <Globe className={cn('text-primary', c.icon)} aria-hidden />
                        {domain}
                    </span>
                    <span className="flex items-center gap-2.5 tabular-nums">
                        <Phone className={cn('text-primary', c.icon)} aria-hidden />
                        {company.contact.phone}
                    </span>
                    <span className="flex items-center gap-2.5">
                        <Mail className={cn('text-primary', c.icon)} aria-hidden />
                        {company.contact.email}
                    </span>
                </p>
            </div>
        </div>
    );
}

export default function BrandPage() {
    const { assets } = brand;

    return (
        <main className="theme-light bg-muted text-foreground grow">
            <div className="mx-auto max-w-[1720px] space-y-16 px-6 py-14 md:px-10">
                <header className="max-w-2xl space-y-3">
                    <h1 className="font-kanit text-5xl font-bold tracking-[-0.02em]">{brand.pageTitle}</h1>
                    <p className="text-muted-foreground text-lg leading-relaxed">{brand.intro}</p>
                </header>

                <div className="flex flex-wrap gap-12">
                    <Frame {...assets.mark}>
                        <div className="bg-brand text-brand-foreground grid size-full place-items-center rounded-[56px]">
                            <UpgradeArrow className="size-[62%]" />
                        </div>
                    </Frame>

                    <Frame {...assets.avatar}>
                        <div className="bg-brand text-brand-foreground grid size-full place-items-center">
                            <UpgradeArrow className="size-[52%]" />
                        </div>
                    </Frame>
                </div>

                <div className="flex flex-wrap gap-12">
                    <Frame {...assets.lockupLight}>
                        <Lockup />
                    </Frame>
                    <Frame {...assets.lockupDark}>
                        <Lockup dark />
                    </Frame>
                </div>

                <Frame {...assets.linkedin}>
                    <SocialCover size="linkedin" />
                </Frame>

                <Frame {...assets.facebook}>
                    <SocialCover size="facebook" />
                </Frame>
            </div>
        </main>
    );
}
