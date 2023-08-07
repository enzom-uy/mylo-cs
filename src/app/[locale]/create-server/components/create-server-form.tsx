'use client'

import Terms from '@/app/[locale]/components/terms'
import { NewServerData, ServerApiResponse } from '@/app/api/create-server/route'
import {
    serverIdMinLength,
    serverNameMinLength
} from '@/app/api/create-server/utils'
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
import { TOAST_DURATION } from '@/utils/contants'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckedState } from '@radix-ui/react-checkbox'
import { Input } from '@shad/input'
import { Textarea } from '@shad/textarea'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Guild } from '../utils/getUserGuilds'
import Required from './required'

export const createServerSchema = z.object({
    serverName: z.string().min(serverNameMinLength, {
        message: `El nombre del servidor debe contener al menos ${serverNameMinLength} caracteres.`
    }),
    serverDescription: z.string().max(200).optional(),
    serverId: z.string().min(serverIdMinLength, {
        message: 'El ID del servidor debe contener al menos 15 caracteres.'
    }),
    terms: z.boolean().default(false)
})

export default function CreateServerForm() {
    const { data: session } = useSession()
    const t = useTranslations()

    const selectedGuild = JSON.parse(
        localStorage.getItem('selectedGuild') as string
    ) as Guild
    const userSelectedGuildPrev = !!selectedGuild
    console.log(selectedGuild?.id)
    const router = useRouter()
    const form = useForm<z.infer<typeof createServerSchema>>({
        resolver: zodResolver(createServerSchema),
        defaultValues: {
            serverName: userSelectedGuildPrev ? selectedGuild?.name : '',
            serverId: userSelectedGuildPrev ? selectedGuild?.id : '',
            serverDescription: '',
            terms: false
        }
    })
    const { toast } = useToast()

    const onSubmit = async (values: z.infer<typeof createServerSchema>) => {
        const { serverId, serverName, serverDescription } = values

        if (values.terms === false) {
            toast({
                title: t('Create-Server.accept-terms'),
                duration: TOAST_DURATION
            })
            return
        }

        const axiosBody: NewServerData = {
            ownerId: session?.id as string,
            serverName,
            serverId,
            serverDescription,
            serverIcon: selectedGuild.icon
                ? `https://cdn.discordapp.com/icons/${selectedGuild.id}/${selectedGuild.icon}.png`
                : undefined
        }
        const response = (await axios
            .post('/api/create-server', axiosBody)
            .then((res) => res.data)
            .catch((err) => console.log(err))) as ServerApiResponse

        if (response.result === 'error') {
            toast({
                title: t('Create-Server.api.error'),
                duration: TOAST_DURATION
            })
            return
        }

        form.reset()
        router.push(`/server/${response.serverId}`)
        return toast({
            title: t('Create-Server.api.success'),
            duration: TOAST_DURATION
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
                                    {t('Create-Server.form.server-name.label')}
                                    <Required />
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} required />
                                </FormControl>
                                <FormDescription>
                                    {t(
                                        'Create-Server.form.server-name.description'
                                    )}
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
                                    {t(
                                        'Create-Server.form.server-description.label'
                                    )}
                                </FormLabel>
                                <FormControl>
                                    <Textarea {...field} />
                                </FormControl>
                                <FormDescription>
                                    {t(
                                        'Create-Server.form.server-description.description'
                                    )}
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
                                    {t('Create-Server.form.server-id.label')}
                                    <Required />
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        required
                                        disabled={userSelectedGuildPrev && true}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Terms />
                    <FormField
                        control={form.control}
                        name="terms"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={
                                            field.onChange as unknown as (
                                                checked: CheckedState
                                            ) => void
                                        }
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>
                                        {t('Create-Server.form.terms.label')}
                                    </FormLabel>
                                </div>
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        className="bg-accent-dark duration-100 hover:bg-accent-dark/90"
                    >
                        {t('Create-Server.form.submit')}
                    </Button>
                </form>
            </Form>
        </>
    )
}
