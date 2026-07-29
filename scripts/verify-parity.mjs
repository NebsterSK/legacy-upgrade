/**
 * Old-vs-new parity check (plan.md Task 13).
 *
 *   node scripts/verify-parity.mjs
 *
 * Compares the freshly built Jigsaw output (`build_local/index.html`) against the Next
 * output (`out/index.html`) on two axes:
 *
 *   1. Visible text  — every word the user can read, normalized and diffed.
 *   2. Head metadata — title, description, canonical, OG, Twitter, JSON-LD.
 *
 * ALLOWED differences are declared explicitly below. Anything else is a regression.
 *
 * Delete this script at Task 14 along with `source/` — it has nothing to compare against
 * once the Jigsaw build is gone.
 */

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/* ------------------------------------------------------------------ *
 * Declared, intentional differences
 * ------------------------------------------------------------------ */

/** Text present in NEW but not OLD. */
const ALLOWED_ADDED = [
    '404', // not-found page copy, the one new string the plan permits
    'This page could not be found.',
    // The old nav had ONE theme toggle; the new header has a desktop and a mobile one, so
    // the active-theme label appears twice.
    'Dark',
];

/** Text present in OLD but not NEW. */
const ALLOWED_REMOVED = [
    // The footer year is client-rendered in both builds, but the OLD build emitted the
    // document.write() source into the HTML, so the literal script text shows up as "text".
    'document.write(new Date().getFullYear())',
    // The old toggle rendered BOTH labels and hid one with a `hidden` class. next-themes
    // renders only the active one, so the inactive label is legitimately absent.
    'Light',
    // Tech-stack and infrastructure logo labels. The old markup kept them as hover-revealed
    // <span> text in the DOM; the Radix Tooltip renders content only while open. The labels
    // are still in the output as `alt` attributes on every logo — verified — which is what
    // crawlers and screen readers actually read for an image.
    'Laravel Laravel Tailwind CSS Claude Inertia.js MySQL Vue.js Websupport Forge',
];

/** Metadata whose value is expected to differ, with the reason. */
const ALLOWED_META_DIFFS = {
    canonical:
        'Next normalizes away the trailing slash under trailingSlash:false; for a root URL an empty path is equivalent to "/" per RFC 3986',
    'og:url': 'same trailing-slash normalization as canonical',
    'og:image':
        'WebP re-encoded to JPEG — Next image file conventions do not accept .webp, and several scrapers do not render WebP previews',
    'twitter:image': 'same WebP to JPEG re-encode as og:image',
    'ld:image': 'ProfessionalService.image follows the same og:image re-encode',
};

/* ------------------------------------------------------------------ *
 * Extraction
 * ------------------------------------------------------------------ */

const decode = (s) =>
    s
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#x27;|&#39;/g, "'")
        .replace(/&#x2F;/g, '/')
        .replace(/&copy;/g, '©');

/** Visible text: strip scripts, styles, and tags. */
function visibleText(html) {
    return decode(
        html
            .replace(/<script[\s\S]*?<\/script>/gi, ' ')
            .replace(/<style[\s\S]*?<\/style>/gi, ' ')
            .replace(/<!--[\s\S]*?-->/g, ' ')
            .replace(/<[^>]*>/g, ' ')
    )
        .replace(/\s+/g, ' ')
        .trim();
}

/** Word-level multiset, so ordering noise from layout changes does not create false diffs. */
function words(text) {
    const map = new Map();
    for (const w of text.split(' ')) {
        if (!w) continue;
        map.set(w, (map.get(w) ?? 0) + 1);
    }
    return map;
}

function extractMeta(html) {
    const meta = {};
    meta.title = html.match(/<title>([\s\S]*?)<\/title>/)?.[1];
    meta.description = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
    meta.canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1];

    for (const m of html.matchAll(/<meta property="(og:[^"]+)" content="([^"]*)"/g)) {
        meta[m[1]] = m[2];
    }
    for (const m of html.matchAll(/<meta name="(twitter:[^"]+)" content="([^"]*)"/g)) {
        meta[m[1]] = m[2];
    }

    for (const m of html.matchAll(
        /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g
    )) {
        try {
            const parsed = JSON.parse(decode(m[1]).replace(/@@/g, '@'));
            meta[`ld:${parsed['@type']}`] = parsed;
        } catch (err) {
            meta[`ld:PARSE_ERROR`] = String(err);
        }
    }

    return meta;
}

/* ------------------------------------------------------------------ *
 * Run
 * ------------------------------------------------------------------ */

/**
 * Compare against the PRODUCTION Jigsaw build (`php vendor/bin/jigsaw build production`),
 * not `build_local`. The local build bakes in `https://legacy-upgrade.test` from
 * `config.php`, which makes every URL look like a regression when it is just the wrong
 * reference.
 */
const oldHtml = await readFile(path.join(root, 'build_production/index.html'), 'utf8');
const newHtml = await readFile(path.join(root, 'out/index.html'), 'utf8');

const oldText = visibleText(oldHtml);
const newText = visibleText(newHtml);
const oldWords = words(oldText);
const newWords = words(newText);

const allowedAddedWords = words(ALLOWED_ADDED.join(' '));
const allowedRemovedWords = words(ALLOWED_REMOVED.join(' '));

const removed = [];
const added = [];

for (const [w, n] of oldWords) {
    const diff = n - (newWords.get(w) ?? 0);
    if (diff > 0 && (allowedRemovedWords.get(w) ?? 0) < diff) removed.push(`${w} (x${diff})`);
}
for (const [w, n] of newWords) {
    const diff = n - (oldWords.get(w) ?? 0);
    if (diff > 0 && (allowedAddedWords.get(w) ?? 0) < diff) added.push(`${w} (x${diff})`);
}

console.log('\n=== 1. Visible text ===\n');
console.log(`  old: ${oldText.split(' ').length} words   new: ${newText.split(' ').length} words`);

if (removed.length === 0) {
    console.log('  ok    nothing from the old page is missing');
} else {
    console.log(`  FAIL  ${removed.length} word(s) present in OLD but not NEW:`);
    for (const w of removed) console.log(`          ${w}`);
}

if (added.length === 0) {
    console.log('  ok    no unexpected new text');
} else {
    console.log(`  note  ${added.length} word(s) present in NEW but not OLD:`);
    for (const w of added) console.log(`          ${w}`);
}

/* Metadata --------------------------------------------------------- */

console.log('\n=== 2. Head metadata ===\n');

const oldMeta = extractMeta(oldHtml);
const newMeta = extractMeta(newHtml);

const metaKeys = [...new Set([...Object.keys(oldMeta), ...Object.keys(newMeta)])].sort();
const metaFailures = [];

for (const key of metaKeys) {
    if (key.startsWith('ld:')) continue;
    const a = oldMeta[key];
    const b = newMeta[key];
    if (a === b) {
        console.log(`  ok    ${key}`);
    } else if (ALLOWED_META_DIFFS[key]) {
        console.log(`  allow ${key}`);
        console.log(`          old: ${a}`);
        console.log(`          new: ${b}`);
        console.log(`          why: ${ALLOWED_META_DIFFS[key]}`);
    } else if (a === undefined) {
        console.log(`  note  ${key} added — ${b}`);
    } else {
        metaFailures.push(key);
        console.log(`  FAIL  ${key}`);
        console.log(`          old: ${a}`);
        console.log(`          new: ${b}`);
    }
}

/* JSON-LD ---------------------------------------------------------- */

console.log('\n=== 3. JSON-LD ===\n');

const ldFailures = [];

for (const type of ['ProfessionalService', 'FAQPage']) {
    const a = oldMeta[`ld:${type}`];
    const b = newMeta[`ld:${type}`];
    if (!a || !b) {
        ldFailures.push(`${type} missing (old:${!!a} new:${!!b})`);
        console.log(`  FAIL  ${type} missing — old:${!!a} new:${!!b}`);
        continue;
    }

    // Compare with the known image re-encode neutralized.
    const strip = (o) => JSON.stringify(o, Object.keys(o).sort()).replace(/portrait\.webp|opengraph-image\.jpg/g, 'IMAGE');
    const norm = (o) =>
        JSON.stringify(o, (k, v) =>
            typeof v === 'string'
                ? v.replace(/\/assets\/build\/images\/portrait\.webp|\/opengraph-image\.jpg/, '/IMAGE')
                : v
        );

    void strip;

    if (norm(a) === norm(b)) {
        console.log(`  ok    ${type} identical (image path normalized)`);
    } else {
        // Report which top-level keys differ.
        const keys = [...new Set([...Object.keys(a), ...Object.keys(b)])];
        const diffKeys = keys.filter((k) => JSON.stringify(a[k]) !== JSON.stringify(b[k]));
        const realDiffs = diffKeys.filter((k) => k !== 'image');
        if (realDiffs.length === 0) {
            console.log(`  ok    ${type} identical apart from the allowed image re-encode`);
        } else {
            ldFailures.push(`${type}: ${realDiffs.join(', ')}`);
            console.log(`  FAIL  ${type} differs on: ${realDiffs.join(', ')}`);
            for (const k of realDiffs) {
                console.log(`          old ${k}: ${JSON.stringify(a[k])}`);
                console.log(`          new ${k}: ${JSON.stringify(b[k])}`);
            }
        }
    }
}

/* Verdict ---------------------------------------------------------- */

const failed = removed.length > 0 || metaFailures.length > 0 || ldFailures.length > 0;

console.log('\n=== Verdict ===\n');
if (failed) {
    console.log('  PARITY FAILED\n');
    process.exit(1);
}
console.log('  PARITY OK — no copy lost, metadata equivalent, JSON-LD equivalent\n');
