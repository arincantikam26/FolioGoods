import { lazy, Suspense } from 'react';
import { AppLink } from '@/app/routing/app-link';
import { isActivePath } from '@/app/routing/routes';
import { useCurrentUrl } from '@/app/routing/navigation';
import { BrandMark } from '@/components/layout/brand-mark';
import { useHeaderSolid } from '@/components/layout/header-sentinel';
import { copy } from '@/content/copy';
import { primaryNavigation, visibleItems } from '@/content/navigation';
import { useFolio } from '@/hooks/use-folio';
import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';

// Loaded only on small screens: desktop visitors never download the dialog code.
const MobileNavigation = lazy(() =>
    import('@/components/layout/mobile-navigation').then((module) => ({
        default: module.MobileNavigation,
    })),
);

export function PublicHeader() {
    const url = useCurrentUrl();
    const { commerce } = useFolio();
    const solid = useHeaderSolid();
    const items = visibleItems(primaryNavigation, commerce);
    const wide = useMediaQuery('(min-width: 48rem)', true);

    return (
        <header
            data-site-header
            data-solid={solid}
            className={cn(
                'ease-standard sticky top-0 z-(--z-header) border-b transition-[background-color,border-color] duration-(--duration-slow)',
                solid
                    ? 'border-line bg-[color-mix(in_srgb,var(--color-canvas)_96%,transparent)]'
                    : 'border-transparent bg-transparent',
            )}
        >
            <div className="frame flex h-(--header-height) items-center justify-between gap-6">
                <BrandMark />

                <nav
                    aria-label={copy.navigation.primaryLabel}
                    className="hidden md:block"
                >
                    <ul className="flex items-center gap-8">
                        {items.map((item) => {
                            const active = isActivePath(url, item.href);

                            return (
                                <li key={item.id}>
                                    <AppLink
                                        href={item.href}
                                        prefetch
                                        aria-current={
                                            active ? 'page' : undefined
                                        }
                                        className={cn(
                                            'relative inline-flex min-h-11 items-center text-sm transition-colors duration-(--duration-fast)',
                                            'after:bg-ink after:ease-emphasized after:absolute after:inset-x-0 after:bottom-2 after:h-px after:transition-transform after:duration-(--duration-normal)',
                                            active
                                                ? 'text-ink font-medium after:scale-x-100'
                                                : 'hover:text-ink text-muted after:scale-x-0',
                                        )}
                                    >
                                        {item.label}
                                    </AppLink>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {!wide && (
                    <Suspense fallback={<MenuTriggerPlaceholder />}>
                        <MobileNavigation
                            items={items}
                            currentUrl={url}
                            className="md:hidden"
                        />
                    </Suspense>
                )}
            </div>
        </header>
    );
}

/** Same footprint as the menu trigger while its code loads (avoids shift). */
function MenuTriggerPlaceholder() {
    return (
        <span
            aria-hidden
            className="inline-flex min-h-11 items-center gap-3 px-1 text-sm font-medium md:hidden"
        >
            {copy.navigation.openMenu}
            <span className="grid w-5 gap-1.5">
                <span className="h-px bg-current" />
                <span className="h-px w-3 justify-self-end bg-current" />
            </span>
        </span>
    );
}
