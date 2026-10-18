import { Printer } from 'lucide-react';
import { routes } from '@/app/routing/routes';
import { StatusNotice } from '@/components/feedback/status-notice';
import { HeaderSentinel } from '@/components/layout/header-sentinel';
import { Breadcrumbs } from '@/components/navigation/breadcrumbs';
import { Seo } from '@/components/seo/seo';
import { copy } from '@/content/copy';
import type { LegalDocument } from '@/features/legal/data/documents';
import { useScrollSpy } from '@/hooks/use-scroll-spy';
import { PublicLayout } from '@/layouts/site/public-layout';
import { formatDate } from '@/lib/format';
import { cn } from '@/lib/utils';

/**
 * Long-form document layout for privacy, terms and license pages:
 * contents list, last-updated date, anchored sections, print styles.
 */
export function LegalLayout({ document: doc }: { document: LegalDocument }) {
    const active = useScrollSpy(doc.sections.map((section) => section.id));
    const text = copy.legal;

    return (
        <PublicLayout>
            <Seo title={doc.title} description={doc.summary} />
            <header className="frame pt-8 pb-12 lg:pt-14 lg:pb-16">
                <Breadcrumbs
                    items={[
                        { label: copy.common.home, href: routes.home() },
                        { label: doc.title },
                    ]}
                    className="mb-10 lg:mb-14"
                />
                <div className="editorial-grid items-end gap-y-6">
                    <h1 className="type-headline lg:col-span-7">{doc.title}</h1>
                    <div className="grid gap-3 lg:col-span-4 lg:col-start-9">
                        <p className="text-muted">{doc.summary}</p>
                        <p className="text-sm">
                            {text.updated}:{' '}
                            <time dateTime={doc.updatedOn}>
                                {formatDate(doc.updatedOn)}
                            </time>
                        </p>
                    </div>
                </div>
            </header>
            <HeaderSentinel />

            <div className="frame editorial-grid gap-y-10 pb-(--space-section)">
                <nav
                    aria-label={text.contents}
                    className="print-hidden lg:col-span-3"
                >
                    <details className="group border-line border-y lg:hidden">
                        <summary className="flex min-h-12 cursor-pointer items-center justify-between text-sm font-medium">
                            {text.contents}
                            <span
                                aria-hidden
                                className="transition-transform group-open:rotate-45"
                            >
                                +
                            </span>
                        </summary>
                        <TocList sections={doc.sections} active={active} />
                    </details>
                    <div className="sticky top-[calc(var(--header-height)+2rem)] hidden lg:block">
                        <p className="type-meta mb-4 text-muted">
                            {text.contents}
                        </p>
                        <TocList sections={doc.sections} active={active} />
                        <button
                            type="button"
                            onClick={() => window.print()}
                            className="hover:text-ink mt-8 inline-flex min-h-11 items-center gap-2 text-sm text-muted"
                        >
                            <Printer
                                aria-hidden
                                className="size-4"
                                strokeWidth={1.6}
                            />
                            {text.print}
                        </button>
                    </div>
                </nav>

                <article className="grid gap-12 lg:col-span-7 lg:col-start-5">
                    {!doc.reviewed && (
                        <StatusNotice
                            tone="warning"
                            title={text.placeholder}
                            role="none"
                        >
                            {text.placeholderBody}
                        </StatusNotice>
                    )}
                    {doc.sections.map((section, index) => (
                        <section
                            key={section.id}
                            id={section.id}
                            aria-labelledby={`${section.id}-heading`}
                            className="prose-editorial scroll-mt-[calc(var(--header-height)+2rem)]"
                        >
                            <h2
                                id={`${section.id}-heading`}
                                className="group type-subtitle mt-0! flex items-baseline gap-3"
                            >
                                <span className="type-index text-base text-muted">
                                    {index + 1}.
                                </span>
                                <span>{section.heading}</span>
                                <a
                                    href={`#${section.id}`}
                                    className="print-hidden text-base text-muted no-underline! opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
                                    aria-label={`Link to ${section.heading}`}
                                >
                                    #
                                </a>
                            </h2>
                            {section.body.map((paragraph) => (
                                <p key={paragraph}>{paragraph}</p>
                            ))}
                            {section.list && (
                                <ul>
                                    {section.list.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            )}
                        </section>
                    ))}
                </article>
            </div>
        </PublicLayout>
    );
}

function TocList({
    sections,
    active,
}: {
    sections: LegalDocument['sections'];
    active: string | null;
}) {
    return (
        <ol className="lg:border-line grid pb-3 lg:border-l lg:pb-0">
            {sections.map((section) => (
                <li key={section.id}>
                    <a
                        href={`#${section.id}`}
                        aria-current={
                            active === section.id ? 'location' : undefined
                        }
                        className={cn(
                            'flex min-h-10 items-center text-sm lg:-ml-px lg:border-l lg:pl-4',
                            active === section.id
                                ? 'text-ink lg:border-accent-secondary'
                                : 'hover:text-ink text-muted lg:border-transparent',
                        )}
                    >
                        {section.heading}
                    </a>
                </li>
            ))}
        </ol>
    );
}
