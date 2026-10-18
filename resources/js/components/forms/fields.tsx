import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import {
    FieldError,
    FieldShell,
    inputClasses,
} from '@/components/forms/field-shell';
import { cn } from '@/lib/utils';

type ShellProps = {
    label: string;
    hint?: string;
    error?: string | null;
    marker?: string;
    id?: string;
    className?: string;
};

type TextFieldProps = ShellProps &
    Omit<ComponentPropsWithoutRef<'input'>, 'id' | 'className'>;

export function TextField({
    label,
    hint,
    error,
    marker,
    id,
    className,
    ...input
}: TextFieldProps) {
    return (
        <FieldShell
            label={label}
            hint={hint}
            error={error}
            marker={marker}
            id={id}
            className={className}
        >
            {(control) => (
                <input className={inputClasses} {...control} {...input} />
            )}
        </FieldShell>
    );
}

type TextareaFieldProps = ShellProps &
    Omit<ComponentPropsWithoutRef<'textarea'>, 'id' | 'className'>;

export function TextareaField({
    label,
    hint,
    error,
    marker,
    id,
    className,
    rows = 6,
    ...textarea
}: TextareaFieldProps) {
    return (
        <FieldShell
            label={label}
            hint={hint}
            error={error}
            marker={marker}
            id={id}
            className={className}
        >
            {(control) => (
                <textarea
                    rows={rows}
                    className={cn(
                        inputClasses,
                        'min-h-36 resize-y leading-relaxed',
                    )}
                    {...control}
                    {...textarea}
                />
            )}
        </FieldShell>
    );
}

type SelectFieldProps = ShellProps &
    Omit<ComponentPropsWithoutRef<'select'>, 'id' | 'className'> & {
        options: { value: string; label: string }[];
        placeholder?: string;
    };

/** Native select: best keyboard, screen reader and mobile behaviour. */
export function SelectField({
    label,
    hint,
    error,
    marker,
    id,
    className,
    options,
    placeholder,
    ...select
}: SelectFieldProps) {
    return (
        <FieldShell
            label={label}
            hint={hint}
            error={error}
            marker={marker}
            id={id}
            className={className}
        >
            {(control) => (
                <select
                    className={cn(inputClasses, 'select-native')}
                    {...control}
                    {...select}
                >
                    {placeholder !== undefined && (
                        <option value="">{placeholder}</option>
                    )}
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            )}
        </FieldShell>
    );
}

type CheckboxFieldProps = Omit<
    ComponentPropsWithoutRef<'input'>,
    'type' | 'className'
> & {
    children: ReactNode;
    error?: string | null;
    className?: string;
};

/** Checkbox whose whole label is the click target. */
export function CheckboxField({
    children,
    error,
    className,
    id,
    ...input
}: CheckboxFieldProps) {
    const errorId = error && id ? `${id}-error` : undefined;

    return (
        <div className={cn('grid gap-2', className)}>
            <label
                htmlFor={id}
                className="flex min-h-11 cursor-pointer items-start gap-3 text-sm"
            >
                <input
                    id={id}
                    type="checkbox"
                    aria-invalid={error ? true : undefined}
                    aria-describedby={errorId}
                    className="border-line-strong mt-0.5 size-5 shrink-0 cursor-pointer rounded-xs accent-(--color-accent)"
                    {...input}
                />
                <span className="leading-relaxed">{children}</span>
            </label>
            {error && <FieldError id={errorId}>{error}</FieldError>}
        </div>
    );
}
