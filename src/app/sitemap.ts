import type { MetadataRoute } from 'next';

import { site } from '@/content';

/**
 * Replaces the static `source/sitemap.xml`. Pre-renders to `out/sitemap.xml` under
 * `output: 'export'`. Single-page site, so a single URL.
 *
 * `lastModified` is a hardcoded date, not the build time, on purpose: a sitemap `lastmod`
 * should track when the *content* last changed, not when the site was last deployed.
 * Bump it when the copy actually changes. Carried over from the old sitemap unchanged,
 * since this refactor does not alter a single string of copy.
 */
const CONTENT_LAST_MODIFIED = '2026-04-19';

/** Required under `output: 'export'`; the build fails without it. */
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: `${site.url}/`,
            lastModified: CONTENT_LAST_MODIFIED,
            changeFrequency: 'monthly',
            priority: 1.0,
        },
    ];
}
