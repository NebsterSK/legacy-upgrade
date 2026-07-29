/**
 * Renders a JSON-LD block. Server component — the script tag is in the static HTML,
 * matching how the Blade includes emitted it.
 */
export function JsonLd({ data }: { data: object }) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}
