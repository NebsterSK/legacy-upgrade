/**
 * Rendered-copy check: asserts strings from `src/content/` actually reach the built HTML.
 *
 *   node scripts/verify-rendered.mjs [module ...]
 *
 * With no arguments it reports every content string missing from `out/index.html`, which
 * while the port is in progress means "sections not built yet". Pass module names to gate
 * on just those, e.g.:
 *
 *   node scripts/verify-rendered.mjs hero about clients
 *
 * Exits non-zero only if a requested module has a miss. Complements
 * scripts/verify-copy.mjs, which checks content against the legacy Blade source; this one
 * checks content against the output.
 */

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const requested = process.argv.slice(2);

/** Content that is not page text: icon names, URLs, JSON-LD-only vocabulary, config. */
const NOT_RENDERED = [
    /^https?:\/\//,
    /^(mailto|tel):/,
    /^[a-z0-9_-]+\.(svg|png|webp|jpe?g|avif)$/i,
    // lucide icon names
    /^(SquareTerminal|LayoutDashboard|Link|Bot|Workflow|RefreshCw|Gauge|Scissors|Hammer|MessageCircle|ClipboardList|MonitorPlay|Code|Presentation|RotateCcw|Clock|Check|User|Mail|Phone|MessageSquare|MapPin|Building2|Linkedin|Github)$/,
    /^(website|en_US|summary_large_image|G-BECNN06810|%s \| Legacy Upgrade)$/,
    /^https:\/\/legacy-upgrade\.com$/,
    // Only rendered once dark mode is active, i.e. never in the prerendered HTML.
    /^Light$/,
];

const skip = (s) => NOT_RENDERED.some((re) => re.test(s)) || s.length < 3;

const isBoldRun = (v) => v && typeof v === 'object' && typeof v.bold === 'string';

function collect(node, out) {
    if (typeof node === 'string') {
        out.add(node);
        return;
    }
    if (Array.isArray(node)) {
        if (node.length && node.every((v) => typeof v === 'string' || isBoldRun(v))) {
            out.add(node.map((v) => (typeof v === 'string' ? v : v.bold)).join(''));
        }
        node.forEach((v) => collect(v, out));
        return;
    }
    if (node && typeof node === 'object') {
        Object.values(node).forEach((v) => collect(v, out));
    }
}

const MODULES = {
    site: 'site',
    company: 'company',
    nav: 'nav',
    hero: 'hero',
    about: 'about',
    clients: 'clients',
    services: 'services',
    process: 'process',
    pricing: 'pricing',
    faq: 'faq',
    technology: 'technology',
    contact: 'contact',
    footer: 'footer',
};

const content = await import('../src/content/index.ts');

const decode = (s) =>
    s
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#x27;|&#39;/g, "'")
        .replace(/&nbsp;/g, ' ')
        .replace(/\\u([0-9a-fA-F]{4})/g, (_, h) => String.fromCharCode(parseInt(h, 16)));

const raw = decode(await readFile(path.join(root, 'out/index.html'), 'utf8'));

/** Attributes (alt, title, aria-label) only exist in the raw markup. */
const htmlRaw = raw.replace(/\s+/g, ' ');

/**
 * Text spanning inline elements — e.g. a sentence wrapped around `<strong>` — is not a
 * contiguous substring of the markup, so also check a tag-stripped copy.
 */
const htmlText = raw.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ');

const present = (s) => htmlRaw.includes(s) || htmlText.includes(s);

const norm = (s) => s.replace(/\s+/g, ' ').trim();

const report = {};
for (const [name, key] of Object.entries(MODULES)) {
    const value = content[key];
    if (value === undefined) continue;
    const strings = new Set();
    collect(value, strings);
    const misses = [...strings].map(norm).filter((s) => !skip(s) && !present(s));
    report[name] = { total: strings.size, misses };
}

let failed = false;
console.log('');
for (const [name, { total, misses }] of Object.entries(report)) {
    const gated = requested.length === 0 || requested.includes(name);
    const status = misses.length === 0 ? 'OK  ' : gated ? 'FAIL' : 'todo';
    if (misses.length && gated) failed = true;
    console.log(`${status} ${name.padEnd(12)} ${total - misses.length}/${total} rendered`);
    if (misses.length && gated) {
        for (const m of misses) console.log(`       missing: ${JSON.stringify(m)}`);
    }
}
console.log('');

if (failed) process.exit(1);
