/**
 * Copy for /brand: an internal, noindex page of screenshot-ready brand assets (logo,
 * profile picture, social covers). Frame sizes are the platforms' recommended upload
 * sizes, so a screenshot at 100% zoom is ready to upload as-is.
 */
export const brand = {
    pageTitle: 'Brand assets',

    intro: 'Screenshot-ready logo and social covers in the site’s own colours. Every frame is drawn at its exact upload size in pixels, so screenshot it at 100% browser zoom.',

    assets: {
        mark: {
            label: 'Logo mark',
            size: '512 × 512 px',
            width: 512,
            height: 512,
            note: 'Rounded square, for places that show the logo as it is.',
        },
        avatar: {
            label: 'Profile picture',
            size: '400 × 400 px',
            width: 400,
            height: 400,
            note: 'Full-bleed square, safe for the circular crop on LinkedIn and Facebook.',
        },
        lockupLight: {
            label: 'Logo lockup, light',
            size: '960 × 240 px',
            width: 960,
            height: 240,
            note: 'For light backgrounds.',
        },
        lockupDark: {
            label: 'Logo lockup, dark',
            size: '960 × 240 px',
            width: 960,
            height: 240,
            note: 'For dark backgrounds.',
        },
        linkedin: {
            label: 'LinkedIn cover',
            size: '1584 × 396 px · 4:1',
            width: 1584,
            height: 396,
            note: 'Your existing cover, redrawn in the new colours. Everything sits right, clear of the profile photo.',
        },
        facebook: {
            label: 'Facebook cover',
            size: '1640 × 624 px · 2.63:1',
            width: 1640,
            height: 624,
            note: 'The LinkedIn cover at Facebook size. The text ends well inside the right edge, because phones crop the sides.',
        },
    },
} as const;
