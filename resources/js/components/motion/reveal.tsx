import type { CSSProperties, ReactNode } from 'react';
import { useReveal } from '@/hooks/use-reveal';

type RevealProps = {
    children: ReactNode;
    className?: string;
    /** Stagger delay in ms, for a small group of siblings. */
    delay?: number;
};

/** Fades and lifts its children in once, when scrolled into view. */
export function Reveal({ children, className, delay }: RevealProps) {
    const ref = useReveal('reveal');
    const style: CSSProperties | undefined = delay
        ? { '--reveal-delay': `${delay}ms` }
        : undefined;

    return (
        <div ref={ref} className={className} style={style}>
            {children}
        </div>
    );
}

/** Wipes media up from its bottom edge when scrolled into view. */
export function MaskReveal({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) {
    const ref = useReveal('revealMask');

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}
