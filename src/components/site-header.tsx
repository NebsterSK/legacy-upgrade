'use client';

import { Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { ThemeToggle } from '@/components/theme-toggle';
import { ContentIcon } from '@/components/content-icon';
import { UpgradeArrow, UpgradeMark } from '@/components/upgrade-arrow';
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { contact, nav } from '@/content';
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
            <div className="mx-auto flex h-(--header-height) w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
                <a
                    href="#home"
                    className="font-kanit flex items-center gap-2.5 text-lg font-normal"
                >
                    <UpgradeMark className="size-7 rounded-[3px]" />
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

                        {/*
                            The phone menu is the hero in miniature: the brand drench, the arrow
                            motif rising from the bottom corner, the links set big in Kanit so
                            they are easy thumb targets. The active section is white and marked
                            with the logo arrow; the rest sit back in the muted tone. The way to
                            get in touch (email, phone) closes the panel, because contact is
                            the product.
                        */}
                        <SheetContent
                            side="right"
                            showCloseButton={false}
                            className="bg-brand text-brand-foreground isolate w-full gap-0 overflow-hidden border-0 data-[side=right]:w-full data-[side=right]:border-l-0 data-[side=right]:data-open:slide-in-from-right data-[side=right]:data-closed:slide-out-to-right sm:max-w-sm"
                        >
                            <UpgradeArrow className="lift text-brand-line absolute -right-[30%] -bottom-[18%] -z-10 w-[120%] opacity-60" />

                            <div className="flex h-(--header-height) shrink-0 items-center justify-between px-5 sm:px-8">
                                <SheetTitle className="font-kanit text-brand-foreground flex items-center gap-2.5 text-lg font-normal">
                                    <span className="bg-brand-foreground text-brand grid size-7 place-items-center rounded-[3px]">
                                        <UpgradeArrow className="size-[62%]" />
                                    </span>
                                    {nav.brand}
                                </SheetTitle>

                                <SheetClose
                                    aria-label={nav.closeAriaLabel}
                                    className="focus-visible:ring-brand-foreground -mr-2 grid size-11 cursor-pointer place-items-center rounded-(--radius) outline-none focus-visible:ring-2"
                                >
                                    <X className="size-6" aria-hidden />
                                </SheetClose>
                            </div>

                            <nav className="mt-6 flex flex-col px-5 sm:px-8">
                                {nav.items.map((item, index) => {
                                    const current = active === item.href.replace('#', '');
                                    return (
                                        <a
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setMenuOpen(false)}
                                            aria-current={current ? 'true' : undefined}
                                            style={{ '--i': index } as React.CSSProperties}
                                            className={cn(
                                                'rise border-brand-line font-kanit focus-visible:ring-brand-foreground flex items-center justify-between border-b py-4 text-[2.5rem] leading-none font-bold tracking-[-0.02em] outline-none focus-visible:ring-2',
                                                current
                                                    ? 'text-brand-foreground'
                                                    : 'text-brand-muted-foreground hover:text-brand-foreground'
                                            )}
                                        >
                                            {item.label}
                                            {current && <UpgradeArrow className="size-6 rotate-90" />}
                                        </a>
                                    );
                                })}
                            </nav>

                            <div
                                className="rise mt-auto space-y-1 px-5 pb-10 sm:px-8"
                                style={{ '--i': nav.items.length } as React.CSSProperties}
                            >
                                {contact.person.methods
                                    .filter((method) => !method.external)
                                    .map((method) => (
                                        <a
                                            key={method.href}
                                            href={method.href}
                                            className="focus-visible:ring-brand-foreground -mx-2 flex items-center gap-3 rounded-(--radius) px-2 py-2 text-lg font-semibold tabular-nums outline-none focus-visible:ring-2"
                                        >
                                            <ContentIcon name={method.icon} className="text-deep-accent size-5 shrink-0" />
                                            {method.label}
                                        </a>
                                    ))}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
