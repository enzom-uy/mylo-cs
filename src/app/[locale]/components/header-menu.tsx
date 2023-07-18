'use client'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@shad/dropdown-menu'
import { LogOut, PlusSquare, UserCircle, Users } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
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
    const t = useTranslations()

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
                    <PlusSquare className="w-4" /> {t('Menu.create-server')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="w-4" /> {t('Menu.sign-out')}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
