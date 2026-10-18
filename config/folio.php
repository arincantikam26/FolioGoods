<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Theme preset
    |--------------------------------------------------------------------------
    |
    | Applied as data-theme on the public <html> element. Presets are defined
    | in resources/css/site/tokens.css. Ships with "porcelain" and "nocturne".
    |
    */

    'theme' => env('FOLIO_THEME', 'porcelain'),

    /*
    |--------------------------------------------------------------------------
    | UI previews
    |--------------------------------------------------------------------------
    |
    | Enables /404-preview, /500-preview and the "Preview state" switcher on
    | checkout, payment, order status and contact. Defaults to local only so
    | the switcher never reaches production without an explicit opt-in.
    |
    */

    'previews' => (bool) env('FOLIO_UI_PREVIEWS', env('APP_ENV') === 'local'),

    /*
    |--------------------------------------------------------------------------
    | Commerce pages
    |--------------------------------------------------------------------------
    |
    | Set to false to run the template as a portfolio only. Shop, checkout,
    | payment and order status routes are not registered, and the shop links
    | disappear from navigation.
    |
    */

    'commerce' => (bool) env('FOLIO_COMMERCE', true),

];
