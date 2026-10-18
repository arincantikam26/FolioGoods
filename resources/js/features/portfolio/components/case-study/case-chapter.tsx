import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type CaseChapterProps = {
    id: string;
    index: string;
    title: string;
    children: ReactNode;
    className?: string;
};

/** One chapter of a case study: an anchor, an indexed heading, the body. */
export function CaseChapter({
    id,
    index,
    title,
    children,
    className,
}: CaseChapterProps) {
    return (
        <section
            id={id}
            aria-labelledby={`${id}-heading`}
            className={cn(
                'border-line scroll-mt-[calc(var(--header-height)+4rem)] border-t pt-8 pb-16 lg:pb-24',
                className,
            )}
        >
            <h2
                id={`${id}-heading`}
                className="mb-8 flex items-baseline gap-4 lg:mb-10"
            >
                <span className="type-index text-accent-secondary-ink text-base">
                    {index}
                </span>
                <span className="type-subtitle">{title}</span>
            </h2>
            {children}
        </section>
    );
}

/** Large pulled line from the text, marked with an oxide rule. */
export function PullQuote({ text, source }: { text: string; source?: string }) {
    return (
        <figure className="border-accent-secondary my-12 grid gap-4 border-l-2 pl-6 lg:my-16 lg:-ml-8 lg:pl-8">
            <blockquote className="font-display text-2xl leading-snug italic lg:text-3xl">
                <p>{text}</p>
            </blockquote>
            {source && (
                <figcaption className="type-meta text-muted">
                    {source}
                </figcaption>
            )}
        </figure>
    );
}

/** Ruled list for contributions, results and learnings. */
export function RuledList({
    title,
    items,
}: {
    title?: string;
    items: string[];
}) {
    return (
        <div className="grid content-start gap-3">
            {title && <h3 className="type-meta text-muted">{title}</h3>}
            <ul className="border-line border-t">
                {items.map((item) => (
                    <li key={item} className="border-line border-b py-3">
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}
