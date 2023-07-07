import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/shad-components/dialog'
import { Edit } from 'lucide-react'

export default function AdminControlsEdit() {
    return (
        <Dialog>
            <DialogTrigger className="admin-ctrl-dialog-item hover:text-accent-dark">
                <Edit className="w-5" />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar granada</DialogTitle>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
