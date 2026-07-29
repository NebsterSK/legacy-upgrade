import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { Analytics } from '@/components/analytics';
import { JsonLd } from '@/components/json-ld';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { ThemeProvider } from '@/components/theme-provider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { site } from '@/content';
import { faqPageSchema, professionalServiceSchema } from '@/lib/jsonld';

import './globals.css';

/**
 * Self-hosted Kanit — the same two woff2 files the Jigsaw build shipped.
 * Deliberately NOT next/font/google: no build-time fetch, no third-party request
 * at runtime. Exposed as --font-kanit, wired to Tailwind in globals.css.
 */
const kanit = localFont({
    src: [
        { path: '../assets/fonts/Kanit-Regular.woff2', weight: '400', style: 'normal' },
        { path: '../assets/fonts/Kanit-Bold.woff2', weight: '700', style: 'normal' },
    ],
    variable: '--font-kanit',
    display: 'swap',
});

/**
 * Ported from `source/_layouts/main.blade.php` + `_includes/og.blade.php` +
 * `_includes/twitter.blade.php`. Strings come from `src/content/site.ts` verbatim.
 *
 * og:image / twitter:image are supplied by the `src/app/opengraph-image.jpg` and
 * `twitter-image.jpg` file conventions (with their `.alt.txt` siblings) — not declared
 * here, or they would override the hashed, dimension-annotated versions.
 */
export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? site.url),
    title: {
        default: `${site.pageTitle} | ${site.name}`,
        template: site.titleTemplate,
    },
    description: site.pageDescription,
    alternates: {
        canonical: '/',
    },
    openGraph: {
        type: 'website',
        locale: site.ogLocale,
        siteName: site.name,
        title: `${site.pageTitle} | ${site.name}`,
        description: site.pageDescription,
        url: '/',
    },
    twitter: {
        card: 'summary_large_image',
        title: `${site.pageTitle} | ${site.name}`,
        description: site.pageDescription,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={kanit.variable} suppressHydrationWarning>
            <body className="flex min-h-screen flex-col">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <TooltipProvider>
                        <SiteHeader />

                        <main className="grow">{children}</main>

                        <SiteFooter />
                    </TooltipProvider>
                </ThemeProvider>

                <JsonLd data={professionalServiceSchema()} />
                <JsonLd data={faqPageSchema()} />

                <Analytics />
            </body>
        </html>
    );
}
