import { Check } from 'lucide-react';
import { copy } from '@/content/copy';
import { cn } from '@/lib/utils';

/** The three payment steps; `current` is 0-based, 3 = all done, -1 = none. */
export function PaymentSteps({ current }: { current: number }) {
    return (
        <ol className="border-line grid gap-0 border-t sm:grid-cols-3">
            {copy.payment.steps.map((label, index) => {
                const done = current > index;
                const active = current === index;

                return (
                    <li
                        key={label}
                        aria-current={active ? 'step' : undefined}
                        className={cn(
                            'border-line flex items-center gap-3 border-b py-4 text-sm sm:-mt-px sm:border-t-2 sm:border-b-0',
                            active
                                ? 'border-t-ink text-ink sm:border-t-ink font-medium'
                                : 'sm:border-t-transparent',
                            !active && !done && 'text-muted',
                        )}
                    >
                        <span
                            aria-hidden
                            className={cn(
                                'type-index grid size-7 shrink-0 place-items-center rounded-full border text-xs',
                                done
                                    ? 'text-on-accent border-accent bg-accent'
                                    : active
                                      ? 'border-ink'
                                      : 'border-line-strong',
                            )}
                        >
                            {done ? (
                                <Check className="size-3.5" strokeWidth={2.2} />
                            ) : (
                                index + 1
                            )}
                        </span>
                        <span>
                            {label}
                            {done && (
                                <span className="sr-only">
                                    {' '}
                                    {copy.transaction.completed}
                                </span>
                            )}
                        </span>
                    </li>
                );
            })}
        </ol>
    );
}
