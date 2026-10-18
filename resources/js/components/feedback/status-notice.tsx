import {
    CircleAlert,
    CircleCheck,
    Clock3,
    Info,
    TriangleAlert,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useCallback } from 'react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type NoticeTone = 'info' | 'progress' | 'success' | 'warning' | 'danger';

const tones: Record<
    NoticeTone,
    { icon: LucideIcon; rule: string; text: string }
> = {
    info: { icon: Info, rule: 'border-line-strong', text: 'text-ink' },
    progress: { icon: Clock3, rule: 'border-accent', text: 'text-accent-ink' },
    success: {
        icon: CircleCheck,
        rule: 'border-success',
        text: 'text-success',
    },
    warning: {
        icon: TriangleAlert,
        rule: 'border-warning',
        text: 'text-warning',
    },
    danger: { icon: CircleAlert, rule: 'border-danger', text: 'text-danger' },
};

type StatusNoticeProps = {
    tone?: NoticeTone;
    title: string;
    children?: ReactNode;
    actions?: ReactNode;
    /** Move keyboard focus here when shown (use for errors after submit). */
    focusOnMount?: boolean;
    /** Defaults to "alert" for danger/warning, "status" otherwise. */
    role?: 'alert' | 'status' | 'none';
    className?: string;
    icon?: LucideIcon;
};

/**
 * Inline message for system state. Never relies on colour alone: every
 * tone has its own icon and a written title.
 */
export function StatusNotice({
    tone = 'info',
    title,
    children,
    actions,
    focusOnMount = false,
    role,
    className,
    icon,
}: StatusNoticeProps) {
    const config = tones[tone];
    const Icon = icon ?? config.icon;
    const resolvedRole =
        role ?? (tone === 'danger' || tone === 'warning' ? 'alert' : 'status');

    const focusRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (node && focusOnMount) {
                node.focus({ preventScroll: false });
            }
        },
        [focusOnMount],
    );

    return (
        <div
            ref={focusRef}
            role={resolvedRole === 'none' ? undefined : resolvedRole}
            tabIndex={focusOnMount ? -1 : undefined}
            className={cn(
                'grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 border-l-2 py-1 pl-4 outline-offset-4',
                config.rule,
                className,
            )}
        >
            <Icon
                aria-hidden
                strokeWidth={1.7}
                className={cn('mt-0.5 size-5', config.text)}
            />
            <div className="grid gap-1.5">
                <p className="text-ink font-medium">{title}</p>
                {children && (
                    <div className="max-w-prose text-sm text-muted">
                        {children}
                    </div>
                )}
                {actions && (
                    <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-3">
                        {actions}
                    </div>
                )}
            </div>
        </div>
    );
}
