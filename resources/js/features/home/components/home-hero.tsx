import { useRef } from 'react';
import { siteConfig } from '@/app/configuration/site-config';
import { AppLink } from '@/app/routing/app-link';
import { routes } from '@/app/routing/routes';
import { Media } from '@/components/media/media';
import { ButtonLink } from '@/components/primitives/button';
import { TextLink } from '@/components/primitives/text-link';
import { StaggeredWords } from '@/components/typography/emphasis-text';
import type { Project } from '@/features/portfolio/types';
import { usePointerShift } from '@/hooks/use-pointer-shift';
import { useScrollShift } from '@/hooks/use-scroll-shift';

type HomeHeroProps = {
    eyebrow: string;
    headline: string;
    body: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string } | null;
    mediaLabel: string;
    mediaCta: string;
    /** The project whose cover anchors the hero. */
    project: Project;
    categoryLabel: string;
    meta: { label: string; value: string; live?: boolean }[];
};

/**
 * Editorial canvas: statement on the left, one large piece of work on the
 * right, a rule that leads from the eyebrow to the work, and a metadata line.
 */
export function HomeHero({
    eyebrow,
    headline,
    body,
    primaryCta,
    secondaryCta,
    mediaLabel,
    mediaCta,
    project,
    categoryLabel,
    meta,
}: HomeHeroProps) {
    const area = useRef<HTMLElement>(null);
    const pointerTarget = useRef<HTMLDivElement>(null);
    const mediaLayer = useRef<HTMLDivElement>(null);
    const captionLayer = useRef<HTMLParagraphElement>(null);

    usePointerShift(area, pointerTarget, siteConfig.motion.pointerShift);
    useScrollShift(area, [
        { ref: mediaLayer, factor: -0.06 },
        { ref: captionLayer, factor: 0.05 },
    ]);

    return (
        <section
            ref={area}
            aria-labelledby="hero-title"
            className="relative pt-4 pb-14 lg:pt-8 lg:pb-20"
        >
            <div className="frame editorial-grid gap-y-8 lg:grid-rows-[auto_auto_auto_1fr] lg:gap-y-0">
                {/* Eyebrow and directional rule toward the work. */}
                <div className="motion-fade-in flex flex-wrap items-center gap-x-4 gap-y-2 lg:col-span-12 lg:col-start-1">
                    <p className="type-meta flex items-baseline gap-3">
                        <span className="type-index text-accent-secondary-ink text-sm normal-case">
                            (01)
                        </span>
                        {eyebrow}
                    </p>
                    <span
                        aria-hidden
                        className="bg-line-strong/60 hidden h-px min-w-12 flex-1 sm:block"
                    />
                    <AppLink
                        href={routes.work.show(project.slug)}
                        className="type-meta group hover:text-ink inline-flex min-h-11 items-center gap-2 text-muted"
                    >
                        <span
                            aria-hidden
                            className="bg-accent-secondary size-1.5"
                        />
                        <span>
                            {mediaLabel}:{' '}
                            <span className="text-ink">{project.title}</span>
                        </span>
                    </AppLink>
                </div>

                <h1
                    id="hero-title"
                    className="type-display motion-words relative z-[2] max-w-[15ch] pt-6 lg:col-span-8 lg:col-start-1 lg:row-start-2 lg:pt-14 lg:pb-10"
                >
                    <StaggeredWords text={headline} />
                </h1>

                <div className="motion-fade-in grid content-start gap-8 [--fade-delay:240ms] lg:col-span-5 lg:col-start-1 lg:row-start-3 lg:pt-2">
                    <p className="type-lede max-w-[34ch] text-muted">{body}</p>
                    <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                        <ButtonLink href={primaryCta.href} arrow prefetch>
                            {primaryCta.label}
                        </ButtonLink>
                        {secondaryCta && (
                            <TextLink href={secondaryCta.href} prefetch>
                                {secondaryCta.label}
                            </TextLink>
                        )}
                    </div>
                </div>
                <figure className="relative mt-4 lg:col-span-6 lg:col-start-6 lg:row-span-3 lg:row-start-2 lg:mt-36">
                    <div ref={mediaLayer} className="scroll-shift">
                        <div ref={pointerTarget} className="pointer-shift">
                            <div className="motion-load-mask -mx-(--gutter) sm:mx-0">
                                <Media
                                    asset={project.cover}
                                    priority
                                    ratio="4 / 5"
                                    sizes="(min-width: 64rem) 46vw, 100vw"
                                    className="max-h-[78svh] w-full lg:max-h-none"
                                />
                            </div>
                        </div>
                    </div>
                    <figcaption>
                        <p
                            ref={captionLayer}
                            className="scroll-shift mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 text-sm lg:mt-5"
                        >
                            <span>
                                <span className="font-display text-lg italic">
                                    {project.title}
                                </span>
                                <span className="text-muted">
                                    {' '}
                                    — {categoryLabel}, {project.year}
                                </span>
                            </span>
                            <TextLink
                                href={routes.work.show(project.slug)}
                                arrow
                                className="text-sm"
                            >
                                {mediaCta}
                            </TextLink>
                        </p>
                    </figcaption>
                </figure>
            </div>

            <div className="frame mt-14 lg:mt-20">
                <dl className="border-line grid gap-x-(--gutter) gap-y-4 border-t pt-5 sm:grid-cols-3">
                    {meta.map((item) => (
                        <div key={item.label} className="grid gap-1">
                            <dt className="type-meta text-muted">
                                {item.label}
                            </dt>
                            <dd className="flex items-center gap-2 text-sm">
                                {item.live && (
                                    <span
                                        aria-hidden
                                        className="relative flex size-2"
                                    >
                                        <span className="bg-success size-2 rounded-full" />
                                    </span>
                                )}
                                {item.value}
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
}
