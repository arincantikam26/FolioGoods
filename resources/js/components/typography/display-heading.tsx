import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type HeadingSize = 'display' | 'headline' | 'title' | 'subtitle';

const sizes: Record<HeadingSize, string> = {
    display: 'type-display',
    headline: 'type-headline',
    title: 'type-title',
    subtitle: 'type-subtitle',
};

type DisplayHeadingProps = {
    as?: 'h1' | 'h2' | 'h3' | 'p';
    size?: HeadingSize;
    id?: string;
    className?: string;
    children: ReactNode;
};

/** Serif heading. Level (`as`) and visual size are chosen separately. */
export function DisplayHeading({
    as: Tag = 'h2',
    size = 'title',
    id,
    className,
    children,
}: DisplayHeadingProps) {
    return (
        <Tag id={id} className={cn(sizes[size], className)}>
            {children}
        </Tag>
    );
}
