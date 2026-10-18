import type { Project, ProjectFilters } from '@/features/portfolio/types';

const normalise = (value: string) =>
    value
        .toLocaleLowerCase()
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '');

/** Pure filter used by the work index. A backend would do this in SQL. */
export function filterProjects(
    projects: Project[],
    filters: ProjectFilters,
): Project[] {
    const query = filters.q ? normalise(filters.q.trim()) : '';

    return projects.filter((project) => {
        if (filters.category && project.category !== filters.category) {
            return false;
        }

        if (filters.year && project.year !== filters.year) {
            return false;
        }

        if (query) {
            const haystack = normalise(
                [
                    project.title,
                    project.context,
                    project.summary,
                    ...project.mediums,
                ].join(' '),
            );

            return haystack.includes(query);
        }

        return true;
    });
}

export function hasActiveFilters(filters: ProjectFilters): boolean {
    return Boolean(filters.category || filters.year || filters.q);
}

export function isProjectFilters(value: unknown): value is ProjectFilters {
    if (typeof value !== 'object' || value === null) {
        return false;
    }

    const candidate = value as Record<string, unknown>;
    const nullableString = (input: unknown) =>
        input === null || typeof input === 'string';

    return (
        nullableString(candidate.category) &&
        nullableString(candidate.q) &&
        (candidate.year === null || typeof candidate.year === 'number')
    );
}

export const EMPTY_PROJECT_FILTERS: ProjectFilters = {
    category: null,
    year: null,
    q: null,
};
