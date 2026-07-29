import type { Metadata } from 'next';
import localFont from 'next/font/local';
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

export const metadata: Metadata = {
    /** Absolute URLs for OG/Twitter images require this. Full metadata lands in Task 6. */
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://legacy-upgrade.com'),
    title: 'Legacy Upgrade',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={kanit.variable}>
            <body>{children}</body>
        </html>
    );
}
