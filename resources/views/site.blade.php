<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" data-theme="{{ config('folio.theme', 'porcelain') }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">

        {{-- Paint the canvas colour before the stylesheet arrives. Keep in sync with tokens.css. --}}
        <style>
            html { background-color: #f3f0e8; color: #15211f; }
            html[data-theme="nocturne"] { background-color: #121a19; color: #ece8df; }
        </style>

        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" href="/favicon.svg" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">

        @fonts(['hanken-grotesk', 'newsreader'])

        @viteReactRefresh
        @vite(['resources/css/site.css', 'resources/js/site.tsx', "resources/js/pages/{$page['component']}.tsx"])
        <x-inertia::head>
            <title>{{ config('app.name', 'Laravel') }}</title>
        </x-inertia::head>
    </head>
    <body>
        <x-inertia::app />
    </body>
</html>
