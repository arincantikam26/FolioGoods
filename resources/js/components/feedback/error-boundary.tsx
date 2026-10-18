import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { routes } from '@/app/routing/routes';
import { StatusNotice } from '@/components/feedback/status-notice';
import { Button } from '@/components/primitives/button';
import { TextLink } from '@/components/primitives/text-link';
import { copy } from '@/content/copy';

type Props = { children: ReactNode };
type State = { failed: boolean };

/**
 * Catches a rendering error inside the page so the header, footer and
 * navigation keep working. Shows a plain message with a retry; no error
 * details reach the visitor.
 */
export class SectionErrorBoundary extends Component<Props, State> {
    state: State = { failed: false };

    static getDerivedStateFromError(): State {
        return { failed: true };
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        if (import.meta.env.DEV) {
            console.error(error, info.componentStack);
        }
    }

    retry = () => {
        this.setState({ failed: false });
    };

    render() {
        if (!this.state.failed) {
            return this.props.children;
        }

        const text = copy.errors.render;

        return (
            <section className="frame grid min-h-[50dvh] content-center py-20">
                <div className="max-w-xl">
                    <StatusNotice
                        tone="danger"
                        title={text.title}
                        focusOnMount
                        actions={
                            <>
                                <Button onClick={this.retry} size="sm">
                                    {copy.common.retry}
                                </Button>
                                <TextLink href={routes.home()}>
                                    {copy.errors.home}
                                </TextLink>
                            </>
                        }
                    >
                        {text.body}
                    </StatusNotice>
                </div>
            </section>
        );
    }
}
