import { routes } from '@/app/routing/routes';
import { TextLink } from '@/components/primitives/text-link';
import { SectionLabel } from '@/components/typography/section-label';
import { ProjectIndex } from '@/features/portfolio/components/project-index';
import type { Project } from '@/features/portfolio/types';

type SelectedWorkProps = {
    index: string;
    label: string;
    heading: string;
    cta: string;
    rowCta: string;
    projects: Project[];
    categoryLabel: (slug: string) => string;
};

export function SelectedWork({
    index,
    label,
    heading,
    cta,
    rowCta,
    projects,
    categoryLabel,
}: SelectedWorkProps) {
    if (projects.length === 0) {
        return null;
    }

    return (
        <section aria-labelledby="work-heading" className="section-space">
            <div className="frame">
                <div className="editorial-grid gap-y-6 pb-12 lg:pb-16">
                    <SectionLabel
                        index={index}
                        className="lg:col-span-3 lg:pt-3"
                    >
                        {label}
                    </SectionLabel>
                    <h2
                        id="work-heading"
                        className="type-title max-w-[20ch] lg:col-span-6"
                    >
                        {heading}
                    </h2>
                    <div className="lg:col-span-3 lg:self-end lg:justify-self-end">
                        <TextLink href={routes.work.index()} arrow prefetch>
                            {cta}
                        </TextLink>
                    </div>
                </div>
                <ProjectIndex
                    projects={projects}
                    categoryLabel={categoryLabel}
                    rowCta={rowCta}
                />
            </div>
        </section>
    );
}
