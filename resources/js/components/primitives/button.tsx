import { ArrowRight } from 'lucide-react';
import type { ComponentPropsWithoutRef, ReactNode, Ref } from 'react';
import { AppLink } from '@/app/routing/app-link';
import type { AppLinkProps } from '@/app/routing/app-link';
import { Spinner } from '@/components/primitives/spinner';
import { cn } from '@/lib/utils';

export type ButtonVariant = 'primary' | 'accent' | 'secondary';
export type ButtonSize = 'sm' | 'md' | 'lg';

const base =
    'inline-flex items-center justify-center gap-2.5 rounded-xs font-medium tracking-[0.01em] whitespace-nowrap select-none transition-[background-color,color,border-color,box-shadow] duration-(--duration-fast) ease-standard active:translate-y-px disabled:pointer-events-none aria-disabled:pointer-events-none';

const variants: Record<ButtonVariant, string> = {
    // Default call to action.
    primary:
        'bg-ink text-on-ink hover:bg-accent-ink disabled:bg-line-strong aria-disabled:bg-line-strong',
    // Reserved for the single most important action on a page (purchase, pay).
    accent: 'bg-accent text-on-accent hover:bg-accent-ink disabled:bg-line-strong aria-disabled:bg-line-strong',
    secondary:
        'border border-line-strong bg-transparent text-ink hover:border-ink hover:bg-ink/4 disabled:text-muted',
};

const sizes: Record<ButtonSize, string> = {
    sm: 'min-h-11 px-4 text-sm',
    md: 'min-h-12 px-6 text-sm',
    lg: 'min-h-14 px-7 text-base',
};

export function buttonClasses(
    variant: ButtonVariant = 'primary',
    size: ButtonSize = 'md',
    className?: string,
) {
    return cn(base, variants[variant], sizes[size], className);
}

type CommonProps = {
    variant?: ButtonVariant;
    size?: ButtonSize;
    /** Adds a trailing arrow that nudges forward on hover. */
    arrow?: boolean;
    children: ReactNode;
};

type ButtonProps = CommonProps &
    ComponentPropsWithoutRef<'button'> & {
        loading?: boolean;
        /** Announced and shown while loading, e.g. "Preparing checkout". */
        loadingLabel?: string;
        ref?: Ref<HTMLButtonElement>;
    };

export function Button({
    variant,
    size,
    arrow = false,
    loading = false,
    loadingLabel,
    className,
    children,
    disabled,
    type = 'button',
    ...props
}: ButtonProps) {
    return (
        <button
            type={type}
            className={buttonClasses(variant, size, className)}
            disabled={disabled || loading}
            aria-busy={loading || undefined}
            {...props}
        >
            {loading ? (
                <>
                    <Spinner className="size-4" />
                    <span>{loadingLabel ?? children}</span>
                </>
            ) : (
                <>
                    <span className="inline-flex items-center gap-2">
                        {children}
                    </span>
                    {arrow && (
                        <ArrowRight
                            aria-hidden
                            className="link-arrow size-4"
                            strokeWidth={1.6}
                        />
                    )}
                </>
            )}
        </button>
    );
}

type ButtonLinkProps = CommonProps & AppLinkProps;

export function ButtonLink({
    variant,
    size,
    arrow = false,
    className,
    children,
    ...props
}: ButtonLinkProps) {
    return (
        <AppLink className={buttonClasses(variant, size, className)} {...props}>
            <span className="inline-flex items-center gap-2">{children}</span>
            {arrow && (
                <ArrowRight
                    aria-hidden
                    className="link-arrow size-4"
                    strokeWidth={1.6}
                />
            )}
        </AppLink>
    );
}
