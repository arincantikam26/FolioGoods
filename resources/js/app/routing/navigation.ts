import { router, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import type { Query } from '@/app/routing/routes';

/**
 * Router helpers for feature code. Like AppLink, these keep Inertia in one
 * place so features stay framework-agnostic.
 */

export function navigate(href: string, options?: { replace?: boolean }) {
    router.visit(href, { replace: options?.replace ?? false });
}

/** Current URL (path + query) as the router sees it. */
export function useCurrentUrl(): string {
    return usePage().url;
}

/** Reads one query-string value from the current URL. */
export function useQueryParam(key: string): string | null {
    const url = useCurrentUrl();
    const index = url.indexOf('?');

    if (index === -1) {
        return null;
    }

    return new URLSearchParams(url.slice(index + 1)).get(key);
}

/**
 * Applies listing filters to the URL. The server echoes validated filters
 * back as props, so the list always reflects what the URL says.
 * `pending` only turns true after a short delay to avoid flicker.
 */
export function useFilterNavigation(path: string, propName = 'filters') {
    const [pending, setPending] = useState(false);
    const timer = useRef<number | undefined>(undefined);

    useEffect(() => () => window.clearTimeout(timer.current), []);

    const apply = (query: Query) => {
        router.get(path, cleanQuery(query), {
            only: [propName],
            preserveState: true,
            preserveScroll: true,
            replace: true,
            onStart: () => {
                window.clearTimeout(timer.current);
                timer.current = window.setTimeout(() => setPending(true), 150);
            },
            onFinish: () => {
                window.clearTimeout(timer.current);
                setPending(false);
            },
        });
    };

    return { apply, pending };
}

function cleanQuery(query: Query): Record<string, string | number> {
    const result: Record<string, string | number> = {};

    for (const [key, value] of Object.entries(query)) {
        if (value !== null && value !== undefined && value !== '') {
            result[key] = value;
        }
    }

    return result;
}

/** True while an Inertia visit is in flight (after `delay` ms). */
export function useNavigationPending(delay = 180): boolean {
    const [pending, setPending] = useState(false);

    useEffect(() => {
        let timer: number | undefined;

        const offStart = router.on('start', (event) => {
            // Partial reloads (filters) report their own state.
            if (event.detail.visit.only.length > 0) {
                return;
            }

            window.clearTimeout(timer);
            timer = window.setTimeout(() => setPending(true), delay);
        });

        const offFinish = router.on('finish', () => {
            window.clearTimeout(timer);
            setPending(false);
        });

        return () => {
            window.clearTimeout(timer);
            offStart();
            offFinish();
        };
    }, [delay]);

    return pending;
}
