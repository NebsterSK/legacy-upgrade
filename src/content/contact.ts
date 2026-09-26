import { company, links } from './company.ts';
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
    heading: 'Start with a free consultation',

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

    /**
     * Profiles, not ways to reach me — the work and the CV, for anyone who wants to look
     * before writing. They moved here from the hero (2026-09-26): on a phone the two bare
     * glyphs wrapped onto their own line under the CTAs and read as leftovers, and they
     * belong with the other secondary contact routes anyway. Rendered a step quieter than
     * the messaging chips, since a profile is not a way to reach a person.
     *
     * `icon` names a brand glyph in `src/components/brand-icons.tsx`, NOT a lucide icon:
     * lucide ships no brand marks, so these cannot go through `ContentIcon`.
     */
    social: [
        { icon: 'Linkedin', label: 'LinkedIn', href: links.linkedin },
        { icon: 'Github', label: 'GitHub', href: links.github },
    ],

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
