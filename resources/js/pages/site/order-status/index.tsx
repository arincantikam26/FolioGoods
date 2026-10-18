import { PreviewNotice } from '@/components/feedback/preview-notice';
import { Seo } from '@/components/seo/seo';
import { copy } from '@/content/copy';
import {
    LOOKUP_STATES,
    OrderLookupForm,
} from '@/features/orders/components/order-lookup-form';
import type { LookupState } from '@/features/orders/components/order-lookup-form';
import { usePreviewState } from '@/hooks/use-preview-state';
import { TransactionLayout } from '@/layouts/site/transaction-layout';

const STATE_LABELS: Record<LookupState, string> = {
    default: 'Default',
    validation: 'Field errors',
    loading: 'Checking',
    not_found: 'Order not found',
    rate_limited: 'Rate limited',
    network_error: 'Network error',
};

export default function OrderLookupPage() {
    const previewState = usePreviewState(LOOKUP_STATES, 'default');

    return (
        <TransactionLayout>
            <Seo title={copy.orders.lookupTitle} noindex />
            <div className="frame pt-6">
                <PreviewNotice
                    message={copy.preview.transactionNotice}
                    states={LOOKUP_STATES.map((value) => ({
                        value,
                        label: STATE_LABELS[value],
                    }))}
                    current={previewState}
                />
            </div>
            <div className="frame editorial-grid gap-y-10 py-12 lg:py-20">
                <div className="grid content-start gap-5 lg:col-span-5">
                    <h1 className="type-headline">{copy.orders.lookupTitle}</h1>
                    <p className="max-w-[40ch] text-muted">
                        {copy.orders.lookupIntro}
                    </p>
                </div>
                <div className="lg:col-span-5 lg:col-start-8">
                    <OrderLookupForm
                        key={previewState}
                        previewState={previewState}
                    />
                </div>
            </div>
        </TransactionLayout>
    );
}
