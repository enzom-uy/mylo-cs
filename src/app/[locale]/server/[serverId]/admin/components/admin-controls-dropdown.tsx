import { NadeAuthorNadeType } from '@/services/getServer'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger
} from '@radix-ui/react-dropdown-menu'
import { MoreHorizontal } from 'lucide-react'
import AdminControlsNade from './admin-controls-nade'

interface Props {
    isPending?: boolean
    nade: NadeAuthorNadeType
    isAdmin: boolean
}

export default function AdminControlsDropdown({
    isPending,
    nade,
    isAdmin
}: Props) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <MoreHorizontal className="w-5 text-muted-foreground duration-150 hover:text-accent-light" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="z-10 rounded-md bg-dark-secondary p-1">
                <AdminControlsNade
                    isPending={isPending}
                    nade={nade}
                    isAdmin={isAdmin}
                />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
