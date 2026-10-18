import type { ReactNode } from 'react';
import { PublicFooter } from '@/components/layout/public-footer';
import { PublicHeader } from '@/components/layout/public-header';
import { RouteProgress, SkipLink } from '@/components/layout/route-progress';
import { ScrollToTop } from '@/components/layout/scroll-to-top';
import { SectionErrorBoundary } from '@/components/feedback/error-boundary';

/** Shell for every public page: skip link, header, main, footer. */
export function PublicLayout({ children }: { children: ReactNode }) {
    return (
        <div id="top" className="flex min-h-dvh flex-col">
            <SkipLink />
            <RouteProgress />
            <PublicHeader />
            <main
                id="main"
                tabIndex={-1}
                className="motion-page-enter flex-1 outline-none"
            >
                <SectionErrorBoundary>{children}</SectionErrorBoundary>
            </main>
            <PublicFooter />
            <ScrollToTop />
        </div>
    );
}
