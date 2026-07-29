'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { nav } from '@/content';
import { useIsHydrated } from '@/hooks/use-is-hydrated';

/**
 * Binary light/dark toggle, matching the old nav control: it shows the icon and label of
 * the theme you would switch *to* (sun + "Light" while dark is active).
 *
 * Deliberately not a Light/Dark/System dropdown — "System" would be new user-visible copy,
 * which the copy freeze rules out until the later copy pass.
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
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            aria-label={nav.theme.ariaLabel}
            className="text-muted-foreground hover:text-foreground flex cursor-pointer items-center gap-1.5 transition-colors"
        >
            {isDark ? <Sun className="size-5" aria-hidden /> : <Moon className="size-5" aria-hidden />}
            <span className="text-sm">{isDark ? nav.theme.light : nav.theme.dark}</span>
        </button>
    );
}
