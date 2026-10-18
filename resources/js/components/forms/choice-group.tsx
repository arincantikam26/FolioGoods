import { useId } from 'react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type Choice<T extends string> = {
    value: T;
    label: string;
    description?: string;
    /** Right-aligned detail, e.g. a price. */
    aside?: ReactNode;
    disabled?: boolean;
};

type ChoiceGroupProps<T extends string> = {
    legend: string;
    name: string;
    value: T;
    onChange: (value: T) => void;
    choices: Choice<T>[];
    className?: string;
    legendClassName?: string;
};

/**
 * Radio group laid out as ruled rows. The whole row is the target and the
 * selected row is marked by an accent rule, a filled dot and bold text.
 */
export function ChoiceGroup<T extends string>({
    legend,
    name,
    value,
    onChange,
    choices,
    className,
    legendClassName,
}: ChoiceGroupProps<T>) {
    const groupId = useId();

    return (
        <fieldset className={cn('grid', className)}>
            <legend className={legendClassName ?? 'mb-3 text-sm font-medium'}>
                {legend}
            </legend>
            <div className="border-line border-t">
                {choices.map((choice) => {
                    const id = `${groupId}-${choice.value}`;
                    const checked = choice.value === value;

                    return (
                        <label
                            key={choice.value}
                            htmlFor={id}
                            className={cn(
                                'border-line relative grid cursor-pointer grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-x-3 border-b py-4 pr-1 pl-4 transition-colors duration-(--duration-fast)',
                                'before:absolute before:inset-y-0 before:left-0 before:w-0.5 before:bg-transparent before:transition-colors',
                                checked && 'before:bg-accent',
                                choice.disabled &&
                                    'cursor-not-allowed opacity-60',
                            )}
                        >
                            <input
                                id={id}
                                type="radio"
                                name={name}
                                value={choice.value}
                                checked={checked}
                                disabled={choice.disabled}
                                onChange={() => onChange(choice.value)}
                                className="mt-1 size-4 accent-(--color-accent)"
                            />
                            <span className="grid gap-1">
                                <span
                                    className={cn(
                                        'text-sm',
                                        checked
                                            ? 'font-semibold'
                                            : 'font-medium',
                                    )}
                                >
                                    {choice.label}
                                </span>
                                {choice.description && (
                                    <span className="text-sm text-muted">
                                        {choice.description}
                                    </span>
                                )}
                            </span>
                            {choice.aside && (
                                <span className="text-sm font-medium tabular-nums">
                                    {choice.aside}
                                </span>
                            )}
                        </label>
                    );
                })}
            </div>
        </fieldset>
    );
}
