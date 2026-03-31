<script type="application/ld+json">
{
    "@@context": "https://schema.org",
    "@@type": "ProfessionalService",
    "name": "{{ $page->company->name }}",
    "url": "{{ $page->baseUrl }}",
    "email": "{{ $page->company->contact->email }}",
    "telephone": "{{ $page->company->contact->phone }}",
    "description": "{{ $page->description }}",
    "address": {
        "@@type": "PostalAddress",
        "streetAddress": "{{ $page->company->address->street }}",
        "addressLocality": "{{ $page->company->address->city }}",
        "postalCode": "{{ $page->company->address->zip }}",
        "addressCountry": "SK"
    },
    "sameAs": [
        "{{ $page->links->linkedin }}",
        "{{ $page->links->github }}"
    ]
}
</script>