import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { navigate } from '@/app/routing/navigation';
import { routes } from '@/app/routing/routes';
import { StatusNotice } from '@/components/feedback/status-notice';
import { ChoiceGroup } from '@/components/forms/choice-group';
import { ErrorSummary } from '@/components/forms/error-summary';
import { CheckboxField, TextField } from '@/components/forms/fields';
import { Button } from '@/components/primitives/button';
import { TextLink } from '@/components/primitives/text-link';
import { copy } from '@/content/copy';
import { CHECKOUT_FIELDS } from '@/features/checkout/types';
import type {
    CheckoutErrors,
    CheckoutFormData,
    CheckoutState,
} from '@/features/checkout/types';
import { validateCheckout } from '@/features/checkout/utils/validate-checkout';
import { createOrderNumber } from '@/features/orders/api/order-source';
import type { ResolvedLicense } from '@/features/products/types';
import { formatMoney } from '@/lib/format';
import { isAbortError, simulateRequest } from '@/lib/simulate';

type CheckoutFormProps = {
    licenses: ResolvedLicense[];
    license: string;
    onLicenseChange: (id: string) => void;
    /** Preview state chosen via ?state=… (or "default"). */
    previewState: CheckoutState;
    priceChange: { previous: number; current: number } | null;
};

type Status = 'idle' | 'submitting' | 'failed' | 'network_error' | 'success';

const FIELD_IDS: Record<keyof CheckoutFormData, string> = {
    name: 'checkout-name',
    email: 'checkout-email',
    whatsapp: 'checkout-whatsapp',
    agreed: 'checkout-agreed',
};

function initialStatus(state: CheckoutState): Status {
    switch (state) {
        case 'loading':
            return 'submitting';
        case 'failed':
            return 'failed';
        case 'network_error':
            return 'network_error';
        case 'success':
            return 'success';
        default:
            return 'idle';
    }
}

/**
 * Guest checkout. Validates on submit, keeps every value on failure, and
 * reports the outcome in place. Submission is simulated in the UI Edition.
 */
export function CheckoutForm({
    licenses,
    license,
    onLicenseChange,
    previewState,
    priceChange,
}: CheckoutFormProps) {
    const [data, setData] = useState<CheckoutFormData>({
        name:
            previewState === 'default' || previewState === 'field_error'
                ? ''
                : 'Rana Oriel',
        email:
            previewState === 'field_error'
                ? 'rana@example'
                : previewState === 'default'
                  ? ''
                  : 'rana@example.com',
        whatsapp: '',
        agreed: previewState !== 'default' && previewState !== 'field_error',
    });
    const [errors, setErrors] = useState<CheckoutErrors>(() =>
        previewState === 'field_error'
            ? validateCheckout({
                  name: '',
                  email: 'rana@example',
                  whatsapp: '',
                  agreed: false,
              })
            : {},
    );
    const [attempt, setAttempt] = useState(
        previewState === 'field_error' ? 1 : 0,
    );
    const [status, setStatus] = useState<Status>(initialStatus(previewState));
    const controller = useRef<AbortController | null>(null);

    useEffect(() => () => controller.current?.abort(), []);

    const unavailable = previewState === 'unavailable';

    const update = <K extends keyof CheckoutFormData>(
        key: K,
        value: CheckoutFormData[K],
    ) => {
        setData((current) => ({ ...current, [key]: value }));

        if (errors[key]) {
            setErrors((current) => ({ ...current, [key]: undefined }));
        }
    };

    const submit = async (event: FormEvent) => {
        event.preventDefault();

        const found = validateCheckout(data);
        setErrors(found);
        setAttempt((value) => value + 1);

        if (Object.keys(found).length > 0) {
            return;
        }

        controller.current?.abort();
        controller.current = new AbortController();
        setStatus('submitting');

        try {
            await simulateRequest(1100, controller.current.signal);

            if (previewState === 'failed' || previewState === 'network_error') {
                setStatus(previewState);

                return;
            }

            setStatus('success');
            await simulateRequest(700, controller.current.signal);
            navigate(routes.payment(createOrderNumber()));
        } catch (error) {
            if (!isAbortError(error)) {
                setStatus('network_error');
            }
        }
    };

    const errorEntries = CHECKOUT_FIELDS.filter((key) => errors[key]).map(
        (key) => ({ fieldId: FIELD_IDS[key], message: errors[key] ?? '' }),
    );
    const submitting = status === 'submitting';
    const text = copy.checkout;

    return (
        <form
            noValidate
            onSubmit={submit}
            className="grid gap-10"
            aria-describedby="checkout-intro"
        >
            <p id="checkout-intro" className="text-muted">
                {text.intro}
            </p>

            {unavailable && (
                <StatusNotice
                    tone="warning"
                    title={text.states.unavailableTitle}
                >
                    {text.states.unavailableBody}
                </StatusNotice>
            )}
            {priceChange && (
                <StatusNotice
                    tone="warning"
                    title={text.states.priceChangedTitle}
                >
                    {text.states.priceChangedBody(
                        formatMoney(priceChange.previous),
                        formatMoney(priceChange.current),
                    )}
                </StatusNotice>
            )}
            {status === 'failed' && (
                <StatusNotice
                    tone="danger"
                    title={text.states.failedTitle}
                    focusOnMount={previewState === 'default'}
                >
                    {text.states.failedBody}
                </StatusNotice>
            )}
            {status === 'network_error' && (
                <StatusNotice tone="danger" title={text.states.networkTitle}>
                    {text.states.networkBody}
                </StatusNotice>
            )}
            {status === 'success' && (
                <StatusNotice tone="success" title={text.states.successTitle}>
                    {text.states.successBody}
                </StatusNotice>
            )}
            {errorEntries.length > 0 && (
                <ErrorSummary
                    key={attempt}
                    title={text.errors.summary(errorEntries.length)}
                    errors={errorEntries}
                />
            )}

            <fieldset
                disabled={submitting || unavailable}
                className="grid gap-6"
            >
                <legend className="type-subtitle mb-6">
                    {text.contactHeading}
                </legend>
                <TextField
                    id={FIELD_IDS.name}
                    label={text.name}
                    autoComplete="name"
                    value={data.name}
                    error={errors.name}
                    onChange={(event) => update('name', event.target.value)}
                />
                <TextField
                    id={FIELD_IDS.email}
                    label={text.email}
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    hint={text.emailHint}
                    value={data.email}
                    error={errors.email}
                    onChange={(event) => update('email', event.target.value)}
                />
                <TextField
                    id={FIELD_IDS.whatsapp}
                    label={text.whatsapp}
                    marker={text.optional}
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    hint={text.whatsappHint}
                    value={data.whatsapp}
                    error={errors.whatsapp}
                    onChange={(event) => update('whatsapp', event.target.value)}
                />
            </fieldset>

            {licenses.length > 1 && (
                <div>
                    <ChoiceGroup
                        legend={text.licenseHeading}
                        legendClassName="type-subtitle mb-6"
                        name="checkout-license"
                        value={license}
                        onChange={onLicenseChange}
                        choices={licenses.map((item) => ({
                            value: item.id,
                            label: item.name,
                            description: item.summary,
                            aside: formatMoney(item.price),
                            disabled: submitting || unavailable,
                        }))}
                    />
                </div>
            )}

            <CheckboxField
                id={FIELD_IDS.agreed}
                checked={data.agreed}
                error={errors.agreed}
                disabled={submitting || unavailable}
                onChange={(event) => update('agreed', event.target.checked)}
            >
                {text.agreement.before}{' '}
                <TextLink href={routes.legal.license()} newTab>
                    {text.agreementLinks.license}
                </TextLink>{' '}
                {text.agreement.middle}{' '}
                <TextLink href={routes.legal.terms()} newTab>
                    {text.agreementLinks.terms}
                </TextLink>
                {text.agreement.after}
            </CheckboxField>

            <div className="grid gap-3">
                <Button
                    type="submit"
                    variant="accent"
                    size="lg"
                    arrow
                    loading={submitting}
                    loadingLabel={text.submitting}
                    disabled={unavailable || status === 'success'}
                    className="w-full sm:w-auto sm:justify-self-start"
                >
                    {text.submit}
                </Button>
                <span role="status" aria-live="polite" className="sr-only">
                    {submitting ? text.submitting : ''}
                </span>
            </div>
        </form>
    );
}
