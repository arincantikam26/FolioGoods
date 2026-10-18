<?php

namespace App\Support\Site;

use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

/**
 * Renders public-facing error statuses with the site's own error page.
 * Application routes (dashboard, settings, auth) keep Laravel's default.
 */
final class SiteErrorPage
{
    private const STATUSES = [403, 404, 500, 503];

    public static function render(Response $response, Request $request): Response
    {
        $status = $response->getStatusCode();

        if (! in_array($status, self::STATUSES, true) || $request->expectsJson()) {
            return $response;
        }

        // Keep the debug page for server errors while developing.
        if ($status >= 500 && config('app.debug')) {
            return $response;
        }

        // Unmatched URLs (404) have no route; matched application routes keep their own handling.
        if ($request->route() !== null && ! HandleInertiaRequests::isPublicSite($request)) {
            return $response;
        }

        Inertia::setRootView('site');

        return Inertia::render('site/errors/show', [
            'status' => $status,
            'folio' => [
                'previews' => (bool) config('folio.previews'),
                'commerce' => (bool) config('folio.commerce'),
                'url' => rtrim((string) config('app.url'), '/'),
            ],
        ])
            ->toResponse($request)
            ->setStatusCode($status);
    }
}
