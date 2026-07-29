/**
 * Deploy-readiness gate. Run this AFTER `npm run build` and BEFORE uploading `out/`.
 *
 *   npm run verify:deploy
 *
 * The host has no server-side environment, so everything URL-shaped is baked in at build
 * time. The failure this exists to prevent: building with a dev `NEXT_PUBLIC_SITE_URL`
 * still in scope and shipping canonical / og:url / sitemap pointing at
 * legacy-upgrade.test. That is invisible in the browser and quietly wrecks SEO.
 */

import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'out');

const EXPECTED_ORIGIN = 'https://legacy-upgrade.com';

const failures = [];
const ok = [];

const check = (label, condition, detail = '') => {
    if (condition) ok.push(label);
    else failures.push(`${label}${detail ? ` — ${detail}` : ''}`);
};

/* Required files ---------------------------------------------------------- */

const REQUIRED = [
    'index.html',
    '404.html',
    '.htaccess',
    'robots.txt',
    'sitemap.xml',
    'icon.png',
    'opengraph-image.jpg',
    'twitter-image.jpg',
];

for (const file of REQUIRED) {
    let exists = false;
    try {
        exists = (await stat(path.join(out, file))).isFile();
    } catch {
        exists = false;
    }
    check(`out/${file} present`, exists);
}

/* Baked-in origins -------------------------------------------------------- */

const html = await readFile(path.join(out, 'index.html'), 'utf8').catch(() => '');
const sitemap = await readFile(path.join(out, 'sitemap.xml'), 'utf8').catch(() => '');
const robots = await readFile(path.join(out, 'robots.txt'), 'utf8').catch(() => '');
const htaccess = await readFile(path.join(out, '.htaccess'), 'utf8').catch(() => '');

const wrongOrigin = /https:\/\/legacy-upgrade\.test/;

check('index.html has no dev origin', !wrongOrigin.test(html));
check('sitemap.xml has no dev origin', !wrongOrigin.test(sitemap));
check('robots.txt has no dev origin', !wrongOrigin.test(robots));

const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
check(`canonical is ${EXPECTED_ORIGIN}`, canonical === EXPECTED_ORIGIN, `got ${canonical}`);

const ogUrl = html.match(/<meta property="og:url" content="([^"]+)"/)?.[1];
check(`og:url is ${EXPECTED_ORIGIN}`, ogUrl === EXPECTED_ORIGIN, `got ${ogUrl}`);

check('og:image is absolute', /<meta property="og:image" content="https:\/\//.test(html));
check(`sitemap <loc> is ${EXPECTED_ORIGIN}/`, sitemap.includes(`<loc>${EXPECTED_ORIGIN}/</loc>`));
check('robots.txt points at the sitemap', robots.includes(`${EXPECTED_ORIGIN}/sitemap.xml`));

/* Server config ----------------------------------------------------------- */

check('.htaccess sets ErrorDocument 404', /ErrorDocument\s+404\s+\/404\.html/.test(htaccess));
check('.htaccess caches HTML briefly', /max-age=300/.test(htaccess));
check('.htaccess caches assets immutably', /max-age=31536000, immutable/.test(htaccess));

/* Content ----------------------------------------------------------------- */

check('both JSON-LD blocks present', (html.match(/application\/ld\+json/g) ?? []).length >= 2);
check('all four sections present', ['home', 'services', 'technology', 'contact'].every((id) => html.includes(`id="${id}"`)));
check('footer year is NOT baked in', !/©\s*<\/?[^>]*>?\s*20\d\d/.test(html));

/* Report ------------------------------------------------------------------ */

console.log('');
for (const label of ok) console.log(`  ok    ${label}`);
for (const label of failures) console.log(`  FAIL  ${label}`);
console.log('');

if (failures.length) {
    console.log(`${failures.length} check(s) failed — do NOT upload out/\n`);
    process.exit(1);
}

console.log(`${ok.length} checks passed — out/ is ready to upload\n`);
