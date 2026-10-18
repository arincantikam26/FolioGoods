import { FeaturedProject } from '@/features/portfolio/components/featured-project';
import { ProjectRow } from '@/features/portfolio/components/project-row';
import type { Project } from '@/features/portfolio/types';
import { indexLabel } from '@/lib/format';

type WorkCatalogueProps = {
    projects: Project[];
    categoryLabel: (slug: string) => string;
    featuredCta: string;
    indexHeading: string;
};

/**
 * Featured projects first, each as a full composition (alternating sides),
 * then everything else as a compact index. Numbering runs through both so
 * the order reads as one list.
 */
export function WorkCatalogue({
    projects,
    categoryLabel,
    featuredCta,
    indexHeading,
}: WorkCatalogueProps) {
    const featured = projects.filter((project) => project.featured);
    const rest = projects.filter((project) => !project.featured);

    return (
        <div>
            {featured.map((project, position) => (
                <FeaturedProject
                    key={project.slug}
                    project={project}
                    index={indexLabel(position)}
                    categoryLabel={categoryLabel(project.category)}
                    cta={featuredCta}
                    flip={position % 2 === 1}
                    priority={position === 0}
                />
            ))}

            {rest.length > 0 && (
                <section
                    aria-labelledby="work-index-heading"
                    className="pt-10 lg:pt-16"
                >
                    <h2
                        id="work-index-heading"
                        className="type-meta pb-4 text-muted"
                    >
                        {indexHeading}
                    </h2>
                    <ol className="border-line border-b">
                        {rest.map((project, position) => (
                            <ProjectRow
                                key={project.slug}
                                project={project}
                                index={indexLabel(featured.length + position)}
                                categoryLabel={categoryLabel(project.category)}
                            />
                        ))}
                    </ol>
                </section>
            )}
        </div>
    );
}
