@extends('_layouts.main')

@section('body')
<div class="container-lg">
    <div class="page-segment">
        <div class="row">
            <div class="col-12 col-lg-6">
                <img src="{{ mix('images/portrait.jpeg', 'assets/build') }}" class="img-fluid img-thumbnail" alt="" />
            </div>

            <div class="col-12 col-lg-6">
                <p class="lead">Lukas Neuschl</p>

                <p><strong>Full-stack Web Developer</strong></p>

                <p>I am a freelance Laravel developer from Slovakia with 15 years of experience with website development in PHP.</p>

                <p class="mb-4">
                    <a href="{{ $page->links->linkedin }}" target="_blank" title="LinkedIn" class="social-icon-link">
                        @include('components/icons/linkedin')
                    </a>

                    <a href="{{ $page->links->github }}" target="_blank" title="GitHub" class="social-icon-link">
                        @include('components/icons/github')
                    </a>

                    <a href="{{ $page->links->stackoverflow }}" target="_blank" title="Stack Overflow" class="social-icon-link">
                        @include('components/icons/stack-overflow')
                    </a>
                </p>

                <a href="{{ $page->baseUrl }}/contact" class="btn btn-primary">Contact me</a>
            </div>
        </div>
    </div>

    <div class="page-segment text-center">
        <h2>What I do</h2>

        <p class="lead">I build <strong>custom websites & webapps</strong> according to my client's needs and specifications.</p>

        <a href="{{ $page->baseUrl }}/services" class="btn btn-primary">What do I specialize in?</a>
    </div>

    <div class="page-segment text-center">
        <h2>Why I do it</h2>

        <p class="lead">Because <strong>I love to solve technological challenges</strong> in the most efficient way.</p>

        <a href="{{ $page->baseUrl }}/technology" class="btn btn-primary">How do I achieve that?</a>
    </div>

{{--    <div class="page-segment">--}}
{{--        <p>(video vizitka)</p>--}}
{{--    </div>--}}
</div>
@endsection
