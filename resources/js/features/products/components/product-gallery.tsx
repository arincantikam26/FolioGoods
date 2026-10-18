import { useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { Media } from '@/components/media/media';
import { copy } from '@/content/copy';
import { cn } from '@/lib/utils';
import type { CaptionedMedia } from '@/types/site';

/**
 * Large preview with a row of thumbnails. Thumbnails are a radio group:
 * arrow keys move between images, the current one is announced, and the
 * caption updates under the main image. No autoplay.
 */
export function ProductGallery({
    images,
    priority = true,
}: {
    images: CaptionedMedia[];
    priority?: boolean;
}) {
    const [index, setIndex] = useState(0);
    const buttons = useRef<(HTMLButtonElement | null)[]>([]);
    const current = images[index] ?? images[0];

    if (!current) {
        return null;
    }

    const select = (next: number) => {
        const wrapped = (next + images.length) % images.length;
        setIndex(wrapped);
        buttons.current[wrapped]?.focus();
    };

    const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
        const moves: Record<string, number> = {
            ArrowRight: index + 1,
            ArrowDown: index + 1,
            ArrowLeft: index - 1,
            ArrowUp: index - 1,
            Home: 0,
            End: images.length - 1,
        };
        const next = moves[event.key];

        if (next !== undefined) {
            event.preventDefault();
            select(next);
        }
    };

    return (
        <figure className="grid gap-4">
            <div className="relative">
                {images.map((image, position) => (
                    <div
                        key={image.id}
                        className={cn(
                            'ease-standard transition-opacity duration-(--duration-normal)',
                            position === index
                                ? 'relative opacity-100'
                                : 'pointer-events-none absolute inset-0 opacity-0',
                        )}
                        aria-hidden={position !== index}
                    >
                        <Media
                            asset={image.media}
                            ratio="4 / 3"
                            priority={priority && position === 0}
                            sizes="(min-width: 64rem) 62vw, 100vw"
                        />
                    </div>
                ))}
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <figcaption aria-live="polite" className="text-sm text-muted">
                    <span className="type-index text-ink mr-2">
                        {index + 1}/{images.length}
                    </span>
                    {current.caption}
                </figcaption>

                {images.length > 1 && (
                    <div
                        role="radiogroup"
                        aria-label={copy.product.galleryControls}
                        className="flex shrink-0 gap-2"
                    >
                        {images.map((image, position) => (
                            <button
                                key={image.id}
                                ref={(node) => {
                                    buttons.current[position] = node;
                                }}
                                type="button"
                                role="radio"
                                aria-checked={position === index}
                                aria-label={`${position + 1} / ${images.length}: ${image.caption}`}
                                tabIndex={position === index ? 0 : -1}
                                onClick={() => setIndex(position)}
                                onKeyDown={onKeyDown}
                                className={cn(
                                    'w-16 border-b-2 pb-1 transition-[border-color,opacity] duration-(--duration-fast) sm:w-20',
                                    position === index
                                        ? 'border-ink'
                                        : 'border-transparent opacity-60 hover:opacity-100',
                                )}
                            >
                                <Media
                                    asset={image.media}
                                    ratio="4 / 3"
                                    sizes="5rem"
                                    decorative
                                />
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </figure>
    );
}
