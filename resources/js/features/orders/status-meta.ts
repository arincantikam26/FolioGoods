import {
    BadgeCheck,
    CircleCheck,
    CircleX,
    Clock3,
    Hourglass,
    TimerOff,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { StatusTone } from '@/features/orders/components/status-heading';
import type { OrderStatus, PaymentStatus } from '@/features/orders/types';

export const paymentStatusMeta: Record<
    PaymentStatus,
    { icon: LucideIcon; tone: StatusTone; step: number }
> = {
    waiting_payment: { icon: Clock3, tone: 'progress', step: 0 },
    proof_uploaded: { icon: CircleCheck, tone: 'success', step: 2 },
    under_review: { icon: Hourglass, tone: 'progress', step: 2 },
    rejected: { icon: CircleX, tone: 'danger', step: 1 },
    approved: { icon: BadgeCheck, tone: 'success', step: 3 },
    expired: { icon: TimerOff, tone: 'neutral', step: -1 },
};

export const orderStatusMeta: Record<
    OrderStatus,
    { icon: LucideIcon; tone: StatusTone }
> = {
    waiting_payment: { icon: Clock3, tone: 'progress' },
    waiting_verification: { icon: Hourglass, tone: 'progress' },
    paid: { icon: CircleCheck, tone: 'success' },
    rejected: { icon: CircleX, tone: 'danger' },
    expired: { icon: TimerOff, tone: 'neutral' },
    fulfilled: { icon: BadgeCheck, tone: 'success' },
};
