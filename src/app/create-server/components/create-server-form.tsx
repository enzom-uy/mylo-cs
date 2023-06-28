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
import { Textarea } from '@shad/textarea'
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
import { NewServerData, ServerApiResponse } from '@/app/api/create-server/route'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Guild } from '../utils/getUserGuilds'

export const createServerSchema = z.object({
    serverName: z.string().min(serverNameMinLength, {
        message: `El nombre del servidor debe contener al menos ${serverNameMinLength} caracteres.`
    }),
    serverDescription: z.string().optional(),
    serverId: z.string().min(serverIdMinLength, {
        message: 'El ID del servidor debe contener al menos 15 caracteres.'
    }),
    terms: z.boolean().default(false)
})

export default function CreateServerForm() {
    const { data: session } = useSession()
    const selectedGuild = localStorage.getItem('selectedGuild')
    const guild = selectedGuild
        ? (JSON.parse(selectedGuild!) as Guild | null)
        : undefined
    const userSelectedGuildPrev = !!selectedGuild
    const router = useRouter()
    const form = useForm<z.infer<typeof createServerSchema>>({
        resolver: zodResolver(createServerSchema),
        defaultValues: {
            serverName: userSelectedGuildPrev ? guild?.name : '',
            serverId: userSelectedGuildPrev ? guild?.id : '',
            serverDescription: '',
            terms: false
        }
    })
    const { toast } = useToast()

    const onSubmit = async (values: z.infer<typeof createServerSchema>) => {
        const { serverId, serverName, serverDescription } = values

        if (values.terms === false) {
            toast({
                title: 'Debes aceptar los términos y condiciones para continuar.'
            })
            return
        }

        const axiosBody: NewServerData = {
            ownerId: session?.id as string,
            serverName,
            serverId,
            serverDescription
        }
        const response = (await axios
            .post('/api/create-server', axiosBody)
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
        router.push(`/server/${response.serverId}`)
        return toast({
            title: successMessage,
            duration: 5000
        })
    }
    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="mb-4 w-full space-y-4"
                >
                    {/* Server name */}
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
                        name="serverDescription"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="serverDescription">
                                    Descripción del servidor
                                </FormLabel>
                                <FormControl>
                                    <Textarea {...field} />
                                </FormControl>
                                <FormDescription>
                                    Descripción para mostrar en la página.
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
                                <FormLabel htmlFor="serverId">
                                    Id del Servidor <Required />
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        required
                                        disabled={userSelectedGuildPrev && true}
                                    />
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
        </>
    )
}
