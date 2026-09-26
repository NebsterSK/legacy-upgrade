/** Site-wide metadata. Verbatim from `source/_layouts/main.blade.php`, `_includes/og.blade.php`, `_includes/twitter.blade.php`, and `config.php`. */
export const site = {
    /** `config.php` → `title`. Used as OG `site_name` and the title suffix. */
    name: 'Legacy Upgrade',

    /** `index.blade.php` → `@section('pageTitle')`. */
    pageTitle: 'Custom Software & Business Automation',

    /** The layout appended ` | Legacy Upgrade` to every title. */
    titleTemplate: '%s | Legacy Upgrade',

    /** `index.blade.php` → `@section('pageDescription')`. The `<meta name="description">`. */
    pageDescription:
        '12 years of custom software, automation, and digitalization for businesses. Internal tools, integrations, and legacy system modernization. Free consultation.',

    /**
     * `config.php` → `description`. DIFFERENT from `pageDescription` — this one is
     * only used for the JSON-LD `ProfessionalService.description`. Both are kept.
     */
    schemaDescription:
        '12 years of custom software development, business automation, and digitalization for companies in Slovakia. Reliable internal tools, dashboards, API integrations, and modernization of legacy systems.',

    /** `config.production.php` → `baseUrl`. Overridable via NEXT_PUBLIC_SITE_URL (Task 12). */
    url: 'https://legacy-upgrade.com',

    /** `og.blade.php` */
    ogType: 'website',
    ogLocale: 'en_US',

    /** `og.blade.php` / `twitter.blade.php` — identical `image:alt` on both. */
    imageAlt:
        'Lukáš Neuschl — custom software, automation, and digitalization for businesses',

    /** `twitter.blade.php` */
    twitterCard: 'summary_large_image',

    /** `main.blade.php` — Google Analytics measurement ID. */
    gaMeasurementId: 'G-BECNN06810',
} as const;
