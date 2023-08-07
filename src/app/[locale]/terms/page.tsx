import { createTranslator, useTranslations } from 'next-intl'
import AccordionComponent from '../components/terms'

export async function generateMetadata({
    params: { locale }
}: {
    params: { locale: string }
}) {
    const messages = (await import(`../../messages/${locale}.json`)).default

    const t = createTranslator({ locale, messages })

    return {
        title: t('Terms.terms')
    }
}

export default function TermsPage() {
    const t = useTranslations()
    return (
        <section>
            <h1>{t('Terms.terms')}</h1>
            <AccordionComponent />
        </section>
    )
}
