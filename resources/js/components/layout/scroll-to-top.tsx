import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motionAllowed } from '@/components/motion/motion-preferences';
import { copy } from '@/content/copy';
import { cn } from '@/lib/utils';

/** Distance in px after which the button appears. */
const SHOW_AFTER = 560;

/**
 * Floating "back to top" control. Hidden near the top of the page, lifts
 * above the mobile purchase bar when that bar is showing, respects the
 * bottom safe area, and jumps instead of gliding under reduced motion.
 * Focus moves to <main> so keyboard users continue from the top.
 */
export function ScrollToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        let frame = 0;

        const update = () => {
            frame = 0;
            setVisible(window.scrollY > SHOW_AFTER);
        };

        const onScroll = () => {
            if (!frame) {
                frame = window.requestAnimationFrame(update);
            }
        };

        update();
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.cancelAnimationFrame(frame);
        };
    }, []);

    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: motionAllowed() ? 'smooth' : 'auto',
        });
        document.getElementById('main')?.focus({ preventScroll: true });
    };

    return (
        <button
            type="button"
            onClick={scrollUp}
            aria-label={copy.common.scrollToTop}
            title={copy.common.backToTop}
            aria-hidden={!visible}
            tabIndex={visible ? 0 : -1}
            className={cn(
                'scroll-top print-hidden border-line-strong bg-canvas/95 text-ink hover:border-ink hover:bg-surface shadow-sheet ease-standard fixed right-[max(1rem,env(safe-area-inset-right))] z-(--z-header) grid size-11 place-items-center rounded-full border transition-[opacity,transform,bottom] duration-(--duration-normal)',
                visible
                    ? 'translate-y-0 opacity-100'
                    : 'pointer-events-none translate-y-3 opacity-0',
            )}
        >
            <ArrowUp aria-hidden className="size-4" strokeWidth={1.6} />
        </button>
    );
}
