import { usePage } from '@inertiajs/react';
import type { FolioSharedProps } from '@/types/site';

const FALLBACK: FolioSharedProps = {
    previews: false,
    commerce: true,
    url: '',
};

function isFolioShared(value: unknown): value is FolioSharedProps {
    if (typeof value !== 'object' || value === null) {
        return false;
    }

    const candidate = value as Record<string, unknown>;

    return (
        typeof candidate.previews === 'boolean' &&
        typeof candidate.commerce === 'boolean' &&
        typeof candidate.url === 'string'
    );
}

/** Site switches shared by the server (config/folio.php). */
export function useFolio(): FolioSharedProps {
    const shared = usePage().props.folio;

    return isFolioShared(shared) ? shared : FALLBACK;
}
