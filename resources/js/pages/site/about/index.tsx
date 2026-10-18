import { HeaderSentinel } from '@/components/layout/header-sentinel';
import { Seo } from '@/components/seo/seo';
import { copy } from '@/content/copy';
import { site } from '@/content/site';
import { ContactClosing } from '@/features/contact/components/contact-closing';
import {
    AboutAvailability,
    AboutBiography,
    AboutCapabilities,
    AboutExperience,
    AboutIntro,
    AboutPrinciples,
} from '@/features/profile/components/profile-sections';
import { profile } from '@/features/profile/data/profile';
import { PublicLayout } from '@/layouts/site/public-layout';

export default function AboutPage() {
    return (
        <PublicLayout>
            <Seo
                title={copy.about.title}
                description={copy.about.description}
                type="profile"
            />
            <AboutIntro profile={profile} location={site.location} />
            <HeaderSentinel />
            <AboutBiography biography={profile.biography} />
            <AboutExperience profile={profile} />
            <AboutCapabilities profile={profile} />
            <AboutPrinciples profile={profile} />
            <AboutAvailability
                profile={profile}
                availability={site.availability}
            />
            <ContactClosing />
        </PublicLayout>
    );
}
