import { legalDocuments } from '@/features/legal/data/documents';
import { LegalLayout } from '@/layouts/site/legal-layout';

export default function TermsPage() {
    return <LegalLayout document={legalDocuments.terms} />;
}
