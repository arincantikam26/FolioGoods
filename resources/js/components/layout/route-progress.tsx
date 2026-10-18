import { useNavigationPending } from '@/app/routing/navigation';
import { copy } from '@/content/copy';

/**
 * Hairline progress at the top of the viewport for page visits slower than
 * ~180 ms. Never blocks the page; partial reloads (filters) are excluded
 * because they show their own inline status.
 */
export function RouteProgress() {
    const pending = useNavigationPending();

    if (!pending) {
        return null;
    }

    return (
        <div
            aria-hidden
            className="pointer-events-none fixed inset-x-0 top-0 z-(--z-progress) h-0.5"
        >
            <div className="motion-progress h-full bg-accent" />
        </div>
    );
}

export function SkipLink() {
    return (
        <a
            href="#main"
            className="sr-only-focusable bg-ink text-on-ink fixed top-3 left-3 z-(--z-skip) px-4 py-3 text-sm font-medium"
        >
            {copy.common.skipToContent}
        </a>
    );
}
