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

                <p>Par viet o mne</p>
            </div>
        </div>
    </div>

    <div class="page-segment">
        <p>What I do</p>

        <p>...</p>
    </div>

    <div class="page-segment">
        <p>Why I do it</p>

        <p>...</p>
    </div>

    <div class="page-segment">
        <p>(video vizitka)</p>
    </div>
</div>
@endsection
