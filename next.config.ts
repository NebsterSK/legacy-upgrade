import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    // Static HTML/CSS/JS export — deployed by uploading `out/` over FTP.
    // No Node runtime on the host: no route handlers, no ISR, no image optimizer.
    output: 'export',
    images: { unoptimized: true },
    trailingSlash: false,
};

export default nextConfig;
