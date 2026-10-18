import type { Product, SupportScope } from '@/features/products/types';
import type { MediaAsset } from '@/types/site';

/**
 * Mock products. Names are fictional; prices are examples in IDR
 * (change the currency in app/configuration/site-config.ts).
 */

function media(
    path: string,
    alt: string,
    width: number,
    height: number,
    tone: string,
): MediaAsset {
    return { src: `/folio/media/${path}.svg`, alt, width, height, tone };
}

const standardSupport: SupportScope = {
    window: '6 months from purchase',
    channel: 'Email, replies within two working days',
    included: [
        'Help with installation and setup',
        'Answers about how a feature works',
        'Fixes for bugs in the original files',
    ],
    excluded: [
        'Customisation or new features',
        'Problems caused by third-party packages or hosting',
        'Design or development work on your project',
    ],
};

export const products: Product[] = [
    {
        slug: 'folio-editorial',
        name: 'Folio Editorial',
        category: 'ui-template',
        tagline:
            'A portfolio interface for people whose work needs words as well as images.',
        summary: [
            'Folio Editorial is a front-end template for portfolios built around long-form case studies. It ships with an index, a case study layout with chapters, and a simple about page.',
            'It is front-end only: content lives in typed data files, ready to be wired to any CMS or API.',
        ],
        cover: media(
            'products/folio-editorial/cover',
            'Portfolio template with a large serif headline and an indexed project list',
            1600,
            1200,
            '#e6e1d6',
        ),
        gallery: [
            {
                id: 'folio-editorial-home',
                media: media(
                    'products/folio-editorial/gallery-1',
                    'Home page with hero headline and project index',
                    1600,
                    1200,
                    '#e6e1d6',
                ),
                caption: 'Home page with project index.',
            },
            {
                id: 'folio-editorial-case',
                media: media(
                    'products/folio-editorial/gallery-2',
                    'Case study layout with chapter navigation on the left',
                    1600,
                    1200,
                    '#dfe7e3',
                ),
                caption: 'Case study with chapter navigation.',
            },
            {
                id: 'folio-editorial-mobile',
                media: media(
                    'products/folio-editorial/gallery-3',
                    'Three phone screens of the template',
                    1600,
                    1200,
                    '#ece7dc',
                ),
                caption: 'Mobile layouts.',
            },
        ],
        version: { number: '1.3.0', releasedOn: '2026-08-12', stage: 'stable' },
        availability: 'available',
        featured: true,
        publishedOn: '2025-11-04',
        compatibility: ['React 19', 'TypeScript 5', 'Tailwind CSS 4', 'Vite'],
        requirements: [
            { label: 'Node.js', value: '20 or newer' },
            { label: 'Package manager', value: 'npm, pnpm or yarn' },
            { label: 'Skills', value: 'Comfortable editing React components' },
        ],
        includes: [
            {
                title: 'Source code',
                detail: '14 pages, 40 components, typed content files',
            },
            {
                title: 'Design tokens',
                detail: 'Colour, type and spacing as CSS variables',
            },
            {
                title: 'Documentation',
                detail: 'Setup, content and theming guides',
            },
            {
                title: 'Figma file',
                detail: 'Desktop and mobile layouts for every page',
            },
        ],
        audience: {
            suits: [
                'You want case studies, not just a grid of thumbnails',
                'You are comfortable editing code or have a developer',
                'You plan to connect your own CMS later',
            ],
            notSuited: [
                'You need a drag-and-drop page builder',
                'You want a hosted site with no code at all',
            ],
        },
        features: [
            {
                id: 'index',
                title: 'An index that scales',
                body: 'Projects are listed as an editorial index with filters. Featured work gets a larger composition; everything else stays compact and scannable.',
                media: media(
                    'products/folio-editorial/feature-1',
                    'Project index with filters and featured rows',
                    1600,
                    1000,
                    '#e6e1d6',
                ),
            },
            {
                id: 'case-study',
                title: 'Case studies with chapters',
                body: 'Long pages stay navigable with a chapter rail on desktop and a compact index on mobile. Galleries alternate full-bleed and inset images.',
                media: media(
                    'products/folio-editorial/feature-2',
                    'Case study page with chapter rail',
                    1600,
                    1000,
                    '#dfe7e3',
                ),
            },
            {
                id: 'tokens',
                title: 'One file to restyle',
                body: 'Colours, type and motion come from tokens. Change the palette in one file and every page follows.',
                media: media(
                    'products/folio-editorial/feature-3',
                    'Token file next to two colour variations of the template',
                    1600,
                    1000,
                    '#e9e6dd',
                ),
            },
        ],
        sourceTree: [
            {
                name: 'src/',
                children: [
                    {
                        name: 'components/',
                        note: 'Layout, media, forms, feedback',
                    },
                    { name: 'features/', note: 'Portfolio, profile, contact' },
                    { name: 'content/', note: 'Site identity and copy' },
                    { name: 'pages/' },
                    { name: 'styles/', note: 'tokens.css, typography.css' },
                ],
            },
            { name: 'docs/', note: 'Markdown guides' },
            { name: 'figma/', note: 'folio-editorial.fig' },
            { name: 'README.md' },
        ],
        licenses: [
            { licenseId: 'personal', price: 349000 },
            { licenseId: 'commercial', price: 890000 },
        ],
        changelog: [
            {
                version: '1.3.0',
                date: '2026-08-12',
                changes: [
                    'Added chapter navigation on mobile',
                    'Improved focus styles across forms',
                ],
            },
            {
                version: '1.2.0',
                date: '2026-04-02',
                changes: [
                    'Added year filter to the index',
                    'Updated to Tailwind CSS 4',
                ],
            },
            {
                version: '1.0.0',
                date: '2025-11-04',
                changes: ['First release'],
            },
        ],
        support: standardSupport,
        faqs: [
            {
                id: 'cms',
                question: 'Does it include a CMS?',
                answer: 'No. Content lives in typed files. Ledger CMS Starter adds an admin and database if you need one.',
            },
            {
                id: 'hosting',
                question: 'Where can I host it?',
                answer: 'Anywhere that serves static files or runs Node. The build output is a plain folder.',
            },
        ],
        links: {
            preview: 'https://example.com/preview/folio-editorial',
            documentation: 'https://example.com/docs/folio-editorial',
        },
        related: ['ledger-cms-starter', 'paper-grain'],
    },
    {
        slug: 'ledger-cms-starter',
        name: 'Ledger CMS Starter',
        category: 'cms-starter',
        tagline:
            'A Laravel starter with an editorial admin for people who publish long pieces regularly.',
        summary: [
            'Ledger CMS Starter is a Laravel and Inertia application with an admin built for writing: drafts, scheduled publishing, revisions and structured fields for pull quotes and notes.',
            'Use it as the base for a publication, a studio journal, or a portfolio with a real editor.',
        ],
        cover: media(
            'products/ledger-cms/cover',
            'Admin editor with an article draft and a publishing sidebar',
            1600,
            1200,
            '#dfe7e3',
        ),
        gallery: [
            {
                id: 'ledger-cms-editor',
                media: media(
                    'products/ledger-cms/gallery-1',
                    'Article editor with structured fields',
                    1600,
                    1200,
                    '#dfe7e3',
                ),
                caption: 'Article editor with structured fields.',
            },
            {
                id: 'ledger-cms-list',
                media: media(
                    'products/ledger-cms/gallery-2',
                    'Content list with status and schedule columns',
                    1600,
                    1200,
                    '#e6e1d6',
                ),
                caption: 'Content list with statuses.',
            },
        ],
        version: { number: '2.1.0', releasedOn: '2026-07-20', stage: 'stable' },
        availability: 'available',
        featured: true,
        publishedOn: '2025-06-18',
        compatibility: [
            'Laravel 13',
            'Inertia 3',
            'React 19',
            'MySQL or PostgreSQL',
        ],
        requirements: [
            { label: 'PHP', value: '8.3 or newer' },
            { label: 'Database', value: 'MySQL 8, PostgreSQL 14 or SQLite' },
            { label: 'Node.js', value: '20 or newer' },
            { label: 'Skills', value: 'Basic Laravel and command line' },
        ],
        includes: [
            {
                title: 'Application source',
                detail: 'Admin, public site and API routes',
            },
            {
                title: 'Editor',
                detail: 'Drafts, revisions, scheduling, media library',
            },
            { title: 'Tests', detail: 'Feature tests for publishing flows' },
            {
                title: 'Documentation',
                detail: 'Install, deploy and extend guides',
            },
        ],
        audience: {
            suits: [
                'You publish articles or case studies more than once a month',
                'You want to own the database and the code',
                'You or your developer know some Laravel',
            ],
            notSuited: [
                'You only need a few static pages',
                'You cannot run PHP on your hosting',
            ],
        },
        features: [
            {
                id: 'editor',
                title: 'Structured writing',
                body: 'Pull quotes, notes and image captions are fields, not formatting tricks, so they render consistently everywhere.',
                media: media(
                    'products/ledger-cms/feature-1',
                    'Editor with pull quote and note fields',
                    1600,
                    1000,
                    '#dfe7e3',
                ),
            },
            {
                id: 'revisions',
                title: 'Revisions you can compare',
                body: 'Every save creates a revision. Compare two versions side by side and restore with one action.',
                media: media(
                    'products/ledger-cms/feature-2',
                    'Two revisions compared side by side',
                    1600,
                    1000,
                    '#e6e1d6',
                ),
            },
        ],
        sourceTree: [
            { name: 'app/', note: 'Models, policies, actions' },
            { name: 'database/', note: 'Migrations and seeders' },
            {
                name: 'resources/',
                children: [
                    { name: 'js/admin/', note: 'Editor interface' },
                    { name: 'js/site/', note: 'Public pages' },
                ],
            },
            { name: 'tests/' },
            { name: 'docs/' },
        ],
        licenses: [
            { licenseId: 'personal', price: 590000 },
            { licenseId: 'commercial', price: 1490000 },
        ],
        changelog: [
            {
                version: '2.1.0',
                date: '2026-07-20',
                changes: [
                    'Upgraded to Laravel 13',
                    'Added scheduled unpublishing',
                ],
            },
            {
                version: '2.0.0',
                date: '2026-02-10',
                changes: [
                    'New revision comparison view',
                    'Media library rewrite',
                ],
            },
        ],
        support: standardSupport,
        faqs: [
            {
                id: 'multi-user',
                question: 'Can several people edit?',
                answer: 'Yes. It includes editor and admin roles. Editors write; admins publish and manage users.',
            },
            {
                id: 'migrate',
                question: 'Can I import existing posts?',
                answer: 'There is an importer for Markdown files with front matter. Other sources need a small custom script.',
            },
        ],
        links: {
            preview: 'https://example.com/preview/ledger',
            documentation: 'https://example.com/docs/ledger',
        },
        related: ['folio-editorial', 'relay-api-starter'],
    },
    {
        slug: 'counter-commerce-kit',
        name: 'Counter Commerce Kit',
        category: 'commerce-kit',
        tagline:
            'Orders, manual payments and secure downloads for selling digital products without a marketplace.',
        summary: [
            'Counter adds a small, honest shop to a Laravel app: guest checkout, bank-transfer payments with proof upload, review in an admin, and expiring download links.',
            'It is currently in beta. The checkout and payment flows are stable; reporting is still being built.',
        ],
        cover: media(
            'products/counter/cover',
            'Order list in an admin with payment status columns',
            1600,
            1200,
            '#e9e3d6',
        ),
        gallery: [
            {
                id: 'counter-orders',
                media: media(
                    'products/counter/gallery-1',
                    'Admin order list with statuses',
                    1600,
                    1200,
                    '#e9e3d6',
                ),
                caption: 'Order review in the admin.',
            },
            {
                id: 'counter-checkout',
                media: media(
                    'products/counter/gallery-2',
                    'Guest checkout form with order summary',
                    1600,
                    1200,
                    '#dfe7e3',
                ),
                caption: 'Guest checkout.',
            },
        ],
        version: { number: '0.9.0', releasedOn: '2026-09-28', stage: 'beta' },
        availability: 'available',
        featured: true,
        publishedOn: '2026-09-28',
        compatibility: ['Laravel 13', 'Inertia 3', 'React 19'],
        requirements: [
            { label: 'PHP', value: '8.3 or newer' },
            { label: 'Database', value: 'MySQL 8 or PostgreSQL 14' },
            { label: 'Storage', value: 'Private disk or S3-compatible bucket' },
            { label: 'Mail', value: 'Any Laravel mail driver' },
        ],
        includes: [
            {
                title: 'Checkout and orders',
                detail: 'Guest checkout, order numbers, statuses',
            },
            {
                title: 'Manual payments',
                detail: 'Bank details, proof upload, review queue',
            },
            { title: 'Delivery', detail: 'Signed, expiring download links' },
            {
                title: 'Emails',
                detail: 'Order, payment and delivery templates',
            },
        ],
        audience: {
            suits: [
                'You sell a handful of digital products',
                'Your buyers pay by bank transfer',
                'You already run, or plan to run, a Laravel app',
            ],
            notSuited: [
                'You need card payments today (planned, not included)',
                'You sell physical goods with shipping',
            ],
        },
        features: [
            {
                id: 'review',
                title: 'A review queue for transfers',
                body: 'Uploaded proofs land in one queue. Approve, or reject with a reason the buyer sees in plain words.',
                media: media(
                    'products/counter/feature-1',
                    'Payment review queue with approve and reject actions',
                    1600,
                    1000,
                    '#e9e3d6',
                ),
            },
            {
                id: 'downloads',
                title: 'Downloads that expire',
                body: 'Files sit on a private disk and are served through signed links that expire and can be revoked.',
                media: media(
                    'products/counter/feature-2',
                    'Download page with expiring links',
                    1600,
                    1000,
                    '#dfe7e3',
                ),
            },
        ],
        sourceTree: [
            { name: 'src/', note: 'Package source' },
            { name: 'database/migrations/' },
            { name: 'resources/js/', note: 'Checkout, payment, admin screens' },
            { name: 'tests/' },
            { name: 'docs/' },
        ],
        licenses: [
            { licenseId: 'personal', price: 790000 },
            { licenseId: 'commercial', price: 1890000 },
        ],
        changelog: [
            {
                version: '0.9.0',
                date: '2026-09-28',
                changes: ['Public beta', 'Rejection reasons shown to buyers'],
            },
        ],
        support: {
            ...standardSupport,
            included: [
                ...standardSupport.included,
                'Upgrade to 1.0 when it is released',
            ],
        },
        faqs: [
            {
                id: 'beta',
                question: 'What does beta mean here?',
                answer: 'Checkout, payment and delivery are complete and tested. Reporting screens are unfinished and may change before 1.0.',
            },
            {
                id: 'cards',
                question: 'Will it support card payments?',
                answer: 'A payment gateway driver is planned after 1.0. It is not part of this purchase’s promise.',
            },
        ],
        links: {
            preview: null,
            documentation: 'https://example.com/docs/counter',
        },
        related: ['ledger-cms-starter', 'relay-api-starter'],
    },
    {
        slug: 'relay-api-starter',
        name: 'Relay API Starter',
        category: 'api-starter',
        tagline:
            'A documented REST API base with auth, versioning and tests already in place.',
        summary: [
            'Relay is a Laravel API skeleton for mobile apps and front-ends: token auth, versioned routes, consistent error responses and an OpenAPI description generated from the code.',
        ],
        cover: media(
            'products/relay/cover',
            'API reference page with endpoints listed beside a JSON response',
            1600,
            1200,
            '#e2e6e2',
        ),
        gallery: [
            {
                id: 'relay-docs',
                media: media(
                    'products/relay/gallery-1',
                    'Generated API reference',
                    1600,
                    1200,
                    '#e2e6e2',
                ),
                caption: 'Generated API reference.',
            },
        ],
        version: { number: '1.4.2', releasedOn: '2026-06-03', stage: 'stable' },
        availability: 'available',
        featured: false,
        publishedOn: '2025-03-12',
        compatibility: ['Laravel 13', 'OpenAPI 3.1', 'Sanctum'],
        requirements: [
            { label: 'PHP', value: '8.3 or newer' },
            { label: 'Database', value: 'Any Laravel-supported database' },
            { label: 'Skills', value: 'Laravel and REST basics' },
        ],
        includes: [
            {
                title: 'API skeleton',
                detail: 'Auth, versioning, rate limiting',
            },
            {
                title: 'Error format',
                detail: 'One consistent problem+json shape',
            },
            {
                title: 'OpenAPI',
                detail: 'Spec generated from routes and requests',
            },
            { title: 'Tests', detail: 'Contract tests for every endpoint' },
        ],
        audience: {
            suits: [
                'You are building a mobile app or separate front-end',
                'You want conventions decided before the first endpoint',
            ],
            notSuited: ['You need GraphQL', 'You want a no-code backend'],
        },
        features: [
            {
                id: 'errors',
                title: 'Errors clients can rely on',
                body: 'Every failure — validation, auth, rate limit — returns the same documented shape, so client code handles one format.',
                media: media(
                    'products/relay/feature-1',
                    'Example error response in JSON',
                    1600,
                    1000,
                    '#e2e6e2',
                ),
            },
        ],
        sourceTree: [
            { name: 'app/Http/', note: 'Controllers, requests, resources' },
            { name: 'routes/api/', note: 'v1.php' },
            { name: 'tests/Contract/' },
            { name: 'openapi.yaml' },
        ],
        licenses: [
            { licenseId: 'personal', price: 450000 },
            { licenseId: 'commercial', price: 1150000 },
        ],
        changelog: [
            {
                version: '1.4.2',
                date: '2026-06-03',
                changes: ['Fixed pagination links in OpenAPI output'],
            },
            {
                version: '1.4.0',
                date: '2026-03-15',
                changes: ['Added per-token rate limits'],
            },
        ],
        support: standardSupport,
        faqs: [
            {
                id: 'frontend',
                question: 'Does it include a front-end?',
                answer: 'No, it is API only. Any client that speaks HTTP and JSON can use it.',
            },
        ],
        links: {
            preview: null,
            documentation: 'https://example.com/docs/relay',
        },
        related: ['counter-commerce-kit', 'ledger-cms-starter'],
    },
    {
        slug: 'paper-grain',
        name: 'Paper & Grain',
        category: 'creative-asset',
        tagline:
            'Forty scanned paper and print textures for layouts, mockups and photographs.',
        summary: [
            'High-resolution scans of uncoated papers, risograph grain and letterpress impressions, made in the studio and prepared as seamless tiles.',
        ],
        cover: media(
            'products/paper-grain/cover',
            'Grid of paper texture swatches in cream, grey and teal',
            1600,
            1200,
            '#e7e0d0',
        ),
        gallery: [
            {
                id: 'paper-grain-swatches',
                media: media(
                    'products/paper-grain/gallery-1',
                    'Texture swatches arranged in a grid',
                    1600,
                    1200,
                    '#e7e0d0',
                ),
                caption: 'A selection of the forty textures.',
            },
            {
                id: 'paper-grain-in-use',
                media: media(
                    'products/paper-grain/gallery-2',
                    'Poster layout using a grain texture overlay',
                    1600,
                    1200,
                    '#d6cdb9',
                ),
                caption: 'Grain overlay on a poster layout.',
            },
        ],
        version: { number: '1.1.0', releasedOn: '2026-05-09', stage: 'stable' },
        availability: 'available',
        featured: false,
        publishedOn: '2025-09-01',
        compatibility: [
            'Figma',
            'Photoshop',
            'Affinity',
            'Any editor that opens PNG or TIFF',
        ],
        requirements: [
            { label: 'Software', value: 'Any image or layout editor' },
            { label: 'Download size', value: '1.8 GB' },
        ],
        includes: [
            { title: '40 textures', detail: '6000 × 6000 px, seamless' },
            { title: 'Formats', detail: 'PNG and 16-bit TIFF' },
            {
                title: 'Preview sheet',
                detail: 'PDF contact sheet of every texture',
            },
        ],
        audience: {
            suits: [
                'You make layouts, posters or mockups',
                'You want texture that comes from real paper',
            ],
            notSuited: ['You need vector patterns'],
        },
        features: [
            {
                id: 'seamless',
                title: 'Seamless at any scale',
                body: 'Every texture tiles without visible seams, so it can cover a poster or a full web page background.',
                media: media(
                    'products/paper-grain/feature-1',
                    'A texture tiled four times without visible seams',
                    1600,
                    1000,
                    '#e7e0d0',
                ),
            },
        ],
        sourceTree: [
            { name: 'png/', note: '40 files' },
            { name: 'tiff/', note: '40 files, 16-bit' },
            { name: 'contact-sheet.pdf' },
            { name: 'LICENSE.txt' },
        ],
        licenses: [
            { licenseId: 'personal', price: 190000 },
            { licenseId: 'commercial', price: 490000 },
        ],
        changelog: [
            {
                version: '1.1.0',
                date: '2026-05-09',
                changes: ['Added 12 risograph textures'],
            },
            {
                version: '1.0.0',
                date: '2025-09-01',
                changes: ['First release'],
            },
        ],
        support: {
            window: '6 months from purchase',
            channel: 'Email',
            included: ['Download problems', 'Corrupted or missing files'],
            excluded: ['Help with your design software'],
        },
        faqs: [
            {
                id: 'print',
                question: 'Are they suitable for print?',
                answer: 'Yes. At 6000 px they print sharply up to roughly A2 at 300 dpi.',
            },
        ],
        links: { preview: null, documentation: null },
        related: ['tidewater-profiles', 'folio-editorial'],
    },
    {
        slug: 'tidewater-profiles',
        name: 'Tidewater Colour Profiles',
        category: 'creative-asset',
        tagline:
            'Twelve muted colour profiles developed from the Tidewater film series.',
        summary: [
            'Profiles that reproduce the soft greens and lifted shadows of the Tidewater prints. Each was built from scans of the original film, then tested on digital raw files.',
            'Currently unavailable while the profiles are updated for new camera support.',
        ],
        cover: media(
            'products/tidewater-profiles/cover',
            'Before and after comparison of a coastal photograph with a muted colour profile',
            1600,
            1200,
            '#c9d3cf',
        ),
        gallery: [
            {
                id: 'tidewater-profiles-before-after',
                media: media(
                    'products/tidewater-profiles/gallery-1',
                    'Before and after comparison',
                    1600,
                    1200,
                    '#c9d3cf',
                ),
                caption: 'Profile 04, before and after.',
            },
        ],
        version: {
            number: '0.8.0',
            releasedOn: '2026-02-14',
            stage: 'early-access',
        },
        availability: 'unavailable',
        featured: false,
        publishedOn: '2026-02-14',
        compatibility: ['Lightroom Classic', 'Lightroom', 'Capture One'],
        requirements: [
            {
                label: 'Software',
                value: 'Lightroom Classic 13+, Lightroom 7+, or Capture One 23+',
            },
            { label: 'Files', value: 'Best results with raw files' },
        ],
        includes: [
            { title: '12 profiles', detail: 'XMP and Capture One styles' },
            { title: 'Install guide', detail: 'PDF, for each application' },
        ],
        audience: {
            suits: [
                'You photograph landscapes or coasts',
                'You like soft, low-contrast colour',
            ],
            notSuited: ['You want high-contrast or saturated looks'],
        },
        features: [
            {
                id: 'film',
                title: 'Built from film scans',
                body: 'Each profile was matched to a reference print, not designed by eye on a single image.',
                media: media(
                    'products/tidewater-profiles/feature-1',
                    'Film scan beside a digital photo with the matching profile',
                    1600,
                    1000,
                    '#c9d3cf',
                ),
            },
        ],
        sourceTree: [
            { name: 'lightroom/', note: '12 .xmp files' },
            { name: 'capture-one/', note: '12 .costyle files' },
            { name: 'install-guide.pdf' },
        ],
        licenses: [
            { licenseId: 'personal', price: 150000 },
            { licenseId: 'commercial', price: 390000 },
        ],
        changelog: [
            {
                version: '0.8.0',
                date: '2026-02-14',
                changes: ['Early access release'],
            },
        ],
        support: {
            window: '6 months from purchase',
            channel: 'Email',
            included: ['Installation help'],
            excluded: ['Editing advice for individual photos'],
        },
        faqs: [
            {
                id: 'when',
                question: 'When will it be available again?',
                answer: 'Once the update for new camera support is tested. The page will show a price again when it is ready.',
            },
        ],
        links: { preview: null, documentation: null },
        related: ['paper-grain', 'folio-editorial'],
    },
];
