import { Plus } from 'lucide-react';
import { useId, useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type AccordionItem = {
    id: string;
    title: string;
    content: ReactNode;
};

type AccordionProps = {
    items: AccordionItem[];
    /** Heading level of each trigger, to fit the page outline. */
    headingLevel?: 'h3' | 'h4';
    /** Allow several panels open at once. */
    multiple?: boolean;
    className?: string;
};

/**
 * Disclosure list. The whole row is the button, state is exposed with
 * aria-expanded, and panels stay in the DOM so in-page search finds them.
 */
export function Accordion({
    items,
    headingLevel: Heading = 'h3',
    multiple = false,
    className,
}: AccordionProps) {
    const baseId = useId();
    const [open, setOpen] = useState<string[]>([]);

    const toggle = (id: string) => {
        setOpen((current) => {
            if (current.includes(id)) {
                return current.filter((item) => item !== id);
            }

            return multiple ? [...current, id] : [id];
        });
    };

    return (
        <div className={cn('border-line border-t', className)}>
            {items.map((item) => {
                const expanded = open.includes(item.id);
                const buttonId = `${baseId}-${item.id}-button`;
                const panelId = `${baseId}-${item.id}-panel`;

                return (
                    <div key={item.id} className="border-line border-b">
                        <Heading className="text-base font-medium">
                            <button
                                id={buttonId}
                                type="button"
                                aria-expanded={expanded}
                                aria-controls={panelId}
                                onClick={() => toggle(item.id)}
                                className="group flex min-h-14 w-full items-center justify-between gap-6 py-4 text-left"
                            >
                                <span>{item.title}</span>
                                <Plus
                                    aria-hidden
                                    strokeWidth={1.5}
                                    className={cn(
                                        'ease-emphasized group-hover:text-ink size-5 shrink-0 text-muted transition-transform duration-(--duration-normal)',
                                        expanded && 'text-ink rotate-45',
                                    )}
                                />
                            </button>
                        </Heading>
                        <div
                            id={panelId}
                            role="region"
                            aria-labelledby={buttonId}
                            hidden={!expanded}
                            className="pb-5 text-muted"
                        >
                            <div className="max-w-prose">{item.content}</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
