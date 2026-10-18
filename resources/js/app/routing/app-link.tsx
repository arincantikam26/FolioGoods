import { Link } from '@inertiajs/react';
import type { ComponentPropsWithoutRef, MouseEvent, Ref } from 'react';
import { isExternalHref } from '@/app/routing/routes';

/** Anchor events that Inertia's Link reuses as visit callbacks. */
type ReservedEvents =
    | 'onClick'
    | 'onProgress'
    | 'onError'
    | 'onCancel'
    | 'onStart';

export type AppLinkProps = Omit<
    ComponentPropsWithoutRef<'a'>,
    'href' | ReservedEvents
> & {
    href: string;
    onClick?: (event: MouseEvent<Element>) => void;
    /** Prefetch on hover. Use for links a visitor is likely to open next. */
    prefetch?: boolean;
    preserveScroll?: boolean;
    replace?: boolean;
    ref?: Ref<HTMLAnchorElement>;
};

/**
 * The only component that knows which router is in use. Swap the Inertia
 * <Link> for next/link (or a plain <a>) here when porting the UI.
 */
export function AppLink({
    href,
    prefetch = false,
    preserveScroll,
    replace,
    ref,
    ...props
}: AppLinkProps) {
    if (isExternalHref(href) || href.startsWith('#')) {
        const external = /^(https?:)?\/\//.test(href);

        return (
            <a
                ref={ref}
                href={href}
                {...(external ? { rel: 'noopener noreferrer' } : {})}
                {...props}
            />
        );
    }

    return (
        <Link
            ref={ref}
            href={href}
            prefetch={prefetch}
            preserveScroll={preserveScroll}
            replace={replace}
            {...props}
        />
    );
}
