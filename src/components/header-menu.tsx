'use client'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@shad/dropdown-menu'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { MdGroupAdd } from 'react-icons/md'
import HeaderAvatar from './header-avatar'

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
            <DropdownMenuTrigger className="h-8 w-8">
                <HeaderAvatar image={avatarImage} fallback={avatarFallback} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-2 md:mr-0">
                <DropdownMenuLabel>{userName}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/create-server')}>
                    <MdGroupAdd /> Crear Servidor
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()}>
                    Cerrar sesión
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
