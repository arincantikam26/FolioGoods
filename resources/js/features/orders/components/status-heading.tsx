import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export type StatusTone =
    | 'neutral'
    | 'progress'
    | 'success'
    | 'warning'
    | 'danger';

const toneClasses: Record<StatusTone, string> = {
    neutral: 'text-muted border-line-strong',
    progress: 'text-accent-ink border-accent',
    success: 'text-success border-success',
    warning: 'text-warning border-warning',
    danger: 'text-danger border-danger',
};

type StatusHeadingProps = {
    icon: LucideIcon;
    tone: StatusTone;
    label: string;
    title: string;
    body: string;
    /** Heading level; the page's h1 when this is the main status. */
    as?: 'h1' | 'h2';
};

/**
 * Order or payment status: icon, written state and explanation. Colour
 * reinforces the message but never carries it alone.
 */
export function StatusHeading({
    icon: Icon,
    tone,
    label,
    title,
    body,
    as: Heading = 'h1',
}: StatusHeadingProps) {
    return (
        <div
            role="status"
            className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-5 gap-y-2"
        >
            <span
                aria-hidden
                className={cn(
                    'row-span-3 grid size-12 place-items-center rounded-full border-2',
                    toneClasses[tone],
                )}
            >
                <Icon strokeWidth={1.6} className="size-6" />
            </span>
            <p className="type-meta text-muted">{label}</p>
            <Heading className="type-title">{title}</Heading>
            <p className="max-w-[52ch] text-muted">{body}</p>
        </div>
    );
}
