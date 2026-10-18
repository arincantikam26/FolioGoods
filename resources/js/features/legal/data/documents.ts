/**
 * Legal pages. THIS IS PLACEHOLDER STRUCTURE, NOT LEGAL TEXT.
 * Each page shows a visible notice until `reviewed` is set to true.
 * Replace with content reviewed for your jurisdiction before production.
 */

export type LegalSection = {
    id: string;
    heading: string;
    body: string[];
    list?: string[];
};

export type LegalDocument = {
    id: 'privacy' | 'terms' | 'license';
    title: string;
    summary: string;
    updatedOn: string;
    reviewed: boolean;
    sections: LegalSection[];
};

export const privacyDocument: LegalDocument = {
    id: 'privacy',
    title: 'Privacy notice',
    summary:
        'What information this site collects, why, and what you can ask us to do with it.',
    updatedOn: '2026-10-01',
    reviewed: false,
    sections: [
        {
            id: 'who',
            heading: 'Who is responsible',
            body: [
                '[Placeholder] Name the person or business responsible for this site, with a postal address and a contact email for privacy questions.',
            ],
        },
        {
            id: 'collected',
            heading: 'What is collected',
            body: [
                '[Placeholder] List each kind of information and where it comes from. A typical setup for this template:',
            ],
            list: [
                'Contact form: name, email, optional company, and your message.',
                'Checkout: name, email, optional WhatsApp number, and the product chosen.',
                'Payment: the proof of transfer you upload.',
                'Technical: server logs kept for security, such as IP address and browser type.',
            ],
        },
        {
            id: 'why',
            heading: 'Why it is used',
            body: [
                '[Placeholder] State the purpose and legal basis for each use — for example, replying to an inquiry, delivering a purchase, or meeting tax obligations.',
            ],
        },
        {
            id: 'retention',
            heading: 'How long it is kept',
            body: [
                '[Placeholder] Give a retention period for each kind of information, or the rule used to decide it.',
            ],
        },
        {
            id: 'sharing',
            heading: 'Who it is shared with',
            body: [
                '[Placeholder] Name the services that process data on your behalf (hosting, email delivery, storage) and where they are located.',
            ],
        },
        {
            id: 'rights',
            heading: 'Your choices and rights',
            body: [
                '[Placeholder] Explain how to request access, correction or deletion, and how to complain to the relevant authority.',
            ],
        },
        {
            id: 'changes',
            heading: 'Changes to this notice',
            body: [
                '[Placeholder] Describe how changes are announced and where earlier versions can be found.',
            ],
        },
    ],
};

export const termsDocument: LegalDocument = {
    id: 'terms',
    title: 'Terms of sale',
    summary:
        'The conditions that apply when buying a digital product from this site.',
    updatedOn: '2026-10-01',
    reviewed: false,
    sections: [
        {
            id: 'seller',
            heading: 'Who you are buying from',
            body: [
                '[Placeholder] Legal name, business registration and contact details of the seller.',
            ],
        },
        {
            id: 'products',
            heading: 'Products and prices',
            body: [
                '[Placeholder] State that prices are shown in full at checkout, which currency is used, and whether taxes are included.',
            ],
        },
        {
            id: 'payment',
            heading: 'Payment',
            body: [
                '[Placeholder] Describe accepted payment methods, the payment window, and what happens to unpaid orders.',
            ],
        },
        {
            id: 'delivery',
            heading: 'Delivery',
            body: [
                '[Placeholder] Explain how and when files are delivered after payment is verified, and how long download links remain valid.',
            ],
        },
        {
            id: 'refunds',
            heading: 'Refunds',
            body: [
                '[Placeholder] Set out the refund policy for digital goods, including any statutory rights that cannot be excluded.',
            ],
        },
        {
            id: 'liability',
            heading: 'Liability',
            body: ['[Placeholder] To be written with legal advice.'],
        },
        {
            id: 'law',
            heading: 'Governing law',
            body: ['[Placeholder] Name the governing law and jurisdiction.'],
        },
    ],
};

export const licenseDocument: LegalDocument = {
    id: 'license',
    title: 'Product license',
    summary:
        'What you may and may not do with files bought from the shop, in plain terms first and full terms after.',
    updatedOn: '2026-10-01',
    reviewed: false,
    sections: [
        {
            id: 'summary',
            heading: 'In short',
            body: [
                '[Placeholder summary — keep it consistent with the full terms below.]',
            ],
            list: [
                'Personal: use in one end product you own, not for clients or resale.',
                'Commercial: use in unlimited end products, including client and paid work.',
                'Neither license allows reselling or redistributing the files themselves.',
            ],
        },
        {
            id: 'definitions',
            heading: 'Definitions',
            body: [
                '[Placeholder] Define “product”, “end product”, “client”, and “redistribution”.',
            ],
        },
        {
            id: 'personal',
            heading: 'Personal license',
            body: ['[Placeholder] Full terms of the Personal license.'],
        },
        {
            id: 'commercial',
            heading: 'Commercial license',
            body: ['[Placeholder] Full terms of the Commercial license.'],
        },
        {
            id: 'updates',
            heading: 'Updates',
            body: [
                '[Placeholder] Which updates are included, and how major versions are handled.',
            ],
        },
        {
            id: 'upgrades',
            heading: 'Upgrading a license',
            body: [
                '[Placeholder] How to move from Personal to Commercial by paying the difference.',
            ],
        },
        {
            id: 'termination',
            heading: 'Termination',
            body: [
                '[Placeholder] When the license ends and what happens then.',
            ],
        },
    ],
};

export const legalDocuments = {
    privacy: privacyDocument,
    terms: termsDocument,
    license: licenseDocument,
} satisfies Record<LegalDocument['id'], LegalDocument>;
