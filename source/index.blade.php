@extends('_layouts.main')

@section('pageTitle', 'Digitalization & Custom Software for Businesses')
@section('pageDescription', 'Custom software, automation, and digitalization solutions for businesses. Freelance developer in Bratislava specializing in Laravel, APIs, and AI integrations.')

@section('body')
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16">
    <div class="md:w-3/5 text-center md:text-left">
        <h1 class="font-kanit text-primary-600 text-4xl sm:text-5xl lg:text-6xl">Lukas Neuschl</h1>

        <p class="font-bold text-lg sm:text-xl text-gray-400 dark:text-gray-500">Freelance Software Developer</p>

{{--        <p class="mt-3 text-gray-400">I help businesses digitalize their processes through custom software, automation, and modern integrations.</p>--}}

        <p class="mt-5 flex justify-center md:justify-start gap-4 text-4xl">
            <a href="{{ $page->links->linkedin }}" target="_blank" rel="noopener noreferrer" title="LinkedIn" class="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition">
                <i class="ri-linkedin-fill"></i>
            </a>

            <a href="{{ $page->links->github }}" target="_blank" rel="noopener noreferrer" title="GitHub" class="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition">
                <i class="ri-github-fill"></i>
            </a>
        </p>

        <div class="mt-8 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <a href="/contact" class="inline-block px-6 py-3 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-semibold text-center transition">Contact</a>

            <a href="/services" class="inline-block px-6 py-3 rounded-lg border-2 border-gray-500 text-gray-500 hover:bg-gray-100 dark:border-gray-500 dark:text-gray-400 dark:hover:bg-gray-800 font-semibold text-center transition">Services</a>
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
                <a href="/services" class="inline-block mt-4 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-semibold transition">Services <i class="ri-arrow-right-line"></i></a>
            </div>

            <div class="text-center md:text-left">
                <h2 class="font-kanit text-primary-600 dark:text-primary-400 text-2xl mb-4">Why I do it</h2>
                <p class="text-gray-500 dark:text-gray-400">Because I love to <strong>solve technological challenges</strong> in the most efficient way. Helping companies modernize, automate, and scale their operations through software.</p>
                <a href="/technology" class="inline-block mt-4 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-semibold transition">Tech stack <i class="ri-arrow-right-line"></i></a>
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
@endsection
