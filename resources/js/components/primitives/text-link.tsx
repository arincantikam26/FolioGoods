import { ArrowRight, ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { AppLink } from '@/app/routing/app-link';
import type { AppLinkProps } from '@/app/routing/app-link';
import { isExternalHref } from '@/app/routing/routes';
import { copy } from '@/content/copy';
import { cn } from '@/lib/utils';

type TextLinkProps = AppLinkProps & {
    children: ReactNode;
    arrow?: boolean;
    /** Opens in a new tab and announces it. */
    newTab?: boolean;
};

/** Inline or standalone text link with a drawn underline. */
export function TextLink({
    children,
    arrow = false,
    newTab = false,
    className,
    href,
    ...props
}: TextLinkProps) {
    const external = isExternalHref(href) && !href.startsWith('mailto:');
    const Icon = external ? ArrowUpRight : ArrowRight;

    return (
        <AppLink
            href={href}
            className={cn(
                'link-underline inline-flex items-baseline gap-1.5 font-medium',
                className,
            )}
            {...(newTab ? { target: '_blank' } : {})}
            {...props}
        >
            <span>{children}</span>
            {newTab && (
                <span className="sr-only">{copy.common.opensInNewTab}</span>
            )}
            {arrow && (
                <Icon
                    aria-hidden
                    strokeWidth={1.6}
                    className="link-arrow size-[0.95em] translate-y-[0.12em] self-baseline"
                />
            )}
        </AppLink>
    );
}
