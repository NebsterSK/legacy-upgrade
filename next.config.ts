import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    // Static HTML/CSS/JS export — deployed by uploading `out/` over FTP.
    // No Node runtime on the host: no route handlers, no ISR, no image optimizer.
    output: 'export',
    images: { unoptimized: true },
    trailingSlash: false,

    // Laravel Herd proxies https://legacy-upgrade.test to the dev server on :3000, so
    // dev requests arrive with a different origin than localhost. Without this, Next 16
    // rejects them and HMR/RSC requests fail. Dev only — no effect on the export.
    allowedDevOrigins: ['legacy-upgrade.test', '*.legacy-upgrade.test'],
};

export default nextConfig;
