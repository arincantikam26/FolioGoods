import type { ReactNode } from 'react';
import { AppLink } from '@/app/routing/app-link';
import { routes } from '@/app/routing/routes';
import { BrandMark } from '@/components/layout/brand-mark';
import { RouteProgress, SkipLink } from '@/components/layout/route-progress';
import { copy } from '@/content/copy';
import { cn } from '@/lib/utils';

type TransactionLayoutProps = {
    children: ReactNode;
    /** 0-based index into copy.checkout.steps; omit to hide the steps. */
    step?: number;
};

/**
 * Checkout, payment and order status. Main navigation is removed so the
 * only choices are the task at hand or help.
 */
export function TransactionLayout({ children, step }: TransactionLayoutProps) {
    const steps = copy.checkout.steps;

    return (
        <div id="top" className="flex min-h-dvh flex-col">
            <SkipLink />
            <RouteProgress />
            <header data-site-header className="border-line border-b">
                <div className="frame flex min-h-(--header-height) flex-wrap items-center justify-between gap-x-6 gap-y-2 py-2">
                    <BrandMark />
                    {step !== undefined && (
                        <ol
                            aria-label={copy.transaction.progressLabel}
                            className="flex items-center gap-2 text-xs sm:gap-4 sm:text-sm"
                        >
                            {steps.map((label, index) => {
                                const state =
                                    index < step
                                        ? 'done'
                                        : index === step
                                          ? 'current'
                                          : 'upcoming';

                                return (
                                    <li
                                        key={label}
                                        aria-current={
                                            state === 'current'
                                                ? 'step'
                                                : undefined
                                        }
                                        className={cn(
                                            'flex items-center gap-2',
                                            state === 'upcoming'
                                                ? 'text-muted'
                                                : 'text-ink',
                                            state === 'current' &&
                                                'font-medium',
                                        )}
                                    >
                                        <span
                                            aria-hidden
                                            className={cn(
                                                'type-index grid size-6 place-items-center rounded-full border text-xs',
                                                state === 'current' &&
                                                    'border-ink',
                                                state === 'done' &&
                                                    'text-on-accent border-accent bg-accent',
                                                state === 'upcoming' &&
                                                    'border-line-strong',
                                            )}
                                        >
                                            {index + 1}
                                        </span>
                                        <span>
                                            {label}
                                            {state === 'done' && (
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
                    )}
                </div>
            </header>

            <main
                id="main"
                tabIndex={-1}
                className="motion-page-enter flex-1 outline-none"
            >
                {children}
            </main>

            <footer data-site-footer className="border-line border-t">
                <div className="frame flex flex-wrap items-center gap-x-6 gap-y-2 py-6 text-sm text-muted">
                    <AppLink
                        href={routes.orders.lookup()}
                        className="hover:text-ink inline-flex min-h-11 items-center"
                    >
                        {copy.orders.lookupTitle}
                    </AppLink>
                    <AppLink
                        href={routes.contact({ topic: 'order' })}
                        className="hover:text-ink inline-flex min-h-11 items-center"
                    >
                        {copy.payment.helpCta}
                    </AppLink>
                    <AppLink
                        href={routes.legal.terms()}
                        className="hover:text-ink inline-flex min-h-11 items-center"
                    >
                        {copy.transaction.terms}
                    </AppLink>
                    <AppLink
                        href={routes.shop.index()}
                        className="hover:text-ink inline-flex min-h-11 items-center sm:ml-auto"
                    >
                        {copy.transaction.backToShop}
                    </AppLink>
                </div>
            </footer>
        </div>
    );
}
