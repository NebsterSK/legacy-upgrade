'use client';

import { Menu } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { ThemeToggle } from '@/components/theme-toggle';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { nav } from '@/content';
import { useActiveSection } from '@/hooks/use-active-section';
import { cn } from '@/lib/utils';

const SECTION_IDS = nav.items.map((item) => item.href.replace('#', ''));

export function SiteHeader() {
    const headerRef = useRef<HTMLElement>(null);
    const [headerHeight, setHeaderHeight] = useState(64);
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const active = useActiveSection(SECTION_IDS, headerHeight);

    // Measure instead of hardcoding, so the scroll-spy offset tracks the real header.
    useEffect(() => {
        const el = headerRef.current;
        if (!el) return;
        setHeaderHeight(el.offsetHeight);
    }, []);

    // Shadow on scroll — passive listener, and only touch the DOM on state change.
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 0);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header
            ref={headerRef}
            className={cn(
                'bg-background/95 supports-[backdrop-filter]:bg-background/80 sticky top-0 z-50 border-b backdrop-blur transition-shadow',
                scrolled && 'shadow-sm'
            )}
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                <a href="#home" className="font-kanit text-xl">
                    {nav.brand}
                </a>

                <div className="hidden items-center gap-6 md:flex">
                    <nav className="flex items-center gap-6">
                        {nav.items.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                aria-current={
                                    active === item.href.replace('#', '') ? 'true' : undefined
                                }
                                className={cn(
                                    'text-sm transition-colors',
                                    active === item.href.replace('#', '')
                                        ? 'text-foreground font-semibold'
                                        : 'text-muted-foreground hover:text-foreground'
                                )}
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>

                    <ThemeToggle />
                </div>

                <div className="flex items-center gap-4 md:hidden">
                    <ThemeToggle />

                    <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
                        <SheetTrigger aria-label={nav.toggleAriaLabel} className="cursor-pointer">
                            <Menu className="size-6" aria-hidden />
                        </SheetTrigger>

                        <SheetContent side="right" className="w-64">
                            <SheetTitle className="font-kanit px-4 text-lg">
                                {nav.brand}
                            </SheetTitle>

                            <nav className="flex flex-col px-2">
                                {nav.items.map((item) => (
                                    <a
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setMenuOpen(false)}
                                        className={cn(
                                            'rounded-md px-2 py-2 text-sm transition-colors',
                                            active === item.href.replace('#', '')
                                                ? 'text-foreground font-semibold'
                                                : 'text-muted-foreground hover:text-foreground'
                                        )}
                                    >
                                        {item.label}
                                    </a>
                                ))}
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
