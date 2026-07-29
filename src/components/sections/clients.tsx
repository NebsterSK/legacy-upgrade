import { ExternalLink } from 'lucide-react';
import Image from 'next/image';

import { SubsectionHeader } from '@/components/section-header';
import { Card, CardContent } from '@/components/ui/card';
import { clients } from '@/content';
import { logos } from '@/lib/logos';

/**
 * Ported from `source/index.blade.php:61-107`.
 *
 * The old markup alternated logo-left / logo-right / stacked per client. Flattened to a
 * uniform Card grid — design fidelity is explicitly not a goal for this refactor.
 */
export function Clients() {
    return (
        <div className="py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SubsectionHeader>{clients.heading}</SubsectionHeader>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {clients.items.map((item) => (
                        <Card key={item.body} className="flex flex-col">
                            <CardContent className="flex grow flex-col gap-6">
                                <div className="flex items-center justify-center gap-8">
                                    {item.logos.map((logo) => (
                                        <Image
                                            key={logo.file}
                                            src={logos[logo.file]}
                                            alt={logo.alt}
                                            className="h-16 w-auto object-contain sm:h-20"
                                        />
                                    ))}
                                </div>

                                <p className="text-muted-foreground grow text-sm">{item.body}</p>

                                <div className="flex flex-col gap-1">
                                    {item.links.map((link) => (
                                        <a
                                            key={link.href}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 text-sm underline transition-colors hover:no-underline"
                                        >
                                            {link.label}
                                            <ExternalLink className="size-3.5" aria-hidden />
                                        </a>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
