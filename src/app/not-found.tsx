import Link from 'next/link';

import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { nav } from '@/content';

/**
 * Builds to `out/404.html`; Apache serves it via `ErrorDocument 404 /404.html` (Task 12).
 *
 * The one line of copy here is new to the site — the old Jigsaw build had no 404 page at
 * all — and is the single exception the copy freeze allows (plan.md Task 11).
 *
 * It sits outside the (site) route group, so it brings the header and footer itself.
 */
export default function NotFound() {
    return (
        <>
            <SiteHeader />
            <main className="mx-auto flex max-w-3xl grow flex-col items-center px-4 py-32 text-center sm:px-6 lg:px-8">
                <p className="font-kanit text-6xl">404</p>

                <p className="text-muted-foreground mt-4">This page could not be found.</p>

                {/* A real route navigation, unlike the in-page `#anchor` links elsewhere. */}
                <Link href="/" className="mt-8 font-semibold hover:underline">
                    {nav.items[0].label}
                </Link>
            </main>
            <SiteFooter />
        </>
    );
}
