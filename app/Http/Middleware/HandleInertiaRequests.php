<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Public site pages use their own shell, stylesheet and script entry, so
     * visitors never download the application (auth/admin) bundle.
     */
    public function rootView(Request $request): string
    {
        return self::isPublicSite($request) ? 'site' : $this->rootView;
    }

    public static function isPublicSite(Request $request): bool
    {
        return $request->routeIs('home', 'site.*');
    }

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $request->user(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'folio' => [
                'previews' => (bool) config('folio.previews'),
                'commerce' => (bool) config('folio.commerce'),
                'url' => rtrim((string) config('app.url'), '/'),
            ],
        ];
    }
}
