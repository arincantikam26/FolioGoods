import { AppLink } from '@/app/routing/app-link';
import { routes } from '@/app/routing/routes';
import { Media } from '@/components/media/media';
import type { Project } from '@/features/portfolio/types';

type ProjectRowProps = {
    project: Project;
    index: string;
    categoryLabel: string;
};

/**
 * Compact index row. The thumbnail is always visible (no hover needed);
 * on devices with a fine pointer it lifts slightly on hover.
 */
export function ProjectRow({ project, index, categoryLabel }: ProjectRowProps) {
    return (
        <li className="border-line border-t">
            <AppLink
                href={routes.work.show(project.slug)}
                prefetch
                className="group grid grid-cols-[5.5rem_minmax(0,1fr)] gap-x-4 gap-y-2 py-6 sm:grid-cols-[2.5rem_7rem_minmax(0,1fr)] lg:grid-cols-[3rem_minmax(0,4fr)_minmax(0,2fr)_4rem_9rem] lg:items-center lg:gap-x-(--gutter)"
            >
                <span className="type-index hidden text-lg text-muted sm:block lg:self-start lg:pt-1">
                    {index}
                </span>

                <div className="row-span-2 sm:row-span-2 lg:order-last lg:row-span-1">
                    <Media
                        asset={project.cover}
                        ratio="4 / 3"
                        sizes="10rem"
                        decorative
                        className="ease-emphasized transition-[opacity,transform] duration-(--duration-normal) lg:opacity-80 lg:group-hover:-translate-y-0.5 lg:group-hover:opacity-100"
                    />
                </div>

                <div className="grid gap-1.5">
                    <h3 className="font-display group-hover:text-accent-ink text-xl leading-tight transition-colors sm:text-2xl">
                        {project.title}
                    </h3>
                    <p className="line-clamp-2 text-sm text-muted lg:line-clamp-none">
                        {project.summary}
                    </p>
                </div>

                <p className="col-start-2 text-sm text-muted sm:col-start-3 lg:col-start-auto">
                    <span className="lg:block">{categoryLabel}</span>
                    <span className="lg:hidden"> · {project.year}</span>
                    <span className="hidden lg:block">{project.context}</span>
                </p>

                <p className="hidden text-sm tabular-nums lg:block">
                    {project.year}
                </p>
            </AppLink>
        </li>
    );
}
