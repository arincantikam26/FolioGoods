import type {
    ProductCategory,
    ProductLicense,
} from '@/features/products/types';
import type { FaqItem } from '@/types/site';

export const productCategories: ProductCategory[] = [
    { slug: 'ui-template', label: 'UI Template', noun: 'template' },
    { slug: 'cms-starter', label: 'CMS Starter', noun: 'starter' },
    { slug: 'commerce-kit', label: 'Commerce Kit', noun: 'kit' },
    { slug: 'api-starter', label: 'API Starter', noun: 'starter' },
    { slug: 'creative-asset', label: 'Creative Asset', noun: 'asset set' },
];

/**
 * License definitions. Placeholder wording — have the full license text
 * reviewed before selling (see the /license page).
 */
export const productLicenses: ProductLicense[] = [
    {
        id: 'personal',
        name: 'Personal',
        summary: 'For your own projects, one end product.',
        permits: [
            'Use in one end product you own',
            'Modify the files as you need',
            'Updates within the major version',
        ],
        limits: [
            'No client or paid work',
            'No resale or redistribution of the files',
        ],
    },
    {
        id: 'commercial',
        name: 'Commercial',
        summary: 'For client work and paid products, unlimited end products.',
        permits: [
            'Use in unlimited end products',
            'Client and paid work',
            'Updates within the major version',
        ],
        limits: [
            'No resale or redistribution of the files themselves',
            'No use in competing templates or kits',
        ],
    },
];

/** Shop-wide questions shown on the shop index. */
export const shopFaqs: FaqItem[] = [
    {
        id: 'delivery',
        question: 'How do I receive the files?',
        answer: 'After your transfer is verified, a download link is sent to the email used at checkout. The same link is available from the order status page for 12 months.',
    },
    {
        id: 'payment',
        question: 'How does payment work?',
        answer: 'Checkout creates an order with a fixed total. You pay by bank transfer and upload the proof; verification usually takes a few working hours.',
    },
    {
        id: 'license-choice',
        question: 'Which license do I need?',
        answer: 'Personal if the product is only for something you own and do not sell. Commercial for anything made for a client or sold. You can upgrade later by paying the difference.',
    },
    {
        id: 'refunds',
        question: 'Can I get a refund?',
        answer: 'Because files are downloadable, refunds are offered when a product does not work as described and cannot be fixed. Write in within 14 days with details of the problem.',
    },
];
