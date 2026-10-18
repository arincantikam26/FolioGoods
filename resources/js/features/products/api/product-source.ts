import {
    productCategories,
    productLicenses,
    shopFaqs,
} from '@/features/products/data/catalogue';
import { products } from '@/features/products/data/products';
import type {
    Product,
    ProductCategory,
    ResolvedLicense,
} from '@/features/products/types';
import type { FaqItem } from '@/types/site';

/**
 * Mock adapter — the only module that reads product data files.
 * Commerce Edition: replace with page props from the product controller.
 */
export const productSource = {
    list(): Product[] {
        return products;
    },

    featured(limit = 3): Product[] {
        return products.filter((product) => product.featured).slice(0, limit);
    },

    find(slug: string): Product | null {
        return products.find((product) => product.slug === slug) ?? null;
    },

    related(product: Product, limit = 2): Product[] {
        return product.related
            .map((slug) => this.find(slug))
            .filter((item): item is Product => item !== null)
            .slice(0, limit);
    },

    categories(): ProductCategory[] {
        return productCategories;
    },

    category(slug: string): ProductCategory | null {
        return productCategories.find((item) => item.slug === slug) ?? null;
    },

    licenses(product: Product): ResolvedLicense[] {
        return product.licenses.flatMap((offer) => {
            const license = productLicenses.find(
                (item) => item.id === offer.licenseId,
            );

            return license ? [{ ...license, price: offer.price }] : [];
        });
    },

    faqs(): FaqItem[] {
        return shopFaqs;
    },
};
