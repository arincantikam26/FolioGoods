/**
 * Behaviour settings for the public site. Identity and copy live in
 * resources/js/content; this file is for formats and switches.
 */

export type Voice = 'studio' | 'personal';

/** "studio" writes as we/us, "personal" as I/me. See content/copy.ts. */
const voice: Voice = 'studio';

export const siteConfig = {
    voice,

    currency: {
        code: 'IDR',
        locale: 'id-ID',
        fractionDigits: 0,
    },

    dates: {
        locale: 'en-GB',
        timeZone: 'Asia/Jakarta',
        timeZoneLabel: 'WIB',
    },

    motion: {
        /** false sets data-motion="off": reveals, parallax and hero motion stop. */
        enabled: true,
        /** Pointer-follow distance on the hero image, in pixels. */
        pointerShift: 6,
    },

    payment: {
        /** Hours a buyer has to transfer before an unpaid order expires. */
        windowHours: 24,
        proof: {
            maxBytes: 5 * 1024 * 1024,
            accept: ['image/jpeg', 'image/png', 'application/pdf'],
            acceptLabel: 'JPG, PNG or PDF, up to 5 MB',
        },
    },
} as const;
