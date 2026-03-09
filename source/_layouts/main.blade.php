<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="{{ $page->description }}">
        <title>{{ $page->title }}</title>
        <link rel="icon" type="image/x-icon" href="{{ vite('source/_assets/images/favicon.png') }}">
        @viteRefresh()
        <link rel="stylesheet" href="{{ vite('source/_assets/css/main.css') }}">
    </head>

    <body class="flex flex-col min-h-screen">
        <nav id="main-nav" class="bg-primary-100 text-primary-600">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex flex-wrap items-center justify-between">
                    <a href="/" class="text-xl font-bold text-primary-600 font-kanit py-4">Legacy Upgrade</a>

                    <button id="nav-toggle" class="md:hidden inline-flex items-center justify-center p-2 rounded hover:text-primary-600 focus:outline-none" aria-label="Toggle navigation">
                        <i id="nav-icon-open" class="ri-menu-line text-2xl"></i>
                        <i id="nav-icon-close" class="ri-close-line text-2xl hidden"></i>
                    </button>

                    <div id="nav-menu" class="hidden w-full pb-4 md:flex md:w-auto md:items-center md:space-x-6 md:pb-0">
                        <a href="/" class="nav-link block px-3 py-2 md:px-0 md:py-0">Home</a>

                        <a href="/services" class="nav-link block px-3 py-2 md:px-0 md:py-0">Services</a>

                        <a href="/contact" class="nav-link block px-3 py-2 md:px-0 md:py-0">Contact</a>

{{--                        <button id="dark-mode-toggle" class="block px-3 py-2 hover:text-primary-600 md:px-0 md:py-0 cursor-pointer" aria-label="Toggle dark mode">--}}
{{--                            <i id="dark-icon-sun" class="ri-sun-line text-xl hidden"></i>--}}
{{--                            <i id="dark-icon-moon" class="ri-moon-line text-xl"></i>--}}
{{--                        </button>--}}
                    </div>
                </div>
            </div>
        </nav>

        <div id="page-body" class="grow">
            @yield('body')
        </div>

        <footer id="page-footer" class="bg-gray-100 text-gray-400 py-8">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid md:grid-cols-4 gap-8">
                    <div>
                        <p class="font-bold mb-3">Navigation</p>
                        <p class="mb-1"><a href="/" class="hover:text-primary-600 transition">Home</a></p>
                        <p class="mb-1"><a href="/services" class="hover:text-primary-600 transition">Services</a></p>
                        <p class="mb-1"><a href="/contact" class="hover:text-primary-600 transition">Contact</a></p>
                    </div>

                    <div>
                        <p class="font-bold mb-3">Social media</p>
                        <p class="mb-1"><a href="{{ $page->links->linkedin }}" target="_blank" class="hover:text-primary-600 transition">LinkedIn <i class="ri-external-link-line"></i></a></p>
                        <p class="mb-1"><a href="{{ $page->links->github }}" target="_blank" class="hover:text-primary-600 transition">GitHub <i class="ri-external-link-line"></i></a></p>
                        <p class="mb-1"><a href="{{ $page->links->stack_overflow }}" target="_blank" class="hover:text-primary-600 transition">Stack Overflow <i class="ri-external-link-line"></i></a></p>
                    </div>

                    <div>
                        <p class="font-bold mb-3">Contact</p>
                        <p class="mb-1">Lukáš Neuschl</p>
                        <p class="mb-1"><a href="mailto:{{ $page->company->email }}" class="hover:text-primary-600 transition">{{ $page->company->email }}</a></p>
                        <p class="mb-1"><a href="mailto:{{ $page->company->phone }}" class="hover:text-primary-600 transition">{{ $page->company->phone }}</a></p>
                    </div>

                    <div class="text-center">
                        <img src="{{ vite('source/_assets/images/favicon.png') }}" alt="Logo" class="h-12 mb-3 mx-auto" />
                        <p class="text-sm"><span class="font-kanit">LEGACY UPGRADE</span> © <script>document.write(new Date().getFullYear())</script></p>
                    </div>
                </div>
            </div>
        </footer>

        <script src="{{ vite('source/_assets/js/main.js') }}" defer></script>
    </body>
</html>
