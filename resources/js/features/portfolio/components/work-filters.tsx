import { Search, SlidersHorizontal } from 'lucide-react';
import { useId, useState } from 'react';
import { FilterOptions } from '@/components/navigation/filter-options';
import type { FilterOption } from '@/components/navigation/filter-options';
import { copy } from '@/content/copy';
import type { ProjectFilters } from '@/features/portfolio/types';
import { useDebouncedCallback } from '@/hooks/use-debounced-callback';
import { cn } from '@/lib/utils';

type WorkFiltersProps = {
    filters: ProjectFilters;
    categories: FilterOption[];
    years: number[];
    /** Search box text, owned by the page so clearing filters can reset it. */
    query: string;
    onQueryChange: (value: string) => void;
    onChange: (next: ProjectFilters) => void;
};

/**
 * Category, year and search. On small screens the controls sit behind a
 * disclosure so the list stays visible; the active filter count is shown
 * on the toggle so nothing is hidden silently.
 */
export function WorkFilters({
    filters,
    categories,
    years,
    query,
    onQueryChange,
    onChange,
}: WorkFiltersProps) {
    const [open, setOpen] = useState(false);
    const panelId = useId();
    const searchId = useId();
    const yearId = useId();
    const applySearch = useDebouncedCallback((value: string) => {
        onChange({ ...filters, q: value.trim() || null });
    }, 320);

    const activeCount = [filters.category, filters.year, filters.q].filter(
        Boolean,
    ).length;

    return (
        <div className="grid gap-4">
            <button
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpen((value) => !value)}
                className="inline-flex min-h-11 w-fit items-center gap-2 text-sm font-medium md:hidden"
            >
                <SlidersHorizontal
                    aria-hidden
                    strokeWidth={1.6}
                    className="size-4"
                />
                {copy.work.filtersToggle}
                {activeCount > 0 && (
                    <span className="text-muted">({activeCount})</span>
                )}
            </button>

            <div
                id={panelId}
                className={cn(
                    'border-line grid gap-6 border-y py-5 md:grid md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-x-10',
                    open ? 'grid' : 'hidden',
                )}
            >
                <FilterOptions
                    label={copy.work.categoryLabel}
                    options={categories}
                    value={filters.category}
                    onChange={(category) => onChange({ ...filters, category })}
                />

                <div className="grid gap-4 sm:grid-cols-[minmax(0,14rem)_minmax(0,9rem)] sm:items-end">
                    <div className="grid gap-1.5">
                        <label
                            htmlFor={searchId}
                            className="type-meta text-muted"
                        >
                            {copy.work.searchLabel}
                        </label>
                        <div className="relative">
                            <Search
                                aria-hidden
                                strokeWidth={1.6}
                                className="pointer-events-none absolute top-1/2 left-0 size-4 -translate-y-1/2 text-muted"
                            />
                            <input
                                id={searchId}
                                type="search"
                                value={query}
                                placeholder={copy.work.searchPlaceholder}
                                onChange={(event) => {
                                    onQueryChange(event.target.value);
                                    applySearch(event.target.value);
                                }}
                                className="border-line-strong focus-visible:border-ink min-h-11 w-full border-b bg-transparent pr-2 pl-6 text-base placeholder:text-muted"
                            />
                        </div>
                    </div>
                    <div className="grid gap-1.5">
                        <label
                            htmlFor={yearId}
                            className="type-meta text-muted"
                        >
                            {copy.work.yearLabel}
                        </label>
                        <select
                            id={yearId}
                            value={filters.year ?? ''}
                            onChange={(event) =>
                                onChange({
                                    ...filters,
                                    year: event.target.value
                                        ? Number(event.target.value)
                                        : null,
                                })
                            }
                            className="select-native border-line-strong min-h-11 border-b bg-transparent pr-8 text-base"
                        >
                            <option value="">{copy.work.anyYear}</option>
                            {years.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}
