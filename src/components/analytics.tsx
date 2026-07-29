import Script from 'next/script';

import { site } from '@/content';

/**
 * Google Analytics, ported from `source/_layouts/main.blade.php`.
 * The commented-out Plausible snippet in the old layout was dead code and is not carried over.
 */
export function Analytics() {
    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${site.gaMeasurementId}`}
                strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
                {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${site.gaMeasurementId}');`}
            </Script>
        </>
    );
}
