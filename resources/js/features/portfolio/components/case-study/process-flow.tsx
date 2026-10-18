import type { ProcessStep } from '@/features/portfolio/types';
import { indexLabel } from '@/lib/format';

/**
 * Numbered steps joined by a rule: vertical on small screens, a row of
 * columns on wide ones.
 */
export function ProcessFlow({ steps }: { steps: ProcessStep[] }) {
    return (
        <ol className="grid md:grid-cols-2 md:gap-x-(--gutter) xl:grid-cols-4">
            {steps.map((step, index) => (
                <li
                    key={step.title}
                    className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-x-4 md:grid-cols-1 md:gap-y-3 md:pb-10"
                >
                    <span className="flex flex-col items-center md:flex-row md:gap-3">
                        <span className="type-index border-ink grid size-9 shrink-0 place-items-center rounded-full border text-sm">
                            {indexLabel(index)}
                        </span>
                        {index < steps.length - 1 && (
                            <span
                                aria-hidden
                                className="bg-line-strong my-2 w-px flex-1 md:my-0 md:h-px md:w-auto"
                            />
                        )}
                    </span>
                    <span className="grid content-start gap-1.5 pt-1.5 pb-8 md:p-0">
                        <span className="font-medium">{step.title}</span>
                        <span className="text-sm text-muted">
                            {step.description}
                        </span>
                    </span>
                </li>
            ))}
        </ol>
    );
}
