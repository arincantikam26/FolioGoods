/**
 * One place that decides whether non-essential motion may run.
 * Checks the OS setting and the site switch (siteConfig.motion.enabled →
 * <html data-motion="off">).
 */
export function motionAllowed(): boolean {
    if (typeof window === 'undefined') {
        return false;
    }

    if (document.documentElement.dataset.motion === 'off') {
        return false;
    }

    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function finePointer(): boolean {
    return (
        typeof window !== 'undefined' &&
        window.matchMedia('(hover: hover) and (pointer: fine)').matches
    );
}

type Callback = (entry: IntersectionObserverEntry) => void;

const observers = new Map<string, IntersectionObserver>();
const callbacks = new WeakMap<Element, Callback>();

/**
 * Shared IntersectionObserver per rootMargin/threshold pair, so fifty reveal
 * elements cost one observer, not fifty. Returns an unsubscribe function.
 */
export function observeIntersection(
    element: Element,
    callback: Callback,
    options: { rootMargin?: string; threshold?: number } = {},
): () => void {
    const rootMargin = options.rootMargin ?? '0px';
    const threshold = options.threshold ?? 0;
    const key = `${rootMargin}|${threshold}`;

    let observer = observers.get(key);

    if (!observer) {
        observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    callbacks.get(entry.target)?.(entry);
                }
            },
            { rootMargin, threshold },
        );
        observers.set(key, observer);
    }

    callbacks.set(element, callback);
    observer.observe(element);

    const active = observer;

    return () => {
        active.unobserve(element);
        callbacks.delete(element);
    };
}
