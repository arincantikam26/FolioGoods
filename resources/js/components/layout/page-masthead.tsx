import type { ReactNode } from 'react';
import { Breadcrumbs } from '@/components/navigation/breadcrumbs';
import { cn } from '@/lib/utils';
import type { BreadcrumbItem } from '@/types/site';

type PageMastheadProps = {
    title: string;
    intro?: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    /** Right-hand detail, e.g. a count or last-updated date. */
    aside?: ReactNode;
    className?: string;
};

/** Title block for index and utility pages. One h1 per page lives here. */
export function PageMasthead({
    title,
    intro,
    breadcrumbs,
    aside,
    className,
}: PageMastheadProps) {
    return (
        <header className={cn('frame pt-8 pb-10 lg:pt-14 lg:pb-14', className)}>
            {breadcrumbs && (
                <Breadcrumbs items={breadcrumbs} className="mb-10 lg:mb-14" />
            )}
            <div className="editorial-grid items-end gap-y-6">
                <h1 className="type-headline lg:col-span-7">{title}</h1>
                {(intro || aside) && (
                    <div className="grid gap-4 lg:col-span-4 lg:col-start-9">
                        {intro && (
                            <div className="max-w-[40ch] text-muted">
                                {intro}
                            </div>
                        )}
                        {aside}
                    </div>
                )}
            </div>
        </header>
    );
}
