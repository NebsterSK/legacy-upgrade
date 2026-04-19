<script type="application/ld+json">
{
    "@@context": "https://schema.org",
    "@@type": "ProfessionalService",
    "name": "{{ $page->company->name }}",
    "alternateName": "Legacy Upgrade",
    "url": "{{ $page->baseUrl }}",
    "email": "{{ $page->company->contact->email }}",
    "telephone": "{{ $page->company->contact->phone }}",
    "description": "{{ $page->description }}",
    "priceRange": "€€",
    "image": "{{ $page->baseUrl }}/assets/build/images/portrait.webp",
    "serviceType": [
        "Custom software development",
        "Business process automation",
        "Digitalization",
        "Legacy system modernization",
        "API integration",
        "AI integration"
    ],
    "knowsAbout": [
        "Custom software development",
        "Business automation",
        "Digital transformation",
        "Legacy system modernization",
        "Laravel",
        "Vue.js",
        "REST API integration",
        "MySQL",
        "AI integration"
    ],
    "areaServed": [
        {
            "@@type": "Country",
            "name": "Slovakia"
        },
        {
            "@@type": "Place",
            "name": "European Union"
        }
    ],
    "address": {
        "@@type": "PostalAddress",
        "streetAddress": "{{ $page->company->address->street }}",
        "addressLocality": "{{ $page->company->address->city }}",
        "postalCode": "{{ $page->company->address->zip }}",
        "addressCountry": "SK"
    },
    "founder": {
        "@@type": "Person",
        "name": "Lukáš Neuschl",
        "jobTitle": "Software Developer",
        "url": "{{ $page->baseUrl }}",
        "sameAs": [
            "{{ $page->links->linkedin }}",
            "{{ $page->links->github }}"
        ]
    },
    "hasOfferCatalog": {
        "@@type": "OfferCatalog",
        "name": "Custom software services",
        "itemListElement": [
            {
                "@@type": "Offer",
                "itemOffered": {
                    "@@type": "Service",
                    "name": "Custom business software",
                    "description": "Internal tools, dashboards, and back-office systems built to match your operations."
                }
            },
            {
                "@@type": "Offer",
                "itemOffered": {
                    "@@type": "Service",
                    "name": "Process & workflow automation",
                    "description": "Automated workflows that remove repetitive manual tasks and reduce errors."
                }
            },
            {
                "@@type": "Offer",
                "itemOffered": {
                    "@@type": "Service",
                    "name": "API & system integrations",
                    "description": "Connecting existing tools, databases, and third-party services into a single reliable system."
                }
            },
            {
                "@@type": "Offer",
                "itemOffered": {
                    "@@type": "Service",
                    "name": "Legacy system modernization",
                    "description": "Replacing or upgrading outdated software without disrupting ongoing business operations."
                }
            }
        ]
    },
    "sameAs": [
        "{{ $page->links->linkedin }}",
        "{{ $page->links->github }}"
    ]
}
</script>
