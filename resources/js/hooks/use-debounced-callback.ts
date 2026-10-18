import { useEffect, useRef } from 'react';

export function useDebouncedCallback<A extends unknown[]>(
    callback: (...args: A) => void,
    delay: number,
) {
    const timer = useRef<number | undefined>(undefined);
    const latest = useRef(callback);

    useEffect(() => {
        latest.current = callback;
    });

    useEffect(() => () => window.clearTimeout(timer.current), []);

    return (...args: A) => {
        window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => latest.current(...args), delay);
    };
}
