/**
 * Shared content types.
 *
 * Copy in `src/content/` is FROZEN — see plan.md constraint #1. Every string here
 * was copied verbatim out of the Jigsaw/Blade source. Do not reword, retype, or
 * "tidy" anything; a copy pass happens separately, later.
 */

/**
 * A run of text, optionally bold. Lets us keep inline `<strong>` from the Blade
 * source without embedding HTML in content, and still reconstruct the exact
 * plain-text string for the Task 13 copy diff via `richTextToString()`.
 */
export type TextRun = string | { bold: string };

export type RichText = readonly TextRun[];

export function richTextToString(rich: RichText): string {
    return rich.map((run) => (typeof run === 'string' ? run : run.bold)).join('');
}

/**
 * Name of a `lucide-react` export, e.g. 'TerminalSquare'.
 *
 * Kept as a plain string so `src/content/` has no dependency on the icon library.
 * The name → component registry is wired up in Task 4/9.
 */
export type IconName = string;

export type ExternalLink = {
    readonly label: string;
    readonly href: string;
};
