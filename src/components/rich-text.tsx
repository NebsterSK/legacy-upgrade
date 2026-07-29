import type { RichText as RichTextRuns } from '@/content';

/**
 * Renders the `RichText` run arrays from `src/content/`, turning `{ bold }` runs into
 * `<strong>`. Keeps inline emphasis out of the content layer while preserving the exact
 * sentence — `richTextToString()` on the same array is what the copy verifier checks.
 */
export function RichText({ content }: { content: RichTextRuns }) {
    return (
        <>
            {content.map((run, i) =>
                typeof run === 'string' ? run : <strong key={i}>{run.bold}</strong>
            )}
        </>
    );
}
