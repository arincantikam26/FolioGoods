import { formatMoney } from '@/lib/format';
import { cn } from '@/lib/utils';

type PriceDisplayProps = {
    amount: number;
    /** Shows "From" before the price when several licenses exist. */
    prefix?: string;
    size?: 'sm' | 'lg';
    className?: string;
};

/** Price with tabular figures so columns of prices line up. */
export function PriceDisplay({
    amount,
    prefix,
    size = 'sm',
    className,
}: PriceDisplayProps) {
    return (
        <p
            className={cn(
                'flex items-baseline gap-1.5 tabular-nums',
                className,
            )}
        >
            {prefix && <span className="text-xs text-muted">{prefix}</span>}
            <span
                className={cn(
                    size === 'lg'
                        ? 'font-display text-3xl tracking-tight'
                        : 'text-sm font-medium',
                )}
            >
                {formatMoney(amount)}
            </span>
        </p>
    );
}
