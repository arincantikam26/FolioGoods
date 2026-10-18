import { Download } from 'lucide-react';
import { cn } from '@/lib/utils';

type DownloadLinkProps = {
    href: string;
    label: string;
    /** File size or format, shown muted after the label, e.g. "PDF, 120 KB". */
    detail?: string;
    className?: string;
};

/**
 * A file download. Always a plain anchor: router links would try to visit
 * the file as a page.
 */
export function DownloadLink({
    href,
    label,
    detail,
    className,
}: DownloadLinkProps) {
    return (
        <a
            href={href}
            download
            className={cn(
                'link-underline inline-flex min-h-11 items-center gap-2 text-sm font-medium',
                className,
            )}
        >
            <Download aria-hidden className="size-4" strokeWidth={1.6} />
            <span>{label}</span>
            {detail && (
                <span className="font-normal text-muted">({detail})</span>
            )}
        </a>
    );
}
