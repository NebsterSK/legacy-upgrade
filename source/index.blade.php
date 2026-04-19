@extends('_layouts.main')

@section('pageTitle', 'Custom Software & Business Automation')
@section('pageDescription', 'Custom software, automation, and digitalization for businesses. Dependable internal tools, integrations, and legacy system modernization. Get a free consultation.')

@section('body')
{{-- Hero --}}
<section id="home">
    <div class="bg-code-pattern">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16">
            <div class="md:w-3/5 text-center md:text-left">
                <h1 class="font-kanit text-primary-600 text-4xl sm:text-5xl lg:text-6xl">Lukas Neuschl</h1>

                <p class="font-bold text-lg sm:text-xl text-gray-400 dark:text-gray-500">Custom software, automation, and digitalization for businesses</p>

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
                <img src="{{ vite('source/_assets/images/portrait.webp') }}" alt="Lukáš Neuschl, custom software developer based in Bratislava, Slovakia" width="500" height="538" fetchpriority="high" decoding="async" class="w-48 h-48 sm:w-64 sm:h-64 md:w-full md:h-full rounded-full md:rounded-2xl object-cover shadow hover:shadow-lg hover:-translate-y-1 transition" />
            </div>
        </div>
    </div>

    <div class="bg-gray-50 dark:bg-gray-800 py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div class="text-center md:text-left">
                    <x-subsection-header>What I do</x-subsection-header>

                    <p class="text-gray-500 dark:text-gray-400">I deliver <strong>custom software that fits the way your business actually works</strong>. Internal tools, dashboards, API integrations, and automated workflows that remove repetitive work and give you a clear view of your operations.</p>

                    <a href="#services" class="nav-scroll inline-block mt-4 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-semibold transition">Services <i class="ri-arrow-right-line"></i></a>
                </div>

                <div class="text-center md:text-left">
                    <x-subsection-header>Why it matters</x-subsection-header>

                    <p class="text-gray-500 dark:text-gray-400">Well-built software <strong>saves hours, prevents mistakes, and scales with your company</strong>. My goal is straightforward: reduce manual work, consolidate fragmented systems, and leave you with a dependable long-term foundation.</p>

                    <a href="#technology" class="nav-scroll inline-block mt-4 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-semibold transition">Technology <i class="ri-arrow-right-line"></i></a>
                </div>
            </div>
        </div>
    </div>

    <div class="py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <x-subsection-header>Clients</x-subsection-header>

            <div class="space-y-12 sm:space-y-20 lg:space-y-30">
                {{-- Brackets — logo left, text right --}}
                <div class="flex flex-col sm:flex-row items-center gap-6">
                    <div class="shrink-0 w-full sm:w-auto flex items-center justify-center p-6 bg-gray-200 dark:bg-gray-800 rounded-xl">
                        <img src="{{ vite('source/_assets/images/logos/brackets.svg') }}" alt="Brackets" class="h-16 sm:h-20" />
                    </div>

                    <p class="text-gray-500 dark:text-gray-400 text-center sm:text-left">Long-term collaboration on a range of products: a service desk, an e-learning system, an investment portal, and backend services powering mobile applications.
                        <br> <a href="https://meetbrackets.com/" target="_blank" rel="noopener noreferrer" class="underline text-primary-400 hover:text-primary-500 dark:text-primary-600 dark:hover:text-primary-500">meetbrackets.com <i class="ri-external-link-line"></i></a>
                    </p>
                </div>

                {{-- RemaM — text left, logo right --}}
                <div class="flex flex-col sm:flex-row-reverse items-center gap-6">
                    <div class="shrink-0 w-full sm:w-auto flex items-center justify-center p-6 bg-gray-200 dark:bg-gray-800 rounded-xl">
                        <img src="{{ vite('source/_assets/images/logos/remam.webp') }}" alt="RemaM" class="h-16 sm:h-20" />
                    </div>

                    <p class="text-gray-500 dark:text-gray-400 text-center sm:text-right">A custom e-commerce platform for a Slovak importer and distributor of leatherworking, shoemaking, and craft materials. Built to serve wholesale and retail customers.
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

                    <p class="text-gray-500 dark:text-gray-400 text-center">Corporate websites for a Central European trading company bridging businesses between East Asia and the CEE region, and for the Slovakia-Taiwan Chamber of Commerce supporting cross-border investment and networking.
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

            <p class="text-gray-500 dark:text-gray-400 text-center max-w-2xl mx-auto mb-12">I help businesses digitalize and automate the way they operate. Each project is a custom-built solution focused on measurable outcomes: less manual work, fewer errors, and systems you can rely on for years.</p>

            <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                @foreach([
                    ['icon' => 'ri-terminal-box-line', 'text' => 'Custom business software'],
                    ['icon' => 'ri-dashboard-line',    'text' => 'Dashboards & back-office systems'],
                    ['icon' => 'ri-link',              'text' => 'API & system integrations'],
                    ['icon' => 'ri-robot-2-line',      'text' => 'AI integrations'],
                    ['icon' => 'ri-flow-chart',        'text' => 'Process & workflow automation'],
                    ['icon' => 'ri-refresh-line',      'text' => 'Legacy system modernization'],
                    ['icon' => 'ri-speed-up-line',     'text' => 'Performance optimization'],
                    ['icon' => 'ri-scissors-cut-line', 'text' => 'Reducing technical debt'],
                    ['icon' => 'ri-hammer-line',       'text' => 'Long-term maintenance & support'],
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
            <x-subsection-header>How We Work Together</x-subsection-header>

            <div class="max-w-3xl mx-auto">
                <div class="relative">
                    {{-- Vertical timeline line --}}
                    <div class="absolute left-5 sm:left-6 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-700"></div>

                    <div class="space-y-10">
                        @foreach([
                            ['icon' => 'ri-chat-3-line',        'title' => 'Consultation',             'desc' => 'A free, no-obligation call to understand your business, your goals, and the problem you need solved.'],
                            ['icon' => 'ri-file-list-3-line',    'title' => 'Planning & Estimation',    'desc' => 'A clear proposal outlining the approach, broken down into milestones with a transparent timeline and budget, no surprises later.'],
                            ['icon' => 'ri-slideshow-3-line',    'title' => 'Demo',                     'desc' => 'Before committing to the full build, you see an early working prototype. This keeps the project on track and confirms we are aligned on the direction.'],
                            ['icon' => 'ri-code-s-slash-line',   'title' => 'Implementation',           'desc' => 'The solution is built milestone by milestone, with regular updates so you always know exactly where the project stands.'],
                            ['icon' => 'ri-presentation-line',   'title' => 'Presentation & Testing',   'desc' => 'The finished result is presented for your review. You test it in real conditions, with real data, and share feedback.'],
                            ['icon' => 'ri-loop-left-line',      'title' => 'Iteration & Support',      'desc' => 'Refinements based on your feedback, fixes for edge cases, and ongoing support for as long as you need it.'],
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
                        <h3 class="font-bold text-lg dark:text-gray-200">Fixed-Scope Project</h3>
                    </div>

                    <p class="text-2xl font-bold dark:text-gray-200 mb-5">from € 800</p>

                    <ul class="space-y-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
                        <li class="flex items-start gap-2">
                            <i class="ri-check-line text-primary-600 dark:text-primary-400 mt-0.5"></i>
                            Consultation meetings and calls
                        </li>

                        <li class="flex items-start gap-2">
                            <i class="ri-check-line text-primary-600 dark:text-primary-400 mt-0.5"></i>
                            Written proposal with milestones and timeline
                        </li>

                        <li class="flex items-start gap-2">
                            <i class="ri-check-line text-primary-600 dark:text-primary-400 mt-0.5"></i>
                            Implementation and testing
                        </li>

                        <li class="flex items-start gap-2">
                            <i class="ri-check-line text-primary-600 dark:text-primary-400 mt-0.5"></i>
                            Deployment to production
                        </li>
                    </ul>

                    <a href="#contact" class="nav-scroll inline-block mt-auto px-5 py-2.5 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm text-center transition w-full">Request a quote</a>
                </div>

                {{-- Hourly Rate --}}
                <div class="flex flex-col bg-gray-200 dark:bg-gray-700 rounded-lg shadow-sm p-6">
                    <div class="flex items-center gap-3 mb-4">
                        <div class="bg-primary-100 dark:bg-primary-950 rounded-full w-10 h-10 flex items-center justify-center">
                            <i class="ri-time-line text-primary-600 dark:text-primary-400 text-lg"></i>
                        </div>

                        <h3 class="font-bold text-lg dark:text-gray-200">Hourly Engagement</h3>
                    </div>

                    <p class="text-2xl font-bold dark:text-gray-200">€ 30</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-5">per hour</p>

                    <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">A flexible option for smaller tasks, technical consultations, ongoing maintenance, or extending an existing system without a full fixed-scope engagement.</p>

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

            <p class="text-gray-500 dark:text-gray-400 text-center max-w-2xl mx-auto mb-12">I work exclusively with proven, well-supported technologies. The goal is straightforward: software your business can depend on, that any competent developer can maintain long after the initial delivery.</p>

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

            <p class="text-gray-500 dark:text-gray-400 text-center mb-12">Looking to automate a process, replace an outdated system, or build something custom for your business? Get in touch, the first consultation is free and without commitment.</p>

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
            "name": "Do you build websites on WordPress, Wix, Webflow, or similar platforms?",
            "acceptedAnswer": {
                "@@type": "Answer",
                "text": "No. I build custom software from the ground up. Template-based platforms work for simple brochure sites, but they become a bottleneck the moment your business needs something specific — a workflow, an integration, or a reliable way to handle your own data."
            }
        },
        {
            "@@type": "Question",
            "name": "Can you design a visually impressive website?",
            "acceptedAnswer": {
                "@@type": "Answer",
                "text": "My priority is dependable software: fast, stable, and maintainable for years. Visual design is part of that, but never at the expense of performance or long-term reliability. For heavily design-driven marketing pages, I am happy to collaborate with a dedicated designer."
            }
        },
        {
            "@@type": "Question",
            "name": "How long does a typical project take?",
            "acceptedAnswer": {
                "@@type": "Answer",
                "text": "It depends on the scope. Smaller internal tools and integrations typically take two to six weeks. Larger custom platforms run from two to six months. A concrete timeline is part of the written proposal before any work begins."
            }
        },
        {
            "@@type": "Question",
            "name": "Do you offer support after the project is delivered?",
            "acceptedAnswer": {
                "@@type": "Answer",
                "text": "Yes. Ongoing maintenance, improvements, and on-demand support are available on an hourly basis. Software evolves with your business, and I stay involved for as long as you need."
            }
        },
        {
            "@@type": "Question",
            "name": "Can you urgently fix an existing website or system?",
            "acceptedAnswer": {
                "@@type": "Answer",
                "text": "Urgent fixes on unfamiliar systems are possible, but they require a quick assessment first and are handled at a priority rate. Get in touch and I will tell you honestly whether I can help and how quickly."
            }
        }
    ]
}
</script>
@endsection
