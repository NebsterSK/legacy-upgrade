@extends('_layouts.main')

@section('body')
<div class="py-16">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="font-kanit text-primary-600 text-4xl mb-12 text-center">Contact</h1>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            {{-- Personal info --}}
            <div class="bg-gray-200 rounded-lg shadow-sm p-6 flex flex-col items-center text-center hover:shadow-md transition">
                <div class="bg-primary-100 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    <i class="ri-user-line text-primary-600 text-2xl"></i>
                </div>
                <p class="text-xl font-bold mb-4">Lukáš Neuschl</p>

                <a href="mailto:{{ $page->company->contact->email }}" class="flex items-center gap-2 hover:text-primary-600 transition mb-1">
                    <i class="ri-mail-fill text-primary-600"></i> {{ $page->company->contact->email }}
                </a>

                <a href="tel:{{ $page->company->contact->phone }}" class="flex items-center gap-2 hover:text-primary-600 transition mb-1">
                    <i class="ri-phone-fill text-primary-600"></i> {{ $page->company->contact->phone }}
                </a>

                <a href="{{ $page->company->contact->messenger }}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 hover:text-primary-600 transition mb-1">
                    <i class="ri-messenger-fill text-primary-600"></i> Messenger
                </a>

                <a href="{{ $page->company->contact->whatsapp }}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 hover:text-primary-600 transition">
                    <i class="ri-whatsapp-fill text-primary-600"></i> WhatsApp
                </a>
            </div>

            {{-- Address --}}
            <div class="bg-gray-200 rounded-lg shadow-sm p-6 flex flex-col items-center text-center hover:shadow-md transition">
                <div class="bg-primary-100 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    <i class="ri-map-pin-line text-primary-600 text-2xl"></i>
                </div>
                <p class="font-bold mb-2">Address</p>
                <p>{{ $page->company->address->street }}</p>
                <p>{{ $page->company->address->zip }}, {{ $page->company->address->city }}</p>
                <p>{{ $page->company->address->country }}</p>
            </div>

            {{-- Company details --}}
            <div class="bg-gray-200 rounded-lg shadow-sm p-6 flex flex-col items-center text-center md:col-span-2 hover:shadow-md transition">
                <div class="bg-primary-100 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    <i class="ri-building-line text-primary-600 text-2xl"></i>
                </div>
                <p class="font-bold mb-2">Company Details</p>
                <div class="flex flex-col">
                    <p><span class="text-primary-600">Company ID / IČO:</span> {{ $page->company->id }}</p>

                    <p><span class="text-primary-600">Tax ID / DIČ:</span> {{ $page->company->tax }}</p>

                    <p><span class="text-primary-600">IBAN:</span> {{ $page->company->iban }}</p>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
