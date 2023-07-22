import { ChangeUserRoleReqBody } from '@/app/api/change-user-role/route'
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
import { UserCog } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

interface Props {
    isAdmin: boolean
    serverId: string
    userId: string
}

export default function AdminControlsGiveRole({
    isAdmin,
    serverId,
    userId
}: Props) {
    const t = useTranslations()
    const { toast } = useToast()
    const router = useRouter()
    const handleConfirm = async () => {
        const axiosBody: ChangeUserRoleReqBody = {
            newRole: isAdmin ? 'member' : 'admin',
            serverId,
            userId
        }

        const response = await axios
            .post('/api/change-user-role', axiosBody)
            .then((res) => res.data as ApiResponse)
        if (response.result === 'error') {
            toast({
                title: t('Give-Role.api.error'),
                duration: TOAST_DURATION,
                variant: 'destructive'
            })
            return
        }
        if (response.result === 'success')
            toast({
                title: t('Give-Role.api.success'),
                duration: TOAST_DURATION
            })
        setTimeout(() => {
            router.refresh()
        }, 300)
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <UserCog className="w-6 text-muted-foreground hover:text-accent-dark" />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="m-0">
                        {isAdmin
                            ? t('Give-Role.remove-admin')
                            : t('Give-Role.give-admin')}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {isAdmin
                            ? t('Give-Role.remove-admin-description')
                            : t('Give-Role.give-admin-description')}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>{t('Button.cancel')}</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleConfirm}
                        className="bg-accent-light hover:bg-accent-light/90"
                    >
                        {t('Button.confirm')}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
