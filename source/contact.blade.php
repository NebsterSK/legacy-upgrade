@extends('_layouts.main')

@section('body')
<div class="container-lg">
    <div class="page-segment text-center">
        <h1 class="text-primary mb-3">Contact</h1>

        <p class="lead">Lukáš Neuschl</p>

        <p>
            <i class="fa-solid fa-envelope"></i> <a href="mailto:{{ $page->company->email }}">{{ $page->company->email }}</a>
        </p>

        <p>
            <i class="fa-solid fa-phone"></i> <a href="mailto:{{ $page->company->phone }}">{{ $page->company->phone }}</a>
        </p>

{{--        <hr>--}}

{{--        <p>{{ $page->company->address->street }}</p>--}}

{{--        <p>{{ $page->company->address->zip }}, {{ $page->company->address->city }}</p>--}}

{{--        <p>{{ $page->company->address->country }}</p>--}}

{{--        <hr>--}}

{{--        <p>Company ID (IČO): {{ $page->company->id }}</p>--}}

{{--        <p>Tax ID (DIČ): {{ $page->company->tax }}</p>--}}
    </div>
</div>
@endsection
