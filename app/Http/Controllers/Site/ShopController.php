<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Support\Site\QueryFilters;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ShopController extends Controller
{
    private const SORTS = ['featured', 'newest', 'price-asc', 'price-desc'];

    public function index(Request $request): Response
    {
        return Inertia::render('site/shop/index', [
            'filters' => [
                'category' => QueryFilters::slug($request, 'category'),
                'sort' => QueryFilters::oneOf($request, 'sort', self::SORTS),
            ],
        ]);
    }

    public function show(string $slug): Response
    {
        return Inertia::render('site/shop/show', [
            'slug' => $slug,
        ]);
    }
}
