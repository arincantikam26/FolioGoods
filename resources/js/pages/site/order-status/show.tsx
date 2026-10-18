import { routes } from '@/app/routing/routes';
import { NotFoundState } from '@/components/feedback/not-found-state';
import { PreviewNotice } from '@/components/feedback/preview-notice';
import { Seo } from '@/components/seo/seo';
import { copy } from '@/content/copy';
import { orderSource } from '@/features/orders/api/order-source';
import { OrderStatusView } from '@/features/orders/components/order-status-view';
import { ORDER_STATUSES } from '@/features/orders/types';
import type { OrderStatus } from '@/features/orders/types';
import { usePreviewState } from '@/hooks/use-preview-state';
import { TransactionLayout } from '@/layouts/site/transaction-layout';

const STATE_LABELS: Record<OrderStatus, string> = {
    waiting_payment: 'Waiting payment',
    waiting_verification: 'Waiting verification',
    paid: 'Paid',
    rejected: 'Rejected',
    expired: 'Expired',
    fulfilled: 'Fulfilled',
};

const STEP: Record<OrderStatus, number> = {
    waiting_payment: 1,
    waiting_verification: 1,
    rejected: 1,
    expired: 1,
    paid: 2,
    fulfilled: 2,
};

export default function OrderStatusPage({
    order: orderNumber,
}: {
    order: string;
}) {
    const status = usePreviewState(ORDER_STATUSES, 'paid');
    const order = orderSource.find(orderNumber, status);

    return (
        <TransactionLayout step={STEP[status]}>
            <Seo title={`${copy.orders.statusTitle} ${orderNumber}`} noindex />
            <div className="frame pt-6">
                <PreviewNotice
                    message={copy.preview.transactionNotice}
                    states={ORDER_STATUSES.map((value) => ({
                        value,
                        label: STATE_LABELS[value],
                    }))}
                    current={status}
                />
            </div>
            {order ? (
                <OrderStatusView key={status} order={order} />
            ) : (
                <NotFoundState
                    title={copy.orders.errors.notFoundTitle}
                    body={copy.orders.errors.notFoundBody}
                    action={{
                        label: copy.orders.lookupTitle,
                        href: routes.orders.lookup(),
                    }}
                />
            )}
        </TransactionLayout>
    );
}
