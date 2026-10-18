import { cn } from '@/lib/utils';

type ProjectMetaProps = {
    category: string;
    year: number;
    context?: string;
    className?: string;
};

/** "Brand identity · 2025 · Independent coffee roaster" */
export function ProjectMeta({
    category,
    year,
    context,
    className,
}: ProjectMetaProps) {
    const parts = [category, String(year), context].filter(Boolean);

    return (
        <p
            className={cn(
                'type-meta flex flex-wrap gap-x-2 text-muted',
                className,
            )}
        >
            {parts.map((part, index) => (
                <span key={part} className="flex gap-2">
                    {index > 0 && <span aria-hidden>·</span>}
                    <span
                        className={
                            index === 2
                                ? 'tracking-normal normal-case'
                                : undefined
                        }
                    >
                        {part}
                    </span>
                </span>
            ))}
        </p>
    );
}
