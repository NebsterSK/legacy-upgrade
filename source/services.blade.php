@extends('_layouts.main')

@section('body')
<div class="py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="font-kanit text-primary-600 text-4xl mb-8 text-center">Services</h1>

        <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <li class="bg-gray-200 rounded-lg hover:text-primary-600 px-5 py-4 shadow-sm"><strong>Laravel</strong> applications</li>
            <li class="bg-gray-200 rounded-lg hover:text-primary-600 px-5 py-4 shadow-sm">Back-office systems</li>
            <li class="bg-gray-200 rounded-lg hover:text-primary-600 px-5 py-4 shadow-sm">Dashboards</li>
            <li class="bg-gray-200 rounded-lg hover:text-primary-600 px-5 py-4 shadow-sm">REST <strong>APIs</strong></li>
            <li class="bg-gray-200 rounded-lg hover:text-primary-600 px-5 py-4 shadow-sm">AI chatbot integrations</li>
            <li class="bg-gray-200 rounded-lg hover:text-primary-600 px-5 py-4 shadow-sm">Performance optimizations</li>
            <li class="bg-gray-200 rounded-lg hover:text-primary-600 px-5 py-4 shadow-sm">Refactoring old codebase</li>
            <li class="bg-gray-200 rounded-lg hover:text-primary-600 px-5 py-4 shadow-sm">Reduction of technical debt</li>
            <li class="bg-gray-200 rounded-lg hover:text-primary-600 px-5 py-4 shadow-sm">Improving <strong>Developer Experience</strong></li>
        </ul>
    </div>
</div>

<div class="py-16">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="f-kanit text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>

        <div class="space-y-6">
            <div class="border-b border-gray-200 pb-6">
                <p class="font-semibold text-lg">Do you work with Wordpress?</p>
                <p class="mt-2 text-gray-500">No.</p>
            </div>

            <div class="border-b border-gray-200 pb-6">
                <p class="font-semibold text-lg">Can you make me a cheap website?</p>
                <p class="mt-2 text-gray-500">No.</p>
            </div>

            <div>
                <p class="font-semibold text-lg">Can you fix my website ASAP?</p>
                <p class="mt-2 text-gray-500">No.</p>
            </div>
        </div>
    </div>
</div>
@endsection
