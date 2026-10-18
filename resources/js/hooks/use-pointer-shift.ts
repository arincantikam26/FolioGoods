import { useEffect } from 'react';
import type { RefObject } from 'react';
import {
    finePointer,
    motionAllowed,
} from '@/components/motion/motion-preferences';

/**
 * Nudges `target` up to `max` pixels toward the pointer while it moves over
 * `area`. Disabled on touch devices and when motion is reduced.
 */
export function usePointerShift(
    area: RefObject<HTMLElement | null>,
    target: RefObject<HTMLElement | null>,
    max: number,
) {
    useEffect(() => {
        const zone = area.current;
        const element = target.current;

        if (!zone || !element || !motionAllowed() || !finePointer()) {
            return;
        }

        let frame = 0;
        let x = 0;
        let y = 0;

        const write = () => {
            frame = 0;
            element.style.setProperty('--pointer-x', x.toFixed(2));
            element.style.setProperty('--pointer-y', y.toFixed(2));
        };

        const schedule = () => {
            if (!frame) {
                frame = window.requestAnimationFrame(write);
            }
        };

        const onMove = (event: PointerEvent) => {
            if (event.pointerType !== 'mouse') {
                return;
            }

            const rect = zone.getBoundingClientRect();
            x = ((event.clientX - rect.left) / rect.width - 0.5) * 2 * max;
            y = ((event.clientY - rect.top) / rect.height - 0.5) * 2 * max;
            schedule();
        };

        const onLeave = () => {
            x = 0;
            y = 0;
            schedule();
        };

        zone.addEventListener('pointermove', onMove, { passive: true });
        zone.addEventListener('pointerleave', onLeave);

        return () => {
            zone.removeEventListener('pointermove', onMove);
            zone.removeEventListener('pointerleave', onLeave);
            window.cancelAnimationFrame(frame);
        };
    }, [area, target, max]);
}
