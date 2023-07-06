'use client'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@shad/dropdown-menu'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import HeaderAvatar from './header-avatar'
import { LogOut, PlusSquare, UserCircle, Users } from 'lucide-react'

export default function HeaderMenu({
    avatarImage,
    avatarFallback,
    userName
}: {
    avatarImage: string
    avatarFallback: string
    userName: string
}) {
    const router = useRouter()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="h-8 w-8" aria-label="Trigger menu">
                <HeaderAvatar image={avatarImage} fallback={avatarFallback} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-2 md:mr-0">
                <DropdownMenuItem
                    className="flex items-center gap-2"
                    onClick={() => router.push('/profile')}
                >
                    <UserCircle className="w-4" /> {userName}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/create-server')}>
                    <PlusSquare className="w-4" /> Crear Servidor
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="w-4" /> Cerrar sesión
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
