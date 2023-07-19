import {
    DeleteNadeApiResponse,
    DeleteNadeData
} from '@/app/api/delete-nade/route'
import { deleteNade, loadingNades } from '@/redux/features/nadesSlice'
import { useAppDispatch } from '@/redux/hooks'
import { NadeAuthorNadeType } from '@/services/getServer'
import { Button } from '@/shad-components/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/shad-components/dialog'
import { useToast } from '@/shad-components/use-toast'
import { TOAST_DURATION } from '@/utils/contants'
import axios from 'axios'
import { Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

export default function AdminControlsDelete({
    nade
}: {
    nade: NadeAuthorNadeType
}) {
    const t = useTranslations()
    const [open, setOpen] = useState(false)
    const { toast } = useToast()
    const dispatch = useAppDispatch()
    const handleConfirm = async () => {
        const axiosBody: DeleteNadeData = {
            nadeId: nade.id
        }
        dispatch(loadingNades(true))
        const response = (await axios
            .post('/api/delete-nade', axiosBody)
            .then((res) => {
                return res.data
            })) as DeleteNadeApiResponse

        if (response.result === 'error') {
            toast({
                title: response.message,
                variant: 'destructive',
                duration: TOAST_DURATION
            })
            dispatch(loadingNades(false))
            return
        }

        dispatch(deleteNade(nade))
        dispatch(loadingNades(false))
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
                            {t('Delete-Nade.delete')}
                        </Button>
                        <Button
                            className="btn w-full max-w-xs bg-dark/80 hover:bg-dark/90"
                            onClick={() => setOpen(false)}
                        >
                            {t('Button.cancel')}
                        </Button>
                    </DialogTitle>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
