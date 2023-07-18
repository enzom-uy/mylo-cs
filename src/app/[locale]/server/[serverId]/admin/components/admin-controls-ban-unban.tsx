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

        toast({ title: response.message, duration: TOAST_DURATION })
        if (
            (!isUnban && response.result === 'error') ||
            (isUnban && response.result === 'error')
        ) {
            return
        }
        if (isUnban) router.refresh()
        if (!isUnban) dispatch(deleteMember({ bannedUserId }))
    }
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger className="hover:text-destructiveover:text-destructive">
                <Ban className="w-5 text-muted-foreground duration-200 hover:text-destructive" />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {isUnban ? 'Desbanear usuario' : 'Banear usuario'}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {isUnban
                            ? t('BanUnban-User.unban-user-description')
                            : t('BanUnban-User.ban-user-description')}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>{t('Button.cancel')}</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirm}>
                        {t('Button.confirm')}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
