export type ContactOption = { value: string; label: string };

/** Choices offered on the contact form. Edit to match your services. */
export const projectTypes: ContactOption[] = [
    { value: 'identity', label: 'Brand or visual identity' },
    { value: 'website', label: 'Website or editorial design' },
    { value: 'product', label: 'Product or interface design' },
    { value: 'photography', label: 'Photography or art direction' },
    { value: 'product-support', label: 'Question about a shop product' },
    { value: 'order', label: 'Question about an order' },
    { value: 'other', label: 'Something else' },
];

export const budgetRanges: ContactOption[] = [
    { value: 'under-15', label: 'Under Rp 15 juta' },
    { value: '15-50', label: 'Rp 15 – 50 juta' },
    { value: '50-150', label: 'Rp 50 – 150 juta' },
    { value: '150-plus', label: 'Over Rp 150 juta' },
    { value: 'unsure', label: 'Not sure yet' },
];

export const timelines: ContactOption[] = [
    { value: 'flexible', label: 'Flexible' },
    { value: 'one-month', label: 'Within a month' },
    { value: 'quarter', label: 'In the next three months' },
    { value: 'later', label: 'Later this year' },
];
