import { projectCategories } from '@/features/portfolio/data/categories';
import { projects } from '@/features/portfolio/data/projects';
import type { Project, ProjectCategory } from '@/features/portfolio/types';

/**
 * Mock adapter — the only module that reads the project data files.
 *
 * CMS Edition: delete this file's body and have the controller pass
 * `projects`, `project` and `related` as page props instead; the page
 * components already accept domain objects, not raw records.
 */
export const projectSource = {
    list(): Project[] {
        return [...projects].sort((a, b) => b.year - a.year);
    },

    featured(limit = 4): Project[] {
        const sorted = this.list();
        const featured = sorted.filter((project) => project.featured);
        const rest = sorted.filter((project) => !project.featured);

        return [...featured, ...rest].slice(0, limit);
    },

    find(slug: string): Project | null {
        return projects.find((project) => project.slug === slug) ?? null;
    },

    related(project: Project, limit = 2): Project[] {
        const picked = project.related
            .map((slug) => this.find(slug))
            .filter((item): item is Project => item !== null);

        return picked.slice(0, limit);
    },

    categories(): ProjectCategory[] {
        return projectCategories;
    },

    category(slug: string): ProjectCategory | null {
        return projectCategories.find((item) => item.slug === slug) ?? null;
    },

    years(): number[] {
        return [...new Set(projects.map((project) => project.year))].sort(
            (a, b) => b - a,
        );
    },
};
