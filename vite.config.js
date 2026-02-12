import { defineConfig } from 'vite';
import jigsaw from '@tighten/jigsaw-vite-plugin';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
    plugins: [
        jigsaw({
            input: [
                'source/_assets/js/main.js',
                'source/_assets/sass/main.sass',
                'source/_assets/sass/xs.sass',
                'source/_assets/sass/lg.sass',
                'source/_assets/images/favicon.png',
                'source/_assets/images/portrait.webp',
            ],
            refresh: true,
        }),
        viteStaticCopy({
            targets: [
                {
                    src: 'source/_assets/images/*',
                    dest: 'images',
                },
                {
                    src: 'source/_assets/fonts/*',
                    dest: 'fonts',
                },
                {
                    src: 'node_modules/@fortawesome/fontawesome-free/webfonts/*',
                    dest: 'fonts',
                },
            ],
        }),
    ],
    css: {
        preprocessorOptions: {
            sass: {
                // Suppress deprecation warnings if needed
            },
        },
    },
});