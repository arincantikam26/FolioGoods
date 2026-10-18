import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type EmptyStateProps = {
    title: string;
    body?: string;
    action?: ReactNode;
    className?: string;
    headingLevel?: 'h2' | 'h3';
};

/** Explains why a list is empty and what to do next. Kept deliberately small. */
export function EmptyState({
    title,
    body,
    action,
    className,
    headingLevel: Heading = 'h2',
}: EmptyStateProps) {
    return (
        <div
            role="status"
            className={cn(
                'border-line grid max-w-md gap-3 border-t py-10',
                className,
            )}
        >
            <Heading className="type-subtitle">{title}</Heading>
            {body && <p className="text-muted">{body}</p>}
            {action && <div className="mt-2">{action}</div>}
        </div>
    );
}
