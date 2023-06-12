'use client'
import Terms from '@/app/components/terms'
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
import Required from './required'

const minServerNameLetters = 4

const formSchema = z.object({
    serverName: z.string().min(minServerNameLetters, {
        message: `El nombre del servidor debe contener al menos ${minServerNameLetters} caracteres.`
    }),
    serverId: z.string().min(15, {
        message: 'El ID del servidor debe contener al menos 15 caracteres.'
    }),
    term: z.boolean().default(false)
})

export default function CreateServerForm() {
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
            toast({
                title: 'Debes aceptar los términos y condiciones para continuar.'
            })
    }
    return (
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
                            <FormLabel>
                                Nombre del Servidor <Required />
                            </FormLabel>
                            <FormControl>
                                <Input {...field} required />
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
                            <FormLabel>
                                Id del Servidor <Required />
                            </FormLabel>
                            <FormControl>
                                <Input {...field} required />
                            </FormControl>
                            <FormDescription>
                                En Discord: Configuración {'>'} Avanzado {'>'}{' '}
                                Modo desarrollador {'>'} Click derecho en tu
                                servidor {'>'} Copiar ID del servidor.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Terms />
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
                <Button type="submit">Crear</Button>
            </form>
        </Form>
    )
}
