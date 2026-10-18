<?php

use Illuminate\Support\Facades\Route;

require __DIR__.'/site.php';

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
