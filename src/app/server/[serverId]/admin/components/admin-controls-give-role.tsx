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
import { UserCog } from 'lucide-react'

interface Props {
    isAdmin: boolean
}

export default function AdminControlsGiveRole({ isAdmin }: Props) {
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
                    <AlertDialogAction>
                        {isAdmin ? 'Quitar admin' : 'Dar admin'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
