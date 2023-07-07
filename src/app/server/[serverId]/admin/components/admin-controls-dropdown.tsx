import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger
} from '@radix-ui/react-dropdown-menu'
import { MoreHorizontal } from 'lucide-react'
import AdminControlsNade from './admin-controls-nade'

interface Props {
    isPending?: boolean
}

export default function AdminControlsDropdown({ isPending }: Props) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <MoreHorizontal className="w-5 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="z-10 rounded-md bg-dark-secondary p-1">
                <AdminControlsNade isPending={isPending} />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
