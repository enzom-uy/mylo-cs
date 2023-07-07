import { DeleteNadeData } from '@/app/api/delete-nade/route'
import { Button } from '@/shad-components/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/shad-components/dialog'
import axios from 'axios'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'

export default function AdminControlsDelete({ nadeId }: { nadeId: string }) {
    const [open, setOpen] = useState(false)
    const handleConfirm = async () => {
        const axiosBody: DeleteNadeData = {
            nadeId
        }
        const response = await axios
            .post('/api/delete-nade', axiosBody)
            .then((res) => res.data)
        console.log(response)
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="admin-ctrl-dialog-item hover:text-destructive">
                <Trash2 className="w-5" />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex flex-col items-center gap-2">
                        <Button
                            variant="destructive"
                            onClick={handleConfirm}
                            className="w-full max-w-xs"
                        >
                            Borrar
                        </Button>
                        <Button
                            className="btn w-full max-w-xs bg-dark/80 hover:bg-dark/90"
                            onClick={() => setOpen(false)}
                        >
                            Cancelar
                        </Button>
                    </DialogTitle>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
