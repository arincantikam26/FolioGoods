import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type SectionLabelProps = {
    children: ReactNode;
    /** Editorial index shown before the label, e.g. "02". */
    index?: string;
    className?: string;
    as?: 'p' | 'span' | 'h2';
    id?: string;
};

/** Small uppercase label that opens a section. */
export function SectionLabel({
    children,
    index,
    className,
    as: Tag = 'p',
    id,
}: SectionLabelProps) {
    return (
        <Tag
            id={id}
            className={cn(
                'type-meta flex items-baseline gap-3 text-muted',
                className,
            )}
        >
            {index && (
                <span className="type-index text-accent-secondary-ink text-sm normal-case">
                    {index}
                </span>
            )}
            <span>{children}</span>
        </Tag>
    );
}
