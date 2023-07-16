'use client'

import { DeleteServerReqBody } from '@/app/api/delete-server/route'
import { Button } from '@/shad-components/button'
import { Label } from '@/shad-components/label'
import { useToast } from '@/shad-components/use-toast'
import { ApiResponse } from '@/types/api'
import { TOAST_DURATION } from '@/utils/contants'
import { AlertDialogContent } from '@radix-ui/react-alert-dialog'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from '@shad/alert-dialog'
import axios, { AxiosResponse } from 'axios'
import { useRouter } from 'next/navigation'

interface Props {
    serverId: string
}

export default function ServerConfigDelete({ serverId }: Props) {
    const { toast } = useToast()
    const router = useRouter()
    const axiosBody: DeleteServerReqBody = {
        serverId
    }
    const handleDeleteServer = async () => {
        const response: AxiosResponse<ApiResponse> = await axios.post(
            '/api/delete-server',
            axiosBody
        )
        const { message } = response.data
        console.log(response)
        toast({ title: message, duration: TOAST_DURATION })
        router.push('/profile')
        return
    }
    return (
        <div className="flex flex-wrap items-center justify-between gap-2">
            <Label htmlFor="delete">Eliminar servidor</Label>
            <AlertDialog>
                <AlertDialogTrigger>
                    <Button
                        id="delete"
                        variant="destructive"
                        className="w-full sm:w-fit"
                    >
                        Eliminar
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="rounded-md border border-border-dark p-4">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="m-0">
                            ¿Estás completamente seguro?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta acción no se puede deshacer. Se borrará
                            permanentemente este servidor junto con sus
                            granadas.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mt-4">
                        <AlertDialogCancel className="hover:bg-dark hover:text-light">
                            Cancelar
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteServer}
                            className="bg-destructive hover:bg-destructive/90"
                        >
                            Confirmar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
