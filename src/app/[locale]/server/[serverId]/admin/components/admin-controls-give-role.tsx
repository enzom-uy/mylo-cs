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
        toast({ title: response.message, duration: TOAST_DURATION })
        if (response.result === 'success')
            setTimeout(() => {
                router.refresh()
            }, 300)
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <UserCog className="w-6 text-muted-foreground hover:text-accent-dark" />
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-dark">
                <AlertDialogHeader>
                    <AlertDialogTitle className="m-0">
                        {isAdmin ? 'Quitar admin' : 'Dar admin'}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {isAdmin
                            ? 'El usuario ya no podrá acceder a la configuración del servidor, administrar las granadas ni los usuarios.'
                            : 'El usuario podrá acceder a la configuración del servidor,  administrar las granadas y los usuarios.'}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirm}>
                        {isAdmin ? 'Quitar admin' : 'Dar admin'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
