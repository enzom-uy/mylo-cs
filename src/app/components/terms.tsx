import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/shad-components/accordion'

interface Accordion {
    value: string
    trigger: string
    content: string[]
}

export const accordion: Accordion[] = [
    {
        value: 'item-1',
        trigger: 'Contenido del Servidor',
        content: [
            'El proyecto y su creador no se hacen responsables del contenido que se suba a los servidores que formen parte del proyecto. Cada usuario y administrador de un servidor es el único responsable del contenido que se publica en su servidor.',
            'Los usuarios aceptan no utilizar el Bot para actividades ilícitas o maliciosas. El uso del Bot debe cumplir con todas las leyes y regulaciones aplicables.'
        ]
    },
    {
        value: 'item-2',
        trigger: 'Uso de Nombres de Servidor',
        content: [
            'Los usuarios aceptan no representar a otros servidores o grupos de personas ajenos a ellos al crear un servidor. No se permite crear servidores con nombres que puedan inducir a confusión o hacerse pasar por entidades, empresas o marcas a las que no tienen derecho legítimo.'
        ]
    },
    {
        value: 'item-3',
        trigger: 'Responsabilidad del Contenido del Servidor',
        content: [
            'Los usuarios dueños o administradores de un servidor son los responsables del contenido que se suba a sus servidores. Esto incluye la responsabilidad de revisar, moderar y gestionar el contenido de acuerdo con las normas y políticas establecidas por el servidor.',
            'Los usuarios deben realizar un monitoreo activo del contenido, editarlo, eliminarlo o publicarlo según corresponda para mantener un entorno seguro y respetuoso en su servidor.'
        ]
    },
    {
        value: 'item-4',
        trigger: 'Resolución',
        content: [
            'Al utilizar el Bot de Discord y participar en el proyecto, usted reconoce y acepta que el proyecto y su creador no asumen ninguna responsabilidad por el contenido publicado en los servidores, ni por cualquier uso indebido o consecuencia derivada del uso del Bot.',
            'El incumplimiento de estos Términos puede resultar en la terminación de su acceso al Bot y a los servicios asociados.',
            'Estos Términos pueden actualizarse periódicamente y es su responsabilidad revisarlos regularmente. El uso continuado del Bot después de cualquier modificación de los Términos constituirá su aceptación de los mismos.',
            'Si tiene alguna pregunta o inquietud sobre estos Términos, por favor contáctenos a través de los canales de soporte proporcionados.',
            'Fecha de entrada en vigencia: 09/Jun/23.',
            'Al utilizar el Bot de Discord y participar en el proyecto, usted declara haber leído, entendido y aceptado estos Términos y Condiciones.'
        ]
    }
]

export default function Terms() {
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
