import { siteConfig } from '@/app/configuration/site-config';
import { productSource } from '@/features/products/api/product-source';
import type {
    OrderEvent,
    OrderStatus,
    OrderSummary,
} from '@/features/orders/types';
import { formatMoney } from '@/lib/format';

/**
 * Mock order source. Builds a believable order for any valid order number
 * so every status screen can be previewed. Commerce Edition: replace with
 * the order passed as a page prop by the controller.
 */

export const DEMO_ORDER_NUMBER = 'FG-2610-4821';
export const ORDER_NUMBER_PATTERN = /^FG-\d{4}-\d{4}$/;

const DEMO_PLACED_AT = '2026-10-18T09:24:00+07:00';

export function createOrderNumber(): string {
    const digits = () => String(Math.floor(1000 + Math.random() * 9000));

    return `FG-${digits()}-${digits()}`;
}

export const orderSource = {
    find(
        number: string,
        status: OrderStatus = 'waiting_payment',
    ): OrderSummary | null {
        if (!ORDER_NUMBER_PATTERN.test(number)) {
            return null;
        }

        const product = productSource.find('folio-editorial');

        if (!product) {
            return null;
        }

        const licenses = productSource.licenses(product);
        const license = licenses[1] ?? licenses[0];
        const total = license?.price ?? 0;
        const placed = new Date(DEMO_PLACED_AT);
        const deadline = new Date(
            placed.getTime() + siteConfig.payment.windowHours * 3_600_000,
        );

        return {
            number,
            email: 'rana@example.com',
            productSlug: product.slug,
            productName: product.name,
            licenseName: license?.name ?? 'Personal',
            total,
            placedAt: placed.toISOString(),
            payBefore: deadline.toISOString(),
            status,
            rejectionReason:
                status === 'rejected'
                    ? `The transferred amount (${formatMoney(total - 81000)}) does not match the order total. Transfer the remaining amount or upload the correct receipt.`
                    : null,
        };
    },
};

type StepState = OrderEvent['state'];

/** Per status, the state of each of the four steps. */
const TIMELINE: Record<
    OrderStatus,
    [StepState, StepState, StepState, StepState]
> = {
    waiting_payment: ['done', 'current', 'upcoming', 'upcoming'],
    waiting_verification: ['done', 'done', 'current', 'upcoming'],
    rejected: ['done', 'failed', 'upcoming', 'upcoming'],
    expired: ['done', 'failed', 'upcoming', 'upcoming'],
    paid: ['done', 'done', 'done', 'current'],
    fulfilled: ['done', 'done', 'done', 'done'],
};

const STEP_LABELS = [
    'Order placed',
    'Payment proof received',
    'Payment verified',
    'Files delivered',
];

const FAILED_LABELS: Partial<Record<OrderStatus, string>> = {
    rejected: 'Payment proof not accepted',
    expired: 'Payment deadline passed',
};

/** Timeline shown on the order status page. Times are mock offsets. */
export function orderTimeline(order: OrderSummary): OrderEvent[] {
    const placed = new Date(order.placedAt).getTime();

    return TIMELINE[order.status].map((state, index) => ({
        id: `step-${index}`,
        label:
            state === 'failed'
                ? (FAILED_LABELS[order.status] ?? STEP_LABELS[index])
                : STEP_LABELS[index],
        at:
            state === 'done' || state === 'failed'
                ? new Date(placed + index * 2.5 * 3_600_000).toISOString()
                : null,
        state,
    }));
}
