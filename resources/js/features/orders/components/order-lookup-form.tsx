import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { navigate } from '@/app/routing/navigation';
import { routes } from '@/app/routing/routes';
import { StatusNotice } from '@/components/feedback/status-notice';
import { TextField } from '@/components/forms/fields';
import { Button } from '@/components/primitives/button';
import { copy } from '@/content/copy';
import { ORDER_NUMBER_PATTERN } from '@/features/orders/api/order-source';
import { EMAIL_PATTERN, isAbortError, simulateRequest } from '@/lib/simulate';

export type LookupState =
    | 'default'
    | 'validation'
    | 'loading'
    | 'not_found'
    | 'rate_limited'
    | 'network_error';

export const LOOKUP_STATES: readonly LookupState[] = [
    'default',
    'validation',
    'loading',
    'not_found',
    'rate_limited',
    'network_error',
];

type Errors = { order?: string; email?: string };

function validate(order: string, email: string): Errors {
    const text = copy.orders.errors;
    const errors: Errors = {};

    if (!order.trim()) {
        errors.order = text.orderRequired;
    } else if (!ORDER_NUMBER_PATTERN.test(order.trim().toUpperCase())) {
        errors.order = text.orderFormat;
    }

    if (!email.trim()) {
        errors.email = text.emailRequired;
    } else if (!EMAIL_PATTERN.test(email.trim())) {
        errors.email = text.emailInvalid;
    }

    return errors;
}

/** Finds an order by number and email. Lookup is simulated. */
export function OrderLookupForm({
    previewState,
}: {
    previewState: LookupState;
}) {
    const filled = previewState !== 'default' && previewState !== 'validation';
    const [order, setOrder] = useState(
        filled ? 'FG-2610-4821' : previewState === 'validation' ? 'FG-26' : '',
    );
    const [email, setEmail] = useState(filled ? 'rana@example.com' : '');
    const [errors, setErrors] = useState<Errors>(() =>
        previewState === 'validation' ? validate('FG-26', '') : {},
    );
    const [state, setState] = useState<LookupState>(
        previewState === 'validation' ? 'default' : previewState,
    );
    const controller = useRef<AbortController | null>(null);

    useEffect(() => () => controller.current?.abort(), []);

    const submit = async (event: FormEvent) => {
        event.preventDefault();
        const found = validate(order, email);
        setErrors(found);

        if (found.order || found.email) {
            document
                .getElementById(found.order ? 'lookup-order' : 'lookup-email')
                ?.focus();

            return;
        }

        controller.current = new AbortController();
        const outcome = previewState;
        setState('loading');

        try {
            await simulateRequest(900, controller.current.signal);

            if (
                outcome === 'not_found' ||
                outcome === 'rate_limited' ||
                outcome === 'network_error'
            ) {
                setState(outcome);

                return;
            }

            navigate(routes.orders.show(order.trim().toUpperCase()));
        } catch (problem) {
            if (!isAbortError(problem)) {
                setState('network_error');
            }
        }
    };

    const text = copy.orders;
    const loading = state === 'loading';

    return (
        <form noValidate onSubmit={submit} className="grid gap-6">
            {state === 'not_found' && (
                <StatusNotice tone="danger" title={text.errors.notFoundTitle}>
                    {text.errors.notFoundBody}
                </StatusNotice>
            )}
            {state === 'rate_limited' && (
                <StatusNotice
                    tone="warning"
                    title={text.errors.rateLimitedTitle}
                >
                    {text.errors.rateLimitedBody}
                </StatusNotice>
            )}
            {state === 'network_error' && (
                <StatusNotice tone="danger" title={text.errors.networkTitle}>
                    {text.errors.networkBody}
                </StatusNotice>
            )}

            <TextField
                id="lookup-order"
                label={text.orderNumber}
                hint={text.orderNumberHint}
                autoComplete="off"
                autoCapitalize="characters"
                spellCheck={false}
                value={order}
                error={errors.order}
                disabled={loading}
                onChange={(event) => setOrder(event.target.value)}
            />
            <TextField
                id="lookup-email"
                label={text.email}
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                error={errors.email}
                disabled={loading}
                onChange={(event) => setEmail(event.target.value)}
            />
            <Button
                type="submit"
                loading={loading}
                loadingLabel={text.submitting}
                disabled={state === 'rate_limited'}
                arrow
                className="justify-self-start"
            >
                {text.submit}
            </Button>
            <span role="status" aria-live="polite" className="sr-only">
                {loading ? text.submitting : ''}
            </span>
        </form>
    );
}
