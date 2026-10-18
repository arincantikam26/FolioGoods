import { useEffect, useState } from 'react';
import type { RefObject } from 'react';
import { ButtonLink } from '@/components/primitives/button';
import { copy } from '@/content/copy';
import { formatMoney } from '@/lib/format';

type MobilePurchaseBarProps = {
    /** The full purchase summary; the bar only shows once it is scrolled past. */
    anchor: RefObject<HTMLElement | null>;
    price: number;
    href: string;
    label: string;
};

/**
 * Small-screen bar with price and the primary action. Appears only after
 * the purchase summary has scrolled out of view, hides near the footer,
 * and respects the bottom safe area.
 */
export function MobilePurchaseBar({
    anchor,
    price,
    href,
    label,
}: MobilePurchaseBarProps) {
    const [passed, setPassed] = useState(false);
    const [nearEnd, setNearEnd] = useState(false);

    useEffect(() => {
        const target = anchor.current;
        const footer = document.querySelector('[data-site-footer]');

        if (!target) {
            return;
        }

        const summary = new IntersectionObserver(([entry]) => {
            if (entry) {
                setPassed(
                    !entry.isIntersecting && entry.boundingClientRect.top < 0,
                );
            }
        });
        summary.observe(target);

        const end = new IntersectionObserver(([entry]) =>
            setNearEnd(Boolean(entry?.isIntersecting)),
        );

        if (footer) {
            end.observe(footer);
        }

        return () => {
            summary.disconnect();
            end.disconnect();
        };
    }, [anchor]);

    const visible = passed && !nearEnd;

    // Lets other fixed controls (scroll-to-top) move above the bar.
    useEffect(() => {
        const root = document.documentElement;

        if (visible) {
            root.dataset.bottomBar = 'on';
        } else {
            delete root.dataset.bottomBar;
        }

        return () => {
            delete root.dataset.bottomBar;
        };
    }, [visible]);

    return (
        <div
            aria-hidden={!visible}
            inert={!visible}
            className={`print-hidden border-line bg-canvas ease-emphasized fixed inset-x-0 bottom-0 z-(--z-header) border-t pb-[env(safe-area-inset-bottom)] transition-transform duration-(--duration-normal) lg:hidden ${visible ? 'translate-y-0' : 'translate-y-full'}`}
        >
            <div className="frame flex items-center justify-between gap-4 py-3">
                <p className="grid">
                    <span className="sr-only">
                        {copy.product.mobileBarLabel}:{' '}
                    </span>
                    <span className="text-sm font-medium tabular-nums">
                        {formatMoney(price)}
                    </span>
                </p>
                <ButtonLink href={href} variant="accent" size="sm">
                    {label}
                </ButtonLink>
            </div>
        </div>
    );
}
