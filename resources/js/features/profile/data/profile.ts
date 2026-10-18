import type { MediaAsset } from '@/types/site';

export type ExperienceItem = {
    id: string;
    period: string;
    role: string;
    place: string;
    note: string;
};

export type ToolGroup = {
    id: string;
    label: string;
    items: string[];
};

export type Principle = {
    id: string;
    title: string;
    body: string;
};

export type Profile = {
    introduction: string;
    focus: string;
    biography: string[];
    /** Set to null to hide the portrait everywhere. */
    portrait: MediaAsset | null;
    capabilities: string[];
    experience: ExperienceItem[];
    tools: ToolGroup[];
    principles: Principle[];
    /** Set to null to hide the CV download. */
    cv: { href: string; label: string; size: string } | null;
};

/**
 * About-page content. Written without first-person pronouns so it reads
 * correctly for a solo practice or a studio. Everything here is fictional.
 */
export const profile: Profile = {
    introduction:
        'Independent professional working across digital products, visual systems, and practical tools.',
    focus: 'The focus is simple: understand the problem, make deliberate decisions, and deliver work that remains useful after launch.',
    biography: [
        'Trained in graphic design, then spent several years inside product teams before going independent. That mix shapes the work: comfortable with a type specimen and a database schema in the same week.',
        'Projects range from identities for small businesses to data tools for research groups. Most start with a conversation about what already works and what does not, and end with something the client can maintain on their own.',
        'Alongside client work, the practice makes templates, kits and assets — the same tools used on commissions, cleaned up and documented for others.',
    ],
    portrait: {
        src: '/folio/media/profile/studio.svg',
        alt: 'Studio table with paper samples, a notebook and a laptop under window light',
        width: 1200,
        height: 1500,
        tone: '#d8d1c2',
    },
    capabilities: [
        'Brand and visual identity',
        'Editorial and web design',
        'Product and interface design',
        'Front-end and Laravel development',
        'Photography and art direction',
        'Design systems and documentation',
    ],
    experience: [
        {
            id: 'independent',
            period: '2022 — now',
            role: 'Independent practice',
            place: 'Bandung',
            note: 'Identity, editorial and product work for small teams.',
        },
        {
            id: 'product-team',
            period: '2019 — 2022',
            role: 'Product designer',
            place: 'In-house, logistics software',
            note: 'Interfaces for warehouse and delivery staff.',
        },
        {
            id: 'publisher',
            period: '2016 — 2019',
            role: 'Designer',
            place: 'Regional publisher',
            note: 'Books, magazines and their first websites.',
        },
    ],
    tools: [
        {
            id: 'design',
            label: 'Design',
            items: ['Figma', 'InDesign', 'Affinity'],
        },
        {
            id: 'build',
            label: 'Build',
            items: ['Laravel', 'React', 'TypeScript', 'Tailwind CSS'],
        },
        {
            id: 'image',
            label: 'Image',
            items: ['Medium-format film', 'Lightroom', 'Gouache'],
        },
    ],
    principles: [
        {
            id: 'problem',
            title: 'Start with the problem as stated',
            body: 'Then check it against what people actually do. The brief is a starting point, not the answer.',
        },
        {
            id: 'decisions',
            title: 'Write decisions down',
            body: 'Every project ends with notes on why things are the way they are, so the next person does not have to guess.',
        },
        {
            id: 'maintain',
            title: 'Leave it maintainable',
            body: 'A system the client can run without help is worth more than a perfect one that needs a designer for every change.',
        },
    ],
    cv: {
        href: '/folio/files/cv-sample.pdf',
        label: 'Download CV',
        size: 'PDF, 1 page',
    },
};
