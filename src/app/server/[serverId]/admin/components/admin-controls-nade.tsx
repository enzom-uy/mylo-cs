import { DropdownMenuItem } from '@shad/dropdown-menu'
import { Trash2, Edit, CheckSquare } from 'lucide-react'
import AdminControlsDelete from './admin-controls-delete'
import AdminControlsEdit from './admin-controls-edit'
import AdminControlsApprove from './admin-controls-approve'
import { NadeAuthorNadeType } from '@/services/getServer'

interface Props {
    isPending?: boolean
    nade: NadeAuthorNadeType
}

export default function AdminControlsNade({ isPending, nade }: Props) {
    return (
        <>
            <DropdownMenuItem asChild>
                <AdminControlsDelete nade={nade} />
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <AdminControlsEdit />
            </DropdownMenuItem>
            {isPending && (
                <DropdownMenuItem asChild>
                    <AdminControlsApprove />
                </DropdownMenuItem>
            )}
        </>
    )
}
