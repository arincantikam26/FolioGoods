import { routes } from '@/app/routing/routes';
import { ButtonLink } from '@/components/primitives/button';
import { TextLink } from '@/components/primitives/text-link';
import { Seo } from '@/components/seo/seo';
import { copy } from '@/content/copy';
import { PublicLayout } from '@/layouts/site/public-layout';

type ErrorStatus = 403 | 404 | 500 | 503;

const KNOWN: ErrorStatus[] = [403, 404, 500, 503];

export default function ErrorPage({ status }: { status: number }) {
    const code: ErrorStatus = KNOWN.find((known) => known === status) ?? 500;
    const text = copy.errors[code];

    return (
        <PublicLayout>
            <Seo title={text.title} noindex />
            <section className="frame grid min-h-[70dvh] content-center gap-10 py-20 lg:grid-cols-12 lg:gap-x-(--gutter)">
                <p
                    aria-hidden
                    className="type-index text-accent-secondary text-[clamp(5rem,3rem+12vw,13rem)] leading-none lg:col-span-5"
                >
                    {code}
                </p>
                <div className="grid content-end gap-6 lg:col-span-6 lg:col-start-7">
                    <p className="type-meta text-muted">
                        {copy.errors.code} {code}
                    </p>
                    <h1 className="type-headline">{text.title}</h1>
                    <p className="type-lede text-muted">{text.body}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-x-8 gap-y-4">
                        <ButtonLink href={routes.home()}>
                            {copy.errors.home}
                        </ButtonLink>
                        <TextLink href={routes.work.index()} arrow>
                            {copy.errors.work}
                        </TextLink>
                        <TextLink href={routes.contact()}>
                            {copy.errors.contact}
                        </TextLink>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
