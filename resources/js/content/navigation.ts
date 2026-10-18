import { routes } from '@/app/routing/routes';

export type NavigationItem = {
    id: string;
    label: string;
    href: string;
    /** Hidden when commerce pages are disabled (config/folio.php). */
    commerce?: boolean;
};

export type NavigationGroup = {
    id: string;
    label: string;
    items: NavigationItem[];
};

export const primaryNavigation: NavigationItem[] = [
    { id: 'work', label: 'Work', href: routes.work.index() },
    { id: 'shop', label: 'Shop', href: routes.shop.index(), commerce: true },
    { id: 'about', label: 'About', href: routes.about() },
    { id: 'contact', label: 'Contact', href: routes.contact() },
];

export const footerNavigation: NavigationGroup[] = [
    {
        id: 'site',
        label: 'Index',
        items: [
            { id: 'home', label: 'Home', href: routes.home() },
            { id: 'work', label: 'Work', href: routes.work.index() },
            { id: 'about', label: 'About', href: routes.about() },
            { id: 'contact', label: 'Contact', href: routes.contact() },
        ],
    },
    {
        id: 'shop',
        label: 'Shop',
        items: [
            {
                id: 'products',
                label: 'All products',
                href: routes.shop.index(),
                commerce: true,
            },
            {
                id: 'orders',
                label: 'Check order status',
                href: routes.orders.lookup(),
                commerce: true,
            },
            {
                id: 'license',
                label: 'License',
                href: routes.legal.license(),
                commerce: true,
            },
        ],
    },
    {
        id: 'legal',
        label: 'Legal',
        items: [
            { id: 'privacy', label: 'Privacy', href: routes.legal.privacy() },
            { id: 'terms', label: 'Terms', href: routes.legal.terms() },
        ],
    },
];

export function visibleItems<T extends { commerce?: boolean }>(
    items: T[],
    commerceEnabled: boolean,
): T[] {
    return commerceEnabled ? items : items.filter((item) => !item.commerce);
}
