import type { Project } from '@/features/portfolio/types';

/** The "Role" fact from a case study, if the project lists one. */
export function projectRole(project: Project): string | null {
    return (
        project.caseStudy.facts.find(
            (fact) => fact.label.toLowerCase() === 'role',
        )?.value ?? null
    );
}
