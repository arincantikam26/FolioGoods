/**
 * Stand-in for a network request while the UI Edition has no backend.
 * Resolves after `ms`, or rejects with an AbortError if the signal fires
 * (e.g. the component unmounted). Delete when wiring real endpoints.
 */
export function simulateRequest(ms: number, signal?: AbortSignal) {
    return new Promise<void>((resolve, reject) => {
        if (signal?.aborted) {
            reject(new DOMException('Aborted', 'AbortError'));

            return;
        }

        const timer = window.setTimeout(resolve, ms);

        signal?.addEventListener(
            'abort',
            () => {
                window.clearTimeout(timer);
                reject(new DOMException('Aborted', 'AbortError'));
            },
            { once: true },
        );
    });
}

export function isAbortError(error: unknown): boolean {
    return error instanceof DOMException && error.name === 'AbortError';
}

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
