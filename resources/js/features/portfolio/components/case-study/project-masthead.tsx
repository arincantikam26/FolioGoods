import { routes } from '@/app/routing/routes';
import { Media } from '@/components/media/media';
import { Breadcrumbs } from '@/components/navigation/breadcrumbs';
import { copy } from '@/content/copy';
import { ProjectMeta } from '@/features/portfolio/components/project-meta';
import type { Project } from '@/features/portfolio/types';

type ProjectMastheadProps = {
    project: Project;
    categoryLabel: string;
};

/** Title, deck and the full-bleed cover that opens every case study. */
export function ProjectMasthead({
    project,
    categoryLabel,
}: ProjectMastheadProps) {
    return (
        <header>
            <div className="frame pt-8 pb-10 lg:pt-14 lg:pb-16">
                <Breadcrumbs
                    items={[
                        { label: copy.common.home, href: routes.home() },
                        { label: copy.work.title, href: routes.work.index() },
                        { label: project.shortTitle },
                    ]}
                    className="mb-10 lg:mb-16"
                />
                <div className="editorial-grid items-end gap-y-6">
                    <div className="grid gap-6 lg:col-span-8">
                        <ProjectMeta
                            category={categoryLabel}
                            year={project.year}
                            context={project.context}
                        />
                        <h1 className="type-display max-w-[14ch]">
                            {project.title}
                        </h1>
                    </div>
                    <p className="type-lede text-muted lg:col-span-4 lg:pb-3">
                        {project.caseStudy.deck}
                    </p>
                </div>
            </div>

            <figure className="motion-load-mask">
                <Media
                    asset={project.cover}
                    priority
                    ratio="21 / 9"
                    sizes="100vw"
                    className="max-h-[80svh] min-h-[16rem] w-full"
                />
            </figure>
        </header>
    );
}
