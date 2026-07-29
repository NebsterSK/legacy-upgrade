import { ExternalLink } from 'lucide-react';
import Image from 'next/image';

import logo from '@/assets/images/favicon.png';
import { CurrentYear } from '@/components/current-year';
import { footer } from '@/content';

export function SiteFooter() {
    return (
        <footer className="bg-muted/50 border-t py-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-8 md:flex-row">
                    <div className="text-center md:text-left">
                        <p className="mb-3 font-bold">{footer.social.heading}</p>

                        {footer.social.items.map((item) => (
                            <p key={item.href} className="mb-1">
                                <a
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm transition-colors"
                                >
                                    {item.label}
                                    <ExternalLink className="size-3.5" aria-hidden />
                                </a>
                            </p>
                        ))}
                    </div>

                    <div className="flex grow flex-col justify-end text-center md:text-right">
                        <a href={footer.logoHref} className="self-center md:self-end">
                            <Image
                                src={logo}
                                alt={footer.logoAlt}
                                width={48}
                                height={48}
                                className="mb-3"
                            />
                        </a>

                        <p className="text-muted-foreground text-sm">
                            <span className="font-kanit">{footer.wordmark}</span> ©{' '}
                            <CurrentYear />
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
