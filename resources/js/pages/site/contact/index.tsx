import { routes } from '@/app/routing/routes';
import { useQueryParam } from '@/app/routing/navigation';
import { PreviewNotice } from '@/components/feedback/preview-notice';
import { CopyButton } from '@/components/interaction/copy-button';
import { HeaderSentinel } from '@/components/layout/header-sentinel';
import { Breadcrumbs } from '@/components/navigation/breadcrumbs';
import { Seo } from '@/components/seo/seo';
import { copy } from '@/content/copy';
import { site } from '@/content/site';
import { ContactForm } from '@/features/contact/components/contact-form';
import { CONTACT_STATES } from '@/features/contact/types';
import type { ContactState } from '@/features/contact/types';
import { usePreviewState } from '@/hooks/use-preview-state';
import { PublicLayout } from '@/layouts/site/public-layout';

const STATE_LABELS: Record<ContactState, string> = {
    default: 'Default',
    validation: 'Validation error',
    submitting: 'Submitting',
    success: 'Success',
    failed: 'Failed',
    rate_limited: 'Rate limited',
};

export default function ContactPage() {
    const previewState = usePreviewState(CONTACT_STATES, 'default');
    const topic = useQueryParam('topic');
    const text = copy.contact;

    return (
        <PublicLayout>
            <Seo title={text.title} description={text.body} />
            <div className="frame pt-8 lg:pt-14">
                <Breadcrumbs
                    items={[
                        { label: copy.common.home, href: routes.home() },
                        { label: text.title },
                    ]}
                />
            </div>
            <HeaderSentinel />

            <div className="frame editorial-grid gap-y-12 pt-10 pb-(--space-section) lg:pt-16">
                <div className="grid content-start gap-10 lg:col-span-5">
                    <div className="grid gap-6">
                        <h1 className="type-headline max-w-[14ch]">
                            {text.heading}
                        </h1>
                        <p className="type-lede text-muted">{text.body}</p>
                    </div>
                    <div className="border-line grid gap-3 border-t pt-6">
                        <p className="type-meta text-muted">
                            {text.directHeading}
                        </p>
                        <a
                            href={`mailto:${site.email}`}
                            className="link-underline w-fit text-lg break-all"
                        >
                            {site.email}
                        </a>
                        <CopyButton value={site.email} label="email address" />
                        <p className="text-sm text-muted">
                            {site.location} · {site.timezone}
                        </p>
                    </div>
                </div>

                <div className="grid content-start gap-6 lg:col-span-6 lg:col-start-7">
                    <PreviewNotice
                        message={copy.preview.formNotice}
                        states={CONTACT_STATES.map((value) => ({
                            value,
                            label: STATE_LABELS[value],
                        }))}
                        current={previewState}
                    />
                    <ContactForm
                        key={previewState}
                        previewState={previewState}
                        topic={topic}
                    />
                </div>
            </div>
        </PublicLayout>
    );
}
