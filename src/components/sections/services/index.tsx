import { Faq } from '@/components/sections/services/faq';
import { Pricing } from '@/components/sections/services/pricing';
import { Process } from '@/components/sections/services/process';
import { ServicesGrid } from '@/components/sections/services/services-grid';

export function Services() {
    return (
        <section id="services">
            <ServicesGrid />
            <Process />
        </section>
    );
}

/**
 * Pricing is a top-level section with its own nav item. The FAQ stays with it: the three
 * questions are about what working together costs and excludes, so they read as the
 * small print under the prices.
 */
export function PricingSection() {
    return (
        <section id="pricing">
            <Pricing />
            <Faq />
        </section>
    );
}
