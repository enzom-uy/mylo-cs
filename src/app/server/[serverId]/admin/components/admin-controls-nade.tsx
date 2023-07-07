import { DropdownMenuItem } from '@shad/dropdown-menu'
import { Trash2, Edit, CheckSquare } from 'lucide-react'
import AdminControlsDelete from './admin-controls-delete'
import AdminControlsEdit from './admin-controls-edit'
import AdminControlsApprove from './admin-controls-approve'

interface Props {
    isPending?: boolean
}

export default function AdminControlsNade({ isPending }: Props) {
    return (
        <>
            <DropdownMenuItem asChild>
                <AdminControlsDelete />
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
