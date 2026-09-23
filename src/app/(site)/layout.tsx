import { JsonLd } from '@/components/json-ld';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { faqPageSchema, professionalServiceSchema } from '@/lib/jsonld';

/**
 * The public site's chrome: header, footer and the structured data. A route group, so it
 * wraps `/` without adding a URL segment, and stays off internal pages such as /brand.
 */
export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <SiteHeader />

            <main className="grow">{children}</main>

            <SiteFooter />

            <JsonLd data={professionalServiceSchema()} />
            <JsonLd data={faqPageSchema()} />
        </>
    );
}
