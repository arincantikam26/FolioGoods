import { routes } from '@/app/routing/routes';
import { Media } from '@/components/media/media';
import { Breadcrumbs } from '@/components/navigation/breadcrumbs';
import { DownloadLink } from '@/components/primitives/download-link';
import { ButtonLink } from '@/components/primitives/button';
import { Paragraphs } from '@/components/typography/paragraphs';
import { SectionLabel } from '@/components/typography/section-label';
import { copy } from '@/content/copy';
import type { Profile } from '@/features/profile/data/profile';
import { indexLabel } from '@/lib/format';

export function AboutIntro({
    profile,
    location,
}: {
    profile: Profile;
    location: string;
}) {
    return (
        <header className="frame pt-8 pb-16 lg:pt-14 lg:pb-24">
            <Breadcrumbs
                items={[
                    { label: copy.common.home, href: routes.home() },
                    { label: copy.about.title },
                ]}
                className="mb-10 lg:mb-16"
            />
            <div className="editorial-grid items-end gap-y-10">
                <div className="grid gap-8 lg:col-span-7">
                    <SectionLabel index="01">{copy.about.title}</SectionLabel>
                    <h1 className="type-headline max-w-[20ch]">
                        {profile.introduction}
                    </h1>
                    <p className="type-lede text-muted">{profile.focus}</p>
                </div>
                {profile.portrait && (
                    <figure className="relative lg:col-span-4 lg:col-start-9">
                        <div className="motion-load-mask">
                            <Media
                                asset={profile.portrait}
                                ratio="4 / 5"
                                priority
                                sizes="(min-width: 64rem) 30vw, 100vw"
                            />
                        </div>
                        <figcaption className="type-meta mt-3 text-muted">
                            {location}
                        </figcaption>
                    </figure>
                )}
            </div>
        </header>
    );
}

export function AboutBiography({ biography }: { biography: string[] }) {
    return (
        <section
            aria-labelledby="bio-heading"
            className="frame editorial-grid border-line gap-y-6 border-t pt-8 pb-(--space-section)"
        >
            <h2 id="bio-heading" className="type-meta text-muted lg:col-span-3">
                {copy.about.biography}
            </h2>
            <Paragraphs
                items={biography}
                className="text-lg lg:col-span-6 lg:col-start-4"
            />
        </section>
    );
}

export function AboutExperience({ profile }: { profile: Profile }) {
    return (
        <section
            aria-labelledby="experience-heading"
            className="frame editorial-grid gap-y-8 pb-(--space-section)"
        >
            <h2 id="experience-heading" className="type-title lg:col-span-3">
                {copy.home.about.experienceTitle}
            </h2>
            <ol className="border-line border-t lg:col-span-9 lg:col-start-4">
                {profile.experience.map((item) => (
                    <li
                        key={item.id}
                        className="border-line grid gap-1 border-b py-5 md:grid-cols-[9rem_minmax(0,1fr)_minmax(0,1fr)] md:gap-(--gutter)"
                    >
                        <p className="text-sm text-muted tabular-nums">
                            {item.period}
                        </p>
                        <p>
                            <span className="font-medium">{item.role}</span>
                            <span className="text-muted">, {item.place}</span>
                        </p>
                        <p className="text-sm text-muted">{item.note}</p>
                    </li>
                ))}
            </ol>
        </section>
    );
}

export function AboutCapabilities({ profile }: { profile: Profile }) {
    return (
        <section
            aria-labelledby="capabilities-heading"
            className="tone-mist py-(--space-section)"
        >
            <div className="frame editorial-grid gap-y-10">
                <h2
                    id="capabilities-heading"
                    className="type-title lg:col-span-3"
                >
                    {copy.home.about.capabilitiesTitle}
                </h2>
                <ul className="border-ink/20 grid content-start gap-0 border-t lg:col-span-4 lg:col-start-4">
                    {profile.capabilities.map((capability) => (
                        <li
                            key={capability}
                            className="border-ink/20 border-b py-3"
                        >
                            {capability}
                        </li>
                    ))}
                </ul>
                <div className="grid content-start gap-8 lg:col-span-4 lg:col-start-9">
                    <h3 className="type-meta text-muted">{copy.about.tools}</h3>
                    <dl className="grid gap-5">
                        {profile.tools.map((group) => (
                            <div key={group.id} className="grid gap-1">
                                <dt className="text-sm font-medium">
                                    {group.label}
                                </dt>
                                <dd className="text-sm text-muted">
                                    {group.items.join(', ')}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </section>
    );
}

export function AboutPrinciples({ profile }: { profile: Profile }) {
    return (
        <section
            aria-labelledby="principles-heading"
            className="frame editorial-grid gap-y-10 py-(--space-section)"
        >
            <h2 id="principles-heading" className="type-title lg:col-span-3">
                {copy.about.principles}
            </h2>
            <ol className="grid gap-12 lg:col-span-8 lg:col-start-4">
                {profile.principles.map((principle, index) => (
                    <li
                        key={principle.id}
                        className="grid gap-3 sm:grid-cols-[5rem_minmax(0,1fr)]"
                    >
                        <span className="type-index text-accent-secondary text-4xl leading-none">
                            {indexLabel(index)}
                        </span>
                        <div className="grid gap-2">
                            <h3 className="type-subtitle">{principle.title}</h3>
                            <p className="max-w-[52ch] text-muted">
                                {principle.body}
                            </p>
                        </div>
                    </li>
                ))}
            </ol>
        </section>
    );
}

type AvailabilityProps = {
    profile: Profile;
    availability: { open: boolean; label: string };
};

export function AboutAvailability({
    profile,
    availability,
}: AvailabilityProps) {
    return (
        <section
            aria-labelledby="availability-heading"
            className="frame pb-(--space-section)"
        >
            <div className="border-line flex flex-col gap-6 border-y py-8 md:flex-row md:items-center md:justify-between">
                <div className="grid gap-1">
                    <h2
                        id="availability-heading"
                        className="type-meta text-muted"
                    >
                        {copy.about.availability}
                    </h2>
                    <p className="flex items-center gap-3 text-lg">
                        <span
                            aria-hidden
                            className={
                                availability.open
                                    ? 'bg-success size-2 rounded-full'
                                    : 'bg-line-strong size-2 rounded-full'
                            }
                        />
                        {availability.label}
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                    {profile.cv && (
                        <DownloadLink
                            href={profile.cv.href}
                            label={profile.cv.label}
                            detail={profile.cv.size}
                        />
                    )}
                    <ButtonLink href={routes.contact()} arrow>
                        {copy.closing.cta}
                    </ButtonLink>
                </div>
            </div>
        </section>
    );
}
