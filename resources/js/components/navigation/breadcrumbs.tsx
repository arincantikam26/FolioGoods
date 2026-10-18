import { AppLink } from '@/app/routing/app-link';
import { copy } from '@/content/copy';
import { cn } from '@/lib/utils';
import type { BreadcrumbItem } from '@/types/site';

/** Breadcrumb trail with BreadcrumbList microdata. Last item is the page. */
export function Breadcrumbs({
    items,
    className,
}: {
    items: BreadcrumbItem[];
    className?: string;
}) {
    return (
        <nav aria-label={copy.common.breadcrumb} className={className}>
            <ol
                itemScope
                itemType="https://schema.org/BreadcrumbList"
                className="type-meta flex flex-wrap items-center gap-x-2 gap-y-1 text-muted"
            >
                {items.map((item, index) => {
                    const last = index === items.length - 1;

                    return (
                        <li
                            key={`${item.label}-${item.href ?? 'current'}`}
                            itemProp="itemListElement"
                            itemScope
                            itemType="https://schema.org/ListItem"
                            className="flex items-center gap-2"
                        >
                            {item.href && !last ? (
                                <AppLink
                                    href={item.href}
                                    itemProp="item"
                                    className="link-underline hover:text-ink inline-flex min-h-6 items-center"
                                >
                                    <span itemProp="name">{item.label}</span>
                                </AppLink>
                            ) : (
                                <span
                                    itemProp="name"
                                    aria-current={last ? 'page' : undefined}
                                    className={cn(last && 'text-ink')}
                                >
                                    {item.label}
                                </span>
                            )}
                            <meta
                                itemProp="position"
                                content={String(index + 1)}
                            />
                            {!last && <span aria-hidden>/</span>}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
