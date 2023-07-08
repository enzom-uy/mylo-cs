import { DeleteNadeData } from '@/app/api/delete-nade/route'
import { deleteNade, loadingNades } from '@/redux/features/nadesSlice'
import { useAppDispatch } from '@/redux/hooks'
import { NadeAuthorNadeType } from '@/services/getServer'
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

export default function AdminControlsDelete({
    nade
}: {
    nade: NadeAuthorNadeType
}) {
    const [open, setOpen] = useState(false)
    const dispatch = useAppDispatch()
    const handleConfirm = async () => {
        const axiosBody: DeleteNadeData = {
            nadeId: nade.id
        }
        dispatch(loadingNades(true))
        const response = await axios
            .post('/api/delete-nade', axiosBody)
            .then((res) => {
                dispatch(deleteNade(nade))
                return res.data
            })
            .finally(() => dispatch(loadingNades(false)))
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
