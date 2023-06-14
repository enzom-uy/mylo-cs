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
import axios from 'axios'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import Required from './required'
import {
    errorMessage,
    serverIdMinLength,
    serverNameMinLength,
    successMessage
} from '@/app/api/create-server/utils'
import { ServerApiResponse } from '@/app/api/create-server/route'

export const createServerSchema = z.object({
    serverName: z.string().min(serverNameMinLength, {
        message: `El nombre del servidor debe contener al menos ${serverNameMinLength} caracteres.`
    }),
    serverId: z.string().min(serverIdMinLength, {
        message: 'El ID del servidor debe contener al menos 15 caracteres.'
    }),
    terms: z.boolean().default(false)
})

export default function CreateServerForm() {
    const form = useForm<z.infer<typeof createServerSchema>>({
        resolver: zodResolver(createServerSchema),
        defaultValues: {
            serverName: '',
            serverId: '',
            terms: false
        }
    })
    const { toast } = useToast()

    const onSubmit = async (values: z.infer<typeof createServerSchema>) => {
        const { serverId, serverName } = values

        if (values.terms === false) {
            toast({
                title: 'Debes aceptar los términos y condiciones para continuar.'
            })
        }
        const response = (await axios
            .post('/api/create-server', {
                serverName: serverName,
                serverId: serverId
            })
            .then((res) => res.data)
            .catch((err) => console.log(err))) as ServerApiResponse

        if (response.result === 'error') {
            toast({
                title: errorMessage,
                duration: 5000
            })
            return
        }

        form.reset()
        return toast({
            title: successMessage,
            duration: 5000
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
                    name="terms"
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
