import { EditNadeData } from '@/app/api/edit-nade/route'
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
    FormLabel
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
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogDescription } from '@radix-ui/react-dialog'
import axios from 'axios'
import { Edit } from 'lucide-react'
import { Suspense, useState } from 'react'
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
                const updatedNade = res.data
                dispatch(editNade({ nade, updatedNade }))
                return res.data
            })
            .catch((err) => {
                console.error(err)
            })
            .finally(() => {
                dispatch(loadingNades(false))
            })

        if (!updatedNade)
            toast({
                title: 'Ha ocurrido un error al intentar editar la granada.',
                variant: 'destructive'
            })

        toast({
            title: 'Granada editada.'
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="admin-ctrl-dialog-item hover:text-accent-dark">
                <Edit className="w-5" />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar granada</DialogTitle>
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
                                        <FormLabel>Título</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Descripción</FormLabel>
                                        <FormControl>
                                            <Textarea {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="map"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Mapa</FormLabel>
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
                                        <FormLabel>Tipo</FormLabel>
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
                                    Confirmar
                                </Button>
                                <Button
                                    className="btn bg-dark/80 hover:bg-dark/90"
                                    onClick={() => setOpen(false)}
                                >
                                    Cancelar
                                </Button>
                            </div>
                        </form>
                    </Form>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}
