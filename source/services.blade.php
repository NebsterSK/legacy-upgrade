@extends('_layouts.main')

@section('pageTitle', 'Services')
@section('pageDescription', 'Business automation, custom dashboards, REST APIs, AI integrations, and legacy system modernization. Tailored software solutions for your company.')

@section('body')
<div class="py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="font-kanit text-primary-600 dark:text-primary-400 text-4xl mb-6 text-center">Services</h1>

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

<div class="bg-gray-50 dark:bg-gray-800 py-16">
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

<div class="py-16 text-center">
    <h2 class="text-lg font-kanit text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-10 text-center">Interested in working together?</h2>

    <a href="/contact" class="inline-block px-6 py-3 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-semibold transition">Get in touch</a>
</div>
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
