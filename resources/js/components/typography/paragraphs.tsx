import { cn } from '@/lib/utils';

/** Renders an array of plain-text paragraphs inside a reading column. */
export function Paragraphs({
    items,
    className,
}: {
    items: string[];
    className?: string;
}) {
    return (
        <div className={cn('prose-editorial', className)}>
            {items.map((text) => (
                <p key={text}>{text}</p>
            ))}
        </div>
    );
}
