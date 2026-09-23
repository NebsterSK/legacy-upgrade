/** Verbatim from `source/index.blade.php:268-319`. */
export const technology = {
    heading: 'Technology',

    intro: 'I work exclusively with proven, well-supported technologies. The goal is straightforward: software your business can depend on, that any competent developer can maintain long after the initial delivery.',

    /**
     * Drawn as an architecture diagram, not a logo row: `flow` is the request path left to
     * right (one column per layer, two logos where a layer has alternatives), `host` wraps
     * the whole flow, and `overseer` sits above everything.
     */
    stack: {
        heading: 'Tech Stack',
        overseer: { file: 'claude.svg', label: 'Claude' },
        host: { file: 'forge.svg', label: 'Laravel Forge' },
        flow: [
            [{ file: 'tailwindcss.svg', label: 'Tailwind CSS' }],
            [
                { file: 'react.svg', label: 'React.js' },
                { file: 'vuejs.svg', label: 'Vue.js' },
            ],
            [{ file: 'inertiajs.svg', label: 'Inertia.js' }],
            [{ file: 'laravel.svg', label: 'Laravel' }],
            [
                { file: 'mysql.svg', label: 'MySQL' },
                { file: 'postgresql.svg', label: 'PostgreSQL' },
            ],
        ],
    },
} as const;
