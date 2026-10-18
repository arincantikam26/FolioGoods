import { Media } from '@/components/media/media';
import type { Project } from '@/features/portfolio/types';
import { indexLabel } from '@/lib/format';
import { cn } from '@/lib/utils';

/**
 * Desktop-only stage that shows the active project's cover. Covers are
 * stacked; the active one wipes in from the top while the others mask out.
 * Decorative duplicate of the list, so it is hidden from assistive tech.
 */
export function ProjectMediaStage({
    projects,
    activeSlug,
}: {
    projects: Project[];
    activeSlug: string;
}) {
    const activeIndex = Math.max(
        projects.findIndex((project) => project.slug === activeSlug),
        0,
    );
    const active = projects[activeIndex];

    return (
        <div aria-hidden className="grid gap-4">
            <div className="bg-media relative aspect-[4/5] overflow-hidden">
                {projects.map((project) => {
                    const isActive = project.slug === activeSlug;

                    return (
                        <div
                            key={project.slug}
                            className={cn(
                                'ease-emphasized absolute inset-0 transition-[clip-path] duration-(--duration-reveal)',
                                isActive
                                    ? 'z-[1] [clip-path:inset(0_0_0_0)]'
                                    : 'z-0 [clip-path:inset(0_0_100%_0)]',
                            )}
                        >
                            <Media
                                asset={project.cover}
                                ratio="4 / 5"
                                decorative
                                sizes="45vw"
                                className="size-full"
                                imgClassName={cn(
                                    'ease-emphasized transition-transform duration-[1200ms]',
                                    isActive ? 'scale-100' : 'scale-[1.06]',
                                )}
                            />
                        </div>
                    );
                })}
            </div>
            {active && (
                <div className="flex items-baseline justify-between gap-4 text-sm">
                    <span className="type-index text-accent-secondary-ink">
                        {indexLabel(activeIndex)} /{' '}
                        {indexLabel(projects.length - 1)}
                    </span>
                    <span className="truncate text-muted">
                        {active.context}
                    </span>
                </div>
            )}
        </div>
    );
}
