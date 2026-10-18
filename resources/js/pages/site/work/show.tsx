import { routes } from '@/app/routing/routes';
import { NotFoundState } from '@/components/feedback/not-found-state';
import { HeaderSentinel } from '@/components/layout/header-sentinel';
import { Seo } from '@/components/seo/seo';
import { copy } from '@/content/copy';
import { ContactClosing } from '@/features/contact/components/contact-closing';
import { projectSource } from '@/features/portfolio/api/project-source';
import { CaseStudyBody } from '@/features/portfolio/components/case-study/case-study-body';
import { ProjectMasthead } from '@/features/portfolio/components/case-study/project-masthead';
import { RelatedProjects } from '@/features/portfolio/components/case-study/related-projects';
import { caseStudyChapters } from '@/features/portfolio/data/chapters';
import { PublicLayout } from '@/layouts/site/public-layout';

const categoryLabel = (slug: string) =>
    projectSource.category(slug)?.label ?? slug;

export default function WorkShowPage({ slug }: { slug: string }) {
    const project = projectSource.find(slug);

    if (!project) {
        return (
            <PublicLayout>
                <Seo title={copy.caseStudy.notFoundTitle} noindex />
                <NotFoundState
                    title={copy.caseStudy.notFoundTitle}
                    body={copy.caseStudy.notFoundBody}
                    action={{
                        label: copy.caseStudy.backToIndex,
                        href: routes.work.index(),
                    }}
                />
            </PublicLayout>
        );
    }

    return (
        <PublicLayout>
            <Seo
                title={project.title}
                description={project.summary}
                image={project.cover.src}
                type="article"
            />
            <article itemScope itemType="https://schema.org/CreativeWork">
                <meta itemProp="name" content={project.title} />
                <meta itemProp="dateCreated" content={String(project.year)} />
                <ProjectMasthead
                    project={project}
                    categoryLabel={categoryLabel(project.category)}
                />
                <HeaderSentinel />
                <CaseStudyBody project={project} chapters={caseStudyChapters} />
            </article>
            <RelatedProjects
                projects={projectSource.related(project)}
                heading={copy.caseStudy.related}
                emptyLabel={copy.caseStudy.relatedEmpty}
                categoryLabel={categoryLabel}
            />
            <ContactClosing heading={copy.caseStudy.closing} />
        </PublicLayout>
    );
}
