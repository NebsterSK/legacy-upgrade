import type { StaticImageData } from 'next/image';

import brackets from '@/assets/images/logos/brackets.svg';
import claude from '@/assets/images/logos/claude.svg';
import forge from '@/assets/images/logos/forge.svg';
import inertiajs from '@/assets/images/logos/inertiajs.svg';
import laravel from '@/assets/images/logos/laravel.svg';
import mysql from '@/assets/images/logos/mysql.svg';
import remam from '@/assets/images/logos/remam.webp';
import stcc from '@/assets/images/logos/stcc.png';
import tailwindcss from '@/assets/images/logos/tailwindcss.svg';
import vuejs from '@/assets/images/logos/vuejs.svg';
import websupport from '@/assets/images/logos/websupport.webp';
import yasmin from '@/assets/images/logos/yasmin.png';

/**
 * Filename → static import. `src/content/` stores logo filenames as plain strings so it
 * stays dependency-free; this is where they become real hashed assets with intrinsic
 * dimensions.
 */
export const logos: Record<string, StaticImageData> = {
    'brackets.svg': brackets,
    'claude.svg': claude,
    'forge.svg': forge,
    'inertiajs.svg': inertiajs,
    'laravel.svg': laravel,
    'mysql.svg': mysql,
    'remam.webp': remam,
    'stcc.png': stcc,
    'tailwindcss.svg': tailwindcss,
    'vuejs.svg': vuejs,
    'websupport.webp': websupport,
    'yasmin.png': yasmin,
};
