import { useState } from 'react';
import { routes } from '@/app/routing/routes';
import { StatusNotice } from '@/components/feedback/status-notice';
import { ButtonLink } from '@/components/primitives/button';
import { TextLink } from '@/components/primitives/text-link';
import { copy } from '@/content/copy';
import { orderSource } from '@/features/orders/api/order-source';
import { StatusHeading } from '@/features/orders/components/status-heading';
import { paymentStatusMeta } from '@/features/orders/status-meta';
import type { PaymentStatus } from '@/features/orders/types';
import { PaymentSteps } from '@/features/payment/components/payment-steps';
import { ProofUpload } from '@/features/payment/components/proof-upload';
import { TransferDetails } from '@/features/payment/components/transfer-details';

/** Payment instructions and proof upload for one order, in one status. */
export function PaymentScreen({
    orderNumber,
    initial,
}: {
    orderNumber: string;
    initial: PaymentStatus;
}) {
    const [status, setStatus] = useState<PaymentStatus>(initial);
    const order = orderSource.find(
        orderNumber,
        status === 'rejected' ? 'rejected' : 'waiting_payment',
    );
    const meta = paymentStatusMeta[status];
    const text = copy.payment.statuses[status];
    const canUpload = status === 'waiting_payment' || status === 'rejected';

    if (!order) {
        return null;
    }

    return (
        <div className="frame editorial-grid gap-y-12 py-12 lg:py-16">
            <div className="grid content-start gap-10 lg:col-span-7">
                <StatusHeading
                    icon={meta.icon}
                    tone={meta.tone}
                    label={`${copy.payment.orderNumber} ${order.number}`}
                    title={text.title}
                    body={text.body}
                />

                {status !== 'expired' && <PaymentSteps current={meta.step} />}

                {status === 'rejected' && order.rejectionReason && (
                    <StatusNotice
                        tone="danger"
                        title={copy.payment.rejectionLabel}
                        role="none"
                    >
                        {order.rejectionReason}
                    </StatusNotice>
                )}

                {canUpload && (
                    <ProofUpload
                        onSubmitted={() => setStatus('proof_uploaded')}
                    />
                )}

                {(status === 'proof_uploaded' ||
                    status === 'under_review' ||
                    status === 'approved') && (
                    <div className="flex flex-wrap gap-x-8 gap-y-4">
                        <ButtonLink
                            href={routes.orders.show(order.number)}
                            arrow
                        >
                            {copy.payment.statusCta}
                        </ButtonLink>
                    </div>
                )}

                {status === 'expired' && (
                    <ButtonLink
                        href={routes.shop.show(order.productSlug)}
                        arrow
                        className="justify-self-start"
                    >
                        {copy.payment.expiredCta}
                    </ButtonLink>
                )}

                <p className="text-sm text-muted">
                    {copy.payment.help}{' '}
                    <TextLink href={routes.contact({ topic: 'order' })}>
                        {copy.payment.helpCta}
                    </TextLink>
                </p>
            </div>

            <aside className="lg:col-span-5 lg:col-start-8">
                {status === 'expired' ? (
                    <dl className="border-ink grid gap-3 border-t-2 pt-6 text-sm">
                        <div className="flex justify-between gap-4">
                            <dt className="text-muted">
                                {copy.payment.orderNumber}
                            </dt>
                            <dd className="tabular-nums">{order.number}</dd>
                        </div>
                        <div className="flex justify-between gap-4">
                            <dt className="text-muted">
                                {copy.orders.product}
                            </dt>
                            <dd>{order.productName}</dd>
                        </div>
                    </dl>
                ) : (
                    <TransferDetails
                        orderNumber={order.number}
                        total={order.total}
                        payBefore={order.payBefore}
                    />
                )}
            </aside>
        </div>
    );
}
