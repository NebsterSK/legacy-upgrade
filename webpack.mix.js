const mix = require('laravel-mix');
require('laravel-mix-jigsaw');

mix.disableSuccessNotifications();
mix.setPublicPath('source/assets/build');

mix.jigsaw()
    .js('source/_assets/js/main.js', 'js')
    .copyDirectory('source/_assets/images', 'source/assets/build/images')
    .copyDirectory('node_modules/@fortawesome/fontawesome-free/webfonts', 'source/assets/build/fonts')
    .sass('source/_assets/sass/main.sass', 'css')
    .sass('source/_assets/sass/xs.sass', 'css')
    .sass('source/_assets/sass/lg.sass', 'css')
    .options({
        processCssUrls: false,
    })
    .version();
