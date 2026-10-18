import { FileText, Upload, X } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import type { DragEvent } from 'react';
import { FieldError } from '@/components/forms/field-shell';
import { copy } from '@/content/copy';
import { formatBytes } from '@/lib/format';
import { cn } from '@/lib/utils';

type FileDropzoneProps = {
    label: string;
    /** Requirement shown before choosing, e.g. "JPG, PNG or PDF, up to 5 MB". */
    requirement: string;
    hint?: string;
    accept: readonly string[];
    maxBytes: number;
    file: File | null;
    onChange: (file: File | null) => void;
    /** Error from the parent (e.g. "required" on submit). */
    error?: string | null;
    disabled?: boolean;
};

function validate(file: File, accept: readonly string[], maxBytes: number) {
    if (!accept.includes(file.type)) {
        return copy.upload.wrongType;
    }

    if (file.size > maxBytes) {
        return copy.upload.tooLarge(formatBytes(maxBytes));
    }

    return null;
}

/**
 * Local file picker with drag and drop and an in-browser preview.
 * Nothing is uploaded; the parent receives the File object.
 */
export function FileDropzone({
    label,
    requirement,
    hint,
    accept,
    maxBytes,
    file,
    onChange,
    error,
    disabled = false,
}: FileDropzoneProps) {
    const id = useId();
    const input = useRef<HTMLInputElement>(null);
    const [dragging, setDragging] = useState(false);
    const [rejection, setRejection] = useState<string | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    // Object URLs hold memory until revoked.
    useEffect(() => {
        if (!file || !file.type.startsWith('image/')) {
            setPreview(null);

            return;
        }

        const url = URL.createObjectURL(file);
        setPreview(url);

        return () => URL.revokeObjectURL(url);
    }, [file]);

    const pick = (candidate: File | undefined) => {
        if (!candidate) {
            return;
        }

        const problem = validate(candidate, accept, maxBytes);
        setRejection(problem);

        if (!problem) {
            onChange(candidate);
        }
    };

    const onDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragging(false);

        if (!disabled) {
            pick(event.dataTransfer.files[0]);
        }
    };

    const shownError = rejection ?? error ?? null;
    const requirementId = `${id}-requirement`;
    const errorId = shownError ? `${id}-error` : undefined;

    return (
        <div className="grid gap-2">
            <p id={`${id}-label`} className="text-sm font-medium">
                {label}
            </p>
            <p id={requirementId} className="text-sm text-muted">
                {requirement}
                {hint ? ` · ${hint}` : ''}
            </p>

            <input
                ref={input}
                id={id}
                type="file"
                accept={accept.join(',')}
                className="sr-only"
                tabIndex={-1}
                aria-hidden
                disabled={disabled}
                onChange={(event) => {
                    pick(event.target.files?.[0]);
                    event.target.value = '';
                }}
            />

            {file ? (
                <div className="border-line-strong bg-surface grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 border p-3">
                    <div className="bg-surface-muted grid size-16 place-items-center overflow-hidden">
                        {preview ? (
                            <img
                                src={preview}
                                alt=""
                                className="size-full object-cover"
                            />
                        ) : (
                            <FileText
                                aria-hidden
                                strokeWidth={1.4}
                                className="size-7 text-muted"
                            />
                        )}
                    </div>
                    <div className="grid min-w-0 gap-1">
                        <p className="sr-only">{copy.upload.selected}</p>
                        <p className="truncate text-sm font-medium">
                            {file.name}
                        </p>
                        <p className="text-xs text-muted">
                            {formatBytes(file.size)}
                        </p>
                        <div className="mt-1 flex flex-wrap gap-x-5">
                            <button
                                type="button"
                                disabled={disabled}
                                onClick={() => input.current?.click()}
                                className="link-underline min-h-11 text-sm font-medium"
                            >
                                {copy.upload.replace}
                            </button>
                            <button
                                type="button"
                                disabled={disabled}
                                onClick={() => {
                                    setRejection(null);
                                    onChange(null);
                                }}
                                className="hover:text-ink inline-flex min-h-11 items-center gap-1.5 text-sm text-muted"
                            >
                                <X aria-hidden className="size-4" />
                                {copy.upload.remove}
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div
                    onDragOver={(event) => {
                        event.preventDefault();
                        setDragging(true);
                    }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={onDrop}
                    className={cn(
                        'grid justify-items-start gap-3 border border-dashed p-5 transition-colors duration-(--duration-fast) sm:grid-cols-[auto_1fr] sm:items-center',
                        dragging
                            ? 'bg-surface-muted border-accent'
                            : 'border-line-strong',
                        shownError && 'border-danger',
                    )}
                >
                    <button
                        type="button"
                        disabled={disabled}
                        onClick={() => input.current?.click()}
                        aria-describedby={[requirementId, errorId]
                            .filter(Boolean)
                            .join(' ')}
                        aria-labelledby={`${id}-label ${id}-choose`}
                        className="border-ink hover:bg-ink hover:text-on-ink inline-flex min-h-11 items-center gap-2 rounded-xs border px-4 text-sm font-medium"
                    >
                        <Upload
                            aria-hidden
                            strokeWidth={1.6}
                            className="size-4"
                        />
                        <span id={`${id}-choose`}>{copy.upload.choose}</span>
                    </button>
                    <span className="text-sm text-muted">
                        {copy.upload.dropHint}
                    </span>
                </div>
            )}

            {shownError && <FieldError id={errorId}>{shownError}</FieldError>}
        </div>
    );
}
