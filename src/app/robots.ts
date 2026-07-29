import type { MetadataRoute } from 'next';

import { site } from '@/content';

/**
 * Replaces the static `source/robots.txt`. Pre-renders to `out/robots.txt`.
 *
 * `dynamic = 'force-static'` is REQUIRED under `output: 'export'` — without it the build
 * fails with "export const dynamic = force-static ... not configured on route".
 */
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
            },
        ],
        sitemap: `${site.url}/sitemap.xml`,
    };
}
