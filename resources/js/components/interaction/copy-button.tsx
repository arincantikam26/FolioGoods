import { Check, Copy } from 'lucide-react';
import { copy as text } from '@/content/copy';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { cn } from '@/lib/utils';

type CopyButtonProps = {
    value: string;
    /** What is being copied, for the accessible name: "account number". */
    label: string;
    className?: string;
};

/** Copies a value and confirms in place (and to screen readers). */
export function CopyButton({ value, label, className }: CopyButtonProps) {
    const { copy, status } = useCopyToClipboard();

    return (
        <span
            className={cn(
                'inline-flex flex-wrap items-center gap-x-3 gap-y-1',
                className,
            )}
        >
            <button
                type="button"
                onClick={() => void copy(value)}
                className="border-line-strong hover:border-ink inline-flex min-h-11 items-center gap-2 rounded-xs border px-3 text-sm font-medium transition-colors"
            >
                {status === 'copied' ? (
                    <Check
                        aria-hidden
                        strokeWidth={1.8}
                        className="text-success size-4"
                    />
                ) : (
                    <Copy aria-hidden strokeWidth={1.6} className="size-4" />
                )}
                <span>
                    {status === 'copied'
                        ? text.common.copied
                        : text.common.copy}
                    <span className="sr-only"> {label}</span>
                </span>
            </button>
            <span
                role="status"
                aria-live="polite"
                className="text-xs text-muted"
            >
                {status === 'failed' ? text.common.copyFailed : ''}
            </span>
        </span>
    );
}
