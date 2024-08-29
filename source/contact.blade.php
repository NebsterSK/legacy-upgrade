@extends('_layouts.main')

@section('body')
<div class="container-lg">
    <div class="page-segment">
        <h1>Contact</h1>

        <p class="lead">Lukáš Neuschl</p>

        <p>
            <a href="mailto:{{ $page->company->email }}">{{ $page->company->email }}</a>
        </p>

        <p>{{ $page->company->phone }}</p>

        <hr>

        <p>{{ $page->company->address->street }}</p>

        <p>{{ $page->company->address->zip }}, {{ $page->company->address->city }}</p>

        <p>{{ $page->company->address->country }}</p>

        <hr>

        <p>Company ID (IČO): {{ $page->company->id }}</p>

        <p>Tax ID (DIČ): {{ $page->company->tax }}</p>
    </div>
</div>
@endsection
