<meta property="og:type" content="website">
<meta property="og:locale" content="en_US">
<meta property="og:site_name" content="{{ $page->title }}">
<meta property="og:title" content="@yield('pageTitle') | Legacy Upgrade">
<meta property="og:description" content="@yield('pageDescription')">
<meta property="og:url" content="{{ $page->baseUrl }}{{ $page->getPath() ?: '/' }}">
<meta property="og:image" content="{{ $page->baseUrl }}/assets/build/images/portrait.webp">
<meta property="og:image:alt" content="Lukáš Neuschl — custom software, automation, and digitalization for businesses">
