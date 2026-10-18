import { copy } from '@/content/copy';
import type {
    CheckoutErrors,
    CheckoutFormData,
} from '@/features/checkout/types';
import { EMAIL_PATTERN } from '@/lib/simulate';

/** Client-side checks. The Commerce Edition repeats them on the server. */
export function validateCheckout(data: CheckoutFormData): CheckoutErrors {
    const errors: CheckoutErrors = {};
    const text = copy.checkout.errors;

    if (!data.name.trim()) {
        errors.name = text.nameRequired;
    }

    if (!data.email.trim()) {
        errors.email = text.emailRequired;
    } else if (!EMAIL_PATTERN.test(data.email.trim())) {
        errors.email = text.emailInvalid;
    }

    if (
        data.whatsapp.trim() &&
        !/^\+?\d{8,15}$/.test(data.whatsapp.replace(/[\s-]/g, ''))
    ) {
        errors.whatsapp = text.whatsappInvalid;
    }

    if (!data.agreed) {
        errors.agreed = text.agreementRequired;
    }

    return errors;
}
