import { AppLink } from '@/app/routing/app-link';
import { copy } from '@/content/copy';
import { footerNavigation, visibleItems } from '@/content/navigation';
import { site } from '@/content/site';
import { useFolio } from '@/hooks/use-folio';

const YEAR = new Date().getFullYear();

export function PublicFooter() {
    const { commerce } = useFolio();
    const groups = footerNavigation
        .map((group) => ({
            ...group,
            items: visibleItems(group.items, commerce),
        }))
        .filter((group) => group.items.length > 0);

    return (
        <footer data-site-footer className="border-line border-t">
            <div className="frame grid gap-12 py-16 lg:grid-cols-12 lg:gap-x-(--gutter)">
                <div className="grid content-start gap-4 lg:col-span-5">
                    <p className="font-display text-2xl leading-tight">
                        {site.name}
                    </p>
                    <p className="max-w-sm text-sm text-muted">
                        {site.role}, {site.location}.
                    </p>
                    <a
                        href={`mailto:${site.email}`}
                        className="link-underline w-fit text-sm"
                    >
                        {site.email}
                    </a>
                </div>

                <nav
                    aria-label={copy.navigation.footerLabel}
                    className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:col-span-7"
                >
                    {groups.map((group) => (
                        <div
                            key={group.id}
                            className="grid content-start gap-3"
                        >
                            <p className="type-meta text-muted">
                                {group.label}
                            </p>
                            <ul className="grid gap-1">
                                {group.items.map((item) => (
                                    <li key={item.id}>
                                        <AppLink
                                            href={item.href}
                                            className="inline-flex min-h-9 items-center text-sm hover:underline hover:underline-offset-4"
                                        >
                                            {item.label}
                                        </AppLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </nav>
            </div>

            <div className="frame border-line flex flex-col gap-3 border-t py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
                <p>{copy.footer.rights(YEAR, site.name)}</p>
                <ul className="flex flex-wrap gap-x-5 gap-y-1">
                    {site.socials.map((social) => (
                        <li key={social.label}>
                            <a
                                href={social.href}
                                rel="noopener noreferrer"
                                className="hover:text-ink inline-flex min-h-9 items-center"
                            >
                                {social.label}
                            </a>
                        </li>
                    ))}
                </ul>
                <a
                    href="#top"
                    className="hover:text-ink inline-flex min-h-9 items-center"
                >
                    {copy.common.backToTop}
                </a>
            </div>
        </footer>
    );
}
