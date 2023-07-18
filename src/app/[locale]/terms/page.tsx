import { useTranslations } from 'next-intl'
import AccordionComponent from '../components/terms'

export default function TermsPage() {
    const t = useTranslations()
    return (
        <>
            <h1>{t('Terms.terms')}</h1>
            <AccordionComponent />
        </>
    )
}
