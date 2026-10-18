import { AppLink } from '@/app/routing/app-link';
import { routes } from '@/app/routing/routes';
import { Media } from '@/components/media/media';
import { MaskReveal } from '@/components/motion/reveal';
import { ProjectMeta } from '@/features/portfolio/components/project-meta';
import type { Project } from '@/features/portfolio/types';
import { cn } from '@/lib/utils';

type FeaturedProjectProps = {
    project: Project;
    index: string;
    categoryLabel: string;
    cta: string;
    /** Mirror the composition (media on the right). */
    flip?: boolean;
    priority?: boolean;
};

/**
 * Full-width composition for featured work: large media with a text plate
 * that overlaps its edge on wide screens.
 */
export function FeaturedProject({
    project,
    index,
    categoryLabel,
    cta,
    flip = false,
    priority = false,
}: FeaturedProjectProps) {
    return (
        <article className="border-line border-t py-10 lg:py-16">
            <AppLink
                href={routes.work.show(project.slug)}
                prefetch
                className="group editorial-grid items-end gap-y-6"
            >
                <div
                    className={cn(
                        'lg:col-span-8 lg:row-start-1',
                        flip ? 'lg:col-start-5' : 'lg:col-start-1',
                    )}
                >
                    <MaskReveal>
                        <div className="overflow-hidden">
                            <Media
                                asset={project.cover}
                                ratio="16 / 10"
                                priority={priority}
                                sizes="(min-width: 64rem) 66vw, 100vw"
                                decorative
                                className="media-tilt"
                            />
                        </div>
                    </MaskReveal>
                </div>

                <div
                    className={cn(
                        'lg:bg-canvas relative z-[1] grid gap-4 lg:row-start-1 lg:p-8 lg:pb-2',
                        flip
                            ? 'lg:col-span-5 lg:col-start-1 lg:-mr-10 lg:pl-0'
                            : 'lg:col-span-5 lg:col-start-8 lg:-ml-10 lg:pr-0',
                    )}
                >
                    <span className="type-index text-accent-secondary text-4xl leading-none">
                        {index}
                    </span>
                    <ProjectMeta category={categoryLabel} year={project.year} />
                    <h2 className="type-title">{project.title}</h2>
                    <p className="text-muted">{project.summary}</p>
                    <p className="text-sm text-muted">
                        {project.mediums.join(' / ')}
                    </p>
                    <span className="mt-2 inline-flex items-center gap-2 text-sm font-medium">
                        <span className="link-underline">{cta}</span>
                        <span aria-hidden className="link-arrow">
                            →
                        </span>
                    </span>
                </div>
            </AppLink>
        </article>
    );
}
