import type { Auth } from '@/types/auth';
import type { FolioSharedProps } from '@/types/site';

declare module 'react' {
    interface InputHTMLAttributes<T> {
        passwordrules?: string;
    }

    interface CSSProperties {
        [key: `--${string}`]: string | number | undefined;
    }
}

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            auth: Auth;
            sidebarOpen: boolean;
            folio?: FolioSharedProps;
            [key: string]: unknown;
        };
    }
}
