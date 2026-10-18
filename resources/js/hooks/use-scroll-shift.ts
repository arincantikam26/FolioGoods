import { useEffect } from 'react';
import type { RefObject } from 'react';
import {
    motionAllowed,
    observeIntersection,
} from '@/components/motion/motion-preferences';

/**
 * Moves elements at slightly different speeds while their container is on
 * screen. Each target gets a CSS variable --shift (px) consumed by
 * .scroll-shift. Runs only on wide screens with motion allowed, and stops
 * listening when the container leaves the viewport.
 */
export function useScrollShift(
    container: RefObject<HTMLElement | null>,
    targets: { ref: RefObject<HTMLElement | null>; factor: number }[],
) {
    useEffect(() => {
        const root = container.current;

        if (
            !root ||
            !motionAllowed() ||
            !window.matchMedia('(min-width: 48rem)').matches
        ) {
            return;
        }

        let frame = 0;
        let listening = false;

        const update = () => {
            frame = 0;
            const rect = root.getBoundingClientRect();
            const progress = -rect.top;

            for (const target of targets) {
                target.ref.current?.style.setProperty(
                    '--shift',
                    (progress * target.factor).toFixed(1),
                );
            }
        };

        const onScroll = () => {
            if (!frame) {
                frame = window.requestAnimationFrame(update);
            }
        };

        const stop = observeIntersection(root, (entry) => {
            if (entry.isIntersecting && !listening) {
                listening = true;
                window.addEventListener('scroll', onScroll, { passive: true });
                update();
            } else if (!entry.isIntersecting && listening) {
                listening = false;
                window.removeEventListener('scroll', onScroll);
            }
        });

        return () => {
            stop();
            window.removeEventListener('scroll', onScroll);
            window.cancelAnimationFrame(frame);
        };
        // Targets are stable refs created by the caller.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [container]);
}
