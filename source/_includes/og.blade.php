<meta property="og:type" content="website">
<meta property="og:site_name" content="{{ $page->title }}">
<meta property="og:title" content="@yield('pageTitle')">
<meta property="og:description" content="@yield('pageDescription')">
<meta property="og:url" content="{{ $page->baseUrl }}{{ $page->getPath() ?: '/' }}">
