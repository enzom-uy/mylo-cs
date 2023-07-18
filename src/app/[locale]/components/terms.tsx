import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/shad-components/accordion'
import { useTranslations } from 'next-intl'

interface Accordion {
    value: string
    trigger: string
    content: string[]
}

export default function Terms() {
    const t = useTranslations()

    const accordion: Accordion[] = [
        {
            value: 'item-1',
            trigger: t('Terms.item-1.title'),
            content: [t('Terms.item-1.content-1'), t('Terms.item-1.content-2')]
        },
        {
            value: 'item-2',
            trigger: t('Terms.item-2.title'),
            content: [t('Terms.item-2.content-1')]
        },
        {
            value: 'item-3',
            trigger: t('Terms.item-3.title'),
            content: [t('Terms.item-3.content-1'), t('Terms.item-3.content-2')]
        },
        {
            value: 'item-4',
            trigger: t('Terms.item-4.title'),
            content: [
                t('Terms.item-4.content-1'),
                t('Terms.item-4.content-2'),
                t('Terms.item-4.content-3'),
                t('Terms.item-4.content-4'),
                t('Terms.item-4.content-5'),
                t('Terms.item-4.content-6')
            ]
        }
    ]

    return (
        <>
            <Accordion type="single" collapsible className="w-full">
                {accordion.map((item) => (
                    <AccordionItem
                        key={item.value}
                        value={item.value}
                        className="m-0"
                    >
                        <AccordionTrigger className="p-1 text-start text-sm">
                            {item.trigger}
                        </AccordionTrigger>
                        <AccordionContent>
                            <ul className="flex flex-col gap-3">
                                {item.content.map((content) => (
                                    <li key={content}>{content}</li>
                                ))}
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </>
    )
}
