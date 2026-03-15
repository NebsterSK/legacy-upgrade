@extends('_layouts.main')

@section('body')
<div class="py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="font-kanit text-primary-600 text-4xl mb-12 text-center">Services</h1>

        <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <li class="bg-gray-200 rounded-lg px-5 py-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition"><strong class="text-primary-600">Laravel</strong> applications</li>
            <li class="bg-gray-200 rounded-lg px-5 py-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition">Back-office systems</li>
            <li class="bg-gray-200 rounded-lg px-5 py-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition">Dashboards</li>
            <li class="bg-gray-200 rounded-lg px-5 py-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition">REST <strong class="text-primary-600">APIs</strong></li>
            <li class="bg-gray-200 rounded-lg px-5 py-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition">AI chatbot integrations</li>
            <li class="bg-gray-200 rounded-lg px-5 py-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition">Performance optimizations</li>
            <li class="bg-gray-200 rounded-lg px-5 py-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition">Refactoring old codebase</li>
            <li class="bg-gray-200 rounded-lg px-5 py-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition">Reduction of technical debt</li>
            <li class="bg-gray-200 rounded-lg px-5 py-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition">Improving <strong class="text-primary-600">Developer Experience</strong></li>
        </ul>
    </div>
</div>

<div class="bg-gray-50 py-16">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-kanit text-gray-600 text-2xl mb-8 text-center">Frequently Asked Questions</h2>

        <div class="space-y-6">
            <div class="border-b border-gray-200 pb-6">
                <p class="font-semibold text-lg">Do you work with Squarespace / Framer / Wordpress / Drupal / Joomla?</p>
                <p class="mt-2 text-gray-500"><i class="ri-close-line text-red-600"></i> No. I know how to code and I use that knowledge to my advantage in building custom software based on my client's needs.</p>
            </div>

            <div class="border-b border-gray-200 pb-6">
                <p class="font-semibold text-lg">Can you make me a cheap website?</p>
                <p class="mt-2 text-gray-500"><i class="ri-close-line text-red-600"></i> No.</p>
            </div>

            <div>
                <p class="font-semibold text-lg">Can you fix my website ASAP?</p>
                <p class="mt-2 text-gray-500"><i class="ri-question-line text-yellow-500"></i> No. Well... maybe. But it will cost you extra.</p>
            </div>
        </div>
    </div>
</div>

<div class="py-16 text-center">
    <p class="text-2xl font-kanit text-gray-600 mb-6">Interested in working together?</p>
    <a href="/contact" class="inline-block px-6 py-3 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-semibold transition">Get in touch</a>
</div>
@endsection
