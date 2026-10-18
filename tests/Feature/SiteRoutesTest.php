<?php

namespace Tests\Feature;

use Inertia\Testing\AssertableInertia as Assert;
use PHPUnit\Framework\Attributes\DataProvider;
use Tests\TestCase;

class SiteRoutesTest extends TestCase
{
    /**
     * @return array<string, array{string, string}>
     */
    public static function publicPages(): array
    {
        return [
            'home' => ['/', 'site/home/index'],
            'work' => ['/work', 'site/work/index'],
            'case study' => ['/work/tidewater', 'site/work/show'],
            'shop' => ['/shop', 'site/shop/index'],
            'product' => ['/shop/folio-editorial', 'site/shop/show'],
            'checkout' => ['/checkout?product=folio-editorial', 'site/checkout/index'],
            'payment' => ['/payment?order=FG-2610-4821', 'site/payment/show'],
            'order lookup' => ['/order-status', 'site/order-status/index'],
            'order status' => ['/order-status/FG-2610-4821', 'site/order-status/show'],
            'about' => ['/about', 'site/about/index'],
            'contact' => ['/contact', 'site/contact/index'],
            'privacy' => ['/privacy', 'site/legal/privacy'],
            'terms' => ['/terms', 'site/legal/terms'],
            'license' => ['/license', 'site/legal/license'],
        ];
    }

    #[DataProvider('publicPages')]
    public function test_public_pages_render_with_the_site_shell(string $uri, string $component): void
    {
        $this->get($uri)
            ->assertOk()
            ->assertViewIs('site')
            ->assertInertia(fn (Assert $page) => $page
                ->component($component)
                ->has('folio', fn (Assert $folio) => $folio
                    ->hasAll(['previews', 'commerce', 'url'])
                )
            );
    }

    public function test_listing_filters_are_validated_before_reaching_the_page(): void
    {
        $this->get('/work?category=Not%20A%20Slug&year=abc&q=%20field%20')
            ->assertInertia(fn (Assert $page) => $page
                ->where('filters.category', null)
                ->where('filters.year', null)
                ->where('filters.q', 'field')
            );

        $this->get('/shop?category=ui-template&sort=cheapest')
            ->assertInertia(fn (Assert $page) => $page
                ->where('filters.category', 'ui-template')
                ->where('filters.sort', null)
            );
    }

    public function test_invalid_order_numbers_are_dropped(): void
    {
        $this->get('/payment?order=DROP-TABLE')
            ->assertInertia(fn (Assert $page) => $page->where('order', null));

        $this->get('/order-status/not-an-order')->assertNotFound();
    }

    public function test_unknown_urls_use_the_site_error_page(): void
    {
        $this->get('/this-page-does-not-exist')
            ->assertNotFound()
            ->assertViewIs('site')
            ->assertInertia(fn (Assert $page) => $page
                ->component('site/errors/show')
                ->where('status', 404)
            );
    }

    public function test_error_previews_follow_the_previews_setting(): void
    {
        // Routes are registered at boot, so this asserts the current config.
        $response = $this->get('/404-preview');

        config('folio.previews')
            ? $response->assertOk()->assertInertia(fn (Assert $page) => $page->where('status', 404))
            : $response->assertNotFound();
    }

    public function test_application_routes_keep_the_application_shell(): void
    {
        $this->get('/login')
            ->assertOk()
            ->assertViewIs('app');
    }
}
