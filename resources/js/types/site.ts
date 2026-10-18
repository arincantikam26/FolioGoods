/**
 * Types shared by the public site (UI Edition). Domain types live with their
 * feature (features/portfolio/types.ts, features/products/types.ts …).
 */

/** Props every public page receives from HandleInertiaRequests. */
export type FolioSharedProps = {
    previews: boolean;
    commerce: boolean;
    url: string;
};

/**
 * An image as the UI needs it. Width and height are the intrinsic size and
 * are always required so the browser can reserve space (no layout shift).
 */
export type MediaAsset = {
    src: string;
    alt: string;
    width: number;
    height: number;
    /** Optional responsive candidates, e.g. "/img/a-800.webp 800w, /img/a-1600.webp 1600w". */
    srcSet?: string;
    /** Dominant colour shown while the image loads. */
    tone?: string;
    /** object-position, e.g. "50% 30%". */
    focus?: string;
};

export type CaptionedMedia = {
    id: string;
    media: MediaAsset;
    caption: string;
};

export type FaqItem = {
    id: string;
    question: string;
    answer: string;
};

export type LinkItem = {
    label: string;
    href: string;
};

export type Fact = {
    label: string;
    value: string;
};

export type BreadcrumbItem = {
    label: string;
    href?: string;
};
