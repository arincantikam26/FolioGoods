import { useState } from 'react';
import { routes } from '@/app/routing/routes';
import { useFilterNavigation } from '@/app/routing/navigation';
import { EmptyState } from '@/components/feedback/empty-state';
import { LoadingState } from '@/components/feedback/loading-state';
import { HeaderSentinel } from '@/components/layout/header-sentinel';
import { PageMasthead } from '@/components/layout/page-masthead';
import { Button } from '@/components/primitives/button';
import { Seo } from '@/components/seo/seo';
import { copy } from '@/content/copy';
import { ContactClosing } from '@/features/contact/components/contact-closing';
import { projectSource } from '@/features/portfolio/api/project-source';
import { WorkCatalogue } from '@/features/portfolio/components/work-catalogue';
import { WorkFilters } from '@/features/portfolio/components/work-filters';
import type { ProjectFilters } from '@/features/portfolio/types';
import {
    EMPTY_PROJECT_FILTERS,
    filterProjects,
    hasActiveFilters,
    isProjectFilters,
} from '@/features/portfolio/utils/filter-projects';
import { PublicLayout } from '@/layouts/site/public-layout';
import { cn } from '@/lib/utils';

const categoryLabel = (slug: string) =>
    projectSource.category(slug)?.label ?? slug;

export default function WorkIndexPage({
    filters: rawFilters,
}: {
    filters: unknown;
}) {
    const filters: ProjectFilters = isProjectFilters(rawFilters)
        ? rawFilters
        : EMPTY_PROJECT_FILTERS;
    const { apply, pending } = useFilterNavigation(routes.work.index());

    const all = projectSource.list();
    const results = filterProjects(all, filters);
    const active = hasActiveFilters(filters);

    const categories = [
        { value: null, label: copy.common.all, count: all.length },
        ...projectSource.categories().map((category) => ({
            value: category.slug,
            label: category.label,
            count: all.filter((project) => project.category === category.slug)
                .length,
        })),
    ].filter((option) => option.value === null || option.count > 0);

    const [query, setQuery] = useState(filters.q ?? '');
    const update = (next: ProjectFilters) =>
        apply({ category: next.category, year: next.year, q: next.q });
    const clear = () => {
        setQuery('');
        update(EMPTY_PROJECT_FILTERS);
    };

    return (
        <PublicLayout>
            <Seo title={copy.work.title} description={copy.work.intro} />
            <PageMasthead
                title={copy.work.title}
                intro={copy.work.intro}
                breadcrumbs={[
                    { label: copy.common.home, href: routes.home() },
                    { label: copy.work.title },
                ]}
            />
            <HeaderSentinel />

            <section
                aria-label={copy.work.title}
                className="frame pb-(--space-section)"
            >
                {all.length > 0 && (
                    <WorkFilters
                        filters={filters}
                        categories={categories}
                        years={projectSource.years()}
                        query={query}
                        onQueryChange={setQuery}
                        onChange={update}
                    />
                )}

                <div className="flex min-h-12 flex-wrap items-center justify-between gap-x-6 gap-y-2 py-4">
                    <p
                        role="status"
                        aria-live="polite"
                        className="text-sm text-muted"
                    >
                        {copy.work.count(results.length, all.length)}
                    </p>
                    <div className="flex items-center gap-6">
                        {pending && <LoadingState label={copy.work.updating} />}
                        {active && (
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={clear}
                            >
                                {copy.common.clearFilters}
                            </Button>
                        )}
                    </div>
                </div>

                <div
                    aria-busy={pending}
                    className={cn(
                        'transition-opacity duration-(--duration-normal)',
                        pending && 'opacity-50',
                    )}
                >
                    {all.length === 0 ? (
                        <EmptyState
                            title={copy.work.noneTitle}
                            body={copy.work.noneBody}
                        />
                    ) : results.length === 0 ? (
                        <EmptyState
                            title={copy.work.emptyTitle}
                            body={copy.work.emptyBody}
                            action={
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={clear}
                                >
                                    {copy.common.clearFilters}
                                </Button>
                            }
                        />
                    ) : (
                        <WorkCatalogue
                            projects={results}
                            categoryLabel={categoryLabel}
                            featuredCta={copy.work.caseStudy}
                            indexHeading={copy.work.indexHeading}
                        />
                    )}
                </div>
            </section>

            <ContactClosing />
        </PublicLayout>
    );
}
