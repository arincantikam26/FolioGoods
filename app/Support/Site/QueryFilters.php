<?php

namespace App\Support\Site;

use Illuminate\Http\Request;

/**
 * Normalises untrusted query-string values for public listing pages.
 * Invalid input is dropped rather than rejected, so a mistyped URL still
 * renders a usable page.
 */
final class QueryFilters
{
    public static function slug(Request $request, string $key): ?string
    {
        $value = $request->query($key);

        return is_string($value) && preg_match('/^[a-z0-9]+(?:-[a-z0-9]+)*$/', $value) === 1 && strlen($value) <= 80
            ? $value
            : null;
    }

    public static function year(Request $request, string $key): ?int
    {
        $value = $request->query($key);

        return is_string($value) && preg_match('/^(19|20)\d{2}$/', $value) === 1
            ? (int) $value
            : null;
    }

    public static function search(Request $request, string $key): ?string
    {
        $value = $request->query($key);

        if (! is_string($value)) {
            return null;
        }

        $value = trim(mb_substr($value, 0, 80));

        return $value === '' ? null : $value;
    }

    /**
     * @param  list<string>  $allowed
     */
    public static function oneOf(Request $request, string $key, array $allowed): ?string
    {
        $value = $request->query($key);

        return is_string($value) && in_array($value, $allowed, true) ? $value : null;
    }

    public static function orderNumber(Request $request, string $key): ?string
    {
        $value = $request->query($key);

        return is_string($value) && preg_match('/^FG-\d{4}-\d{4}$/i', $value) === 1
            ? strtoupper($value)
            : null;
    }
}
