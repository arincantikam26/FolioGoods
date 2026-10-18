export type ContactFormData = {
    name: string;
    email: string;
    company: string;
    projectType: string;
    budget: string;
    timeline: string;
    message: string;
    consent: boolean;
};

export type ContactField = keyof ContactFormData;

export type ContactState =
    | 'default'
    | 'validation'
    | 'submitting'
    | 'success'
    | 'failed'
    | 'rate_limited';

export const CONTACT_STATES: readonly ContactState[] = [
    'default',
    'validation',
    'submitting',
    'success',
    'failed',
    'rate_limited',
];
