import { routes } from '@/app/routing/routes';
import { HeaderSentinel } from '@/components/layout/header-sentinel';
import { Seo } from '@/components/seo/seo';
import { copy } from '@/content/copy';
import { site } from '@/content/site';
import { ContactClosing } from '@/features/contact/components/contact-closing';
import { HomeHero } from '@/features/home/components/home-hero';
import { ProjectStatement } from '@/features/home/components/project-statement';
import { projectSource } from '@/features/portfolio/api/project-source';
import { SelectedWork } from '@/features/portfolio/components/selected-work';
import { productSource } from '@/features/products/api/product-source';
import { ShopPreview } from '@/features/products/components/shop-preview';
import { AboutPreview } from '@/features/profile/components/about-preview';
import { profile } from '@/features/profile/data/profile';
import { useFolio } from '@/hooks/use-folio';
import { PublicLayout } from '@/layouts/site/public-layout';

const projectCategory = (slug: string) =>
    projectSource.category(slug)?.label ?? slug;
const productCategory = (slug: string) =>
    productSource.category(slug)?.label ?? slug;

export default function HomePage() {
    const { commerce } = useFolio();
    const text = copy.home;
    const heroProject =
        projectSource.find(text.hero.projectSlug) ??
        projectSource.featured(1)[0];
    const selected = projectSource
        .featured(5)
        .filter((project) => project.slug !== heroProject?.slug)
        .slice(0, 4);

    return (
        <PublicLayout>
            <Seo />

            {heroProject && (
                <HomeHero
                    eyebrow={text.hero.eyebrow}
                    headline={text.hero.headline}
                    body={text.hero.body}
                    primaryCta={{
                        label: text.hero.primaryCta,
                        href: routes.work.index(),
                    }}
                    secondaryCta={
                        commerce
                            ? {
                                  label: text.hero.secondaryCta,
                                  href: routes.shop.index(),
                              }
                            : null
                    }
                    mediaLabel={text.hero.mediaLabel}
                    mediaCta={text.hero.mediaCta}
                    project={heroProject}
                    categoryLabel={projectCategory(heroProject.category)}
                    meta={[
                        { label: text.hero.meta.practice, value: site.role },
                        {
                            label: text.hero.meta.location,
                            value: `${site.location} (${site.timezone})`,
                        },
                        {
                            label: text.hero.meta.availability,
                            value: site.availability.label,
                            live: site.availability.open,
                        },
                    ]}
                />
            )}
            <HeaderSentinel />

            <SelectedWork
                index="02"
                label={text.work.label}
                heading={text.work.heading}
                cta={text.work.cta}
                rowCta={text.work.rowCta}
                projects={selected}
                categoryLabel={projectCategory}
            />

            <ProjectStatement
                index="03"
                label={text.statement.label}
                heading={text.statement.heading}
                body={text.statement.body}
                capabilities={text.statement.capabilities}
            />

            {commerce && (
                <ShopPreview
                    index="04"
                    label={text.shop.label}
                    heading={text.shop.heading}
                    cta={text.shop.cta}
                    fromLabel={copy.shop.from}
                    detailsLabel={copy.shop.viewDetails}
                    products={productSource.featured(3)}
                    categoryLabel={productCategory}
                />
            )}

            <div className="frame">
                <hr className="border-line" />
            </div>

            <AboutPreview
                index={commerce ? '05' : '04'}
                label={text.about.label}
                profile={profile}
                location={site.location}
                capabilitiesTitle={text.about.capabilitiesTitle}
                experienceTitle={text.about.experienceTitle}
                cta={text.about.cta}
            />

            <ContactClosing />
        </PublicLayout>
    );
}
