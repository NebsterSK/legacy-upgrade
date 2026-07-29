import { Faq } from '@/components/sections/services/faq';
import { Pricing } from '@/components/sections/services/pricing';
import { Process } from '@/components/sections/services/process';
import { ServicesGrid } from '@/components/sections/services/services-grid';

export function Services() {
    return (
        <section id="services">
            <ServicesGrid />
            <Process />
            <Pricing />
            <Faq />
        </section>
    );
}
