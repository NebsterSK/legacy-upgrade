import { About } from '@/components/sections/about';
import { Clients } from '@/components/sections/clients';
import { Hero } from '@/components/sections/hero';

export function Home() {
    return (
        <section id="home">
            <Hero />
            <About />
            <Clients />
        </section>
    );
}
