'use client'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/shad-components/accordion'
import { Button } from '@/shad-components/button'
import { Checkbox } from '@/shad-components/checkbox'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/shad-components/form'
import { useToast } from '@/shad-components/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@shad/input'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import AccordionComponent from '../components/terms'

const formSchema = z.object({
    serverName: z.string().min(1),
    serverId: z.string().min(15),
    term: z.boolean().default(false)
})

export default function CreateServerPage() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            serverName: '',
            serverId: '',
            term: false
        }
    })
    const { toast } = useToast()

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values)
        if (values.term === false)
            toast({ title: 'Acepta los términos y condiciones.' })
    }
    return (
        <section>
            <h1>Crear un nuevo servidor</h1>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="mb-4 w-full space-y-4"
                >
                    <FormField
                        control={form.control}
                        name="serverName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre del Servidor</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription>
                                    Nombre público para mostrar en la página.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="serverId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center gap-2">
                                    Id del Servidor
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription>
                                    En Discord: Configuración {'>'} Avanzado{' '}
                                    {'>'} Modo desarrollador {'>'} Click derecho
                                    en tu servidor {'>'} Copiar ID del servidor.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <AccordionComponent />
                    <FormField
                        control={form.control}
                        name="term"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>
                                        Acepto los términos y condiciones.
                                    </FormLabel>
                                </div>
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </section>
    )
}
