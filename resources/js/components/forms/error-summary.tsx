import { useCallback } from 'react';

export type FieldErrorEntry = { fieldId: string; message: string };

/**
 * List of form errors shown above the form after a failed submit.
 * Takes focus so screen reader and keyboard users land on it, and each
 * entry links to its field.
 */
export function ErrorSummary({
    title,
    errors,
}: {
    title: string;
    errors: FieldErrorEntry[];
}) {
    const focusRef = useCallback((node: HTMLDivElement | null) => {
        node?.focus();
    }, []);

    if (errors.length === 0) {
        return null;
    }

    return (
        <div
            ref={focusRef}
            tabIndex={-1}
            role="alert"
            className="border-danger grid gap-2 border-l-2 py-1 pl-4 outline-offset-4"
        >
            <p className="font-medium">{title}</p>
            <ul className="grid gap-1 text-sm">
                {errors.map((error) => (
                    <li key={error.fieldId}>
                        <a
                            href={`#${error.fieldId}`}
                            className="link-underline text-danger"
                            onClick={(event) => {
                                event.preventDefault();
                                document.getElementById(error.fieldId)?.focus();
                            }}
                        >
                            {error.message}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
