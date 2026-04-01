@extends('_layouts.main')

@section('pageTitle', 'Digitalization & Custom Software for Businesses')
@section('pageDescription', 'Custom software, automation, and digitalization solutions for businesses. Freelance developer in Bratislava specializing in Laravel, APIs, and AI integrations.')

@section('body')
{{-- Hero --}}
<section id="home">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16">
        <div class="md:w-3/5 text-center md:text-left">
            <h1 class="font-kanit text-primary-600 text-4xl sm:text-5xl lg:text-6xl">Lukas Neuschl</h1>

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
                <a href="#contact" class="inline-block px-6 py-3 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-semibold text-center transition">Contact</a>

                <a href="#services" class="inline-block px-6 py-3 rounded-lg border-2 border-gray-500 text-gray-500 hover:bg-gray-100 dark:border-gray-500 dark:text-gray-400 dark:hover:bg-gray-800 font-semibold text-center transition">Services</a>
            </div>
        </div>

        <div class="md:w-2/5">
            <img src="{{ vite('source/_assets/images/portrait.webp') }}" alt="Lukas Neuschl, Freelance Software Developer in Bratislava" class="w-48 h-48 sm:w-64 sm:h-64 md:w-full md:h-full rounded-full md:rounded-2xl object-cover shadow-lg" />
        </div>
    </div>

    <div class="bg-gray-50 dark:bg-gray-800 py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div class="text-center md:text-left">
                    <h2 class="font-kanit text-primary-600 dark:text-primary-400 text-2xl mb-4">What I do</h2>
                    <p class="text-gray-500 dark:text-gray-400">I build <strong>custom software and automation solutions</strong> tailored to each client's business needs. From internal tools and dashboards to API integrations and AI-powered workflows.</p>
                    <a href="#services" class="inline-block mt-4 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-semibold transition">Services <i class="ri-arrow-right-line"></i></a>
                </div>

                <div class="text-center md:text-left">
                    <h2 class="font-kanit text-primary-600 dark:text-primary-400 text-2xl mb-4">Why I do it</h2>
                    <p class="text-gray-500 dark:text-gray-400">Because I love to <strong>solve technological challenges</strong> in the most efficient way. Helping companies modernize, automate, and scale their operations through software.</p>
                    <a href="#technology" class="inline-block mt-4 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-semibold transition">Tech stack <i class="ri-arrow-right-line"></i></a>
                </div>
            </div>
        </div>
    </div>

    <div class="py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 class="text-lg font-kanit text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-10 text-center">Clients</h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <a href="https://meetbrackets.com/" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center p-6 bg-gray-200 dark:bg-gray-800 rounded-xl shadow hover:shadow-lg hover:-translate-y-1 transition">
                    <img src="{{ vite('source/_assets/images/logos/brackets.svg') }}" alt="Brackets" class="h-20 w-auto object-contain" />
                </a>

                <a href="https://remam.sk/" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center p-6 bg-gray-200 dark:bg-gray-800 rounded-xl shadow hover:shadow-lg hover:-translate-y-1 transition">
                    <img src="{{ vite('source/_assets/images/logos/remam.webp') }}" alt="RemaM" class="h-20 w-auto object-contain" />
                </a>

                <a href="https://yasmin-trade.com/" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center p-6 lg:py-12 bg-gray-200 dark:bg-gray-800 rounded-xl shadow hover:shadow-lg hover:-translate-y-1 transition">
                    <img src="{{ vite('source/_assets/images/logos/yasmin.png') }}" alt="Yasmin Trade" class="h-40 w-auto object-contain" />
                </a>

                <a href="https://stcham.com/" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center p-6 lg:py-12 bg-gray-200 dark:bg-gray-800 rounded-xl shadow hover:shadow-lg hover:-translate-y-1 transition">
                    <img src="{{ vite('source/_assets/images/logos/stcc.png') }}" alt="STCC" class="h-40 w-auto object-contain" />
                </a>
            </div>
        </div>
    </div>
</section>

{{-- Services --}}
<section id="services">
    <div class="bg-gray-50 dark:bg-gray-800 py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 class="font-kanit text-primary-600 dark:text-primary-400 text-4xl mb-6 text-center">Services</h2>

            <p class="text-gray-500 dark:text-gray-400 text-center max-w-2xl mx-auto mb-12">I help businesses digitalize and automate their workflows through custom-built software. From internal tools and dashboards to API integrations and AI-powered solutions.</p>

            <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <li class="bg-gray-200 dark:bg-gray-800 rounded-lg px-5 py-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition">Custom business applications (<strong class="text-primary-600 dark:text-primary-400">Laravel</strong>)</li>

                <li class="bg-gray-200 dark:bg-gray-800 rounded-lg px-5 py-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition">Business process automation</li>

                <li class="bg-gray-200 dark:bg-gray-800 rounded-lg px-5 py-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition">Dashboards & back-office systems</li>

                <li class="bg-gray-200 dark:bg-gray-800 rounded-lg px-5 py-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition">REST <strong class="text-primary-600 dark:text-primary-400">APIs</strong> & system integrations</li>

                <li class="bg-gray-200 dark:bg-gray-800 rounded-lg px-5 py-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition">AI chatbot integrations</li>

                <li class="bg-gray-200 dark:bg-gray-800 rounded-lg px-5 py-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition">Workflow automation</li>

                <li class="bg-gray-200 dark:bg-gray-800 rounded-lg px-5 py-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition">Legacy system modernization</li>

                <li class="bg-gray-200 dark:bg-gray-800 rounded-lg px-5 py-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition">Performance optimizations</li>

                <li class="bg-gray-200 dark:bg-gray-800 rounded-lg px-5 py-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition">Reducing technical debt & improving <strong class="text-primary-600 dark:text-primary-400">DX</strong></li>
            </ul>
        </div>
    </div>

    <div class="py-16">
        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 class="text-lg font-kanit text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-10 text-center">Frequently Asked Questions</h2>

            <div class="space-y-6">
                <div class="border-b border-gray-200 dark:border-gray-700 pb-6">
                    <p class="font-semibold text-lg dark:text-gray-200">Do you work with Squarespace / Framer / Wordpress / Drupal / Joomla?</p>

                    <p class="mt-2 text-gray-500 dark:text-gray-400"><i class="ri-close-line text-red-600 dark:text-red-400"></i> No. I know how to code and I use that knowledge to my advantage in building custom software based on my client's needs.</p>
                </div>

                <div class="border-b border-gray-200 dark:border-gray-700 pb-6">
                    <p class="font-semibold text-lg dark:text-gray-200">Can you make me a cheap website?</p>

                    <p class="mt-2 text-gray-500 dark:text-gray-400"><i class="ri-close-line text-red-600 dark:text-red-400"></i> No.</p>
                </div>

                <div>
                    <p class="font-semibold text-lg dark:text-gray-200">Can you fix my website ASAP?</p>

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
            <h2 class="font-kanit text-primary-600 dark:text-primary-400 text-4xl mb-6 text-center">Technology</h2>

            <p class="text-gray-500 dark:text-gray-400 text-center max-w-2xl mx-auto mb-16">I choose proven, modern tools that deliver reliable and maintainable business software. Every technology in my stack is selected to help your project scale and stay easy to work with.</p>

            <h3 class="text-lg font-kanit text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-10 text-center">Tech Stack</h3>

            <div class="grid grid-cols-3 gap-6 md:grid-cols-6 md:gap-10 mb-20 px-2 justify-items-center">
                @foreach([
                    ['file' => 'laravel.svg', 'label' => 'Laravel'],
                    ['file' => 'tailwindcss.svg', 'label' => 'Tailwind CSS'],
                    ['file' => 'claude.svg', 'label' => 'Claude'],
                    ['file' => 'inertiajs.svg', 'label' => 'Inertia.js'],
                    ['file' => 'mysql.svg', 'label' => 'MySQL'],
                    ['file' => 'vuejs.svg', 'label' => 'Vue.js'],
                ] as $logo)
                    <div tabindex="0" class="group relative flex items-center justify-center mt-4 md:mt-0 w-16 h-16 md:w-24 md:h-24 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 focus:grayscale-0 focus:opacity-100 transition duration-300 cursor-default outline-none">
                        <img
                            src="{{ vite("source/_assets/images/logos/{$logo['file']}") }}"
                            alt="{{ $logo['label'] }}"
                            class="w-auto"
                        />

                        <span class="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-0.5 text-[11px] sm:text-xs text-white opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-200">
                            {{ $logo['label'] }}
                        </span>
                    </div>
                @endforeach
            </div>

            <h3 class="text-lg font-kanit text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-10 text-center">Infrastructure</h3>

            <div class="flex flex-wrap justify-center gap-8 sm:gap-12">
                @foreach([
                    ['file' => 'websupport.webp', 'label' => 'Websupport'],
                    ['file' => 'forge.svg', 'label' => 'Laravel Forge'],
                ] as $logo)
                    <div tabindex="0" class="group relative flex items-center justify-center w-36 h-18 sm:w-48 sm:h-24 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 focus:grayscale-0 focus:opacity-100 transition duration-300 cursor-default outline-none">
                        <img
                            src="{{ vite("source/_assets/images/logos/{$logo['file']}") }}"
                            alt="{{ $logo['label'] }}"
                            class="w-auto"
                        />

                        <span class="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-0.5 text-[11px] sm:text-xs text-white opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-200">
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
    <div class="py-16">
        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 class="font-kanit text-primary-600 dark:text-primary-400 text-4xl mb-6 text-center">Contact</h2>

            <p class="text-gray-500 dark:text-gray-400 text-center mb-12">Ready to digitalize your business processes or automate a workflow? Let's discuss your product.</p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                {{-- Personal info --}}
                <div class="bg-gray-200 dark:bg-gray-700 rounded-lg shadow-sm p-6 flex flex-col items-center text-center hover:shadow-md transition">
                    <div class="bg-primary-100 dark:bg-primary-950 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                        <i class="ri-user-line text-primary-600 dark:text-primary-400 text-2xl"></i>
                    </div>
                    <p class="text-xl font-bold mb-4 dark:text-gray-200">Lukáš Neuschl</p>

                    <a href="mailto:{{ $page->company->contact->email }}" class="flex items-center gap-2 hover:text-primary-600 dark:hover:text-primary-400 transition mb-1">
                        <i class="ri-mail-fill text-primary-600 dark:text-primary-400"></i> {{ $page->company->contact->email }}
                    </a>

                    <a href="tel:{{ $page->company->contact->phone }}" class="flex items-center gap-2 hover:text-primary-600 dark:hover:text-primary-400 transition mb-1">
                        <i class="ri-phone-fill text-primary-600 dark:text-primary-400"></i> {{ $page->company->contact->phone }}
                    </a>

                    <a href="{{ $page->company->contact->messenger }}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 hover:text-primary-600 dark:hover:text-primary-400 transition mb-1">
                        <i class="ri-messenger-fill text-primary-600 dark:text-primary-400"></i> Messenger
                    </a>

                    <a href="{{ $page->company->contact->whatsapp }}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 hover:text-primary-600 dark:hover:text-primary-400 transition">
                        <i class="ri-whatsapp-fill text-primary-600 dark:text-primary-400"></i> WhatsApp
                    </a>
                </div>

                {{-- Address --}}
                <div class="bg-gray-200 dark:bg-gray-700 rounded-lg shadow-sm p-6 flex flex-col items-center text-center hover:shadow-md transition">
                    <div class="bg-primary-100 dark:bg-primary-950 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                        <i class="ri-map-pin-line text-primary-600 dark:text-primary-400 text-2xl"></i>
                    </div>
                    <p class="font-bold mb-2 dark:text-gray-200">Address</p>
                    <p>{{ $page->company->address->street }}</p>
                    <p>{{ $page->company->address->zip }}, {{ $page->company->address->city }}</p>
                    <p>{{ $page->company->address->country }}</p>
                </div>

                {{-- Company details --}}
                <div class="bg-gray-200 dark:bg-gray-700 rounded-lg shadow-sm p-6 flex flex-col items-center text-center md:col-span-2 hover:shadow-md transition">
                    <div class="bg-primary-100 dark:bg-primary-950 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                        <i class="ri-building-line text-primary-600 dark:text-primary-400 text-2xl"></i>
                    </div>
                    <p class="font-bold mb-2 dark:text-gray-200">Company Details</p>
                    <div class="flex flex-col">
                        <p><span class="text-primary-600 dark:text-primary-400">Company ID / IČO:</span> {{ $page->company->id }}</p>

                        <p><span class="text-primary-600 dark:text-primary-400">Tax ID / DIČ:</span> {{ $page->company->tax }}</p>

                        <p><span class="text-primary-600 dark:text-primary-400">IBAN:</span> {{ $page->company->iban }}</p>
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
            "name": "Do you work with Squarespace / Framer / Wordpress / Drupal / Joomla?",
            "acceptedAnswer": {
                "@@type": "Answer",
                "text": "No. I know how to code and I use that knowledge to my advantage in building custom software based on my client's needs."
            }
        },
        {
            "@@type": "Question",
            "name": "Can you make me a cheap website?",
            "acceptedAnswer": {
                "@@type": "Answer",
                "text": "No."
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
