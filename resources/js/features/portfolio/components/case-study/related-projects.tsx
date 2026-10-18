import { AppLink } from '@/app/routing/app-link';
import { routes } from '@/app/routing/routes';
import { Media } from '@/components/media/media';
import { EmptyState } from '@/components/feedback/empty-state';
import { ProjectMeta } from '@/features/portfolio/components/project-meta';
import type { Project } from '@/features/portfolio/types';

type RelatedProjectsProps = {
    projects: Project[];
    heading: string;
    emptyLabel: string;
    categoryLabel: (slug: string) => string;
};

export function RelatedProjects({
    projects,
    heading,
    emptyLabel,
    categoryLabel,
}: RelatedProjectsProps) {
    return (
        <section
            aria-labelledby="related-heading"
            className="frame pb-(--space-section)"
        >
            <h2
                id="related-heading"
                className="type-meta border-line border-t pt-6 pb-8 text-muted"
            >
                {heading}
            </h2>
            {projects.length === 0 ? (
                <EmptyState title={emptyLabel} headingLevel="h3" />
            ) : (
                <ul className="grid gap-12 md:grid-cols-2 md:gap-(--gutter)">
                    {projects.map((project, index) => (
                        <li
                            key={project.slug}
                            className={index === 1 ? 'md:mt-20' : undefined}
                        >
                            <AppLink
                                href={routes.work.show(project.slug)}
                                prefetch
                                className="group grid gap-4"
                            >
                                <div className="overflow-hidden">
                                    <Media
                                        asset={project.cover}
                                        ratio="4 / 3"
                                        sizes="(min-width: 48rem) 45vw, 100vw"
                                        decorative
                                        className="media-tilt"
                                    />
                                </div>
                                <ProjectMeta
                                    category={categoryLabel(project.category)}
                                    year={project.year}
                                />
                                <h3 className="type-subtitle group-hover:text-accent-ink">
                                    {project.title}
                                </h3>
                                <p className="max-w-[44ch] text-sm text-muted">
                                    {project.summary}
                                </p>
                            </AppLink>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}
