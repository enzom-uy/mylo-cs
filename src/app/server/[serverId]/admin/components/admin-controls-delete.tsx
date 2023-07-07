import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/shad-components/dialog'
import { Trash2 } from 'lucide-react'

export default function AdminControlsDelete() {
    return (
        <Dialog>
            <DialogTrigger className="admin-ctrl-dialog-item hover:text-destructive">
                <Trash2 className="w-5" />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>¿Quieres borrar esta granada?</DialogTitle>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
