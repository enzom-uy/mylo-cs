import { useTranslations } from 'next-intl'
import { FooterAboutSection } from './footer-about-section'
import { FooterProjectSection } from './footer-project-section'

const FOOTER_SECTION_STYLES =
    'text-muted-foreground flex flex-col md:flex-row gap-2'

export default function Footer() {
    const t = useTranslations()
    return (
        <footer className="mt-10 flex w-full items-start justify-between px-3 py-4 md:px-6 lg:px-10 2xl:px-72">
            <div className={FOOTER_SECTION_STYLES}>
                <FooterAboutSection
                    supportText={t('Support.support')}
                    termsText={t('Terms.terms')}
                />
            </div>
            <div className={FOOTER_SECTION_STYLES}>
                <FooterProjectSection
                    contributeText={t('Footer.Project.contribute')}
                />
            </div>
        </footer>
    )
}
