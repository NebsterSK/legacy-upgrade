@extends('_layouts.main')

@section('pageTitle', 'Digitalization & Custom Software for Businesses')
@section('pageDescription', 'Custom software, automation, and digitalization solutions for businesses. Freelance developer in Bratislava specializing in Laravel, APIs, and AI integrations.')

@section('body')
{{-- Hero --}}
<section id="home">
    <div class="bg-code-pattern">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16">
            <div class="md:w-3/5 text-center md:text-left">
                <h2 class="font-kanit text-primary-600 text-4xl sm:text-5xl lg:text-6xl">Lukas Neuschl</h2>

                <p class="font-bold text-lg sm:text-xl text-gray-400 dark:text-gray-500">Freelance Software Developer</p>

                <p class="mt-5 flex justify-center md:justify-start gap-4 text-4xl">
                    <a href="{{ $page->links->linkedin }}" target="_blank" rel="noopener noreferrer" title="LinkedIn" class="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition">
                        <i class="ri-linkedin-fill"></i>
                    </a>

                    <a href="{{ $page->links->github }}" target="_blank" rel="noopener noreferrer" title="GitHub" class="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition">
                        <i class="ri-github-fill"></i>
                    </a>
                </p>

                <div class="mt-8 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                    <a href="#contact" class="nav-scroll px-6 py-3 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-semibold text-center transition">Contact</a>

                    <a href="#services" class="nav-scroll px-6 py-3 rounded-lg border-2 border-gray-500 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 font-semibold text-center transition">Services</a>
                </div>
            </div>

            <div class="md:w-2/5">
                <img src="{{ vite('source/_assets/images/portrait.webp') }}" alt="Lukas Neuschl, Freelance Software Developer in Bratislava" class="w-48 h-48 sm:w-64 sm:h-64 md:w-full md:h-full rounded-full md:rounded-2xl object-cover shadow hover:shadow-lg hover:-translate-y-1 transition" />
            </div>
        </div>
    </div>

    <div class="bg-gray-50 dark:bg-gray-800 py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div class="text-center md:text-left">
                    <x-subsection-header>What I do</x-subsection-header>

                    <p class="text-gray-500 dark:text-gray-400">I build <strong>custom software and automation solutions</strong> tailored to each client's business needs. From internal tools and dashboards to API integrations and AI-powered workflows.</p>

                    <a href="#services" class="nav-scroll inline-block mt-4 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-semibold transition">Services <i class="ri-arrow-right-line"></i></a>
                </div>

                <div class="text-center md:text-left">
                    <x-subsection-header>Why I do it</x-subsection-header>

                    <p class="text-gray-500 dark:text-gray-400">Because I love to <strong>solve technological challenges</strong> in the most efficient way. Helping companies modernize, automate, and scale their operations through software.</p>

                    <a href="#technology" class="nav-scroll inline-block mt-4 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-semibold transition">Tech stack <i class="ri-arrow-right-line"></i></a>
                </div>
            </div>
        </div>
    </div>

    <div class="py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <x-subsection-header>Clients</x-subsection-header>

            <div class="space-y-12 sm:space-y-16">
                {{-- Brackets — logo left, text right --}}
                <div class="flex flex-col sm:flex-row items-center gap-6">
                    <div class="shrink-0 w-full sm:w-auto flex items-center justify-center p-6 bg-gray-200 dark:bg-gray-800 rounded-xl">
                        <img src="{{ vite('source/_assets/images/logos/brackets.svg') }}" alt="Brackets" class="h-16 sm:h-20" />
                    </div>

                    <p class="text-gray-500 dark:text-gray-400 text-center sm:text-left">Hourly rate collaboration across multiple projects: service desk, e-learning platform, investment portal and backend for mobile apps.
                        <br> <a href="https://meetbrackets.com/" target="_blank" rel="noopener noreferrer" class="underline text-primary-400 hover:text-primary-500 dark:text-primary-600 dark:hover:text-primary-500">meetbrackets.com <i class="ri-external-link-line"></i></a>
                    </p>
                </div>

                {{-- RemaM — text left, logo right --}}
                <div class="flex flex-col sm:flex-row-reverse items-center gap-6">
                    <div class="shrink-0 w-full sm:w-auto flex items-center justify-center p-6 bg-gray-200 dark:bg-gray-800 rounded-xl">
                        <img src="{{ vite('source/_assets/images/logos/remam.webp') }}" alt="RemaM" class="h-16 sm:h-20" />
                    </div>

                    <p class="text-gray-500 dark:text-gray-400 text-center sm:text-right">Custom e-shop for a Slovak importer and distributor of leatherworking, shoemaking, and craft materials. The platform serves both wholesale and retail customers.
                        <br> <a href="https://remam.sk/" target="_blank" rel="noopener noreferrer" class="underline text-primary-400 hover:text-primary-500 dark:text-primary-600 dark:hover:text-primary-500">remam.sk <i class="ri-external-link-line"></i></a>
                    </p>
                </div>

                {{-- Yasmin Trade & STCC --}}
                <div class="flex flex-col items-center gap-6">
                    <div class="grid grid-cols-2 gap-8">
                        <div class="flex items-center justify-center p-6 bg-gray-200 dark:bg-gray-800 rounded-xl">
                            <img src="{{ vite('source/_assets/images/logos/yasmin.png') }}" alt="Yasmin Trade" class="h-28 sm:h-32" />
                        </div>

                        <div class="flex items-center justify-center p-6 bg-gray-200 dark:bg-gray-800 rounded-xl">
                            <img src="{{ vite('source/_assets/images/logos/stcc.png') }}" alt="STCC" class="h-28 sm:h-32" />
                        </div>
                    </div>

                    <p class="text-gray-500 dark:text-gray-400 text-center">Presentation websites for a Central European trading company connecting businesses between Eastern Asia and CEE, and the Slovakia-Taiwan Chamber of Commerce facilitating cross-border networking and investment.
                        <br> <a href="https://yasmin-trade.com/" target="_blank" rel="noopener noreferrer" class="underline text-primary-400 hover:text-primary-500 dark:text-primary-600 dark:hover:text-primary-500">yasmin-trade.com <i class="ri-external-link-line"></i></a>
                        <br> <a href="https://stcham.com/" target="_blank" rel="noopener noreferrer" class="underline text-primary-400 hover:text-primary-500 dark:text-primary-600 dark:hover:text-primary-500">stcham.com <i class="ri-external-link-line"></i></a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>

{{-- Services --}}
<section id="services">
    <div class="bg-gray-50 dark:bg-gray-800 py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <x-section-header>Services</x-section-header>

            <p class="text-gray-500 dark:text-gray-400 text-center max-w-2xl mx-auto mb-12">I help businesses digitalize and automate their workflows through custom-built software. From internal tools and dashboards to API integrations and AI-powered solutions.</p>

            <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                @foreach([
                    ['icon' => 'ri-terminal-box-line', 'text' => 'Custom software solutions'],
                    ['icon' => 'ri-dashboard-line',    'text' => 'Dashboards & back-office systems'],
                    ['icon' => 'ri-link',              'text' => 'REST APIs & system integrations'],
                    ['icon' => 'ri-robot-2-line',      'text' => 'AI integrations'],
                    ['icon' => 'ri-flow-chart',        'text' => 'Workflow automation'],
                    ['icon' => 'ri-refresh-line',      'text' => 'Legacy system modernization'],
                    ['icon' => 'ri-speed-up-line',     'text' => 'Performance optimizations'],
                    ['icon' => 'ri-scissors-cut-line',  'text' => 'Reducing technical debt'],
                    ['icon' => 'ri-hammer-line',       'text' => 'Improving Developer Experience'],
                ] as $service)
                    <li class="flex items-center gap-4 bg-gray-200 dark:bg-gray-700 rounded-lg shadow-sm p-5">
                        <div class="shrink-0 w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-950 flex items-center justify-center">
                            <i class="{{ $service['icon'] }} text-primary-600 dark:text-primary-400 text-lg"></i>
                        </div>
                        <span class="font-semibold text-sm dark:text-gray-200">{{ $service['text'] }}</span>
                    </li>
                @endforeach
            </ul>
        </div>
    </div>

    <div class="py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <x-subsection-header>Process</x-subsection-header>

            <div class="max-w-3xl mx-auto">
                <div class="relative">
                    {{-- Vertical timeline line --}}
                    <div class="absolute left-5 sm:left-6 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-700"></div>

                    <div class="space-y-10">
                        @foreach([
                            ['icon' => 'ri-chat-3-line',        'title' => 'Consultation',             'desc' => 'A free initial call or meeting to understand your business, goals, and the problem you need solved.'],
                            ['icon' => 'ri-file-list-3-line',    'title' => 'Planning & Estimation',    'desc' => 'I outline the technical approach, break the work into milestones, and provide a transparent cost and time estimate.'],
                            ['icon' => 'ri-slideshow-3-line',    'title' => 'Demo',                     'desc' => 'Before committing to the full build, I prepare a working prototype or demo so you can see the direction early on.'],
                            ['icon' => 'ri-code-s-slash-line',   'title' => 'Implementation',           'desc' => 'Building the actual solution milestone by milestone, with regular check-ins to keep you in the loop.'],
                            ['icon' => 'ri-presentation-line',   'title' => 'Presentation & Testing',   'desc' => 'I present the finished result for your review. You test it in real conditions and share your feedback.'],
                            ['icon' => 'ri-loop-left-line',      'title' => 'Iteration & Support',      'desc' => 'Refining the solution based on your feedback, fixing edge cases, and providing ongoing support as needed.'],
                        ] as $index => $step)
                            <div class="relative flex items-start gap-5 sm:gap-6">
                                {{-- Step icon --}}
                                <div class="relative z-10 shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary-100 dark:bg-primary-950 flex items-center justify-center ring-4 ring-white dark:ring-gray-900">
                                    <i class="{{ $step['icon'] }} text-primary-600 dark:text-primary-400 text-lg sm:text-xl"></i>
                                </div>

                                {{-- Step content --}}
                                <div class="pt-1">
                                    <p class="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-1">Step {{ $index + 1 }}</p>
                                    <h3 class="font-bold text-lg dark:text-gray-200">{{ $step['title'] }}</h3>
                                    <p class="mt-1 text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{{ $step['desc'] }}</p>
                                </div>
                            </div>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="py-16">
        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <x-subsection-header>Pricing</x-subsection-header>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {{-- Custom Software Project --}}
                <div class="flex flex-col bg-gray-200 dark:bg-gray-700 rounded-lg shadow-sm p-6 ring-2 ring-primary-600 dark:ring-primary-400">
                    <div class="flex items-center gap-3 mb-4">
                        <div class="bg-primary-100 dark:bg-primary-950 rounded-full w-10 h-10 flex items-center justify-center">
                            <i class="ri-code-s-slash-line text-primary-600 dark:text-primary-400 text-lg"></i>
                        </div>
                        <h3 class="font-bold text-lg dark:text-gray-200">Custom Project</h3>
                    </div>

                    <p class="text-2xl font-bold dark:text-gray-200 mb-5">from € 800</p>

                    <ul class="space-y-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
                        <li class="flex items-start gap-2">
                            <i class="ri-check-line text-primary-600 dark:text-primary-400 mt-0.5"></i>
                            Client meetings & calls
                        </li>

                        <li class="flex items-start gap-2">
                            <i class="ri-check-line text-primary-600 dark:text-primary-400 mt-0.5"></i>
                            Solution proposal with timeframe & milestones
                        </li>

                        <li class="flex items-start gap-2">
                            <i class="ri-check-line text-primary-600 dark:text-primary-400 mt-0.5"></i>
                            Implementation & testing
                        </li>

                        <li class="flex items-start gap-2">
                            <i class="ri-check-line text-primary-600 dark:text-primary-400 mt-0.5"></i>
                            Deployment
                        </li>
                    </ul>

                    <a href="#contact" class="nav-scroll inline-block mt-auto px-5 py-2.5 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm text-center transition w-full">Get a quote</a>
                </div>

                {{-- Hourly Rate --}}
                <div class="flex flex-col bg-gray-200 dark:bg-gray-700 rounded-lg shadow-sm p-6">
                    <div class="flex items-center gap-3 mb-4">
                        <div class="bg-primary-100 dark:bg-primary-950 rounded-full w-10 h-10 flex items-center justify-center">
                            <i class="ri-time-line text-primary-600 dark:text-primary-400 text-lg"></i>
                        </div>

                        <h3 class="font-bold text-lg dark:text-gray-200">Hourly Rate</h3>
                    </div>

                    <p class="text-2xl font-bold dark:text-gray-200">€ 30</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-5">per hour</p>

                    <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">For clients who prefer to hire on an hourly basis. Suitable for smaller tasks, consultations, or ongoing support work.</p>

                    <a href="#contact" class="nav-scroll inline-block mt-auto px-5 py-2.5 rounded-lg border-2 border-gray-500 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 font-semibold text-sm text-center transition w-full">Get in touch</a>
                </div>
            </div>
        </div>
    </div>

    <div class="py-16">
        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <x-subsection-header>Frequently Asked Questions</x-subsection-header>

            <div class="space-y-6">
                <div class="border-b border-gray-200 dark:border-gray-700 pb-6">
                    <h3 class="font-semibold text-lg dark:text-gray-200">Do you work with Wix / Webflow / Squarespace / Framer / Wordpress / Drupal / Joomla or similar?</h3>

                    <p class="mt-2 text-gray-500 dark:text-gray-400"><i class="ri-close-line text-red-600 dark:text-red-400"></i> No. I know how to code and I use that knowledge to my advantage in building custom software solutions based on my client's needs.</p>
                </div>

                <div class="border-b border-gray-200 dark:border-gray-700 pb-6">
                    <h3 class="font-semibold text-lg dark:text-gray-200">Can you make me a BEAUTIFUL website?</h3>

                    <p class="mt-2 text-gray-500 dark:text-gray-400"><i class="ri-information-line text-blue-600 dark:text-blue-400"></i> I prefer to make GOOD websites that don't take seconds to load, don't crash and are maintainable for the long future.</p>
                </div>

                <div>
                    <h3 class="font-semibold text-lg dark:text-gray-200">Can you fix my website ASAP?</h3>

                    <p class="mt-2 text-gray-500 dark:text-gray-400"><i class="ri-question-line text-yellow-500 dark:text-yellow-400"></i> No. Well... maybe. Yes, but it will cost you extra.</p>
                </div>
            </div>
        </div>
    </div>
</section>

{{-- Technology --}}
<section id="technology">
    <div class="bg-gray-50 dark:bg-gray-800 py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <x-section-header>Technology</x-section-header>

            <p class="text-gray-500 dark:text-gray-400 text-center max-w-2xl mx-auto mb-12">I choose proven, modern tools that deliver reliable and maintainable business software. Every technology in my stack is selected to help your product scale and stay easy to work with.</p>

            <x-subsection-header>Tech Stack</x-subsection-header>

            <div class="grid grid-cols-3 gap-6 md:grid-cols-6 md:gap-10 px-2 justify-items-center">
                @foreach([
                    ['file' => 'laravel.svg', 'label' => 'Laravel'],
                    ['file' => 'tailwindcss.svg', 'label' => 'Tailwind CSS'],
                    ['file' => 'claude.svg', 'label' => 'Claude'],
                    ['file' => 'inertiajs.svg', 'label' => 'Inertia.js'],
                    ['file' => 'mysql.svg', 'label' => 'MySQL'],
                    ['file' => 'vuejs.svg', 'label' => 'Vue.js'],
                ] as $logo)
                    <div tabindex="0" class="group relative flex items-center justify-center mt-4 md:mt-0 w-16 h-16 md:w-24 md:h-24 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 focus:grayscale-0 focus:opacity-100 transition duration-300 cursor-default outline-none">
                        <img src="{{ vite("source/_assets/images/logos/{$logo['file']}") }}" alt="{{ $logo['label'] }}" />

                        <span class="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 dark:bg-gray-500 px-2 py-0.5 text-[11px] sm:text-xs text-white opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-200">
                            {{ $logo['label'] }}
                        </span>
                    </div>
                @endforeach
            </div>
        </div>
    </div>

    <div class="py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <x-subsection-header>Infrastructure</x-subsection-header>

            <div class="flex flex-wrap justify-center gap-8 sm:gap-12">
                @foreach([
                    ['file' => 'websupport.webp', 'label' => 'Websupport'],
                    ['file' => 'forge.svg', 'label' => 'Laravel Forge'],
                ] as $logo)
                    <div tabindex="0" class="group relative flex items-center justify-center w-36 h-18 sm:w-48 sm:h-24 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 focus:grayscale-0 focus:opacity-100 transition duration-300 cursor-default outline-none">
                        <img src="{{ vite("source/_assets/images/logos/{$logo['file']}") }}" alt="{{ $logo['label'] }}" />

                        <span class="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 dark:bg-gray-500 px-2 py-0.5 text-[11px] sm:text-xs text-white opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-200">
                            {{ $logo['label'] }}
                        </span>
                    </div>
                @endforeach
            </div>
        </div>
    </div>
</section>

{{-- Contact --}}
<section id="contact">
    <div class="bg-gray-50 dark:bg-gray-800 py-16">
        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <x-section-header>Contact</x-section-header>

            <p class="text-gray-500 dark:text-gray-400 text-center mb-12">Have an idea or a process to improve? Reach out, the initial consultation is free and non-binding.</p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                {{-- Personal info --}}
                <div class="bg-gray-200 dark:bg-gray-700 rounded-lg shadow-sm p-6">
                    <div class="flex items-center gap-3 mb-5">
                        <div class="shrink-0 bg-primary-100 dark:bg-primary-950 rounded-full w-12 h-12 flex items-center justify-center">
                            <i class="ri-user-line text-primary-600 dark:text-primary-400 text-xl"></i>
                        </div>
                        <p class="text-lg font-bold dark:text-gray-200">Lukáš Neuschl</p>
                    </div>

                    <div class="space-y-1">
                        <a href="mailto:{{ $page->company->contact->email }}" class="flex items-center gap-3 rounded-lg px-3 py-1 -mx-3 hover:bg-gray-300/60 dark:hover:bg-gray-600/60 transition group">
                            <i class="ri-mail-fill text-primary-600 dark:text-primary-400 text-lg"></i>
                            <span class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition">{{ $page->company->contact->email }}</span>
                        </a>

                        <a href="tel:{{ $page->company->contact->phone }}" class="flex items-center gap-3 rounded-lg px-3 py-1 -mx-3 hover:bg-gray-300/60 dark:hover:bg-gray-600/60 transition group">
                            <i class="ri-phone-fill text-primary-600 dark:text-primary-400 text-lg"></i>
                            <span class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition">{{ $page->company->contact->phone }}</span>
                        </a>

                        <a href="{{ $page->company->contact->messenger }}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-3 rounded-lg px-3 py-1 -mx-3 hover:bg-gray-300/60 dark:hover:bg-gray-600/60 transition group">
                            <i class="ri-messenger-fill text-primary-600 dark:text-primary-400 text-lg"></i>
                            <span class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition">Messenger</span>
                        </a>

                        <a href="{{ $page->company->contact->whatsapp }}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-3 rounded-lg px-3 py-1 -mx-3 hover:bg-gray-300/60 dark:hover:bg-gray-600/60 transition group">
                            <i class="ri-whatsapp-fill text-primary-600 dark:text-primary-400 text-lg"></i>
                            <span class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition">WhatsApp</span>
                        </a>
                    </div>
                </div>

                {{-- Address --}}
                <div class="bg-gray-200 dark:bg-gray-700 rounded-lg shadow-sm p-6">
                    <div class="flex items-center gap-3 mb-5">
                        <div class="shrink-0 bg-primary-100 dark:bg-primary-950 rounded-full w-12 h-12 flex items-center justify-center">
                            <i class="ri-map-pin-line text-primary-600 dark:text-primary-400 text-xl"></i>
                        </div>
                        <p class="text-lg font-bold dark:text-gray-200">Address</p>
                    </div>

                    <div class="space-y-1 text-sm text-gray-500 dark:text-gray-400">
                        <p>{{ $page->company->address->street }}</p>
                        <p>{{ $page->company->address->zip }}, {{ $page->company->address->city }}</p>
                        <p>{{ $page->company->address->country }}</p>
                    </div>
                </div>

                {{-- Company details --}}
                <div class="bg-gray-200 dark:bg-gray-700 rounded-lg shadow-sm p-6 md:col-span-2">
                    <div class="flex items-center gap-3 mb-5">
                        <div class="shrink-0 bg-primary-100 dark:bg-primary-950 rounded-full w-12 h-12 flex items-center justify-center">
                            <i class="ri-building-line text-primary-600 dark:text-primary-400 text-xl"></i>
                        </div>
                        <p class="text-lg font-bold dark:text-gray-200">Company Details</p>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <p class="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-1">Company ID / IČO</p>
                            <p class="text-sm text-gray-500 dark:text-gray-400">{{ $page->company->id }}</p>
                        </div>

                        <div>
                            <p class="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-1">Tax ID / DIČ</p>
                            <p class="text-sm text-gray-500 dark:text-gray-400">{{ $page->company->tax }}</p>
                        </div>

                        <div>
                            <p class="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-1">IBAN</p>
                            <p class="text-sm text-gray-500 dark:text-gray-400">{{ $page->company->iban }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
@endsection

@section('jsonld')
<script type="application/ld+json">
{
    "@@context": "https://schema.org",
    "@@type": "FAQPage",
    "mainEntity": [
        {
            "@@type": "Question",
            "name": "Do you work with Wix / Webflow / Squarespace / Framer / Wordpress / Drupal / Joomla or similar?",
            "acceptedAnswer": {
                "@@type": "Answer",
                "text": "No. I know how to code and I use that knowledge to my advantage in building custom software solutions based on my client's needs."
            }
        },
        {
            "@@type": "Question",
            "name": "Can you make me a BEAUTIFUL website?",
            "acceptedAnswer": {
                "@@type": "Answer",
                "text": "I prefer to make GOOD websites that don't take seconds to load, dont crash and are maintainable for the long future."
            }
        },
        {
            "@@type": "Question",
            "name": "Can you fix my website ASAP?",
            "acceptedAnswer": {
                "@@type": "Answer",
                "text": "No. Well... maybe. Yes, but it will cost you extra."
            }
        }
    ]
}
</script>
@endsection
