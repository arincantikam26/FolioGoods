import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { useState } from 'react';
import { AppLink } from '@/app/routing/app-link';
import { isActivePath } from '@/app/routing/routes';
import { BrandMark } from '@/components/layout/brand-mark';
import { copy } from '@/content/copy';
import type { NavigationItem } from '@/content/navigation';
import { site } from '@/content/site';
import { indexLabel } from '@/lib/format';
import { cn } from '@/lib/utils';

type MobileNavigationProps = {
    items: NavigationItem[];
    currentUrl: string;
    className?: string;
};

/**
 * Small-screen menu: a sheet that drops from the top, not a full-screen
 * takeover. Radix Dialog provides the focus trap, Escape to close, scroll
 * lock and focus return to the trigger.
 */
export function MobileNavigation({
    items,
    currentUrl,
    className,
}: MobileNavigationProps) {
    // The menu is open "for" a URL, so any route change — a link, back or
    // forward — closes it without an effect.
    const [openFor, setOpenFor] = useState<string | null>(null);
    const open = openFor === currentUrl;
    const setOpen = (next: boolean) => setOpenFor(next ? currentUrl : null);

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger
                className={cn(
                    'inline-flex min-h-11 items-center gap-3 px-1 text-sm font-medium',
                    className,
                )}
            >
                {copy.navigation.openMenu}
                <span aria-hidden className="grid w-5 gap-1.5">
                    <span className="h-px bg-current" />
                    <span className="h-px w-3 justify-self-end bg-current" />
                </span>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="motion-overlay bg-scrim fixed inset-0 z-(--z-overlay)" />
                <Dialog.Content
                    aria-describedby={undefined}
                    className="motion-sheet border-line bg-canvas shadow-sheet fixed inset-x-0 top-0 z-(--z-dialog) max-h-dvh overflow-y-auto border-b pb-[max(1.5rem,env(safe-area-inset-bottom))]"
                >
                    <Dialog.Title className="sr-only">
                        {copy.navigation.menuTitle}
                    </Dialog.Title>
                    <div className="frame flex h-(--header-height) items-center justify-between">
                        <BrandMark />
                        <Dialog.Close className="inline-flex min-h-11 items-center gap-2 px-1 text-sm font-medium">
                            {copy.navigation.closeMenu}
                            <X
                                aria-hidden
                                strokeWidth={1.5}
                                className="size-5"
                            />
                        </Dialog.Close>
                    </div>

                    <nav
                        aria-label={copy.navigation.primaryLabel}
                        className="frame"
                    >
                        <ul className="border-line border-t">
                            {items.map((item, index) => {
                                const active = isActivePath(
                                    currentUrl,
                                    item.href,
                                );

                                return (
                                    <li
                                        key={item.id}
                                        className="border-line border-b"
                                    >
                                        <AppLink
                                            href={item.href}
                                            aria-current={
                                                active ? 'page' : undefined
                                            }
                                            onClick={() => setOpen(false)}
                                            className="flex min-h-16 items-baseline gap-4 py-3"
                                        >
                                            <span className="type-index w-6 text-sm text-muted">
                                                {indexLabel(index)}
                                            </span>
                                            <span
                                                className={cn(
                                                    'font-display text-3xl',
                                                    active && 'italic',
                                                )}
                                            >
                                                {item.label}
                                            </span>
                                        </AppLink>
                                    </li>
                                );
                            })}
                        </ul>

                        <div className="mt-8 grid gap-1 text-sm">
                            <a
                                href={`mailto:${site.email}`}
                                className="link-underline w-fit py-2"
                            >
                                {site.email}
                            </a>
                            <p className="text-muted">
                                {site.availability.label}
                            </p>
                        </div>
                    </nav>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
