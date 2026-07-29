'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ComponentProps } from 'react';

/**
 * Replaces the inline anti-FOUC script and the hand-rolled `localStorage.darkMode`
 * logic from the Jigsaw layout.
 *
 * Note the storage key changes from `darkMode` to next-themes' `theme`, so returning
 * visitors fall back to their system preference once. Accepted trade-off (plan.md Task 6).
 */
export function ThemeProvider({ children, ...props }: ComponentProps<typeof NextThemesProvider>) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
