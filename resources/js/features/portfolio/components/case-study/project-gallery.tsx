import { Media } from '@/components/media/media';
import { MaskReveal } from '@/components/motion/reveal';
import type { ProjectGalleryItem } from '@/features/portfolio/types';
import { cn } from '@/lib/utils';
import type { CaptionedMedia } from '@/types/site';

/**
 * Alternating gallery: full images run to the right edge of the viewport,
 * inset images sit to one side with the caption beside them, pairs share
 * a row. Captions stay next to their image; nothing needs hover.
 */
export function ProjectGallery({ items }: { items: ProjectGalleryItem[] }) {
    return (
        <div className="grid gap-14 lg:gap-24">
            {items.map((item) => {
                if (item.layout === 'pair') {
                    return (
                        <div
                            key={item.id}
                            className="grid gap-8 sm:grid-cols-2 sm:gap-(--gutter)"
                        >
                            {item.images.map((image, index) => (
                                <GalleryFigure
                                    key={image.id}
                                    image={image}
                                    className={cn(index === 1 && 'sm:mt-16')}
                                    sizes="(min-width: 40rem) 36vw, 100vw"
                                />
                            ))}
                        </div>
                    );
                }

                const image = item.images[0];

                if (!image) {
                    return null;
                }

                if (item.layout === 'full') {
                    return (
                        <GalleryFigure
                            key={item.id}
                            image={image}
                            className="bleed-mobile bleed-right"
                            captionClassName="px-(--gutter) lg:px-0"
                            sizes="(min-width: 64rem) 80vw, 100vw"
                        />
                    );
                }

                return (
                    <figure
                        key={item.id}
                        className={cn(
                            'grid gap-4 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:items-end md:gap-(--gutter)',
                            item.layout === 'inset-end' &&
                                'md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]',
                        )}
                    >
                        <div
                            className={cn(
                                item.layout === 'inset-end' && 'md:order-2',
                            )}
                        >
                            <MaskReveal>
                                <Media
                                    asset={image.media}
                                    sizes="(min-width: 48rem) 45vw, 100vw"
                                />
                            </MaskReveal>
                        </div>
                        <figcaption className="border-line max-w-[32ch] border-t pt-3 text-sm text-muted">
                            {image.caption}
                        </figcaption>
                    </figure>
                );
            })}
        </div>
    );
}

function GalleryFigure({
    image,
    className,
    captionClassName,
    sizes,
}: {
    image: CaptionedMedia;
    className?: string;
    captionClassName?: string;
    sizes: string;
}) {
    return (
        <figure className={cn('grid gap-3', className)}>
            <MaskReveal>
                <Media asset={image.media} sizes={sizes} />
            </MaskReveal>
            <figcaption className={cn('text-sm text-muted', captionClassName)}>
                {image.caption}
            </figcaption>
        </figure>
    );
}
