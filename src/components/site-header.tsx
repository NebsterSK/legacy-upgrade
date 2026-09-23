'use client';

import { Menu } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { ThemeToggle } from '@/components/theme-toggle';
import { UpgradeMark } from '@/components/upgrade-arrow';
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
                'bg-background sticky top-0 z-50 border-b border-transparent transition-[border-color,box-shadow] duration-300',
                scrolled && 'border-border shadow-[0_1px_0_0_var(--border)]'
            )}
        >
            <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
                <a
                    href="#home"
                    className="font-kanit group flex items-center gap-2.5 text-lg font-bold tracking-tight"
                >
                    <UpgradeMark className="size-7 rounded-[3px] transition-transform duration-300 ease-(--ease-out-expo) group-hover:-translate-y-0.5" />
                    {nav.brand}
                </a>

                <div className="hidden h-full items-center gap-8 md:flex">
                    <nav className="flex h-full items-center gap-7">
                        {nav.items.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                aria-current={
                                    active === item.href.replace('#', '') ? 'true' : undefined
                                }
                                className={cn(
                                    'flex h-full items-center border-y-2 border-transparent text-[0.9375rem] font-medium transition-colors',
                                    active === item.href.replace('#', '')
                                        ? 'text-foreground border-b-primary'
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
