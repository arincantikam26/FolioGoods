<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Support\Site\QueryFilters;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

/**
 * UI Edition only: these pages render mock transaction screens. Nothing is
 * stored, charged or sent. The Commerce Edition replaces this controller with
 * real order, payment and delivery controllers using the same page props.
 */
class TransactionController extends Controller
{
    public function checkout(Request $request): Response
    {
        return Inertia::render('site/checkout/index', [
            'product' => QueryFilters::slug($request, 'product'),
            'license' => QueryFilters::slug($request, 'license'),
        ]);
    }

    public function payment(Request $request): Response
    {
        return Inertia::render('site/payment/show', [
            'order' => QueryFilters::orderNumber($request, 'order'),
        ]);
    }

    public function orderLookup(): Response
    {
        return Inertia::render('site/order-status/index');
    }

    public function orderShow(string $order): Response
    {
        return Inertia::render('site/order-status/show', [
            'order' => strtoupper($order),
        ]);
    }
}
