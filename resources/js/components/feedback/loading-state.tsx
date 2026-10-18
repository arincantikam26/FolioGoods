import { Spinner } from '@/components/primitives/spinner';
import { cn } from '@/lib/utils';

/** Inline, specific loading message ("Checking order"), announced politely. */
export function LoadingState({
    label,
    className,
}: {
    label: string;
    className?: string;
}) {
    return (
        <p
            role="status"
            aria-live="polite"
            className={cn(
                'flex items-center gap-3 text-sm text-muted',
                className,
            )}
        >
            <Spinner className="size-4" />
            <span>{label}</span>
        </p>
    );
}
