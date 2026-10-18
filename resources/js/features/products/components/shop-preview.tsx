import { routes } from '@/app/routing/routes';
import { TextLink } from '@/components/primitives/text-link';
import { SectionLabel } from '@/components/typography/section-label';
import { ProductShelf } from '@/features/products/components/product-shelf';
import type { Product } from '@/features/products/types';

type ShopPreviewProps = {
    index: string;
    label: string;
    heading: string;
    cta: string;
    fromLabel: string;
    detailsLabel: string;
    products: Product[];
    categoryLabel: (slug: string) => string;
};

export function ShopPreview({
    index,
    label,
    heading,
    cta,
    fromLabel,
    detailsLabel,
    products,
    categoryLabel,
}: ShopPreviewProps) {
    if (products.length === 0) {
        return null;
    }

    return (
        <section aria-labelledby="shop-heading" className="section-space">
            <div className="frame">
                <div className="flex flex-col gap-6 pb-10 md:flex-row md:items-end md:justify-between">
                    <div className="grid gap-5">
                        <SectionLabel index={index}>{label}</SectionLabel>
                        <h2
                            id="shop-heading"
                            className="type-title max-w-[22ch]"
                        >
                            {heading}
                        </h2>
                    </div>
                    <TextLink
                        href={routes.shop.index()}
                        arrow
                        prefetch
                        className="shrink-0"
                    >
                        {cta}
                    </TextLink>
                </div>
                <ProductShelf
                    products={products}
                    categoryLabel={categoryLabel}
                    fromLabel={fromLabel}
                    detailsLabel={detailsLabel}
                />
            </div>
        </section>
    );
}
