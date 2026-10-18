import { PreviewNotice } from '@/components/feedback/preview-notice';
import { Seo } from '@/components/seo/seo';
import { copy } from '@/content/copy';
import { DEMO_ORDER_NUMBER } from '@/features/orders/api/order-source';
import { PAYMENT_STATUSES } from '@/features/orders/types';
import type { PaymentStatus } from '@/features/orders/types';
import { PaymentScreen } from '@/features/payment/components/payment-screen';
import { usePreviewState } from '@/hooks/use-preview-state';
import { TransactionLayout } from '@/layouts/site/transaction-layout';

const STATE_LABELS: Record<PaymentStatus, string> = {
    waiting_payment: 'Waiting payment',
    proof_uploaded: 'Proof uploaded',
    under_review: 'Under review',
    rejected: 'Rejected with reason',
    approved: 'Payment approved',
    expired: 'Expired',
};

export default function PaymentPage({
    order: orderNumber,
}: {
    order: string | null;
}) {
    const previewState = usePreviewState(PAYMENT_STATUSES, 'waiting_payment');

    return (
        <TransactionLayout step={1}>
            <Seo title={copy.payment.title} noindex />
            <div className="frame pt-6">
                <PreviewNotice
                    message={copy.preview.transactionNotice}
                    states={PAYMENT_STATUSES.map((value) => ({
                        value,
                        label: STATE_LABELS[value],
                    }))}
                    current={previewState}
                />
            </div>
            {/* Remount on state change so each preview starts clean. */}
            <PaymentScreen
                key={previewState}
                orderNumber={orderNumber ?? DEMO_ORDER_NUMBER}
                initial={previewState}
            />
        </TransactionLayout>
    );
}
