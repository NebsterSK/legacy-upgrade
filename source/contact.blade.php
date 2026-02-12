@extends('_layouts.main')

@section('body')
<div class="text-center py-16">
    <h1 class="font-kanit text-primary text-4xl mb-4">Contact</h1>

    <p class="text-xl font-bold mb-2">Lukáš Neuschl</p>

    <p class="mb-2">
        <i class="ri-mail-fill"></i> <a href="mailto:{{ $page->company->email }}" class="hover:text-primary transition">{{ $page->company->email }}</a>
    </p>

    <p class="mb-2">
        <i class="ri-phone-fill"></i> <a href="mailto:{{ $page->company->phone }}" class="hover:text-primary transition">{{ $page->company->phone }}</a>
    </p>

{{--        <hr>--}}

{{--        <p>{{ $page->company->address->street }}</p>--}}

{{--        <p>{{ $page->company->address->zip }}, {{ $page->company->address->city }}</p>--}}

{{--        <p>{{ $page->company->address->country }}</p>--}}

{{--        <hr>--}}

{{--        <p>Company ID (IČO): {{ $page->company->id }}</p>--}}

{{--        <p>Tax ID (DIČ): {{ $page->company->tax }}</p>--}}

</div>
@endsection
