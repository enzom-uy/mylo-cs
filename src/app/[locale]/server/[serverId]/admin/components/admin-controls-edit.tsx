import { EditNadeApiResponse, EditNadeData } from '@/app/api/edit-nade/route'
import { useGetMapsFromDb } from '@/hooks/useGetMapsFromDb'
import { editNade, loadingNades } from '@/redux/features/nadesSlice'
import { useAppDispatch } from '@/redux/hooks'
import { NadeAuthorNadeType } from '@/services/getServer'
import { Button } from '@/shad-components/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/shad-components/dialog'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/shad-components/form'
import { Input } from '@/shad-components/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/shad-components/select'
import { Textarea } from '@/shad-components/textarea'
import { useToast } from '@/shad-components/use-toast'
import { TOAST_DURATION } from '@/utils/contants'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogDescription } from '@radix-ui/react-dialog'
import axios from 'axios'
import { Edit } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

export interface EditNadeInputs {
    title: string
    description: string
    nadeType: string
    map: string
}

const editNadeSchema = z.object({
    title: z
        .string()
        .min(4, { message: 'Debe tener al menos 4 caracteres.' })
        .max(50, { message: 'Máximo de 50 caracteres.' }),
    description: z
        .string()
        .max(200, { message: 'Máximo de 200 caracteres.' })
        .optional(),
    nadeType: z.string(),
    map: z.string()
})

export type EditNadeSchemaType = z.infer<typeof editNadeSchema>

export default function AdminControlsEdit({
    nade
}: {
    nade: NadeAuthorNadeType
}) {
    const t = useTranslations()
    const dispatch = useAppDispatch()
    const [open, setOpen] = useState(false)
    const { maps } = useGetMapsFromDb()
    const { toast } = useToast()
    console.log(nade)
    const form = useForm<EditNadeSchemaType>({
        resolver: zodResolver(editNadeSchema),
        defaultValues: {
            title: nade.title,
            description: nade.description ? nade.description : '',
            nadeType: nade.nade_type.name,
            map: nade.map_name
        }
    })

    const onSubmit = async (values: EditNadeSchemaType) => {
        dispatch(loadingNades(true))
        const { map, nadeType, title, description } = values
        const axiosBody: EditNadeData = {
            map,
            nadeType,
            title,
            description,
            nadeId: nade.id
        }
        const updatedNade = await axios
            .post('/api/edit-nade', axiosBody)
            .then((res) => {
                const data: EditNadeApiResponse = res.data
                const updatedNade = data.updatedNade
                dispatch(
                    editNade({
                        nade,
                        updatedNade: updatedNade as NadeAuthorNadeType
                    })
                )
                return data
            })

        if (updatedNade.result === 'error') {
            toast({
                title: t('Edit-Nade.api.error'),
                variant: 'destructive',
                duration: TOAST_DURATION
            })
            return
        }

        toast({
            title: t('Edit-Nade.api.success'),
            duration: TOAST_DURATION
        })

        dispatch(loadingNades(false))
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="admin-ctrl-dialog-item hover:text-accent-light">
                <Edit className="w-5" />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t('Edit-Nade.edit-nade')}</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="flex flex-col gap-2"
                        >
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {t('Edit-Nade.form.label-title')}
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} minLength={4} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {t(
                                                'Edit-Nade.form.label-description'
                                            )}
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                maxLength={200}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="map"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {t('Edit-Nade.form.label-map')}
                                        </FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {maps?.map((m) => (
                                                    <SelectItem
                                                        value={m.name}
                                                        key={m.name}
                                                    >
                                                        {m.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="nadeType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {t(
                                                'Edit-Nade.form.label-nade_type'
                                            )}
                                        </FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Flash">
                                                    Flash
                                                </SelectItem>
                                                <SelectItem value="Smoke">
                                                    Smoke
                                                </SelectItem>
                                                <SelectItem value="Explosive">
                                                    Explosive
                                                </SelectItem>
                                                <SelectItem value="Molo">
                                                    Molo
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                            <div className="mt-2 flex items-center gap-2">
                                <Button
                                    type="submit"
                                    className="btn bg-green-500 hover:bg-green-600"
                                >
                                    {t('Button.confirm')}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}
