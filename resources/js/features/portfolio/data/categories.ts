import type { ProjectCategory } from '@/features/portfolio/types';

/** Order here is the order of the filter. Rename freely for your discipline. */
export const projectCategories: ProjectCategory[] = [
    { slug: 'identity', label: 'Brand identity' },
    { slug: 'editorial', label: 'Editorial' },
    { slug: 'product', label: 'Product' },
    { slug: 'photography', label: 'Photography' },
    { slug: 'illustration', label: 'Illustration' },
    { slug: 'data', label: 'Data & systems' },
    { slug: 'tools', label: 'Tools' },
];
