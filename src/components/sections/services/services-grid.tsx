import { SectionHeader } from '@/components/section-header';
import { services } from '@/content';
import { getIcon } from '@/lib/icons';

/** Ported from `source/index.blade.php:111-139`. */
export function ServicesGrid() {
    return (
        <div className="bg-muted/50 py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionHeader>{services.heading}</SectionHeader>

                <p className="text-muted-foreground mx-auto mb-12 max-w-2xl text-center">
                    {services.intro}
                </p>

                <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {services.items.map((item) => {
                        const Icon = getIcon(item.icon);
                        return (
                            <li
                                key={item.text}
                                className="bg-card flex items-center gap-4 rounded-lg border p-5 shadow-sm"
                            >
                                <div className="bg-muted flex size-10 shrink-0 items-center justify-center rounded-full">
                                    <Icon className="size-5" aria-hidden />
                                </div>
                                <span className="text-sm font-semibold">{item.text}</span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
