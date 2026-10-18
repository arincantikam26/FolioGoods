import type { CSSProperties } from 'react';
import { cn } from '@/lib/utils';

/**
 * Placeholder block matching the final content's size. Hidden from
 * assistive technology — announce loading with LoadingState instead.
 */
export function Skeleton({
    className,
    style,
}: {
    className?: string;
    style?: CSSProperties;
}) {
    return (
        <div
            aria-hidden
            style={style}
            className={cn(
                'motion-pulse bg-surface-muted rounded-xs',
                className,
            )}
        />
    );
}
