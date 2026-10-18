import { useEffect, useState } from 'react';

/**
 * The header blends into the canvas at the top of the page and gains a
 * background once the visitor scrolls past the page masthead. Pages mark
 * that point with <HeaderSentinel />; without one, any scroll counts.
 */
export function useHeaderSolid(): boolean {
    const [solid, setSolid] = useState(false);

    useEffect(() => {
        const sentinel = document.querySelector('[data-header-sentinel]');

        if (sentinel) {
            const observer = new IntersectionObserver(([entry]) => {
                if (entry) {
                    setSolid(
                        !entry.isIntersecting &&
                            entry.boundingClientRect.top < 0,
                    );
                }
            });
            observer.observe(sentinel);

            return () => observer.disconnect();
        }

        const onScroll = () => setSolid(window.scrollY > 24);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return solid;
}

/** Place right after a page's masthead/hero. */
export function HeaderSentinel() {
    return <div data-header-sentinel aria-hidden className="h-px" />;
}
