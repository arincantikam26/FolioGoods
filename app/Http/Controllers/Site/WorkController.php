<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Support\Site\QueryFilters;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class WorkController extends Controller
{
    /**
     * The project list. Projects come from the front-end mock source for now;
     * the server only owns the validated filter state so URLs stay shareable.
     */
    public function index(Request $request): Response
    {
        return Inertia::render('site/work/index', [
            'filters' => [
                'category' => QueryFilters::slug($request, 'category'),
                'year' => QueryFilters::year($request, 'year'),
                'q' => QueryFilters::search($request, 'q'),
            ],
        ]);
    }

    public function show(string $slug): Response
    {
        return Inertia::render('site/work/show', [
            'slug' => $slug,
        ]);
    }
}
