<?php

use App\Http\Controllers\Site\ShopController;
use App\Http\Controllers\Site\TransactionController;
use App\Http\Controllers\Site\WorkController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public site (UI Edition)
|--------------------------------------------------------------------------
|
| Every route here is named "home" or "site.*". HandleInertiaRequests uses
| that naming to render these pages with the public shell (site.blade.php)
| instead of the application shell.
|
*/

Route::inertia('/', 'site/home/index')->name('home');

Route::get('work', [WorkController::class, 'index'])->name('site.work.index');
Route::get('work/{slug}', [WorkController::class, 'show'])
    ->where('slug', '[a-z0-9]+(?:-[a-z0-9]+)*')
    ->name('site.work.show');

Route::inertia('about', 'site/about/index')->name('site.about');
Route::inertia('contact', 'site/contact/index')->name('site.contact');

Route::inertia('privacy', 'site/legal/privacy')->name('site.legal.privacy');
Route::inertia('terms', 'site/legal/terms')->name('site.legal.terms');
Route::inertia('license', 'site/legal/license')->name('site.legal.license');

if (config('folio.commerce')) {
    Route::get('shop', [ShopController::class, 'index'])->name('site.shop.index');
    Route::get('shop/{slug}', [ShopController::class, 'show'])
        ->where('slug', '[a-z0-9]+(?:-[a-z0-9]+)*')
        ->name('site.shop.show');

    Route::get('checkout', [TransactionController::class, 'checkout'])->name('site.checkout');
    Route::get('payment', [TransactionController::class, 'payment'])->name('site.payment');
    Route::get('order-status', [TransactionController::class, 'orderLookup'])->name('site.orders.lookup');
    Route::get('order-status/{order}', [TransactionController::class, 'orderShow'])
        ->where('order', '(?i)FG-\d{4}-\d{4}')
        ->name('site.orders.show');
}

if (config('folio.previews')) {
    Route::inertia('404-preview', 'site/errors/show', ['status' => 404])->name('site.preview.404');
    Route::inertia('500-preview', 'site/errors/show', ['status' => 500])->name('site.preview.500');
}
