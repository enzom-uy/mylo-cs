import { BanUserReqBody } from '@/app/api/ban-user/route'
import { UnbanUserApiResponse } from '@/app/api/unban-user/route'
import { deleteBannedMember, deleteMember } from '@/redux/features/membersSlice'
import { useAppDispatch } from '@/redux/hooks'
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

export default function AdminControlsUser({
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
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="hover:text-destructive">
                <Ban className="w-5 text-muted-foreground duration-200 hover:text-destructive" />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex flex-col items-center gap-2">
                        {isUnban ? 'Desbanear usuario.' : 'Banear usuario.'}
                        <Button
                            onClick={handleConfirm}
                            className="btn w-full max-w-xs bg-destructive hover:bg-destructive/90"
                        >
                            Confirmar
                        </Button>
                        <Button
                            className="btn w-full max-w-xs bg-dark/80 hover:bg-dark/90"
                            onClick={() => setOpen(false)}
                        >
                            Cancelar
                        </Button>
                    </DialogTitle>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
