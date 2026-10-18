import type { CaptionedMedia, Fact, MediaAsset } from '@/types/site';

export type ProjectCategory = {
    slug: string;
    label: string;
};

export type PullQuote = {
    text: string;
    /** Where the line comes from, e.g. "Working note" or "Project brief". */
    source?: string;
};

export type ProcessStep = {
    title: string;
    description: string;
};

export type ProjectChallenge = {
    title: string;
    body: string;
};

export type GalleryLayout = 'full' | 'inset-start' | 'inset-end' | 'pair';

export type ProjectGalleryItem = {
    id: string;
    layout: GalleryLayout;
    /** One image, or two for "pair". */
    images: CaptionedMedia[];
};

export type ProjectCaseStudy = {
    /** One or two sentences under the title. */
    deck: string;
    facts: Fact[];
    background: string[];
    problem: { body: string[]; quote?: PullQuote };
    role: { body: string[]; contributions: string[] };
    approach: string[];
    process: ProcessStep[];
    gallery: ProjectGalleryItem[];
    challenges: ProjectChallenge[];
    outcome: { body: string[]; results: string[]; learnings: string[] };
};

export type Project = {
    slug: string;
    title: string;
    /** Used in tight spaces: index rows, related links, breadcrumbs. */
    shortTitle: string;
    category: string;
    /** Who or what the work was for, without naming unconfirmed clients. */
    context: string;
    year: number;
    summary: string;
    /** Tools, techniques or materials. Keep to three or four. */
    mediums: string[];
    featured: boolean;
    cover: MediaAsset;
    caseStudy: ProjectCaseStudy;
    related: string[];
};

export type ProjectFilters = {
    category: string | null;
    year: number | null;
    q: string | null;
};

export type CaseStudyChapter = {
    id: string;
    label: string;
};
