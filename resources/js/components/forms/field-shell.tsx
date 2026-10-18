import { CircleAlert } from 'lucide-react';
import { useId } from 'react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type FieldControlProps = {
    id: string;
    'aria-describedby': string | undefined;
    'aria-invalid': true | undefined;
};

type FieldShellProps = {
    label: string;
    hint?: string;
    error?: string | null;
    /** Text shown after the label, e.g. "optional". */
    marker?: string;
    /** Override the generated id (e.g. to link from an error summary). */
    id?: string;
    className?: string;
    children: (control: FieldControlProps) => ReactNode;
};

export const inputClasses =
    'w-full min-h-12 rounded-xs border border-line-strong bg-surface px-4 py-2.5 text-base text-ink transition-[border-color,box-shadow] duration-(--duration-fast) ease-standard placeholder:text-muted hover:border-ink focus-visible:border-ink aria-invalid:border-danger aria-invalid:shadow-[inset_3px_0_0_var(--color-danger)]';

/**
 * Label, hint and error around any control. Wires up ids, aria-invalid and
 * aria-describedby so every field is announced correctly.
 */
export function FieldShell({
    label,
    hint,
    error,
    marker,
    id: providedId,
    className,
    children,
}: FieldShellProps) {
    const generated = useId();
    const id = providedId ?? generated;
    const hintId = hint ? `${id}-hint` : undefined;
    const errorId = error ? `${id}-error` : undefined;
    const describedBy =
        [errorId, hintId].filter(Boolean).join(' ') || undefined;

    return (
        <div className={cn('grid content-start gap-2', className)}>
            <label
                htmlFor={id}
                className="flex items-baseline gap-2 text-sm font-medium"
            >
                {label}
                {marker && (
                    <span className="font-normal text-muted">({marker})</span>
                )}
            </label>
            {children({
                id,
                'aria-describedby': describedBy,
                'aria-invalid': error ? true : undefined,
            })}
            {error && <FieldError id={errorId}>{error}</FieldError>}
            {hint && (
                <p id={hintId} className="text-sm text-muted">
                    {hint}
                </p>
            )}
        </div>
    );
}

export function FieldError({
    id,
    children,
}: {
    id?: string;
    children: ReactNode;
}) {
    return (
        <p id={id} className="text-danger flex items-start gap-2 text-sm">
            <CircleAlert
                aria-hidden
                strokeWidth={1.8}
                className="mt-0.5 size-4 shrink-0"
            />
            <span>{children}</span>
        </p>
    );
}
