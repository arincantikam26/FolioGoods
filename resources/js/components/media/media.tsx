import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { cn } from '@/lib/utils';
import type { MediaAsset } from '@/types/site';

type MediaProps = {
    asset: MediaAsset;
    /** Force an aspect ratio (crop). Defaults to the asset's own ratio. */
    ratio?: string;
    /** LCP image: loads eagerly with high priority and skips the fade. */
    priority?: boolean;
    sizes?: string;
    className?: string;
    imgClassName?: string;
    /** Treat as decorative: empty alt (the asset alt is ignored). */
    decorative?: boolean;
};

/**
 * Image wrapper used everywhere on the site. Reserves space with an
 * aspect ratio and a tone colour, fades in once decoded, and is the one
 * place to change when moving to a framework image component.
 */
export function Media({
    asset,
    ratio,
    priority = false,
    sizes = '100vw',
    className,
    imgClassName,
    decorative = false,
}: MediaProps) {
    const image = useRef<HTMLImageElement>(null);
    const [loaded, setLoaded] = useState(priority);
    const [failed, setFailed] = useState(false);

    // Images served from cache can finish before React attaches onLoad.
    useEffect(() => {
        const element = image.current;

        if (element?.complete && element.naturalWidth > 0) {
            setLoaded(true);
        }
    }, []);

    const style: CSSProperties = {
        aspectRatio: ratio ?? `${asset.width} / ${asset.height}`,
        '--media-tone': asset.tone,
    };

    return (
        <div
            className={cn('media-frame', className)}
            style={style}
            data-loaded={loaded || failed ? 'true' : 'false'}
        >
            {failed ? (
                <span className="absolute inset-0 grid place-items-center p-4 text-center text-xs text-muted">
                    {decorative ? '' : asset.alt}
                </span>
            ) : (
                <img
                    ref={image}
                    src={asset.src}
                    srcSet={asset.srcSet}
                    sizes={asset.srcSet ? sizes : undefined}
                    width={asset.width}
                    height={asset.height}
                    alt={decorative ? '' : asset.alt}
                    loading={priority ? 'eager' : 'lazy'}
                    fetchPriority={priority ? 'high' : 'auto'}
                    decoding={priority ? 'sync' : 'async'}
                    onLoad={() => setLoaded(true)}
                    onError={() => setFailed(true)}
                    style={
                        asset.focus
                            ? { objectPosition: asset.focus }
                            : undefined
                    }
                    className={cn('reveal-mask-media', imgClassName)}
                />
            )}
        </div>
    );
}
