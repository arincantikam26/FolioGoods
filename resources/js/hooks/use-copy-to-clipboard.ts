import { useEffect, useRef, useState } from 'react';

export type CopyStatus = 'idle' | 'copied' | 'failed';

/** Copies text and reports the outcome for ~2 seconds. */
export function useCopyToClipboard(resetAfter = 2200) {
    const [status, setStatus] = useState<CopyStatus>('idle');
    const timer = useRef<number | undefined>(undefined);

    useEffect(() => () => window.clearTimeout(timer.current), []);

    const copy = async (text: string) => {
        window.clearTimeout(timer.current);

        try {
            await navigator.clipboard.writeText(text);
            setStatus('copied');
        } catch {
            setStatus('failed');
        }

        timer.current = window.setTimeout(() => setStatus('idle'), resetAfter);
    };

    return { copy, status };
}
