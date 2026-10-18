import { Download, FileText } from 'lucide-react';
import { useState } from 'react';
import { routes } from '@/app/routing/routes';
import { StatusNotice } from '@/components/feedback/status-notice';
import { Button, ButtonLink } from '@/components/primitives/button';
import { TextLink } from '@/components/primitives/text-link';
import { copy } from '@/content/copy';
import { orderTimeline } from '@/features/orders/api/order-source';
import { OrderTimeline } from '@/features/orders/components/order-timeline';
import { StatusHeading } from '@/features/orders/components/status-heading';
import { orderStatusMeta } from '@/features/orders/status-meta';
import type { OrderSummary } from '@/features/orders/types';
import { productSource } from '@/features/products/api/product-source';
import { formatDateTime, formatMoney, maskEmail } from '@/lib/format';

/** Status, details, progress and the actions that make sense right now. */
export function OrderStatusView({ order }: { order: OrderSummary }) {
    const [actionNotice, setActionNotice] = useState(false);
    const text = copy.orders;
    const meta = orderStatusMeta[order.status];
    const status = text.statuses[order.status];
    const paid = order.status === 'paid' || order.status === 'fulfilled';
    const product = productSource.find(order.productSlug);
    const license = product
        ? productSource
              .licenses(product)
              .find((item) => item.name === order.licenseName)
        : undefined;

    return (
        <div className="frame editorial-grid gap-y-12 py-12 lg:py-16">
            <div className="grid content-start gap-10 lg:col-span-7">
                <StatusHeading
                    icon={meta.icon}
                    tone={meta.tone}
                    label={`${text.statusTitle} ${order.number}`}
                    title={status.title}
                    body={status.body}
                />

                {order.status === 'rejected' && order.rejectionReason && (
                    <StatusNotice
                        tone="danger"
                        title={copy.payment.rejectionLabel}
                        role="none"
                    >
                        {order.rejectionReason}
                    </StatusNotice>
                )}

                <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                    {(order.status === 'waiting_payment' ||
                        order.status === 'rejected') && (
                        <ButtonLink
                            href={routes.payment(order.number)}
                            variant="accent"
                            arrow
                        >
                            {text.actions.pay}
                        </ButtonLink>
                    )}
                    {paid && (
                        <>
                            <Button
                                variant="accent"
                                onClick={() => setActionNotice(true)}
                            >
                                <Download
                                    aria-hidden
                                    className="size-4"
                                    strokeWidth={1.7}
                                />
                                {text.actions.download}
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={() => setActionNotice(true)}
                            >
                                <FileText
                                    aria-hidden
                                    className="size-4"
                                    strokeWidth={1.7}
                                />
                                {text.actions.invoice}
                            </Button>
                        </>
                    )}
                    {order.status === 'expired' && (
                        <ButtonLink
                            href={routes.shop.show(order.productSlug)}
                            arrow
                        >
                            {text.actions.newOrder}
                        </ButtonLink>
                    )}
                    <TextLink href={routes.contact({ topic: 'order' })}>
                        {text.actions.support}
                    </TextLink>
                </div>

                {actionNotice && (
                    <StatusNotice
                        tone="info"
                        title={copy.common.previewBadge}
                        focusOnMount
                    >
                        {text.actionPreview}
                    </StatusNotice>
                )}

                <OrderTimeline
                    events={orderTimeline(order)}
                    label={text.timeline}
                />

                {paid && license && (
                    <section
                        aria-labelledby="license-heading"
                        className="border-line grid gap-4 border-t pt-6"
                    >
                        <h2
                            id="license-heading"
                            className="type-meta text-muted"
                        >
                            {text.licenseHeading}
                        </h2>
                        <p className="type-subtitle">{license.name}</p>
                        <p className="text-sm text-muted">{license.summary}</p>
                        <TextLink
                            href={routes.legal.license()}
                            arrow
                            className="w-fit text-sm"
                        >
                            {copy.shop.licenseNoteCta}
                        </TextLink>
                    </section>
                )}

                {paid && product && (
                    <section
                        aria-labelledby="support-heading"
                        className="border-line grid gap-3 border-t pt-6"
                    >
                        <h2
                            id="support-heading"
                            className="type-meta text-muted"
                        >
                            {text.supportHeading}
                        </h2>
                        <p className="text-sm">
                            {product.support.window}. {product.support.channel}.
                        </p>
                    </section>
                )}
            </div>

            <aside className="lg:col-span-4 lg:col-start-9">
                <dl className="border-ink grid gap-3 border-t-2 pt-6 text-sm">
                    {[
                        [copy.payment.orderNumber, order.number],
                        [text.placed, formatDateTime(order.placedAt)],
                        [text.product, order.productName],
                        [text.license, order.licenseName],
                        [copy.checkout.email, maskEmail(order.email)],
                    ].map(([term, value]) => (
                        <div
                            key={term}
                            className="border-line flex justify-between gap-4 border-b pb-3"
                        >
                            <dt className="text-muted">{term}</dt>
                            <dd className="text-right tabular-nums">{value}</dd>
                        </div>
                    ))}
                    <div className="flex items-baseline justify-between gap-4 pt-1">
                        <dt className="font-medium">{text.total}</dt>
                        <dd className="font-display text-2xl tabular-nums">
                            {formatMoney(order.total)}
                        </dd>
                    </div>
                </dl>
            </aside>
        </div>
    );
}
