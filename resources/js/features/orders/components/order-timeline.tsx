import { Check, X } from 'lucide-react';
import { copy } from '@/content/copy';
import type { OrderEvent } from '@/features/orders/types';
import { formatDateTime } from '@/lib/format';
import { cn } from '@/lib/utils';

/** Vertical timeline. Each step states its status in text, not just shape. */
export function OrderTimeline({
    events,
    label,
}: {
    events: OrderEvent[];
    label: string;
}) {
    return (
        <section aria-labelledby="timeline-heading" className="grid gap-5">
            <h2 id="timeline-heading" className="type-meta text-muted">
                {label}
            </h2>
            <ol className="grid">
                {events.map((event, index) => (
                    <li
                        key={event.id}
                        className="grid grid-cols-[2rem_minmax(0,1fr)] gap-x-4"
                    >
                        <span className="flex flex-col items-center">
                            <span
                                aria-hidden
                                className={cn(
                                    'grid size-7 shrink-0 place-items-center rounded-full border-2',
                                    event.state === 'done' &&
                                        'text-on-accent border-accent bg-accent',
                                    event.state === 'current' && 'border-ink',
                                    event.state === 'upcoming' &&
                                        'border-line-strong',
                                    event.state === 'failed' &&
                                        'border-danger text-danger',
                                )}
                            >
                                {event.state === 'done' && (
                                    <Check
                                        className="size-3.5"
                                        strokeWidth={2.4}
                                    />
                                )}
                                {event.state === 'failed' && (
                                    <X className="size-3.5" strokeWidth={2.4} />
                                )}
                                {event.state === 'current' && (
                                    <span className="bg-ink size-2 rounded-full" />
                                )}
                            </span>
                            {index < events.length - 1 && (
                                <span
                                    aria-hidden
                                    className="bg-line-strong my-1 w-px flex-1"
                                />
                            )}
                        </span>
                        <div className="grid content-start gap-0.5 pb-7">
                            <p
                                className={cn(
                                    'font-medium',
                                    event.state === 'upcoming' && 'text-muted',
                                )}
                            >
                                {event.label}
                            </p>
                            <p className="text-sm text-muted">
                                {copy.orders.timelineStates[event.state]}
                                {event.at && (
                                    <>
                                        {' · '}
                                        <time dateTime={event.at}>
                                            {formatDateTime(event.at)}
                                        </time>
                                    </>
                                )}
                            </p>
                        </div>
                    </li>
                ))}
            </ol>
        </section>
    );
}
