import { routes } from '@/app/routing/routes';
import { Media } from '@/components/media/media';
import { MaskReveal } from '@/components/motion/reveal';
import { TextLink } from '@/components/primitives/text-link';
import { SectionLabel } from '@/components/typography/section-label';
import type { Profile } from '@/features/profile/data/profile';

type AboutPreviewProps = {
    index: string;
    label: string;
    profile: Profile;
    location: string;
    capabilitiesTitle: string;
    experienceTitle: string;
    cta: string;
};

/** Portrait (optional), summary, capabilities and experience, then a link. */
export function AboutPreview({
    index,
    label,
    profile,
    location,
    capabilitiesTitle,
    experienceTitle,
    cta,
}: AboutPreviewProps) {
    return (
        <section aria-labelledby="about-heading" className="section-space">
            <div className="frame editorial-grid gap-y-12">
                {profile.portrait && (
                    <figure className="relative lg:col-span-5">
                        <MaskReveal>
                            <Media
                                asset={profile.portrait}
                                ratio="4 / 5"
                                sizes="(min-width: 64rem) 38vw, 100vw"
                                className="max-h-[70svh] lg:max-h-none"
                            />
                        </MaskReveal>
                        <figcaption className="type-meta bg-canvas relative -mt-6 ml-auto w-fit py-3 pl-4 text-muted lg:absolute lg:right-[-3rem] lg:bottom-10 lg:mt-0 lg:px-5">
                            {location}
                        </figcaption>
                    </figure>
                )}

                <div className="grid content-start gap-8 lg:col-span-6 lg:col-start-7 lg:pt-8">
                    <SectionLabel index={index}>{label}</SectionLabel>
                    <h2
                        id="about-heading"
                        className="type-subtitle max-w-[26ch] lg:text-3xl"
                    >
                        {profile.introduction}
                    </h2>
                    <p className="max-w-[48ch] text-muted">{profile.focus}</p>

                    <div className="border-line grid gap-10 border-t pt-8 sm:grid-cols-2 sm:gap-x-(--gutter)">
                        <div className="grid content-start gap-3">
                            <h3 className="type-meta text-muted">
                                {capabilitiesTitle}
                            </h3>
                            <ul className="grid gap-1.5 text-sm">
                                {profile.capabilities.map((capability) => (
                                    <li key={capability}>{capability}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="grid content-start gap-3">
                            <h3 className="type-meta text-muted">
                                {experienceTitle}
                            </h3>
                            <dl className="grid gap-3 text-sm">
                                {profile.experience.map((item) => (
                                    <div key={item.id} className="grid gap-0.5">
                                        <dt className="text-muted tabular-nums">
                                            {item.period}
                                        </dt>
                                        <dd>
                                            {item.role}
                                            <span className="text-muted">
                                                , {item.place}
                                            </span>
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>

                    <TextLink
                        href={routes.about()}
                        arrow
                        prefetch
                        className="w-fit"
                    >
                        {cta}
                    </TextLink>
                </div>
            </div>
        </section>
    );
}
