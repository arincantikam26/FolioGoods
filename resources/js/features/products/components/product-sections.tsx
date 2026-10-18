import type { ReactNode } from 'react';
import { routes } from '@/app/routing/routes';
import { Media } from '@/components/media/media';
import { MaskReveal } from '@/components/motion/reveal';
import { Accordion } from '@/components/interaction/accordion';
import { TextLink } from '@/components/primitives/text-link';
import { Paragraphs } from '@/components/typography/paragraphs';
import { copy } from '@/content/copy';
import type {
    ChangelogEntry,
    PackageItem,
    ProductFeature,
    ProductRequirement,
    ResolvedLicense,
    SourceNode,
    SupportScope,
} from '@/features/products/types';
import { formatDate, formatMoney } from '@/lib/format';
import { cn } from '@/lib/utils';
import type { FaqItem } from '@/types/site';

/** Section shell used down the product page: ruled top, label, content. */
export function ProductSection({
    id,
    title,
    children,
}: {
    id: string;
    title: string;
    children: ReactNode;
}) {
    return (
        <section
            id={id}
            aria-labelledby={`${id}-heading`}
            className="border-line scroll-mt-28 border-t pt-6 pb-14 lg:pb-20"
        >
            <h2 id={`${id}-heading`} className="type-meta mb-8 text-muted">
                {title}
            </h2>
            {children}
        </section>
    );
}

export function ProductOverview({ summary }: { summary: string[] }) {
    const [lead, ...rest] = summary;

    return (
        <div className="grid gap-6">
            {lead && <p className="type-subtitle max-w-[32ch]">{lead}</p>}
            {rest.length > 0 && (
                <Paragraphs items={rest} className="text-muted" />
            )}
        </div>
    );
}

export function PackageContents({ items }: { items: PackageItem[] }) {
    return (
        <dl className="grid sm:grid-cols-2 sm:gap-x-(--gutter)">
            {items.map((item) => (
                <div
                    key={item.title}
                    className="border-line grid gap-1 border-b py-4"
                >
                    <dt className="font-medium">{item.title}</dt>
                    <dd className="text-sm text-muted">{item.detail}</dd>
                </div>
            ))}
        </dl>
    );
}

export function AudienceFit({
    suits,
    notSuited,
}: {
    suits: string[];
    notSuited: string[];
}) {
    return (
        <div className="grid gap-10 sm:grid-cols-2 sm:gap-(--gutter)">
            <MarkedList
                title={copy.product.sections.suits}
                items={suits}
                mark="+"
            />
            <MarkedList
                title={copy.product.sections.notSuited}
                items={notSuited}
                mark="–"
            />
        </div>
    );
}

export function RequirementsTable({
    requirements,
    compatibility,
}: {
    requirements: ProductRequirement[];
    compatibility: string[];
}) {
    return (
        <dl className="grid text-sm">
            {requirements.map((requirement) => (
                <div
                    key={requirement.label}
                    className="border-line grid gap-1 border-b py-3 sm:grid-cols-[12rem_minmax(0,1fr)]"
                >
                    <dt className="text-muted">{requirement.label}</dt>
                    <dd>{requirement.value}</dd>
                </div>
            ))}
            <div className="border-line grid gap-1 border-b py-3 sm:grid-cols-[12rem_minmax(0,1fr)]">
                <dt className="text-muted">{copy.product.compatibility}</dt>
                <dd>{compatibility.join(', ')}</dd>
            </div>
        </dl>
    );
}

export function FeatureWalkthrough({
    features,
}: {
    features: ProductFeature[];
}) {
    return (
        <ol className="grid gap-14">
            {features.map((feature, index) => (
                <li
                    key={feature.id}
                    className="grid gap-5 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:items-center md:gap-(--gutter)"
                >
                    <div className={cn(index % 2 === 1 && 'md:order-2')}>
                        <MaskReveal>
                            <Media
                                asset={feature.media}
                                sizes="(min-width: 64rem) 38vw, 100vw"
                            />
                        </MaskReveal>
                    </div>
                    <div className="grid gap-2">
                        <span className="type-index text-accent-secondary-ink">
                            {String(index + 1).padStart(2, '0')}
                        </span>
                        <h3 className="type-subtitle">{feature.title}</h3>
                        <p className="text-muted">{feature.body}</p>
                    </div>
                </li>
            ))}
        </ol>
    );
}

/** Folder structure drawn with rules, readable without a code font. */
export function SourceTree({ nodes }: { nodes: SourceNode[] }) {
    const render = (items: SourceNode[], depth: number): ReactNode => (
        <ul
            className={cn(
                'grid',
                depth > 0 && 'border-line ml-3 border-l pl-4',
            )}
        >
            {items.map((node) => (
                <li key={`${depth}-${node.name}`} className="py-1">
                    <span className="font-mono text-sm">{node.name}</span>
                    {node.note && (
                        <span className="ml-3 text-sm text-muted">
                            {node.note}
                        </span>
                    )}
                    {node.children && render(node.children, depth + 1)}
                </li>
            ))}
        </ul>
    );

    return (
        <div className="bg-surface overflow-x-auto p-5">{render(nodes, 0)}</div>
    );
}

export function LicenseSummary({ licenses }: { licenses: ResolvedLicense[] }) {
    return (
        <div className="grid gap-8">
            <div className="grid gap-10 sm:grid-cols-2 sm:gap-(--gutter)">
                {licenses.map((license) => (
                    <div key={license.id} className="grid content-start gap-3">
                        <h3 className="border-ink flex items-baseline justify-between gap-4 border-b pb-2">
                            <span className="type-subtitle">
                                {license.name}
                            </span>
                            <span className="text-sm tabular-nums">
                                {formatMoney(license.price)}
                            </span>
                        </h3>
                        <p className="text-sm text-muted">{license.summary}</p>
                        <ul className="grid gap-1.5 text-sm">
                            {license.permits.map((item) => (
                                <li
                                    key={item}
                                    className="grid grid-cols-[1.25rem_minmax(0,1fr)]"
                                >
                                    <span aria-hidden>+</span>
                                    {item}
                                </li>
                            ))}
                            {license.limits.map((item) => (
                                <li
                                    key={item}
                                    className="grid grid-cols-[1.25rem_minmax(0,1fr)] text-muted"
                                >
                                    <span aria-hidden>–</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <TextLink
                href={routes.legal.license()}
                arrow
                className="w-fit text-sm"
            >
                {copy.shop.licenseNoteCta}
            </TextLink>
        </div>
    );
}

export function Changelog({ entries }: { entries: ChangelogEntry[] }) {
    return (
        <ol className="grid">
            {entries.map((entry) => (
                <li
                    key={entry.version}
                    className="border-line grid gap-2 border-b py-4 sm:grid-cols-[8rem_minmax(0,1fr)]"
                >
                    <div className="grid gap-0.5">
                        <span className="font-medium tabular-nums">
                            {entry.version}
                        </span>
                        <time
                            dateTime={entry.date}
                            className="text-xs text-muted"
                        >
                            {formatDate(entry.date)}
                        </time>
                    </div>
                    <ul className="grid gap-1 text-sm text-muted">
                        {entry.changes.map((change) => (
                            <li key={change}>{change}</li>
                        ))}
                    </ul>
                </li>
            ))}
        </ol>
    );
}

export function SupportScopeList({ support }: { support: SupportScope }) {
    return (
        <div className="grid gap-8">
            <p className="text-sm">
                {support.window}. {support.channel}.
            </p>
            <div className="grid gap-10 sm:grid-cols-2 sm:gap-(--gutter)">
                <MarkedList
                    title={copy.product.supportIncluded}
                    items={support.included}
                    mark="+"
                />
                <MarkedList
                    title={copy.product.supportExcluded}
                    items={support.excluded}
                    mark="–"
                />
            </div>
        </div>
    );
}

function MarkedList({
    title,
    items,
    mark,
}: {
    title: string;
    items: string[];
    mark: string;
}) {
    return (
        <div className="grid content-start gap-3">
            <h3 className="font-medium">{title}</h3>
            <ul className="grid gap-2 text-sm text-muted">
                {items.map((item) => (
                    <li
                        key={item}
                        className="grid grid-cols-[1.25rem_minmax(0,1fr)]"
                    >
                        <span aria-hidden className="text-ink">
                            {mark}
                        </span>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export function ProductFaq({ items }: { items: FaqItem[] }) {
    return (
        <Accordion
            items={items.map((faq) => ({
                id: faq.id,
                title: faq.question,
                content: <p>{faq.answer}</p>,
            }))}
        />
    );
}
