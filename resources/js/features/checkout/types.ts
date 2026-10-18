export type CheckoutFormData = {
    name: string;
    email: string;
    whatsapp: string;
    agreed: boolean;
};

export type CheckoutField = keyof CheckoutFormData;

export const CHECKOUT_FIELDS: readonly CheckoutField[] = [
    'name',
    'email',
    'whatsapp',
    'agreed',
];

export type CheckoutErrors = Partial<Record<CheckoutField, string>>;

/** Every screen state the checkout can show (UI Edition: simulated). */
export type CheckoutState =
    | 'default'
    | 'field_error'
    | 'loading'
    | 'failed'
    | 'success'
    | 'unavailable'
    | 'price_changed'
    | 'network_error';

export const CHECKOUT_STATES: readonly CheckoutState[] = [
    'default',
    'field_error',
    'loading',
    'failed',
    'success',
    'unavailable',
    'price_changed',
    'network_error',
];
