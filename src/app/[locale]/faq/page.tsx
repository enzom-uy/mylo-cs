import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/shad-components/accordion'
import { useTranslations } from 'next-intl'

export default function FAQPage() {
    const t = useTranslations()
    return (
        <section>
            <article className="w-full">
                <h1>{t('FAQ.faq')}</h1>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value={t('FAQ.item-1.title')}>
                        <AccordionTrigger>
                            {t('FAQ.item-1.title')}
                        </AccordionTrigger>
                        <AccordionContent>
                            <p>{t('FAQ.item-1.content-1')}</p>
                            <p>{t('FAQ.item-1.content-2')}</p>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value={t('FAQ.item-2.title')}>
                        <AccordionTrigger>
                            {t('FAQ.item-2.title')}
                        </AccordionTrigger>
                        <AccordionContent className="text-md">
                            <ol className="flex list-decimal flex-col gap-2">
                                <li>{t('FAQ.item-2.content-1')}</li>
                                <li>{t('FAQ.item-2.content-2')}</li>
                                <li>{t('FAQ.item-2.content-3')}</li>
                                <li>{t('FAQ.item-2.content-4')}</li>
                            </ol>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </article>
        </section>
    )
}
