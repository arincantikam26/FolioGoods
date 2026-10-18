import { SlidersHorizontal } from 'lucide-react';
import { useId, useState } from 'react';
import { FilterOptions } from '@/components/navigation/filter-options';
import type { FilterOption } from '@/components/navigation/filter-options';
import { copy } from '@/content/copy';
import type { ProductFilters, ProductSort } from '@/features/products/types';
import { PRODUCT_SORTS } from '@/features/products/utils/catalogue';
import { cn } from '@/lib/utils';

type ShopFiltersProps = {
    filters: ProductFilters;
    categories: FilterOption[];
    onChange: (next: ProductFilters) => void;
};

export function ShopFilters({
    filters,
    categories,
    onChange,
}: ShopFiltersProps) {
    const [open, setOpen] = useState(false);
    const panelId = useId();
    const sortId = useId();

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
                {copy.shop.filtersToggle}
                {filters.category && <span className="text-muted">(1)</span>}
            </button>
            <div
                id={panelId}
                className={cn(
                    'border-line gap-6 border-y py-5 md:grid md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-x-10',
                    open ? 'grid' : 'hidden',
                )}
            >
                <FilterOptions
                    label={copy.shop.categoryLabel}
                    options={categories}
                    value={filters.category}
                    onChange={(category) => onChange({ ...filters, category })}
                />
                <div className="grid gap-1.5">
                    <label htmlFor={sortId} className="type-meta text-muted">
                        {copy.shop.sortLabel}
                    </label>
                    <select
                        id={sortId}
                        value={filters.sort ?? 'featured'}
                        onChange={(event) => {
                            const sort =
                                PRODUCT_SORTS.find(
                                    (item) => item === event.target.value,
                                ) ?? null;
                            onChange({
                                ...filters,
                                sort: sort === 'featured' ? null : sort,
                            });
                        }}
                        className="select-native border-line-strong min-h-11 min-w-48 border-b bg-transparent pr-8 text-base"
                    >
                        {PRODUCT_SORTS.map((sort: ProductSort) => (
                            <option key={sort} value={sort}>
                                {copy.shop.sorts[sort]}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}
