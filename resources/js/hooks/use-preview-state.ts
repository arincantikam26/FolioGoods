import { useQueryParam } from '@/app/routing/navigation';
import { useFolio } from '@/hooks/use-folio';

/**
 * Reads the mock UI state from ?state=… when previews are enabled
 * (config/folio.php → previews). Unknown values fall back to `fallback`.
 * In the Commerce Edition this is replaced by real server state.
 */
export function usePreviewState<T extends string>(
    allowed: readonly T[],
    fallback: T,
): T {
    const { previews } = useFolio();
    const requested = useQueryParam('state');

    if (!previews || requested === null) {
        return fallback;
    }

    return allowed.find((state) => state === requested) ?? fallback;
}
