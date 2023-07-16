import { BanUserReqBody } from '@/app/api/ban-user/route'
import { UnbanUserApiResponse } from '@/app/api/unban-user/route'
import { deleteBannedMember, deleteMember } from '@/redux/features/membersSlice'
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
import { Button } from '@/shad-components/button'
import { useToast } from '@/shad-components/use-toast'
import { ApiResponse } from '@/types/api'
import { TOAST_DURATION } from '@/utils/contants'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@shad/dialog'
import axios from 'axios'
import { Ban } from 'lucide-react'
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
    const dispatch = useAppDispatch()
    const [open, setOpen] = useState<boolean>()
    const { toast } = useToast()
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
        dispatch(
            isUnban
                ? deleteBannedMember({ bannedUserId })
                : deleteMember({ bannedUserId })
        )
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
                            ? 'El usuario volverá a formar parte del servidor y podrá ver las granadas.'
                            : 'El usuario dejará de formar parte del servidor. No podrá volver a unirse ni ver las granadas.'}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirm}>
                        Confirmar
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
