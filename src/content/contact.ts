import { company } from './company.ts';
import type { IconName } from './types.ts';

/**
 * Verbatim from `source/index.blade.php:321-407`.
 *
 * Remix Icon → lucide mapping:
 *   ri-user-line       → User
 *   ri-mail-fill       → Mail
 *   ri-phone-fill      → Phone
 *   ri-messenger-fill  → MessageCircle   (no Messenger glyph in lucide)
 *   ri-whatsapp-fill   → MessageSquare   (no WhatsApp glyph in lucide)
 *   ri-map-pin-line    → MapPin
 *   ri-building-line   → Building2
 */
export const contact = {
    heading: 'Contact',

    intro: 'Looking to automate a process, replace an outdated system, or build something custom for your business? Get in touch, the first consultation is free and without commitment.',

    person: {
        icon: 'User' as IconName,
        name: 'Lukáš Neuschl',
        methods: [
            {
                icon: 'Mail' as IconName,
                /** Email and phone display their own value as the link text. */
                label: company.contact.email,
                href: `mailto:${company.contact.email}`,
                external: false,
            },
            {
                icon: 'Phone' as IconName,
                label: company.contact.phone,
                href: `tel:${company.contact.phone}`,
                external: false,
            },
            {
                icon: 'MessageCircle' as IconName,
                label: 'Messenger',
                href: company.contact.messenger,
                external: true,
            },
            {
                icon: 'MessageSquare' as IconName,
                label: 'WhatsApp',
                href: company.contact.whatsapp,
                external: true,
            },
        ],
    },

    address: {
        icon: 'MapPin' as IconName,
        heading: 'Address',
        lines: [
            company.address.street,
            `${company.address.zip}, ${company.address.city}`,
            company.address.country,
        ],
    },

    details: {
        icon: 'Building2' as IconName,
        heading: 'Company Details',
        fields: [
            { label: 'Company ID / IČO', value: company.id },
            { label: 'Tax ID / DIČ', value: company.tax },
            { label: 'IBAN', value: company.iban },
        ],
    },
} as const;
