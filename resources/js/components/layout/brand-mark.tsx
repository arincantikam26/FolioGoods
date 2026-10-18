import { AppLink } from '@/app/routing/app-link';
import { routes } from '@/app/routing/routes';
import { site } from '@/content/site';
import { cn } from '@/lib/utils';

/** Text wordmark. Replace with an <img> or inline SVG logo if you have one. */
export function BrandMark({ className }: { className?: string }) {
    return (
        <AppLink
            href={routes.home()}
            className={cn(
                'font-display inline-flex min-h-11 items-center text-[1.375rem] leading-none tracking-tight',
                className,
            )}
        >
            {site.name}
        </AppLink>
    );
}
