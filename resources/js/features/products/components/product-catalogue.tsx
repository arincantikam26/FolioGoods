import { ProductItem } from '@/features/products/components/product-item';
import type { Product } from '@/features/products/types';

type ProductCatalogueProps = {
    products: Product[];
    categoryLabel: (slug: string) => string;
};

/**
 * Catalogue grid separated by hairlines instead of boxes: horizontal rules
 * between rows, vertical rules between columns.
 */
export function ProductCatalogue({
    products,
    categoryLabel,
}: ProductCatalogueProps) {
    return (
        <ul className="ruled-grid">
            {products.map((product, index) => (
                <li key={product.slug}>
                    <ProductItem
                        product={product}
                        categoryLabel={categoryLabel(product.category)}
                        priority={index < 2}
                    />
                </li>
            ))}
        </ul>
    );
}
