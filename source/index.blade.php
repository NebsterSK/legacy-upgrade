@extends('_layouts.main')

@section('body')
<div class="container-lg">
    <div class="page-segment">
        <div class="row">
            <div class="col-12 col-lg-7">
                <div class="d-flex align-items-center h-100">
                    <div>
                        <span class="badge text-bg-secondary text-light">Lukáš Neuschl</span>

                        <p class="display-4 text-primary fw-bold mb-1 f-kanit"><strong>Full-stack Web Developer</strong></p>

                        <p class="mb-5">I am a freelance Laravel developer from Slovakia with 12 years of experience in website development.</p>

                        <p class="mb-4 mb-lg-5">
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

                        <a href="/contact" class="btn btn-primary btn-lg d-block mb-2 d-lg-inline-block me-lg-2">Contact</a>

                        <a href="/services" class="btn btn-lg btn-outline-secondary d-block d-lg-inline-block">Services</a>
                    </div>
                </div>
            </div>

            <div class="col-12 col-lg-5">
                <img src="{{ mix('images/portrait.webp', 'assets/build') }}" class="img-fluid mt-5 mt-lg-0" alt="" />
            </div>
        </div>
    </div>
</div>

<div class="container-fluid bg-secondary-light">
    <div class="page-segment text-center">
        <h2 class="mb-1 f-kanit text-dark">What I do</h2>

        <p class="lead mb-5">I build <strong>custom websites & webapps</strong> according to my client's needs and specifications.</p>

        <a href="/services" class="btn btn-primary">What do I specialize in?</a>
    </div>
</div>

<div class="container-lg">
    <div class="page-segment text-center">
        <h2 class="mb-1 f-kanit text-dark">Why I do it</h2>

        <p class="lead">Because <strong>I love to solve technological challenges</strong> in the most efficient way.</p>

{{--        <a href="{{ $page->baseUrl }}/technology" class="btn btn-primary">How do I achieve that?</a>--}}
    </div>

{{--    <div class="page-segment">--}}
{{--        <p>(video vizitka)</p>--}}
{{--    </div>--}}
</div>
@endsection
