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
        <link rel="stylesheet" href="{{ mix('css/lg.css', 'assets/build') }}" media="(min-width:992px)">
    </head>

    <body>
        <nav id="main-nav" class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-lg">
                <a class="navbar-brand" href="{{ $page->baseUrl }}/">Legacy Upgrade</a>

                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link" href="{{ $page->baseUrl }}/services">Services</a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link" href="{{ $page->baseUrl }}/references">References</a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link" href="{{ $page->baseUrl }}/technology">Technology</a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link" href="{{ $page->baseUrl }}/contact">Contact</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        @yield('body')

        <footer id="page-footer" class="container-lg">
            <div class="row">
                <div class="col-12 col-lg-3">
                    <a href=""></a>

                    <a href=""></a>
                </div>

                <div class="col-12 col-lg-3">
                    <a href=""></a>

                    <a href=""></a>
                </div>

                <div class="col-12 col-lg-3">
                    <p>contact</p>
                </div>

                <div class="col-12 col-lg-3">
                    <p>{{ $page->company->name }} © {{ date('Y') }}</p>
                </div>
            </div>
        </footer>

        <script defer src="{{ mix('js/main.js', 'assets/build') }}"></script>
    </body>
</html>
