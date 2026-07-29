import { company, faq, links, schema, site } from '@/content';

/**
 * JSON-LD builders. Ported field-for-field from `source/_includes/ld-json.blade.php`
 * (ProfessionalService) and the `@section('jsonld')` block in `index.blade.php` (FAQPage).
 *
 * Blade needed `@@context` / `@@type` to escape the directive prefix; in TS the plain
 * `@context` / `@type` keys are correct.
 */

const absolute = (path: string) => new URL(path, site.url).toString();

export function professionalServiceSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        name: company.name,
        alternateName: schema.alternateName,
        url: site.url,
        email: company.contact.email,
        telephone: company.contact.phone,
        description: site.schemaDescription,
        priceRange: schema.priceRange,
        image: absolute('/opengraph-image.jpg'),
        serviceType: schema.serviceType,
        knowsAbout: schema.knowsAbout,
        areaServed: schema.areaServed.map((area) => ({
            '@type': area.type,
            name: area.name,
        })),
        address: {
            '@type': 'PostalAddress',
            streetAddress: company.address.street,
            addressLocality: company.address.city,
            postalCode: company.address.zip,
            addressCountry: schema.addressCountry,
        },
        founder: {
            '@type': 'Person',
            name: schema.founder.name,
            jobTitle: schema.founder.jobTitle,
            url: site.url,
            sameAs: [links.linkedin, links.github],
        },
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: schema.offerCatalog.name,
            itemListElement: schema.offerCatalog.items.map((item) => ({
                '@type': 'Offer',
                itemOffered: {
                    '@type': 'Service',
                    name: item.name,
                    description: item.description,
                },
            })),
        },
        sameAs: [links.linkedin, links.github],
    };
}

export function faqPageSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.schema.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
            },
        })),
    };
}
