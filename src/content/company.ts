/** Verbatim from `config.php`. */
export const company = {
    name: 'Lukáš Neuschl - Legacy Upgrade',

    /** Used as the display name in the hero and the Contact card. */
    personName: 'Lukáš Neuschl',

    /** `index.blade.php` → hero `<h1>`. Note: no diacritics here, unlike `personName`. */
    heroName: 'Lukas Neuschl',

    contact: {
        email: 'lukas@legacy-upgrade.com',
        phone: '+421 949 746 983',
        messenger: 'https://m.me/lukas.neuschl.5',
        whatsapp: 'https://wa.me/421949746983',
    },

    /** IČO */
    id: '47722843',
    /** DIČ */
    tax: '1086419125',
    iban: 'SK35 0900 0000 0052 4514 4005',

    address: {
        street: 'Kukučínova 42',
        city: 'Bratislava',
        zip: '831 03',
        country: 'Slovak Republic',
    },
} as const;

export const links = {
    linkedin: 'https://www.linkedin.com/in/lukas-neuschl/',
    github: 'https://github.com/NebsterSK',
} as const;
