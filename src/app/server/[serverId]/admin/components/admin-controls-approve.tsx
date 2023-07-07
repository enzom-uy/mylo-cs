import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/shad-components/dialog'
import { CheckCheck } from 'lucide-react'

export default function AdminControlsApprove() {
    return (
        <Dialog>
            <DialogTrigger className="admin-ctrl-dialog-item hover:text-green-500">
                <CheckCheck className="w-5" />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Aprobar granada</DialogTitle>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
