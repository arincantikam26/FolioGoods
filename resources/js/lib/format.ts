import { siteConfig } from '@/app/configuration/site-config';

const { currency, dates } = siteConfig;

const moneyFormatter = new Intl.NumberFormat(currency.locale, {
    style: 'currency',
    currency: currency.code,
    minimumFractionDigits: currency.fractionDigits,
    maximumFractionDigits: currency.fractionDigits,
});

/** Amounts are stored in major units (e.g. 749000 = Rp 749.000). */
export function formatMoney(amount: number): string {
    return moneyFormatter.format(amount);
}

const dateFormatter = new Intl.DateTimeFormat(dates.locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: dates.timeZone,
});

const shortDateFormatter = new Intl.DateTimeFormat(dates.locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: dates.timeZone,
});

const dateTimeFormatter = new Intl.DateTimeFormat(dates.locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: dates.timeZone,
});

export function formatDate(iso: string): string {
    return dateFormatter.format(new Date(iso));
}

export function formatShortDate(iso: string): string {
    return shortDateFormatter.format(new Date(iso));
}

export function formatDateTime(iso: string): string {
    return `${dateTimeFormatter.format(new Date(iso))} ${dates.timeZoneLabel}`;
}

export function formatBytes(bytes: number): string {
    if (bytes < 1024) {
        return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
        return `${Math.round(bytes / 1024)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** "rana@example.com" → "ra••@example.com" */
export function maskEmail(email: string): string {
    const [user, domain] = email.split('@');

    if (!user || !domain) {
        return email;
    }

    return `${user.slice(0, 2)}${'•'.repeat(Math.max(user.length - 2, 2))}@${domain}`;
}

/** Two-digit index used in editorial lists: 1 → "01". */
export function indexLabel(index: number): string {
    return String(index + 1).padStart(2, '0');
}

/** Account numbers are easier to read and check in groups of four. */
export function groupDigits(value: string, size = 4): string {
    return value.replace(new RegExp(`(\\d{${size}})(?=\\d)`, 'g'), '$1 ');
}
