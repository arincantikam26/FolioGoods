import { createInertiaApp, router } from '@inertiajs/react';
import { siteConfig } from '@/app/configuration/site-config';
import { pathOf } from '@/app/routing/routes';
import { site } from '@/content/site';

/**
 * Entry for the public site (UI Edition). Only pages under ./pages/site are
 * bundled here, so visitors never download the application/admin code.
 */

if (!siteConfig.motion.enabled) {
    document.documentElement.dataset.motion = 'off';
}

void createInertiaApp({
    // Only public pages are globbed; component names arrive as 'site/…'.
    pages: {
        path: './pages/site',
        transform: (name: string) => name.replace(/^site\//, ''),
    },
    title: (title) => (title ? `${title} — ${site.name}` : site.name),
    strictMode: true,
    // A custom, token-coloured progress bar lives in RouteProgress.
    progress: false,
});

/*
 * After client-side navigation to a different page, move focus to <main> so
 * keyboard and screen reader users start at the new content. Filter updates
 * keep the same path and leave focus where it is.
 */
let lastPath = pathOf(window.location.pathname);

router.on('navigate', (event) => {
    const nextPath = pathOf(event.detail.page.url);

    if (nextPath === lastPath) {
        return;
    }

    lastPath = nextPath;
    window.requestAnimationFrame(() => {
        if (!window.location.hash) {
            document.getElementById('main')?.focus({ preventScroll: true });
        }
    });
});
