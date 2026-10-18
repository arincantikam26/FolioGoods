import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { siteConfig } from '@/app/configuration/site-config';
import { FileDropzone } from '@/components/forms/file-dropzone';
import { Button } from '@/components/primitives/button';
import { copy } from '@/content/copy';
import { isAbortError, simulateRequest } from '@/lib/simulate';

type ProofUploadProps = {
    onSubmitted: () => void;
};

/**
 * Payment proof form. Requirements are shown before choosing a file; the
 * file stays local (object URL preview) — nothing is uploaded in the UI
 * Edition.
 */
export function ProofUpload({ onSubmitted }: ProofUploadProps) {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const controller = useRef<AbortController | null>(null);
    const { proof } = siteConfig.payment;

    useEffect(() => () => controller.current?.abort(), []);

    const submit = async (event: FormEvent) => {
        event.preventDefault();

        if (!file) {
            setError(copy.upload.required);

            return;
        }

        controller.current = new AbortController();
        setSubmitting(true);

        try {
            await simulateRequest(1400, controller.current.signal);
            onSubmitted();
        } catch (problem) {
            if (!isAbortError(problem)) {
                setSubmitting(false);
            }
        }
    };

    return (
        <form
            noValidate
            onSubmit={submit}
            aria-labelledby="proof-heading"
            className="grid gap-6"
        >
            <h2 id="proof-heading" className="type-subtitle">
                {copy.payment.uploadHeading}
            </h2>
            <FileDropzone
                label={copy.payment.uploadHeading}
                requirement={proof.acceptLabel}
                hint={copy.payment.uploadHint}
                accept={proof.accept}
                maxBytes={proof.maxBytes}
                file={file}
                error={error}
                disabled={submitting}
                onChange={(next) => {
                    setFile(next);
                    setError(null);
                }}
            />
            <Button
                type="submit"
                variant="accent"
                loading={submitting}
                loadingLabel={copy.payment.submitting}
                className="justify-self-start"
            >
                {copy.payment.submit}
            </Button>
            <span role="status" aria-live="polite" className="sr-only">
                {submitting ? copy.payment.submitting : ''}
            </span>
        </form>
    );
}
