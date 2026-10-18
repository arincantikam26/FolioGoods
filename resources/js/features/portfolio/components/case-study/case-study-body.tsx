import { Paragraphs } from '@/components/typography/paragraphs';
import { copy } from '@/content/copy';
import {
    CaseChapter,
    PullQuote,
    RuledList,
} from '@/features/portfolio/components/case-study/case-chapter';
import {
    ChapterMenu,
    ChapterRail,
} from '@/features/portfolio/components/case-study/chapter-nav';
import { ProcessFlow } from '@/features/portfolio/components/case-study/process-flow';
import { ProjectGallery } from '@/features/portfolio/components/case-study/project-gallery';
import type { CaseStudyChapter, Project } from '@/features/portfolio/types';
import { useScrollSpy } from '@/hooks/use-scroll-spy';
import { indexLabel } from '@/lib/format';

type CaseStudyBodyProps = {
    project: Project;
    chapters: CaseStudyChapter[];
};

/**
 * The chapters of a case study in a reading column, with the chapter rail
 * beside them on wide screens and a compact menu above them on small ones.
 */
export function CaseStudyBody({ project, chapters }: CaseStudyBodyProps) {
    const active = useScrollSpy(chapters.map((chapter) => chapter.id));
    const study = project.caseStudy;
    const position = (id: string) =>
        indexLabel(
            Math.max(
                chapters.findIndex((c) => c.id === id),
                0,
            ),
        );
    const label = (id: string) =>
        chapters.find((chapter) => chapter.id === id)?.label ?? id;

    const chapter = (id: string) => ({
        id,
        index: position(id),
        title: label(id),
    });

    return (
        <>
            <ChapterMenu chapters={chapters} activeId={active} />

            <div className="frame editorial-grid pt-12 lg:pt-20">
                <aside className="hidden lg:col-span-2 lg:block">
                    <ChapterRail chapters={chapters} activeId={active} />
                </aside>

                <div className="min-w-0 lg:col-span-9 lg:col-start-4">
                    <CaseChapter {...chapter('overview')}>
                        <p className="type-subtitle max-w-[34ch]">
                            {project.summary}
                        </p>
                        <dl
                            aria-label={copy.caseStudy.facts}
                            className="border-line mt-10 grid gap-x-(--gutter) gap-y-6 border-t pt-6 sm:grid-cols-2"
                        >
                            {study.facts.map((fact) => (
                                <div key={fact.label} className="grid gap-1">
                                    <dt className="type-meta text-muted">
                                        {fact.label}
                                    </dt>
                                    <dd>{fact.value}</dd>
                                </div>
                            ))}
                        </dl>
                    </CaseChapter>

                    <CaseChapter {...chapter('background')}>
                        <Paragraphs items={study.background} />
                    </CaseChapter>

                    <CaseChapter {...chapter('problem')}>
                        <Paragraphs items={study.problem.body} />
                        {study.problem.quote && (
                            <PullQuote
                                text={study.problem.quote.text}
                                source={study.problem.quote.source}
                            />
                        )}
                    </CaseChapter>

                    <CaseChapter {...chapter('role')}>
                        <div className="grid gap-10 xl:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] xl:gap-(--gutter)">
                            <Paragraphs items={study.role.body} />
                            <RuledList
                                title={copy.caseStudy.contributions}
                                items={study.role.contributions}
                            />
                        </div>
                    </CaseChapter>

                    <CaseChapter {...chapter('approach')}>
                        <Paragraphs items={study.approach} />
                    </CaseChapter>

                    <CaseChapter {...chapter('process')}>
                        <ProcessFlow steps={study.process} />
                    </CaseChapter>

                    <CaseChapter {...chapter('gallery')}>
                        <ProjectGallery items={study.gallery} />
                    </CaseChapter>

                    <CaseChapter {...chapter('challenges')}>
                        <ol className="grid gap-10">
                            {study.challenges.map((challenge, index) => (
                                <li
                                    key={challenge.title}
                                    className="grid gap-2 sm:grid-cols-[3rem_minmax(0,1fr)]"
                                >
                                    <span className="type-index text-muted">
                                        {indexLabel(index)}
                                    </span>
                                    <div className="prose-editorial">
                                        <h3 className="mt-0!">
                                            {challenge.title}
                                        </h3>
                                        <p className="text-muted">
                                            {challenge.body}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </CaseChapter>

                    <CaseChapter {...chapter('outcome')}>
                        <Paragraphs items={study.outcome.body} />
                        <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-(--gutter)">
                            <RuledList
                                title={copy.caseStudy.results}
                                items={study.outcome.results}
                            />
                            <RuledList
                                title={copy.caseStudy.learnings}
                                items={study.outcome.learnings}
                            />
                        </div>
                    </CaseChapter>
                </div>
            </div>
        </>
    );
}
