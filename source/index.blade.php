@extends('_layouts.main')

@section('body')
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16">
    <div class="flex-1 text-center md:text-left">
        <p class="slide-from-left animation-delay-1s text-primary-600 text-4xl sm:text-5xl lg:text-6xl font-bold">Lukáš Neuschl</p>

        <p class="slide-from-right animation-delay-1s font-kanit font-bold mt-3 text-lg sm:text-xl text-gray-500">Full-stack developer</p>

        <p class="mt-2 text-gray-400">Custom websites | Laravel applications | Developer Experience</p>

        <p class="mt-5 flex justify-center md:justify-start gap-4 text-4xl">
            <a href="{{ $page->links->linkedin }}" target="_blank" title="LinkedIn" class="text-gray-500 hover:text-primary-600 transition">
                <i class="ri-linkedin-fill"></i>
            </a>

            <a href="{{ $page->links->github }}" target="_blank" title="GitHub" class="text-gray-500 hover:text-primary-600 transition">
                <i class="ri-github-fill"></i>
            </a>

            <a href="{{ $page->links->stack_overflow }}" target="_blank" title="Stack Overflow" class="text-gray-500 hover:text-primary-600 transition">
                <i class="ri-stack-overflow-fill"></i>
            </a>
        </p>

        <div class="mt-8 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <a href="/contact" class="inline-block px-6 py-3 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-semibold text-center transition">Contact</a>

            <a href="/services" class="inline-block px-6 py-3 rounded-lg border-2 border-gray-500 text-gray-500 hover:bg-gray-100 font-semibold text-center transition">Services</a>
        </div>
    </div>

    <div class="shrink-0">
        <img src="{{ vite('source/_assets/images/portrait.webp') }}" alt="" class="hero-image w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 rounded-full md:rounded-2xl object-cover shadow-lg" />
    </div>
</div>

{{--<div>--}}
{{--    <div>--}}
{{--        <h2>What I do</h2>--}}

{{--        <p>I build <strong>custom websites & webapps</strong> according to my client's needs and specifications.</p>--}}

{{--        <a href="/services">What do I specialize in?</a>--}}
{{--    </div>--}}
{{--</div>--}}

{{--<div>--}}
{{--    <div>--}}
{{--        <h2>Why I do it</h2>--}}

{{--        <p>Because <strong>I love to solve technological challenges</strong> in the most efficient way.</p>--}}

{{--        <a href="/technology">How do I achieve that?</a>--}}
{{--    </div>--}}
{{--</div>--}}
@endsection
