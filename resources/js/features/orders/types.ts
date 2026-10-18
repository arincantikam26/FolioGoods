export type OrderStatus =
    | 'waiting_payment'
    | 'waiting_verification'
    | 'paid'
    | 'rejected'
    | 'expired'
    | 'fulfilled';

export const ORDER_STATUSES: readonly OrderStatus[] = [
    'waiting_payment',
    'waiting_verification',
    'paid',
    'rejected',
    'expired',
    'fulfilled',
];

export type PaymentStatus =
    | 'waiting_payment'
    | 'proof_uploaded'
    | 'under_review'
    | 'rejected'
    | 'approved'
    | 'expired';

export const PAYMENT_STATUSES: readonly PaymentStatus[] = [
    'waiting_payment',
    'proof_uploaded',
    'under_review',
    'rejected',
    'approved',
    'expired',
];

/** What the buyer-facing pages need to know about an order. */
export type OrderSummary = {
    number: string;
    email: string;
    productSlug: string;
    productName: string;
    licenseName: string;
    total: number;
    placedAt: string;
    payBefore: string;
    status: OrderStatus;
    rejectionReason: string | null;
};

export type OrderEvent = {
    id: string;
    label: string;
    at: string | null;
    state: 'done' | 'current' | 'upcoming' | 'failed';
};
