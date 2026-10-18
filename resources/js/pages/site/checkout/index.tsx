import { useState } from 'react';
import { routes } from '@/app/routing/routes';
import { NotFoundState } from '@/components/feedback/not-found-state';
import { PreviewNotice } from '@/components/feedback/preview-notice';
import { TextLink } from '@/components/primitives/text-link';
import { Seo } from '@/components/seo/seo';
import { copy } from '@/content/copy';
import { CheckoutForm } from '@/features/checkout/components/checkout-form';
import { OrderSummary } from '@/features/checkout/components/order-summary';
import { CHECKOUT_STATES } from '@/features/checkout/types';
import type { CheckoutState } from '@/features/checkout/types';
import { productSource } from '@/features/products/api/product-source';
import { usePreviewState } from '@/hooks/use-preview-state';
import { TransactionLayout } from '@/layouts/site/transaction-layout';

const STATE_LABELS: Record<CheckoutState, string> = {
    default: 'Default',
    field_error: 'Field errors',
    loading: 'Loading',
    failed: 'Order creation failed',
    success: 'Success',
    unavailable: 'Product unavailable',
    price_changed: 'Price changed',
    network_error: 'Network error',
};

type CheckoutPageProps = {
    product: string | null;
    license: string | null;
};

export default function CheckoutPage({
    product: productSlug,
    license: licenseSlug,
}: CheckoutPageProps) {
    const previewState = usePreviewState(CHECKOUT_STATES, 'default');
    const product = productSlug ? productSource.find(productSlug) : null;
    const licenses = product ? productSource.licenses(product) : [];
    const [licenseId, setLicenseId] = useState(
        licenses.find((item) => item.id === licenseSlug)?.id ??
            licenses[0]?.id ??
            '',
    );
    const license =
        licenses.find((item) => item.id === licenseId) ?? licenses[0];

    if (!product || !license) {
        return (
            <TransactionLayout step={0}>
                <Seo title={copy.checkout.title} noindex />
                <NotFoundState
                    title={copy.checkout.missingProductTitle}
                    body={copy.checkout.missingProductBody}
                    action={{
                        label: copy.product.backToShop,
                        href: routes.shop.index(),
                    }}
                />
            </TransactionLayout>
        );
    }

    // Simulated price change: the stored price was 10% lower when the page opened.
    const priceChange =
        previewState === 'price_changed'
            ? {
                  previous: Math.round(license.price * 0.9),
                  current: license.price,
              }
            : null;

    return (
        <TransactionLayout step={0}>
            <Seo title={copy.checkout.title} noindex />
            <div className="frame pt-6">
                <PreviewNotice
                    message={copy.preview.transactionNotice}
                    states={CHECKOUT_STATES.map((value) => ({
                        value,
                        label: STATE_LABELS[value],
                    }))}
                    current={previewState}
                />
            </div>

            <div className="frame editorial-grid gap-y-12 py-12 lg:py-16">
                <div className="grid content-start gap-10 lg:col-span-6">
                    <div className="grid gap-4">
                        <TextLink
                            href={routes.shop.show(product.slug)}
                            className="w-fit text-sm"
                        >
                            ← {copy.checkout.backToProduct}
                        </TextLink>
                        <h1 className="type-headline">{copy.checkout.title}</h1>
                    </div>
                    <CheckoutForm
                        key={previewState}
                        licenses={licenses}
                        license={license.id}
                        onLicenseChange={setLicenseId}
                        previewState={previewState}
                        priceChange={priceChange}
                    />
                </div>

                <aside className="order-first lg:order-none lg:col-span-5 lg:col-start-8">
                    <div className="lg:sticky lg:top-8">
                        <OrderSummary
                            product={product}
                            license={license}
                            previousPrice={priceChange?.previous}
                        />
                    </div>
                </aside>
            </div>
        </TransactionLayout>
    );
}
