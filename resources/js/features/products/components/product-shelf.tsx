import { AppLink } from '@/app/routing/app-link';
import { routes } from '@/app/routing/routes';
import { Media } from '@/components/media/media';
import { Reveal } from '@/components/motion/reveal';
import { PriceDisplay } from '@/features/products/components/price-display';
import type { Product } from '@/features/products/types';
import { startingPrice } from '@/features/products/utils/catalogue';
import { indexLabel } from '@/lib/format';

type ProductShelfProps = {
    products: Product[];
    categoryLabel: (slug: string) => string;
    fromLabel: string;
    detailsLabel: string;
};

/**
 * Catalogue shelf: products side by side, separated by vertical rules
 * instead of boxes. Each crop is taken from a different part of its image.
 */
export function ProductShelf({
    products,
    categoryLabel,
    fromLabel,
    detailsLabel,
}: ProductShelfProps) {
    const crops = ['50% 50%', '30% 40%', '70% 60%'];

    return (
        <ol className="border-line grid border-t md:grid-cols-3 md:gap-x-12 lg:gap-x-16">
            {products.map((product, index) => (
                <li
                    key={product.slug}
                    className="border-line md:not-first:before:bg-line relative border-b md:border-b-0 md:not-first:before:absolute md:not-first:before:inset-y-0 md:not-first:before:-left-6 md:not-first:before:w-px md:not-first:before:content-[''] lg:not-first:before:-left-8"
                >
                    <Reveal delay={index * 80} className="h-full">
                        <AppLink
                            href={routes.shop.show(product.slug)}
                            className="group flex h-full flex-col gap-5 py-8"
                        >
                            <span className="type-meta text-muted">
                                No. {indexLabel(index)} —{' '}
                                {categoryLabel(product.category)}
                            </span>
                            <div className="overflow-hidden">
                                <Media
                                    asset={{
                                        ...product.cover,
                                        focus: crops[index % crops.length],
                                    }}
                                    ratio="5 / 4"
                                    sizes="(min-width: 48rem) 30vw, 100vw"
                                    decorative
                                    className="media-tilt"
                                />
                            </div>
                            <span className="grid gap-2">
                                <span className="type-subtitle">
                                    {product.name}
                                </span>
                                <span className="text-sm text-muted">
                                    {product.tagline}
                                </span>
                            </span>
                            <span className="border-line mt-auto flex items-baseline justify-between gap-4 border-t pt-4">
                                <PriceDisplay
                                    amount={startingPrice(product)}
                                    prefix={
                                        product.licenses.length > 1
                                            ? fromLabel
                                            : undefined
                                    }
                                />
                                <span className="inline-flex items-center gap-1.5 text-sm font-medium">
                                    <span className="link-underline">
                                        {detailsLabel}
                                    </span>
                                    <span aria-hidden className="link-arrow">
                                        →
                                    </span>
                                </span>
                            </span>
                        </AppLink>
                    </Reveal>
                </li>
            ))}
        </ol>
    );
}
