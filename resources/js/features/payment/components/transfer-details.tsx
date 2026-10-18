import { CopyButton } from '@/components/interaction/copy-button';
import { copy } from '@/content/copy';
import { bankAccount } from '@/features/payment/data/bank';
import { formatDateTime, formatMoney, groupDigits } from '@/lib/format';

type TransferDetailsProps = {
    orderNumber: string;
    total: number;
    payBefore: string;
};

/**
 * Everything needed to make the transfer, as a plain list. Numbers that
 * must be typed elsewhere get a copy button.
 */
export function TransferDetails({
    orderNumber,
    total,
    payBefore,
}: TransferDetailsProps) {
    const text = copy.payment;
    const row =
        'grid gap-2 border-b border-line py-4 sm:grid-cols-[11rem_minmax(0,1fr)] sm:items-center';

    return (
        <section aria-labelledby="transfer-heading" className="grid gap-4">
            <h2 id="transfer-heading" className="type-meta text-muted">
                {text.bankHeading}
            </h2>
            <dl className="border-line border-t">
                <div className={row}>
                    <dt className="text-sm text-muted">{text.total}</dt>
                    <dd className="flex flex-wrap items-center justify-between gap-3">
                        <span className="font-display text-3xl tabular-nums">
                            {formatMoney(total)}
                        </span>
                        <CopyButton value={String(total)} label={text.total} />
                    </dd>
                </div>
                <div className={row}>
                    <dt className="text-sm text-muted">{text.bank}</dt>
                    <dd>{bankAccount.bank}</dd>
                </div>
                <div className={row}>
                    <dt className="text-sm text-muted">{text.accountNumber}</dt>
                    <dd className="flex flex-wrap items-center justify-between gap-3">
                        <span className="text-xl tracking-wide tabular-nums">
                            {groupDigits(bankAccount.accountNumber)}
                        </span>
                        <CopyButton
                            value={bankAccount.accountNumber}
                            label={text.accountNumber}
                        />
                    </dd>
                </div>
                <div className={row}>
                    <dt className="text-sm text-muted">{text.accountHolder}</dt>
                    <dd>{bankAccount.accountHolder}</dd>
                </div>
                <div className={row}>
                    <dt className="text-sm text-muted">{text.reference}</dt>
                    <dd className="flex flex-wrap items-center justify-between gap-3">
                        <span className="tabular-nums">{orderNumber}</span>
                        <CopyButton
                            value={orderNumber}
                            label={text.reference}
                        />
                    </dd>
                </div>
                <div className={row}>
                    <dt className="text-sm text-muted">{text.deadline}</dt>
                    <dd>
                        <time dateTime={payBefore}>
                            {formatDateTime(payBefore)}
                        </time>
                    </dd>
                </div>
            </dl>
            <p className="text-sm text-muted">{text.exactAmount}</p>
        </section>
    );
}
