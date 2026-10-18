import { routes } from '@/app/routing/routes';
import { StatusNotice } from '@/components/feedback/status-notice';
import { ChoiceGroup } from '@/components/forms/choice-group';
import { ButtonLink } from '@/components/primitives/button';
import { TextLink } from '@/components/primitives/text-link';
import { copy } from '@/content/copy';
import { PriceDisplay } from '@/features/products/components/price-display';
import type { Product, ResolvedLicense } from '@/features/products/types';
import { formatDate, formatMoney } from '@/lib/format';

type PurchaseSummaryProps = {
    product: Product;
    licenses: ResolvedLicense[];
    licenseId: string;
    onLicenseChange: (id: string) => void;
    noun: string;
};

/**
 * Side column with everything needed to decide: price, license, version,
 * requirements and one primary action. A plain column, not a floating card.
 */
export function PurchaseSummary({
    product,
    licenses,
    licenseId,
    onLicenseChange,
    noun,
}: PurchaseSummaryProps) {
    const selected =
        licenses.find((license) => license.id === licenseId) ?? licenses[0];
    const unavailable = product.availability === 'unavailable';

    return (
        <div className="border-ink grid gap-7 border-t-2 pt-6">
            <div className="grid gap-1">
                <p className="type-meta text-muted">{copy.product.price}</p>
                {selected && <PriceDisplay amount={selected.price} size="lg" />}
                <p className="text-sm text-muted">{copy.product.oneTimeNote}</p>
            </div>

            {licenses.length > 1 && (
                <ChoiceGroup
                    legend={copy.product.chooseLicense}
                    name={`license-${product.slug}`}
                    value={selected?.id ?? ''}
                    onChange={onLicenseChange}
                    choices={licenses.map((license) => ({
                        value: license.id,
                        label: license.name,
                        description: license.summary,
                        aside: formatMoney(license.price),
                        disabled: unavailable,
                    }))}
                />
            )}

            {unavailable ? (
                <StatusNotice
                    tone="warning"
                    title={copy.product.unavailableTitle}
                    role="status"
                >
                    {copy.product.unavailableBody}
                </StatusNotice>
            ) : (
                <ButtonLink
                    href={routes.checkout({
                        product: product.slug,
                        license: selected?.id,
                    })}
                    variant="accent"
                    size="lg"
                    arrow
                    className="w-full"
                >
                    {copy.product.primaryCta(noun)}
                </ButtonLink>
            )}

            <div className="grid gap-2">
                {product.links.preview && (
                    <TextLink
                        href={product.links.preview}
                        arrow
                        newTab
                        className="w-fit text-sm"
                    >
                        {copy.product.previewCta}
                    </TextLink>
                )}
                {product.links.documentation && (
                    <TextLink
                        href={product.links.documentation}
                        arrow
                        newTab
                        className="w-fit text-sm"
                    >
                        {copy.product.docsCta}
                    </TextLink>
                )}
            </div>

            <dl className="border-line grid gap-3 border-t pt-5 text-sm">
                <div className="flex justify-between gap-4">
                    <dt className="text-muted">{copy.product.version}</dt>
                    <dd className="text-right">
                        {product.version.number} ·{' '}
                        {copy.product.stages[product.version.stage]}
                    </dd>
                </div>
                <div className="flex justify-between gap-4">
                    <dt className="text-muted">{copy.product.released}</dt>
                    <dd className="text-right">
                        {formatDate(product.version.releasedOn)}
                    </dd>
                </div>
                {product.requirements.slice(0, 3).map((requirement) => (
                    <div
                        key={requirement.label}
                        className="flex justify-between gap-4"
                    >
                        <dt className="text-muted">{requirement.label}</dt>
                        <dd className="text-right">{requirement.value}</dd>
                    </div>
                ))}
                {selected && (
                    <div className="flex justify-between gap-4">
                        <dt className="text-muted">{copy.product.license}</dt>
                        <dd className="text-right">
                            <TextLink href={routes.legal.license()}>
                                {selected.name}
                            </TextLink>
                        </dd>
                    </div>
                )}
            </dl>
        </div>
    );
}
