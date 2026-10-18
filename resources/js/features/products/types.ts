import type { CaptionedMedia, FaqItem, MediaAsset } from '@/types/site';

export type ProductCategory = {
    slug: string;
    label: string;
    /** Used in the purchase button: "Get this <noun>". */
    noun: string;
};

/** A license definition shared by every product (see data/licenses.ts). */
export type ProductLicense = {
    id: string;
    name: string;
    summary: string;
    permits: string[];
    limits: string[];
};

/** A license as offered on one product, with that product's price. */
export type LicenseOffer = {
    licenseId: string;
    price: number;
};

export type ReleaseStage = 'stable' | 'beta' | 'early-access';

export type ProductVersion = {
    number: string;
    releasedOn: string;
    stage: ReleaseStage;
};

export type ProductAvailability = 'available' | 'unavailable';

export type ProductRequirement = {
    label: string;
    value: string;
};

export type PackageItem = {
    title: string;
    detail: string;
};

export type ProductFeature = {
    id: string;
    title: string;
    body: string;
    media: MediaAsset;
};

export type SourceNode = {
    name: string;
    note?: string;
    children?: SourceNode[];
};

export type ChangelogEntry = {
    version: string;
    date: string;
    changes: string[];
};

export type SupportScope = {
    window: string;
    channel: string;
    included: string[];
    excluded: string[];
};

export type Product = {
    slug: string;
    name: string;
    category: string;
    /** One sentence: what it is for. */
    tagline: string;
    summary: string[];
    cover: MediaAsset;
    gallery: CaptionedMedia[];
    version: ProductVersion;
    availability: ProductAvailability;
    featured: boolean;
    publishedOn: string;
    compatibility: string[];
    requirements: ProductRequirement[];
    includes: PackageItem[];
    audience: { suits: string[]; notSuited: string[] };
    features: ProductFeature[];
    sourceTree: SourceNode[];
    licenses: LicenseOffer[];
    changelog: ChangelogEntry[];
    support: SupportScope;
    faqs: FaqItem[];
    links: { preview: string | null; documentation: string | null };
    related: string[];
};

export type ProductSort = 'featured' | 'newest' | 'price-asc' | 'price-desc';

export type ProductFilters = {
    category: string | null;
    sort: ProductSort | null;
};

/** A license offer joined with its definition, ready for display. */
export type ResolvedLicense = ProductLicense & { price: number };
