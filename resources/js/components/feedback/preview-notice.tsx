import { useId } from 'react';
import { navigate, useCurrentUrl } from '@/app/routing/navigation';
import { withQuery } from '@/app/routing/routes';
import { copy } from '@/content/copy';
import { useFolio } from '@/hooks/use-folio';
import { cn } from '@/lib/utils';

export type PreviewStateOption<T extends string> = {
    value: T;
    label: string;
};

type PreviewNoticeProps<T extends string> = {
    message: string;
    /** When given and previews are enabled, shows the state switcher. */
    states?: PreviewStateOption<T>[];
    current?: T;
    className?: string;
};

/**
 * Marks a screen as mock UI. With previews enabled (local by default) it
 * also lets you switch between the screen's states via ?state=…
 */
export function PreviewNotice<T extends string>({
    message,
    states,
    current,
    className,
}: PreviewNoticeProps<T>) {
    const { previews } = useFolio();
    const url = useCurrentUrl();
    const selectId = useId();

    const onChange = (value: string) => {
        const [path, search = ''] = url.split('?');
        const query = Object.fromEntries(new URLSearchParams(search));

        navigate(withQuery(path ?? '/', { ...query, state: value }), {
            replace: true,
        });
    };

    return (
        <aside
            aria-label={copy.common.previewBadge}
            className={cn(
                'print-hidden border-line-strong flex flex-col gap-3 border-y border-dashed py-3 text-sm sm:flex-row sm:items-center sm:justify-between',
                className,
            )}
        >
            <p className="flex gap-3 text-muted">
                <span className="type-meta text-accent-secondary-ink shrink-0 pt-px">
                    {copy.common.previewBadge}
                </span>
                <span>{message}</span>
            </p>
            {previews && states && states.length > 0 && (
                <div className="flex shrink-0 items-center gap-3">
                    <label htmlFor={selectId} className="type-meta text-muted">
                        {copy.preview.stateLabel}
                    </label>
                    <select
                        id={selectId}
                        value={current}
                        onChange={(event) => onChange(event.target.value)}
                        className="select-native border-line-strong bg-surface min-h-11 rounded-xs border px-3 text-sm"
                    >
                        {states.map((state) => (
                            <option key={state.value} value={state.value}>
                                {state.label}
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </aside>
    );
}
