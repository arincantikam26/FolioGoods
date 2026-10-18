import { legalDocuments } from '@/features/legal/data/documents';
import { LegalLayout } from '@/layouts/site/legal-layout';

export default function PrivacyPage() {
    return <LegalLayout document={legalDocuments.privacy} />;
}
