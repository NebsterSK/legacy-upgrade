import { Contact } from '@/components/sections/contact';
import { Home } from '@/components/sections/home';
import { Services } from '@/components/sections/services';
import { Technology } from '@/components/sections/technology';

export default function Page() {
    return (
        <>
            <Home />
            <Services />
            <Technology />
            <Contact />
        </>
    );
}
