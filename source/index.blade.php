@extends('_layouts.main')

@section('body')
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16">
    <div class="md:w-3/5 text-center md:text-left">
        <h1 class="font-kanit text-primary-600 text-4xl sm:text-5xl lg:text-6xl">Lukas Neuschl</h1>

        <p class="font-bold text-lg sm:text-xl text-gray-400">Freelance Web Developer</p>

{{--        <p class="mt-3 text-gray-400">Custom websites | Laravel applications</p>--}}

        <p class="mt-5 flex justify-center md:justify-start gap-4 text-4xl">
            <a href="{{ $page->links->linkedin }}" target="_blank" rel="noopener noreferrer" title="LinkedIn" class="text-gray-500 hover:text-primary-600 transition">
                <i class="ri-linkedin-fill"></i>
            </a>

            <a href="{{ $page->links->github }}" target="_blank" rel="noopener noreferrer" title="GitHub" class="text-gray-500 hover:text-primary-600 transition">
                <i class="ri-github-fill"></i>
            </a>

{{--            <a href="{{ $page->links->stack_overflow }}" target="_blank" rel="noopener noreferrer" title="Stack Overflow" class="text-gray-500 hover:text-primary-600 transition">--}}
{{--                <i class="ri-stack-overflow-fill"></i>--}}
{{--            </a>--}}
        </p>

        <div class="mt-8 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <a href="/contact" class="inline-block px-6 py-3 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-semibold text-center transition">Contact</a>

            <a href="/services" class="inline-block px-6 py-3 rounded-lg border-2 border-gray-500 text-gray-500 hover:bg-gray-100 font-semibold text-center transition">Services</a>
        </div>
    </div>

    <div class="md:w-2/5">
        <img src="{{ vite('source/_assets/images/portrait.webp') }}" alt="Lukas Neuschl, Full-stack Web Developer" class="w-48 h-48 sm:w-64 sm:h-64 md:w-full md:h-full rounded-full md:rounded-2xl object-cover shadow-lg" />
    </div>
</div>

<div class="bg-gray-50 py-16">
    <h2 class="font-kanit text-gray-600 text-2xl mb-2 text-center">Clients</h2>

    <p class="text-center text-gray-400 mb-10 max-w-xl mx-auto px-4">Companies I have had the pleasure of working with.</p>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <a href="https://meetbrackets.com/" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center p-6 bg-gray-200 rounded-xl shadow hover:shadow-lg hover:-translate-y-1 transition">
            <img src="{{ vite('source/_assets/images/logo_brackets.svg') }}" alt="Brackets" class="h-20 w-auto object-contain" />
        </a>

        <a href="https://remam.sk/" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center p-6 bg-gray-200 rounded-xl shadow hover:shadow-lg hover:-translate-y-1 transition">
            <img src="{{ vite('source/_assets/images/logo_remam.png') }}" alt="Rema M" class="h-20 w-auto object-contain" />
        </a>

        <a href="https://yasmin-trade.com/" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center p-6 bg-gray-200 rounded-xl shadow hover:shadow-lg hover:-translate-y-1 transition">
            <img src="{{ vite('source/_assets/images/logo_yasmin.png') }}" alt="Yasmin Trade" class="h-20 w-auto object-contain" />
        </a>

        <a href="https://stcham.com/" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center p-6 bg-gray-200 rounded-xl shadow hover:shadow-lg hover:-translate-y-1 transition">
            <img src="{{ vite('source/_assets/images/logo_stcc.png') }}" alt="STCC" class="h-20 w-auto object-contain" />
        </a>
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
