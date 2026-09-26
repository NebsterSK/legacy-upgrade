import { company, faq, links, pricing, schema, site } from '@/content';

/**
 * JSON-LD builders. Originally ported field-for-field from
 * `source/_includes/ld-json.blade.php` (ProfessionalService) and the
 * `@section('jsonld')` block in `index.blade.php` (FAQPage).
 *
 * Blade needed `@@context` / `@@type` to escape the directive prefix; in TS the plain
 * `@context` / `@type` keys are correct.
 *
 * Everything here must be true of the page that ships. `schema.serviceType` /
 * `schema.offerCatalog` track the Services section, `schema.knowsAbout` tracks the
 * Technology section, the offers track the Pricing section, and the FAQPage is built
 * from the same `faq.visible` the FAQ renders.
 */

const absolute = (path: string) => new URL(path, site.url).toString();

const CURRENCY = 'EUR';
/** UN/CEFACT code for "hour", the unit schema.org expects on a per-hour rate. */
const UNIT_HOUR = 'HUR';

/**
 * One schema.org Offer per pricing tier, from the numeric `offer` on each tier — a
 * fixed-scope floor price, and an hourly rate as a UnitPriceSpecification.
 */
function offers() {
    return pricing.tiers.map((tier) => ({
        '@type': 'Offer',
        name: tier.title,
        priceCurrency: CURRENCY,
        priceSpecification:
            'perHour' in tier.offer
                ? {
                      '@type': 'UnitPriceSpecification',
                      price: tier.offer.price,
                      priceCurrency: CURRENCY,
                      unitCode: UNIT_HOUR,
                  }
                : {
                      '@type': 'PriceSpecification',
                      minPrice: tier.offer.minPrice,
                      priceCurrency: CURRENCY,
                  },
    }));
}

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
        currenciesAccepted: CURRENCY,
        offers: offers(),
        image: absolute('/opengraph-image.jpg'),
        serviceType: schema.serviceType,
        knowsAbout: schema.knowsAbout,
        audience: {
            '@type': 'BusinessAudience',
            name: schema.audience.name,
            description: schema.audience.description,
            numberOfEmployees: {
                '@type': 'QuantitativeValue',
                minValue: schema.audience.employees.min,
                maxValue: schema.audience.employees.max,
            },
        },
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

/**
 * Built from `faq.visible` — the questions actually on the page. Do not point this at a
 * separate set of copy: FAQPage markup that is not visible in the rendered HTML is what
 * Google flags, and that is exactly the state this site was in until 2026-09-26.
 */
export function faqPageSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.visible.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
            },
        })),
    };
}
