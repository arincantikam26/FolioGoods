import { useRef, useState } from 'react';
import { siteConfig } from '@/app/configuration/site-config';
import { routes } from '@/app/routing/routes';
import { NotFoundState } from '@/components/feedback/not-found-state';
import { HeaderSentinel } from '@/components/layout/header-sentinel';
import { Breadcrumbs } from '@/components/navigation/breadcrumbs';
import { Seo } from '@/components/seo/seo';
import { copy } from '@/content/copy';
import { site } from '@/content/site';
import { productSource } from '@/features/products/api/product-source';
import { MobilePurchaseBar } from '@/features/products/components/mobile-purchase-bar';
import { ProductGallery } from '@/features/products/components/product-gallery';
import { ProductShelf } from '@/features/products/components/product-shelf';
import {
    AudienceFit,
    Changelog,
    DeliverySteps,
    FeatureWalkthrough,
    LicenseSummary,
    PackageContents,
    ProductFaq,
    ProductOverview,
    ProductSection,
    PurchaseClosing,
    RequirementsTable,
    SourceTree,
    SupportScopeList,
} from '@/features/products/components/product-sections';
import { PurchaseSummary } from '@/features/products/components/purchase-summary';
import { PublicLayout } from '@/layouts/site/public-layout';

const categoryLabel = (slug: string) =>
    productSource.category(slug)?.label ?? slug;

export default function ShopShowPage({ slug }: { slug: string }) {
    const product = productSource.find(slug);
    const licenses = product ? productSource.licenses(product) : [];
    const [licenseId, setLicenseId] = useState(licenses[0]?.id ?? '');
    const summaryRef = useRef<HTMLDivElement>(null);

    if (!product) {
        return (
            <PublicLayout>
                <Seo title={copy.product.notFoundTitle} noindex />
                <NotFoundState
                    title={copy.product.notFoundTitle}
                    body={copy.product.notFoundBody}
                    action={{
                        label: copy.product.backToShop,
                        href: routes.shop.index(),
                    }}
                />
            </PublicLayout>
        );
    }

    const sections = copy.product.sections;
    const category = productSource.category(product.category);
    const noun = category?.noun ?? 'product';
    const selected =
        licenses.find((license) => license.id === licenseId) ?? licenses[0];
    const related = productSource.related(product, 3);

    return (
        <PublicLayout>
            <Seo
                title={product.name}
                description={product.tagline}
                image={product.cover.src}
                type="product"
            />

            <article itemScope itemType="https://schema.org/Product">
                <header className="frame pt-8 pb-10 lg:pt-14 lg:pb-14">
                    <Breadcrumbs
                        items={[
                            { label: copy.common.home, href: routes.home() },
                            {
                                label: copy.shop.title,
                                href: routes.shop.index(),
                            },
                            { label: product.name },
                        ]}
                        className="mb-10 lg:mb-14"
                    />
                    <div className="editorial-grid items-end gap-y-5">
                        <div className="grid gap-5 lg:col-span-8">
                            <p className="type-meta text-muted">
                                {categoryLabel(product.category)}
                            </p>
                            <h1
                                itemProp="name"
                                className="type-headline max-w-[16ch]"
                            >
                                {product.name}
                            </h1>
                        </div>
                        <p
                            itemProp="description"
                            className="type-lede text-muted lg:col-span-4"
                        >
                            {product.tagline}
                        </p>
                    </div>
                </header>
                <HeaderSentinel />

                <div className="frame editorial-grid gap-y-12">
                    <div className="lg:col-span-8 lg:row-start-1">
                        <ProductGallery images={product.gallery} />
                    </div>

                    <aside
                        aria-label={copy.product.mobileBarLabel}
                        className="lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-1"
                    >
                        <div
                            ref={summaryRef}
                            className="lg:sticky lg:top-[calc(var(--header-height)+1.5rem)]"
                        >
                            <div
                                itemProp="offers"
                                itemScope
                                itemType="https://schema.org/Offer"
                                className="contents"
                            >
                                {selected && (
                                    <meta
                                        itemProp="price"
                                        content={String(selected.price)}
                                    />
                                )}
                                <meta
                                    itemProp="priceCurrency"
                                    content={siteConfig.currency.code}
                                />
                                <meta
                                    itemProp="availability"
                                    content={
                                        product.availability === 'available'
                                            ? 'https://schema.org/InStock'
                                            : 'https://schema.org/OutOfStock'
                                    }
                                />
                                <meta itemProp="seller" content={site.name} />
                            </div>
                            <PurchaseSummary
                                product={product}
                                licenses={licenses}
                                licenseId={selected?.id ?? ''}
                                onLicenseChange={setLicenseId}
                                noun={noun}
                            />
                        </div>
                    </aside>

                    <div className="min-w-0 lg:col-span-7 lg:row-start-2">
                        <ProductSection id="overview" title={sections.overview}>
                            <ProductOverview summary={product.summary} />
                        </ProductSection>
                        <ProductSection id="includes" title={sections.includes}>
                            <PackageContents items={product.includes} />
                        </ProductSection>
                        <ProductSection id="audience" title={sections.audience}>
                            <AudienceFit
                                suits={product.audience.suits}
                                notSuited={product.audience.notSuited}
                            />
                        </ProductSection>
                        <ProductSection
                            id="requirements"
                            title={sections.requirements}
                        >
                            <RequirementsTable
                                requirements={product.requirements}
                                compatibility={product.compatibility}
                            />
                        </ProductSection>
                        <ProductSection
                            id="walkthrough"
                            title={sections.features}
                        >
                            <FeatureWalkthrough features={product.features} />
                        </ProductSection>
                        <ProductSection id="source" title={sections.source}>
                            <SourceTree nodes={product.sourceTree} />
                        </ProductSection>
                        <ProductSection id="delivery" title={sections.delivery}>
                            <DeliverySteps />
                        </ProductSection>
                        <ProductSection id="license" title={sections.license}>
                            <LicenseSummary licenses={licenses} />
                        </ProductSection>
                        <ProductSection
                            id="changelog"
                            title={sections.changelog}
                        >
                            <Changelog entries={product.changelog} />
                        </ProductSection>
                        <ProductSection id="support" title={sections.support}>
                            <SupportScopeList support={product.support} />
                        </ProductSection>
                        {product.faqs.length > 0 && (
                            <ProductSection id="faq" title={sections.faq}>
                                <ProductFaq items={product.faqs} />
                            </ProductSection>
                        )}
                        {product.availability === 'available' && selected && (
                            <PurchaseClosing
                                name={product.name}
                                price={selected.price}
                                licenseName={selected.name}
                                href={routes.checkout({
                                    product: product.slug,
                                    license: selected.id,
                                })}
                                label={copy.product.primaryCta(noun)}
                                previewHref={product.links.preview}
                            />
                        )}
                    </div>
                </div>
            </article>

            {related.length > 0 && (
                <section
                    aria-labelledby="related-products"
                    className="frame pb-(--space-section)"
                >
                    <h2
                        id="related-products"
                        className="type-meta pb-6 text-muted"
                    >
                        {sections.related}
                    </h2>
                    <ProductShelf
                        products={related}
                        categoryLabel={categoryLabel}
                        fromLabel={copy.shop.from}
                        detailsLabel={copy.shop.viewDetails}
                    />
                </section>
            )}

            {product.availability === 'available' && selected && (
                <MobilePurchaseBar
                    anchor={summaryRef}
                    price={selected.price}
                    href={routes.checkout({
                        product: product.slug,
                        license: selected.id,
                    })}
                    label={copy.product.primaryCta(noun)}
                />
            )}
        </PublicLayout>
    );
}
