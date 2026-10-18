import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { routes } from '@/app/routing/routes';
import { StatusNotice } from '@/components/feedback/status-notice';
import { ErrorSummary } from '@/components/forms/error-summary';
import {
    CheckboxField,
    SelectField,
    TextareaField,
    TextField,
} from '@/components/forms/fields';
import { Button } from '@/components/primitives/button';
import { TextLink } from '@/components/primitives/text-link';
import { copy } from '@/content/copy';
import {
    budgetRanges,
    projectTypes,
    timelines,
} from '@/features/contact/data/options';
import type {
    ContactField,
    ContactFormData,
    ContactState,
} from '@/features/contact/types';
import { EMAIL_PATTERN, isAbortError, simulateRequest } from '@/lib/simulate';

const REQUIRED_FIELDS: readonly ContactField[] = [
    'name',
    'email',
    'projectType',
    'message',
    'consent',
];

const fieldId = (field: ContactField) => `contact-${field}`;

function validate(
    data: ContactFormData,
): Partial<Record<ContactField, string>> {
    const text = copy.contact.errors;
    const errors: Partial<Record<ContactField, string>> = {};

    if (!data.name.trim()) errors.name = text.nameRequired;
    if (!data.email.trim()) errors.email = text.emailRequired;
    else if (!EMAIL_PATTERN.test(data.email.trim()))
        errors.email = text.emailInvalid;
    if (!data.projectType) errors.projectType = text.projectTypeRequired;
    if (!data.message.trim()) errors.message = text.messageRequired;
    else if (data.message.trim().length < 20)
        errors.message = text.messageShort;
    if (!data.consent) errors.consent = text.consentRequired;

    return errors;
}

const EMPTY: ContactFormData = {
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: '',
    consent: false,
};

const SAMPLE: ContactFormData = {
    name: 'Rana Oriel',
    email: 'rana@example.com',
    company: '',
    projectType: 'website',
    budget: '15-50',
    timeline: 'quarter',
    message:
        'We publish a quarterly report and want a reading-first site for it, ready before March.',
    consent: true,
};

type ContactFormProps = {
    previewState: ContactState;
    /** Preselects the project type, e.g. from ?topic=product-support. */
    topic: string | null;
};

/**
 * Inquiry form. Errors are tied to fields and summarised on submit; input
 * is kept on every failure. Sending is simulated in the UI Edition.
 */
export function ContactForm({ previewState, topic }: ContactFormProps) {
    const preset = projectTypes.some((option) => option.value === topic)
        ? topic
        : null;
    const [data, setData] = useState<ContactFormData>(() => {
        if (previewState === 'default') {
            return { ...EMPTY, projectType: preset ?? '' };
        }

        return previewState === 'validation'
            ? { ...EMPTY, email: 'rana@', message: 'Hello' }
            : SAMPLE;
    });
    const [errors, setErrors] = useState(() =>
        previewState === 'validation'
            ? validate({ ...EMPTY, email: 'rana@', message: 'Hello' })
            : {},
    );
    const [attempt, setAttempt] = useState(
        previewState === 'validation' ? 1 : 0,
    );
    const [state, setState] = useState<ContactState>(
        previewState === 'validation' ? 'default' : previewState,
    );
    const controller = useRef<AbortController | null>(null);
    const text = copy.contact;

    useEffect(() => () => controller.current?.abort(), []);

    const update = <K extends ContactField>(
        key: K,
        value: ContactFormData[K],
    ) => {
        setData((current) => ({ ...current, [key]: value }));

        if (errors[key]) {
            setErrors((current) => ({ ...current, [key]: undefined }));
        }
    };

    const submit = async (event: FormEvent) => {
        event.preventDefault();
        const found = validate(data);
        setErrors(found);
        setAttempt((value) => value + 1);

        if (Object.values(found).some(Boolean)) {
            return;
        }

        controller.current = new AbortController();
        const outcome = previewState;
        setState('submitting');

        try {
            await simulateRequest(1200, controller.current.signal);
            setState(
                outcome === 'failed' || outcome === 'rate_limited'
                    ? outcome
                    : 'success',
            );
        } catch (problem) {
            if (!isAbortError(problem)) {
                setState('failed');
            }
        }
    };

    if (state === 'success') {
        return (
            <div className="border-ink grid gap-6 border-t-2 pt-8">
                <StatusNotice
                    tone="success"
                    title={text.states.successTitle}
                    focusOnMount
                >
                    {text.states.successBody}
                </StatusNotice>
                <Button
                    variant="secondary"
                    className="justify-self-start"
                    onClick={() => {
                        setData(EMPTY);
                        setState('default');
                    }}
                >
                    {text.states.successAgain}
                </Button>
            </div>
        );
    }

    const errorEntries = REQUIRED_FIELDS.filter((key) => errors[key]).map(
        (key) => ({
            fieldId: fieldId(key),
            message: errors[key] ?? '',
        }),
    );
    const submitting = state === 'submitting';

    return (
        <form
            noValidate
            onSubmit={submit}
            className="border-ink grid gap-7 border-t-2 pt-8"
        >
            {state === 'failed' && (
                <StatusNotice tone="danger" title={text.states.failedTitle}>
                    {text.states.failedBody}
                </StatusNotice>
            )}
            {state === 'rate_limited' && (
                <StatusNotice
                    tone="warning"
                    title={text.states.rateLimitedTitle}
                >
                    {text.states.rateLimitedBody}
                </StatusNotice>
            )}
            {errorEntries.length > 0 && (
                <ErrorSummary
                    key={attempt}
                    title={copy.checkout.errors.summary(errorEntries.length)}
                    errors={errorEntries}
                />
            )}

            <fieldset disabled={submitting} className="grid gap-7">
                <div className="grid gap-7 sm:grid-cols-2 sm:gap-x-6">
                    <TextField
                        id={fieldId('name')}
                        label={text.name}
                        autoComplete="name"
                        value={data.name}
                        error={errors.name}
                        onChange={(event) => update('name', event.target.value)}
                    />
                    <TextField
                        id={fieldId('email')}
                        label={text.email}
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        value={data.email}
                        error={errors.email}
                        onChange={(event) =>
                            update('email', event.target.value)
                        }
                    />
                </div>
                <TextField
                    id={fieldId('company')}
                    label={text.company}
                    marker={text.optional}
                    autoComplete="organization"
                    value={data.company}
                    onChange={(event) => update('company', event.target.value)}
                />
                <SelectField
                    id={fieldId('projectType')}
                    label={text.projectType}
                    placeholder={text.projectTypePlaceholder}
                    options={projectTypes}
                    value={data.projectType}
                    error={errors.projectType}
                    onChange={(event) =>
                        update('projectType', event.target.value)
                    }
                />
                <div className="grid gap-7 sm:grid-cols-2 sm:gap-x-6">
                    <SelectField
                        id={fieldId('budget')}
                        label={text.budget}
                        marker={text.optional}
                        placeholder={text.optionalPlaceholder}
                        options={budgetRanges}
                        value={data.budget}
                        onChange={(event) =>
                            update('budget', event.target.value)
                        }
                    />
                    <SelectField
                        id={fieldId('timeline')}
                        label={text.timeline}
                        marker={text.optional}
                        placeholder={text.optionalPlaceholder}
                        options={timelines}
                        value={data.timeline}
                        onChange={(event) =>
                            update('timeline', event.target.value)
                        }
                    />
                </div>
                <TextareaField
                    id={fieldId('message')}
                    label={text.message}
                    hint={text.messageHint}
                    value={data.message}
                    error={errors.message}
                    onChange={(event) => update('message', event.target.value)}
                />
                <CheckboxField
                    id={fieldId('consent')}
                    checked={data.consent}
                    error={errors.consent}
                    onChange={(event) =>
                        update('consent', event.target.checked)
                    }
                >
                    {text.consent}{' '}
                    <TextLink href={routes.legal.privacy()} newTab>
                        {text.consentLink}
                    </TextLink>
                </CheckboxField>
            </fieldset>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <Button
                    type="submit"
                    size="lg"
                    arrow
                    loading={submitting}
                    loadingLabel={text.submitting}
                    disabled={state === 'rate_limited'}
                >
                    {text.submit}
                </Button>
                <p className="text-sm text-muted">{text.responseNote}</p>
            </div>
            <span role="status" aria-live="polite" className="sr-only">
                {submitting ? text.submitting : ''}
            </span>
        </form>
    );
}
