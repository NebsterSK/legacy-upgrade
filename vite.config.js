import { defineConfig } from 'vite';
import jigsaw from '@tighten/jigsaw-vite-plugin';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    base: '/assets/build/',
    plugins: [
        tailwindcss(),
        jigsaw({
            input: [
                'source/_assets/css/main.css',
                'source/_assets/js/main.js',

                // Images
                'source/_assets/images/favicon.png',
                'source/_assets/images/portrait.webp',
            ],
            refresh: {
                files: [
                    'source/**/*.blade.php',
                    'source/_assets/css/**/*.css',
                    'source/_assets/js/**/*.js',
                    'source/_layouts/main.blade.php',
                    'config.php',
                ],
                delay: 300,
            },
        }),
        viteStaticCopy({
            targets: [
                {
                    src: 'source/_assets/fonts/*',
                    dest: 'fonts',
                },
            ],
        }),
    ],
});