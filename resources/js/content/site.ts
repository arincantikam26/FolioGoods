import type { LinkItem } from '@/types/site';

/**
 * Identity of the site owner. Replace everything here first — every page
 * reads its name, contact details and SEO defaults from this object.
 * The person, studio and addresses below are fictional.
 */
export const site = {
    name: 'Oriel Atelier',
    person: 'Rana Oriel',
    role: 'Independent designer and maker',
    location: 'Bandung, Indonesia',
    timezone: 'UTC+7',
    email: 'studio@oriel-atelier.example',
    availability: {
        open: true,
        label: 'Booking projects from February 2027',
    },
    socials: [
        { label: 'Instagram', href: 'https://example.com/instagram' },
        { label: 'LinkedIn', href: 'https://example.com/linkedin' },
        { label: 'Are.na', href: 'https://example.com/arena' },
        { label: 'GitHub', href: 'https://example.com/github' },
    ] satisfies LinkItem[],
    seo: {
        description:
            'Selected work, digital products and notes on process from an independent practice in Bandung.',
        image: '/folio/og/default.png',
        twitterHandle: null as string | null,
    },
} as const;
