import type {
    Product,
    ProductFilters,
    ProductSort,
} from '@/features/products/types';

export const PRODUCT_SORTS: ProductSort[] = [
    'featured',
    'newest',
    'price-asc',
    'price-desc',
];

export function startingPrice(product: Product): number {
    return Math.min(...product.licenses.map((offer) => offer.price));
}

export function filterAndSortProducts(
    products: Product[],
    filters: ProductFilters,
): Product[] {
    const filtered = filters.category
        ? products.filter((product) => product.category === filters.category)
        : [...products];

    switch (filters.sort ?? 'featured') {
        case 'newest':
            return filtered.sort((a, b) =>
                b.publishedOn.localeCompare(a.publishedOn),
            );
        case 'price-asc':
            return filtered.sort((a, b) => startingPrice(a) - startingPrice(b));
        case 'price-desc':
            return filtered.sort((a, b) => startingPrice(b) - startingPrice(a));
        case 'featured':
        default:
            // Featured first, unavailable last, otherwise keep catalogue order.
            return filtered.sort((a, b) => rank(a) - rank(b));
    }
}

function rank(product: Product): number {
    if (product.availability === 'unavailable') {
        return 2;
    }

    return product.featured ? 0 : 1;
}

export function isProductFilters(value: unknown): value is ProductFilters {
    if (typeof value !== 'object' || value === null) {
        return false;
    }

    const candidate = value as Record<string, unknown>;

    return (
        (candidate.category === null ||
            typeof candidate.category === 'string') &&
        (candidate.sort === null ||
            PRODUCT_SORTS.some((sort) => sort === candidate.sort))
    );
}

export const EMPTY_PRODUCT_FILTERS: ProductFilters = {
    category: null,
    sort: null,
};
