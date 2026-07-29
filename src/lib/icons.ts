import {
    Bot,
    Building2,
    Check,
    ClipboardList,
    Clock,
    Code,
    Gauge,
    Hammer,
    LayoutDashboard,
    Link,
    Mail,
    MapPin,
    MessageCircle,
    MessageSquare,
    MonitorPlay,
    Phone,
    Presentation,
    RefreshCw,
    RotateCcw,
    Scissors,
    SquareTerminal,
    User,
    Workflow,
    type LucideIcon,
} from 'lucide-react';

/**
 * Name → component for the `IconName` strings in `src/content/`.
 *
 * Named explicitly rather than via a dynamic `lucide-react` lookup so the bundle only
 * carries the icons actually used, and so a typo in content fails loudly at render.
 * The Remix Icon → lucide mapping for each is documented in the content modules.
 */
export const icons: Record<string, LucideIcon> = {
    Bot,
    Building2,
    Check,
    ClipboardList,
    Clock,
    Code,
    Gauge,
    Hammer,
    LayoutDashboard,
    Link,
    Mail,
    MapPin,
    MessageCircle,
    MessageSquare,
    MonitorPlay,
    Phone,
    Presentation,
    RefreshCw,
    RotateCcw,
    Scissors,
    SquareTerminal,
    User,
    Workflow,
};

export function getIcon(name: string): LucideIcon {
    const icon = icons[name];
    if (!icon) throw new Error(`Unknown icon name in content: "${name}"`);
    return icon;
}
