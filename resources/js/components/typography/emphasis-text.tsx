import { Fragment } from 'react';

/**
 * Renders copy where *words between asterisks* are set in italics, so
 * editors can add emphasis in plain-text content files.
 */
export function EmphasisText({ text }: { text: string }) {
    const parts = text.split('*');

    return (
        <>
            {parts.map((part, index) =>
                index % 2 === 1 ? (
                    <em key={`${index}-${part}`} className="italic">
                        {part}
                    </em>
                ) : (
                    <Fragment key={`${index}-${part}`}>{part}</Fragment>
                ),
            )}
        </>
    );
}

/**
 * Same as EmphasisText, but wraps each word for the hero's entrance
 * stagger. Words stay inline text, so screen readers read one sentence.
 */
export function StaggeredWords({ text }: { text: string }) {
    let index = 0;

    return (
        <>
            {text.split('*').map((part, partIndex) => {
                const words = part.split(/\s+/).filter(Boolean);
                const italic = partIndex % 2 === 1;
                const leading = /^\s/.test(part) && partIndex > 0;

                return (
                    <Fragment key={`${partIndex}-${part}`}>
                        {leading && ' '}
                        {words.map((word, wordIndex) => {
                            const current = index++;

                            return (
                                <Fragment key={`${current}-${word}`}>
                                    <span
                                        className={
                                            italic
                                                ? 'motion-word italic'
                                                : 'motion-word'
                                        }
                                        style={{ '--word-index': current }}
                                    >
                                        {word}
                                    </span>
                                    {wordIndex < words.length - 1 && ' '}
                                </Fragment>
                            );
                        })}
                        {/\s$/.test(part) && ' '}
                    </Fragment>
                );
            })}
        </>
    );
}
