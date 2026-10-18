import type { CaseStudyChapter } from '@/features/portfolio/types';

/** Order and labels of case study chapters. Ids double as URL anchors. */
export const caseStudyChapters: CaseStudyChapter[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'background', label: 'Background' },
    { id: 'problem', label: 'Problem' },
    { id: 'role', label: 'Role' },
    { id: 'approach', label: 'Approach' },
    { id: 'process', label: 'Process' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'challenges', label: 'Challenges' },
    { id: 'outcome', label: 'Outcome' },
];
