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
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

interface Props {
    serverId: string
}

export default function ServerConfigDelete({ serverId }: Props) {
    const t = useTranslations()
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
        const { result } = response.data
        if (result === 'error') {
            toast({
                title: t('Delete-Server.api.error'),
                duration: TOAST_DURATION
            })
            return
        }
        toast({
            title: t('Delete-Server.api.success'),
            duration: TOAST_DURATION
        })
        router.push('/profile')
        return
    }
    return (
        <div className="flex flex-wrap items-center justify-between gap-2">
            <Label htmlFor="delete">{t('Delete-Server.delete-server')}</Label>
            <AlertDialog>
                <AlertDialogTrigger>
                    <Button
                        id="delete"
                        variant="destructive"
                        className="w-full sm:w-fit"
                    >
                        {t('Delete-Server.action.delete')}
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="rounded-md border border-border-dark p-4">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="m-0">
                            {t('Delete-Server.action.are-you-sure')}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {t('Delete-Server.action.explanation')}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mt-4">
                        <AlertDialogCancel className="hover:bg-dark/20 hover:text-light">
                            {t('Button.cancel')}
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteServer}
                            className="bg-destructive hover:bg-destructive/90"
                        >
                            {t('Button.confirm')}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
