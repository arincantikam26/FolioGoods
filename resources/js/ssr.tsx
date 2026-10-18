import type { Page } from '@inertiajs/core';
import { createInertiaApp } from '@inertiajs/react';
import type { ResolvedComponent } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import { renderToString } from 'react-dom/server';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { site } from '@/content/site';
import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';
import SettingsLayout from '@/layouts/settings/layout';

/**
 * Server-side rendering for both Inertia apps in this project.
 * Pages named "site/…" render with the public site setup (site.tsx);
 * everything else renders with the application setup (app.tsx).
 * Keep the application branch in sync with app.tsx.
 */

type PageModule = { default: ResolvedComponent };

const sitePages = import.meta.glob<PageModule>('./pages/site/**/*.tsx');
const appPages = import.meta.glob<PageModule>([
    './pages/**/*.tsx',
    '!./pages/site/**',
]);

async function load(
    pages: Record<string, () => Promise<PageModule>>,
    path: string,
) {
    const loader = pages[path];

    if (!loader) {
        throw new Error(`Page not found: ${path}`);
    }

    return (await loader()).default;
}

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

function renderSite(page: Page) {
    return createInertiaApp({
        page,
        render: renderToString,
        title: (title) => (title ? `${title} — ${site.name}` : site.name),
        resolve: (name) =>
            load(sitePages, `./pages/site/${name.replace(/^site\//, '')}.tsx`),
        setup: ({ App, props }) => <App {...props} />,
    });
}

function renderApp(page: Page) {
    return createInertiaApp({
        page,
        render: renderToString,
        title: (title) => (title ? `${title} - ${appName}` : appName),
        resolve: (name) => load(appPages, `./pages/${name}.tsx`),
        layout: (name) => {
            switch (true) {
                case name === 'welcome':
                    return null;
                case name.startsWith('auth/'):
                    return AuthLayout;
                case name.startsWith('settings/'):
                    return [AppLayout, SettingsLayout];
                default:
                    return AppLayout;
            }
        },
        setup: ({ App, props }) => (
            <TooltipProvider delayDuration={0}>
                <App {...props} />
                <Toaster />
            </TooltipProvider>
        ),
    });
}

const render = (page: Page) =>
    page.component.startsWith('site/') ? renderSite(page) : renderApp(page);

if (import.meta.env.PROD) {
    createServer(render);
}

export default render;
