import { BanUserReqBody } from '@/app/api/ban-user/route'
import { UnbanUserApiResponse } from '@/app/api/unban-user/route'
import { deleteMember } from '@/redux/features/membersSlice'
import { useAppDispatch } from '@/redux/hooks'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from '@/shad-components/alert-dialog'
import { useToast } from '@/shad-components/use-toast'
import { ApiResponse } from '@/types/api'
import { TOAST_DURATION } from '@/utils/contants'
import axios from 'axios'
import { Ban } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function AdminControlsBanUnban({
    bannedUserId,
    serverId,
    isUnban
}: {
    bannedUserId: string
    serverId: string
    isUnban?: boolean
}) {
    const t = useTranslations()
    const dispatch = useAppDispatch()
    const [open, setOpen] = useState<boolean>()
    const { toast } = useToast()
    const router = useRouter()
    const handleConfirm = async () => {
        const axiosBody: BanUserReqBody = {
            bannedUserId,
            serverId
        }
        const response = (await axios
            .post(`${isUnban ? '/api/unban-user' : '/api/ban-user'}`, axiosBody)
            .then((res) => res.data)) as ApiResponse | UnbanUserApiResponse

        if (response.result === 'error') {
            if (isUnban)
                toast({
                    title: t('BanUnban-User.api.error-unban'),
                    variant: 'destructive',
                    duration: TOAST_DURATION
                })
            if (!isUnban)
                toast({
                    title: t('BanUnban-User.api.error-ban'),
                    variant: 'destructive',
                    duration: TOAST_DURATION
                })
            return
        }

        if (isUnban) {
            toast({
                title: t('BanUnban-User.api.success-unban'),
                duration: TOAST_DURATION
            })
            router.refresh()
        }
        if (!isUnban) {
            toast({
                title: t('BanUnban-User.api.success-ban'),
                duration: TOAST_DURATION
            })
            dispatch(deleteMember({ bannedUserId }))
        }
    }
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger className="hover:text-destructiveover:text-destructive">
                <Ban className="w-5 text-muted-foreground duration-200 hover:text-destructive" />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {isUnban
                            ? t('BanUnban-User.unban-user')
                            : t('BanUnban-User.ban-user')}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {isUnban
                            ? t('BanUnban-User.unban-user-description')
                            : t('BanUnban-User.ban-user-description')}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>{t('Button.cancel')}</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleConfirm}
                        className="bg-destructive hover:bg-destructive/90"
                    >
                        {t('Button.confirm')}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
