import { Media } from '@/components/media/media';
import { copy } from '@/content/copy';
import type { Product, ResolvedLicense } from '@/features/products/types';
import { formatMoney } from '@/lib/format';

type OrderSummaryProps = {
    product: Product;
    license: ResolvedLicense;
    /** Shown struck through when the price changed since the page opened. */
    previousPrice?: number;
};

/** What is being bought and the full amount, always in view. */
export function OrderSummary({
    product,
    license,
    previousPrice,
}: OrderSummaryProps) {
    return (
        <section
            aria-labelledby="summary-heading"
            className="border-ink grid gap-6 border-t-2 pt-6"
        >
            <h2 id="summary-heading" className="type-meta text-muted">
                {copy.checkout.summaryHeading}
            </h2>

            <div className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-4">
                <Media
                    asset={product.cover}
                    ratio="4 / 3"
                    sizes="6rem"
                    decorative
                />
                <div className="grid content-start gap-1">
                    <p className="font-display text-xl leading-tight">
                        {product.name}
                    </p>
                    <p className="text-sm text-muted">
                        {license.name} license · v{product.version.number}
                    </p>
                </div>
            </div>

            <dl className="border-line grid gap-3 border-t pt-5 text-sm">
                <div className="flex justify-between gap-4">
                    <dt className="text-muted">{copy.checkout.subtotal}</dt>
                    <dd className="tabular-nums">
                        {previousPrice !== undefined && (
                            <del className="mr-2 text-muted">
                                {formatMoney(previousPrice)}
                            </del>
                        )}
                        {formatMoney(license.price)}
                    </dd>
                </div>
                <div className="flex justify-between gap-4">
                    <dt className="text-muted">{copy.checkout.fees}</dt>
                    <dd>{copy.checkout.noFees}</dd>
                </div>
                <div className="border-line flex items-baseline justify-between gap-4 border-t pt-4">
                    <dt className="font-medium">{copy.checkout.total}</dt>
                    <dd className="font-display text-3xl tabular-nums">
                        {formatMoney(license.price)}
                    </dd>
                </div>
            </dl>
            <p className="text-sm text-muted">{copy.checkout.totalNote}</p>
        </section>
    );
}
