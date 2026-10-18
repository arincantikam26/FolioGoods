import { routes } from '@/app/routing/routes';
import { Reveal } from '@/components/motion/reveal';
import { ButtonLink } from '@/components/primitives/button';
import { CopyButton } from '@/components/interaction/copy-button';
import { SectionLabel } from '@/components/typography/section-label';
import { copy } from '@/content/copy';
import { site } from '@/content/site';

type ContactClosingProps = {
    heading?: string;
    index?: string;
};

/** Closing invitation on an ink surface. Used at the end of most pages. */
export function ContactClosing({
    heading = copy.closing.heading,
    index,
}: ContactClosingProps) {
    return (
        <section
            aria-labelledby="closing-heading"
            className="tone-inverse print-hidden"
        >
            <div className="frame editorial-grid gap-y-12 py-(--space-section)">
                <SectionLabel index={index} className="lg:col-span-12">
                    {copy.closing.label}
                </SectionLabel>

                <Reveal className="lg:col-span-9">
                    <h2
                        id="closing-heading"
                        className="type-headline max-w-[18ch]"
                    >
                        {heading}
                    </h2>
                </Reveal>

                <div className="border-line grid gap-10 border-t pt-8 lg:col-span-12 lg:grid-cols-12 lg:gap-x-(--gutter)">
                    <div className="lg:col-span-4">
                        <ButtonLink
                            href={routes.contact()}
                            arrow
                            size="lg"
                            prefetch
                        >
                            {copy.closing.cta}
                        </ButtonLink>
                    </div>

                    <div className="grid content-start gap-3 lg:col-span-4">
                        <p className="type-meta text-muted">
                            {copy.closing.emailLabel}
                        </p>
                        <a
                            href={`mailto:${site.email}`}
                            className="link-underline w-fit text-lg break-all"
                        >
                            {site.email}
                        </a>
                        <CopyButton
                            value={site.email}
                            label="email address"
                            className="mt-1"
                        />
                    </div>

                    <div className="grid content-start gap-3 lg:col-span-4">
                        <p className="type-meta text-muted">
                            {copy.closing.socialLabel}
                        </p>
                        <ul className="flex flex-wrap gap-x-6 gap-y-1">
                            {site.socials.map((social) => (
                                <li key={social.label}>
                                    <a
                                        href={social.href}
                                        rel="noopener noreferrer"
                                        className="link-underline inline-flex min-h-11 items-center"
                                    >
                                        {social.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
