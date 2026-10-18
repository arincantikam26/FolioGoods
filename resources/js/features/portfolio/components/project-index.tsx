import { useEffect, useRef, useState } from 'react';
import { AppLink } from '@/app/routing/app-link';
import { routes } from '@/app/routing/routes';
import { Media } from '@/components/media/media';
import { ProjectMediaStage } from '@/features/portfolio/components/project-media-stage';
import { ProjectMeta } from '@/features/portfolio/components/project-meta';
import type { Project } from '@/features/portfolio/types';
import { useMediaQuery } from '@/hooks/use-media-query';
import { indexLabel } from '@/lib/format';
import { cn } from '@/lib/utils';

type ProjectIndexProps = {
    projects: Project[];
    categoryLabel: (slug: string) => string;
    rowCta: string;
};

/**
 * Indexed project list with a sticky media stage on wide screens.
 * The active row follows scroll position, hover and keyboard focus.
 * On small screens each row shows its own image; nothing needs hover.
 */
export function ProjectIndex({
    projects,
    categoryLabel,
    rowCta,
}: ProjectIndexProps) {
    const [activeSlug, setActiveSlug] = useState(projects[0]?.slug ?? '');
    const wide = useMediaQuery('(min-width: 64rem)');
    const list = useRef<HTMLOListElement>(null);

    // Scroll-driven activation: the row crossing the middle of the viewport.
    useEffect(() => {
        const root = list.current;

        if (!root || !wide) {
            return;
        }

        const rows = Array.from(
            root.querySelectorAll<HTMLElement>('[data-project-row]'),
        );
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    const slug = entry.target.getAttribute('data-project-row');

                    if (entry.isIntersecting && slug) {
                        setActiveSlug(slug);
                    }
                }
            },
            { rootMargin: '-48% 0px -48% 0px' },
        );

        rows.forEach((row) => observer.observe(row));

        return () => observer.disconnect();
    }, [wide]);

    return (
        <div className="editorial-grid">
            <ol ref={list} className="border-line border-b lg:col-span-6">
                {projects.map((project, index) => {
                    const active = project.slug === activeSlug;

                    return (
                        <li
                            key={project.slug}
                            data-project-row={project.slug}
                            className="border-line border-t"
                        >
                            <AppLink
                                href={routes.work.show(project.slug)}
                                prefetch
                                data-active={active}
                                onPointerEnter={() =>
                                    setActiveSlug(project.slug)
                                }
                                onFocus={() => setActiveSlug(project.slug)}
                                className="group grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 gap-y-5 py-8 sm:grid-cols-[3.5rem_minmax(0,1fr)] lg:min-h-[42vh] lg:content-center lg:py-12"
                            >
                                <span
                                    className={cn(
                                        'type-index pt-1.5 text-lg transition-colors duration-(--duration-normal)',
                                        active
                                            ? 'text-accent-secondary-ink'
                                            : 'text-muted',
                                    )}
                                >
                                    {indexLabel(index)}
                                </span>

                                <div className="grid gap-3">
                                    <ProjectMeta
                                        category={categoryLabel(
                                            project.category,
                                        )}
                                        year={project.year}
                                    />
                                    <span
                                        className={cn(
                                            'type-title transition-colors duration-(--duration-normal)',
                                            'lg:group-data-[active=true]:text-ink lg:text-muted',
                                        )}
                                    >
                                        {project.title}
                                    </span>
                                    <span className="max-w-[44ch] text-muted">
                                        {project.summary}
                                    </span>
                                    <span className="mt-1 inline-flex items-center gap-2 text-sm font-medium">
                                        <span className="link-underline">
                                            {rowCta}
                                        </span>
                                        <span
                                            aria-hidden
                                            className="link-arrow"
                                        >
                                            →
                                        </span>
                                    </span>
                                </div>

                                <div className="col-span-2 lg:hidden">
                                    <Media
                                        asset={project.cover}
                                        ratio="4 / 3"
                                        sizes="100vw"
                                        decorative
                                    />
                                </div>
                            </AppLink>
                        </li>
                    );
                })}
            </ol>

            <div className="hidden lg:col-span-5 lg:col-start-8 lg:block">
                <div className="sticky top-[calc(var(--header-height)+2.5rem)]">
                    <ProjectMediaStage
                        projects={projects}
                        activeSlug={activeSlug}
                    />
                </div>
            </div>
        </div>
    );
}
