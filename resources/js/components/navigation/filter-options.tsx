import { cn } from '@/lib/utils';

export type FilterOption = {
    value: string | null;
    label: string;
    count?: number;
};

type FilterOptionsProps = {
    label: string;
    options: FilterOption[];
    value: string | null;
    onChange: (value: string | null) => void;
    className?: string;
};

/**
 * Single-choice filter rendered as a row of text buttons. The active option
 * is marked with aria-pressed, weight and an underline — not colour alone.
 * Wraps onto new lines instead of scrolling sideways.
 */
export function FilterOptions({
    label,
    options,
    value,
    onChange,
    className,
}: FilterOptionsProps) {
    return (
        <div
            role="group"
            aria-label={label}
            className={cn('flex flex-wrap gap-x-5 gap-y-1', className)}
        >
            {options.map((option) => {
                const active = option.value === value;

                return (
                    <button
                        key={option.value ?? 'all'}
                        type="button"
                        aria-pressed={active}
                        onClick={() => onChange(option.value)}
                        className={cn(
                            'relative inline-flex min-h-11 items-baseline gap-1.5 pt-2 text-sm transition-colors duration-(--duration-fast)',
                            'after:bg-ink after:ease-emphasized after:absolute after:inset-x-0 after:bottom-2 after:h-px after:origin-left after:scale-x-0 after:transition-transform after:duration-(--duration-normal)',
                            active
                                ? 'text-ink font-semibold after:scale-x-100'
                                : 'hover:text-ink text-muted',
                        )}
                    >
                        <span>{option.label}</span>
                        {option.count !== undefined && (
                            <span className="text-xs font-normal text-muted tabular-nums">
                                {option.count}
                            </span>
                        )}
                    </button>
                );
            })}
        </div>
    );
}
