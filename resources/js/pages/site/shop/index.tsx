import { routes } from '@/app/routing/routes';
import { useFilterNavigation } from '@/app/routing/navigation';
import { EmptyState } from '@/components/feedback/empty-state';
import { LoadingState } from '@/components/feedback/loading-state';
import { HeaderSentinel } from '@/components/layout/header-sentinel';
import { PageMasthead } from '@/components/layout/page-masthead';
import { Accordion } from '@/components/interaction/accordion';
import { Button } from '@/components/primitives/button';
import { TextLink } from '@/components/primitives/text-link';
import { Seo } from '@/components/seo/seo';
import { SectionLabel } from '@/components/typography/section-label';
import { copy } from '@/content/copy';
import { productSource } from '@/features/products/api/product-source';
import { ProductCatalogue } from '@/features/products/components/product-catalogue';
import { ShopFilters } from '@/features/products/components/shop-filters';
import type { ProductFilters } from '@/features/products/types';
import {
    EMPTY_PRODUCT_FILTERS,
    filterAndSortProducts,
    isProductFilters,
} from '@/features/products/utils/catalogue';
import { PublicLayout } from '@/layouts/site/public-layout';
import { cn } from '@/lib/utils';

const categoryLabel = (slug: string) =>
    productSource.category(slug)?.label ?? slug;

export default function ShopIndexPage({
    filters: rawFilters,
}: {
    filters: unknown;
}) {
    const filters: ProductFilters = isProductFilters(rawFilters)
        ? rawFilters
        : EMPTY_PRODUCT_FILTERS;
    const { apply, pending } = useFilterNavigation(routes.shop.index());
    const all = productSource.list();
    const results = filterAndSortProducts(all, filters);

    const categories = [
        { value: null, label: copy.common.all, count: all.length },
        ...productSource.categories().map((category) => ({
            value: category.slug,
            label: category.label,
            count: all.filter((product) => product.category === category.slug)
                .length,
        })),
    ].filter((option) => option.value === null || option.count > 0);

    const update = (next: ProductFilters) =>
        apply({ category: next.category, sort: next.sort });

    return (
        <PublicLayout>
            <Seo title={copy.shop.title} description={copy.shop.intro} />
            <PageMasthead
                title={copy.shop.title}
                intro={copy.shop.intro}
                breadcrumbs={[
                    { label: copy.common.home, href: routes.home() },
                    { label: copy.shop.title },
                ]}
            />
            <HeaderSentinel />

            <section aria-label={copy.shop.title} className="frame">
                {all.length > 0 && (
                    <ShopFilters
                        filters={filters}
                        categories={categories}
                        onChange={update}
                    />
                )}

                <div className="flex min-h-12 flex-wrap items-center justify-between gap-x-6 gap-y-2 py-4">
                    <p
                        role="status"
                        aria-live="polite"
                        className="text-sm text-muted"
                    >
                        {copy.shop.count(results.length)}
                    </p>
                    {pending && <LoadingState label={copy.shop.updating} />}
                </div>

                <div
                    aria-busy={pending}
                    className={cn(
                        'transition-opacity duration-(--duration-normal)',
                        pending && 'opacity-50',
                    )}
                >
                    {all.length === 0 ? (
                        <EmptyState
                            title={copy.shop.noneTitle}
                            body={copy.shop.noneBody}
                        />
                    ) : results.length === 0 ? (
                        <EmptyState
                            title={copy.shop.emptyTitle}
                            body={copy.shop.emptyBody}
                            action={
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={() =>
                                        update(EMPTY_PRODUCT_FILTERS)
                                    }
                                >
                                    {copy.common.clearFilters}
                                </Button>
                            }
                        />
                    ) : (
                        <ProductCatalogue
                            products={results}
                            categoryLabel={categoryLabel}
                        />
                    )}
                </div>
            </section>

            <section
                aria-labelledby="license-note"
                className="frame py-(--space-section)"
            >
                <div className="editorial-grid border-line gap-y-6 border-y py-10">
                    <h2
                        id="license-note"
                        className="type-subtitle lg:col-span-4"
                    >
                        {copy.shop.licenseNoteTitle}
                    </h2>
                    <p className="max-w-[56ch] text-muted lg:col-span-5 lg:col-start-6">
                        {copy.shop.licenseNote}
                    </p>
                    <div className="lg:col-span-2 lg:col-start-11 lg:justify-self-end">
                        <TextLink href={routes.legal.license()} arrow>
                            {copy.shop.licenseNoteCta}
                        </TextLink>
                    </div>
                </div>
            </section>

            <section
                aria-labelledby="shop-faq"
                className="frame editorial-grid gap-y-8 pb-(--space-section)"
            >
                <div className="grid content-start gap-5 lg:col-span-4">
                    <SectionLabel>{copy.shop.faqLabel}</SectionLabel>
                    <h2 id="shop-faq" className="type-title">
                        {copy.shop.faqTitle}
                    </h2>
                    <TextLink
                        href={routes.contact({ topic: 'product-support' })}
                        arrow
                        className="w-fit"
                    >
                        {copy.shop.faqCta}
                    </TextLink>
                </div>
                <Accordion
                    className="lg:col-span-7 lg:col-start-6"
                    items={productSource.faqs().map((faq) => ({
                        id: faq.id,
                        title: faq.question,
                        content: <p>{faq.answer}</p>,
                    }))}
                />
            </section>
        </PublicLayout>
    );
}
