/**
 * Every public URL is built here. Components never write paths by hand, so
 * renaming a route or porting to another router touches one file.
 */

type QueryValue = string | number | null | undefined;
export type Query = Record<string, QueryValue>;

export function withQuery(path: string, query?: Query): string {
    if (!query) {
        return path;
    }

    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(query)) {
        if (value !== null && value !== undefined && value !== '') {
            params.set(key, String(value));
        }
    }

    const search = params.toString();

    return search ? `${path}?${search}` : path;
}

const segment = (value: string) => encodeURIComponent(value);

export type WorkQuery = {
    category?: string | null;
    year?: number | null;
    q?: string | null;
};

export type ShopQuery = {
    category?: string | null;
    sort?: string | null;
};

export const routes = {
    home: () => '/',
    work: {
        index: (query?: WorkQuery) => withQuery('/work', query),
        show: (slug: string) => `/work/${segment(slug)}`,
    },
    shop: {
        index: (query?: ShopQuery) => withQuery('/shop', query),
        show: (slug: string) => `/shop/${segment(slug)}`,
    },
    checkout: (query: { product: string; license?: string }) =>
        withQuery('/checkout', query),
    payment: (order: string) => withQuery('/payment', { order }),
    orders: {
        lookup: () => '/order-status',
        show: (order: string) => `/order-status/${segment(order)}`,
    },
    about: () => '/about',
    contact: (query?: { topic?: string }) => withQuery('/contact', query),
    legal: {
        privacy: () => '/privacy',
        terms: () => '/terms',
        license: () => '/license',
    },
} as const;

/** Section anchors used for in-page links. */
export const anchor = (id: string) => `#${id}`;

export function pathOf(url: string): string {
    const index = url.search(/[?#]/);

    return index === -1 ? url : url.slice(0, index);
}

/** True when `href` is the current page or one of its children. */
export function isActivePath(currentUrl: string, href: string): boolean {
    const current = pathOf(currentUrl);
    const target = pathOf(href);

    if (target === '/') {
        return current === '/';
    }

    return current === target || current.startsWith(`${target}/`);
}

export function isExternalHref(href: string): boolean {
    return /^(https?:)?\/\//.test(href) || /^(mailto|tel):/.test(href);
}
