import { Reveal } from '@/components/motion/reveal';
import { SectionLabel } from '@/components/typography/section-label';
import { useReveal } from '@/hooks/use-reveal';
import { indexLabel } from '@/lib/format';

type ProjectStatementProps = {
    index: string;
    label: string;
    heading: string;
    body: string;
    capabilities: readonly string[];
};

/** One statement, one supporting paragraph, one short list. */
export function ProjectStatement({
    index,
    label,
    heading,
    body,
    capabilities,
}: ProjectStatementProps) {
    const tone = useReveal('tone');

    return (
        <section
            ref={tone}
            aria-labelledby="statement-heading"
            className="tone-mist section-space"
        >
            <div className="frame editorial-grid gap-y-10">
                <SectionLabel index={index} className="lg:col-span-2 lg:pt-3">
                    {label}
                </SectionLabel>

                <Reveal className="lg:col-span-9 lg:col-start-3">
                    <h2
                        id="statement-heading"
                        className="type-headline max-w-[24ch]"
                    >
                        {heading}
                    </h2>
                </Reveal>

                <p className="max-w-[42ch] text-muted lg:col-span-4 lg:col-start-3 lg:mt-6">
                    {body}
                </p>

                <ol className="border-ink/20 border-t lg:col-span-4 lg:col-start-8 lg:mt-6">
                    {capabilities.map((capability, position) => (
                        <li
                            key={capability}
                            className="border-ink/20 grid grid-cols-[2.5rem_minmax(0,1fr)] items-baseline border-b py-3"
                        >
                            <span className="type-index text-sm text-muted">
                                {indexLabel(position)}
                            </span>
                            <span>{capability}</span>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
