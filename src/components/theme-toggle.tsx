'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { nav } from '@/content';
import { useIsHydrated } from '@/hooks/use-is-hydrated';
import { cn } from '@/lib/utils';

/**
 * Light/dark as a real switch: a track with a thumb that slides right for dark mode and
 * carries the current mode's icon. Icon-only, so the accessible name comes from
 * `aria-label` and the state from `role="switch"` + `aria-checked`.
 */
export function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();
    const hydrated = useIsHydrated();

    // resolvedTheme is undefined until hydration, so hold the light-mode markup until then
    // rather than disagreeing with what next-themes' pre-paint script already applied.
    const isDark = hydrated && resolvedTheme === 'dark';

    return (
        <button
            type="button"
            role="switch"
            aria-checked={isDark}
            aria-label={nav.theme.ariaLabel}
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className={cn(
                'focus-visible:ring-ring relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border p-0.5 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                // Checked (dark) fills the track with the primary, like any on-switch.
                isDark ? 'bg-primary border-primary' : 'bg-muted border-input hover:bg-accent'
            )}
        >
            <span
                className={cn(
                    'grid size-[1.375rem] place-items-center rounded-full shadow-sm transition-transform duration-200 ease-(--ease-out-expo)',
                    isDark ? 'bg-primary-foreground text-primary translate-x-5' : 'bg-card text-foreground'
                )}
            >
                {isDark ? (
                    <Moon className="size-3.5" aria-hidden />
                ) : (
                    <Sun className="size-3.5" aria-hidden />
                )}
            </span>
        </button>
    );
}
