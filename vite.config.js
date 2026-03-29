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

                // Logos
                'source/_assets/images/logos/brackets.svg',
                'source/_assets/images/logos/remam.webp',
                'source/_assets/images/logos/laravel.svg',
                'source/_assets/images/logos/claude.svg',
                'source/_assets/images/logos/vuejs.svg',
                'source/_assets/images/logos/tailwindcss.svg',
                'source/_assets/images/logos/inertiajs.svg',
                'source/_assets/images/logos/mysql.svg',
                'source/_assets/images/logos/forge.svg',
                'source/_assets/images/logos/websupport.webp',
                'source/_assets/images/logos/yasmin.png',
                'source/_assets/images/logos/stcc.png',
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