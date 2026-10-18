import { ChevronDown } from 'lucide-react';
import { useId, useState } from 'react';
import { copy } from '@/content/copy';
import type { CaseStudyChapter } from '@/features/portfolio/types';
import { indexLabel } from '@/lib/format';
import { cn } from '@/lib/utils';

type ChapterNavProps = {
    chapters: CaseStudyChapter[];
    activeId: string | null;
};

/** Desktop: a quiet sticky rail. The active chapter gets a rule and ink. */
export function ChapterRail({ chapters, activeId }: ChapterNavProps) {
    return (
        <nav
            aria-label={copy.caseStudy.chapters}
            className="sticky top-[calc(var(--header-height)+2.5rem)]"
        >
            <p className="type-meta mb-4 text-muted">
                {copy.caseStudy.chapters}
            </p>
            <ol className="border-line grid border-l">
                {chapters.map((chapter, index) => {
                    const active = chapter.id === activeId;

                    return (
                        <li key={chapter.id}>
                            <a
                                href={`#${chapter.id}`}
                                aria-current={active ? 'location' : undefined}
                                className={cn(
                                    'relative -ml-px flex min-h-9 items-baseline gap-3 border-l py-1.5 pl-4 text-sm transition-colors duration-(--duration-normal)',
                                    active
                                        ? 'border-accent-secondary text-ink'
                                        : 'hover:text-ink border-transparent text-muted',
                                )}
                            >
                                <span className="type-index w-5 text-xs">
                                    {indexLabel(index)}
                                </span>
                                <span>{chapter.label}</span>
                            </a>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}

/** Small screens: a compact bar that opens the chapter list. */
export function ChapterMenu({ chapters, activeId }: ChapterNavProps) {
    const [open, setOpen] = useState(false);
    const listId = useId();
    const activeIndex = Math.max(
        chapters.findIndex((chapter) => chapter.id === activeId),
        0,
    );
    const active = chapters[activeIndex];

    return (
        <nav
            aria-label={copy.caseStudy.chapters}
            className="border-line bg-canvas sticky top-(--header-height) z-30 border-b lg:hidden"
        >
            <div className="frame">
                <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={listId}
                    onClick={() => setOpen((value) => !value)}
                    className="flex min-h-12 w-full items-center justify-between gap-4 text-sm"
                >
                    <span className="flex items-baseline gap-3">
                        <span className="sr-only">
                            {copy.caseStudy.jumpTo}:{' '}
                        </span>
                        <span className="type-index text-xs text-muted">
                            {indexLabel(activeIndex)}
                        </span>
                        <span className="font-medium">{active?.label}</span>
                    </span>
                    <ChevronDown
                        aria-hidden
                        strokeWidth={1.6}
                        className={cn(
                            'size-4 transition-transform duration-(--duration-normal)',
                            open && 'rotate-180',
                        )}
                    />
                </button>
                <ol
                    id={listId}
                    hidden={!open}
                    className="border-line grid border-t pb-3"
                >
                    {chapters.map((chapter, index) => (
                        <li key={chapter.id}>
                            <a
                                href={`#${chapter.id}`}
                                onClick={() => setOpen(false)}
                                aria-current={
                                    chapter.id === activeId
                                        ? 'location'
                                        : undefined
                                }
                                className="flex min-h-11 items-baseline gap-3 text-sm aria-[current=location]:font-semibold"
                            >
                                <span className="type-index w-5 text-xs text-muted">
                                    {indexLabel(index)}
                                </span>
                                {chapter.label}
                            </a>
                        </li>
                    ))}
                </ol>
            </div>
        </nav>
    );
}
