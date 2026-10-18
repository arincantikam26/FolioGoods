import { useCallback } from 'react';
import {
    motionAllowed,
    observeIntersection,
} from '@/components/motion/motion-preferences';

/** reveal: fade + lift · revealMask: wipe up · tone: section background shift */
type RevealKind = 'reveal' | 'revealMask' | 'tone';

/**
 * Scroll reveal that never hides content the visitor can already see.
 * Only elements that start below the fold are hidden, and only once
 * JavaScript runs, so content stays visible if scripts fail.
 * Returns a callback ref; writes data-reveal / data-reveal-mask directly
 * on the element, so revealing never re-renders React.
 */
export function useReveal(kind: RevealKind = 'reveal') {
    return useCallback(
        (element: HTMLElement | null) => {
            if (!element || !motionAllowed()) {
                return;
            }

            if (
                element.getBoundingClientRect().top <
                window.innerHeight * 0.9
            ) {
                return;
            }

            element.dataset[kind] = 'hidden';

            const stop = observeIntersection(
                element,
                (entry) => {
                    if (entry.isIntersecting) {
                        element.dataset[kind] = 'shown';
                        stop();
                    }
                },
                { rootMargin: '0px 0px -12% 0px' },
            );

            return () => {
                stop();
                delete element.dataset[kind];
            };
        },
        [kind],
    );
}
