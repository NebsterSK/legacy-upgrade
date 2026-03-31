@extends('_layouts.main')

@section('pageTitle', 'Technology')
@section('pageDescription', 'Built on Laravel, Vue.js, Tailwind CSS, and Claude AI. Modern tech stack for reliable, scalable business software and automation.')

@section('body')
<div class="py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="font-kanit text-primary-600 text-4xl mb-6 text-center">Technology</h1>

        <p class="text-gray-500 text-center max-w-2xl mx-auto mb-16">I choose proven, modern tools that deliver reliable and maintainable business software. Every technology in my stack is selected to help your project scale and stay easy to work with.</p>

        <h2 class="text-lg font-kanit text-gray-400 uppercase tracking-widest mb-10 text-center">Tech Stack</h2>

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

        <h2 class="text-lg font-kanit text-gray-400 uppercase tracking-widest mb-10 text-center">Infrastructure</h2>

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

<div class="bg-gray-50 py-16 text-center">
    <h2 class="text-lg font-kanit text-gray-400 uppercase tracking-widest mb-10 text-center">Interested in working together?</h2>

    <a href="/contact" class="inline-block px-6 py-3 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-semibold transition">Get in touch</a>
</div>
@endsection
