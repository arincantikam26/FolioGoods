import { AppLink } from '@/app/routing/app-link';
import { routes } from '@/app/routing/routes';
import { Media } from '@/components/media/media';
import { copy } from '@/content/copy';
import { PriceDisplay } from '@/features/products/components/price-display';
import type { Product } from '@/features/products/types';
import { startingPrice } from '@/features/products/utils/catalogue';

type ProductItemProps = {
    product: Product;
    categoryLabel: string;
    priority?: boolean;
};

/** Catalogue entry: image, purpose, compatibility, version, price, link. */
export function ProductItem({
    product,
    categoryLabel,
    priority = false,
}: ProductItemProps) {
    const unavailable = product.availability === 'unavailable';

    return (
        <article className="h-full">
            <AppLink
                href={routes.shop.show(product.slug)}
                prefetch
                className="group flex h-full flex-col gap-5 py-8"
            >
                <div className="overflow-hidden">
                    <Media
                        asset={product.cover}
                        ratio="4 / 3"
                        priority={priority}
                        sizes="(min-width: 80rem) 30vw, (min-width: 48rem) 45vw, 100vw"
                        decorative
                        className="media-tilt"
                    />
                </div>
                <p className="type-meta text-muted">{categoryLabel}</p>
                <div className="grid gap-2">
                    <h2 className="type-subtitle">{product.name}</h2>
                    <p className="text-sm text-muted">{product.tagline}</p>
                </div>
                <dl className="grid gap-1 text-sm">
                    <div className="flex gap-2">
                        <dt className="sr-only">
                            {copy.product.compatibility}
                        </dt>
                        <dd>{product.compatibility.join(' / ')}</dd>
                    </div>
                    <div className="flex gap-2 text-muted">
                        <dt className="sr-only">{copy.product.version}</dt>
                        <dd>
                            v{product.version.number} ·{' '}
                            {copy.product.stages[product.version.stage]}
                        </dd>
                    </div>
                </dl>
                <div className="border-line mt-auto flex items-baseline justify-between gap-4 border-t pt-4">
                    {unavailable ? (
                        <p className="text-sm text-muted">
                            {copy.shop.unavailable}
                        </p>
                    ) : (
                        <PriceDisplay
                            amount={startingPrice(product)}
                            prefix={
                                product.licenses.length > 1
                                    ? copy.shop.from
                                    : undefined
                            }
                        />
                    )}
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium">
                        <span className="link-underline">
                            {copy.shop.viewDetails}
                        </span>
                        <span aria-hidden className="link-arrow">
                            →
                        </span>
                    </span>
                </div>
            </AppLink>
        </article>
    );
}
