import { ButtonLink } from '@/components/primitives/button';

type NotFoundStateProps = {
    title: string;
    body: string;
    action: { label: string; href: string };
};

/** Shown in place of a page whose record does not exist (unknown slug). */
export function NotFoundState({ title, body, action }: NotFoundStateProps) {
    return (
        <section className="frame grid min-h-[60dvh] content-center gap-6 py-20">
            <p className="type-meta text-muted">404</p>
            <h1 className="type-headline max-w-[20ch]">{title}</h1>
            <p className="type-lede text-muted">{body}</p>
            <div className="mt-2">
                <ButtonLink href={action.href} arrow>
                    {action.label}
                </ButtonLink>
            </div>
        </section>
    );
}
