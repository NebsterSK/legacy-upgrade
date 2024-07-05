<!DOCTYPE html>
<html lang="{{ $page->language ?? 'en' }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="canonical" href="{{ $page->getUrl() }}">
        <meta name="description" content="{{ $page->description }}">
        <title>{{ $page->title }}</title>
        <link rel="stylesheet" href="{{ mix('css/main.css', 'assets/build') }}">
        <link rel="stylesheet" href="{{ mix('css/xs.css', 'assets/build') }}">
    </head>

    <body>
        <a href="{{ $page->baseUrl }}/">Index</a>
        <a href="{{ $page->baseUrl }}/services">Services</a>
        <a href="{{ $page->baseUrl }}/references">References</a>
        <a href="{{ $page->baseUrl }}/tech-stack">Tech stack</a>
        <a href="{{ $page->baseUrl }}/contact">Contact</a>

        @yield('body')

        <script defer src="{{ mix('js/main.js', 'assets/build') }}"></script>
    </body>
</html>
