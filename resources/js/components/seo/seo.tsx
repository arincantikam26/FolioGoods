import { Head } from '@inertiajs/react';
import { pathOf } from '@/app/routing/routes';
import { useCurrentUrl } from '@/app/routing/navigation';
import { site } from '@/content/site';
import { useFolio } from '@/hooks/use-folio';

type SeoProps = {
    title?: string;
    description?: string;
    image?: string;
    type?: 'website' | 'article' | 'product' | 'profile';
    /** Keep transactional and preview pages out of search results. */
    noindex?: boolean;
};

/**
 * Title, description, canonical URL, Open Graph and Twitter card tags.
 * The canonical uses APP_URL plus the current path (query removed).
 */
export function Seo({
    title,
    description = site.seo.description,
    image = site.seo.image,
    type = 'website',
    noindex = false,
}: SeoProps) {
    const { url: origin } = useFolio();
    const path = pathOf(useCurrentUrl());
    const canonical = `${origin}${path}`;
    const fullTitle = title ? `${title} — ${site.name}` : site.name;
    const imageUrl = image.startsWith('http') ? image : `${origin}${image}`;

    return (
        <Head title={title ?? ''}>
            <meta
                head-key="description"
                name="description"
                content={description}
            />
            <link head-key="canonical" rel="canonical" href={canonical} />
            {noindex && (
                <meta
                    head-key="robots"
                    name="robots"
                    content="noindex, nofollow"
                />
            )}
            <meta
                head-key="og:type"
                property="og:type"
                content={type === 'product' ? 'product' : type}
            />
            <meta
                head-key="og:site_name"
                property="og:site_name"
                content={site.name}
            />
            <meta head-key="og:title" property="og:title" content={fullTitle} />
            <meta
                head-key="og:description"
                property="og:description"
                content={description}
            />
            <meta head-key="og:url" property="og:url" content={canonical} />
            <meta head-key="og:image" property="og:image" content={imageUrl} />
            <meta
                head-key="twitter:card"
                name="twitter:card"
                content="summary_large_image"
            />
            <meta
                head-key="twitter:title"
                name="twitter:title"
                content={fullTitle}
            />
            <meta
                head-key="twitter:description"
                name="twitter:description"
                content={description}
            />
            <meta
                head-key="twitter:image"
                name="twitter:image"
                content={imageUrl}
            />
            {site.seo.twitterHandle && (
                <meta
                    head-key="twitter:site"
                    name="twitter:site"
                    content={site.seo.twitterHandle}
                />
            )}
        </Head>
    );
}
