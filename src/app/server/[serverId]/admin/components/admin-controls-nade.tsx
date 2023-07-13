import { NadeAuthorNadeType } from '@/services/getServer'
import { DropdownMenuItem } from '@shad/dropdown-menu'
import AdminControlsApprove from './admin-controls-approve'
import AdminControlsDelete from './admin-controls-delete'
import AdminControlsEdit from './admin-controls-edit'

interface Props {
    isPending?: boolean
    nade: NadeAuthorNadeType
    isAdmin: boolean
}

export default function AdminControlsNade({ isPending, nade, isAdmin }: Props) {
    return (
        <>
            <DropdownMenuItem asChild>
                <AdminControlsDelete nade={nade} />
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <AdminControlsEdit nade={nade} />
            </DropdownMenuItem>
            {isPending && isAdmin && (
                <DropdownMenuItem asChild>
                    <AdminControlsApprove nade={nade} />
                </DropdownMenuItem>
            )}
        </>
    )
}
