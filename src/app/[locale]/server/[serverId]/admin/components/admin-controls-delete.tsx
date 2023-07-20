import {
    DeleteNadeApiResponse,
    DeleteNadeData
} from '@/app/api/delete-nade/route'
import { deleteNade, loadingNades } from '@/redux/features/nadesSlice'
import { useAppDispatch } from '@/redux/hooks'
import { NadeAuthorNadeType } from '@/services/getServer'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from '@/shad-components/alert-dialog'
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
            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle className="flex flex-col items-center gap-2">
                        {t('Delete-Nade.delete')}
                    </DialogTitle>
                </DialogHeader>

                <div className="flex flex-col items-center gap-2 md:flex-row md:justify-center">
                    <Button
                        variant="destructive"
                        onClick={handleConfirm}
                        className="w-full"
                    >
                        {t('Delete-Nade.delete')}
                    </Button>
                    <Button
                        className="btn w-full bg-dark-secondary hover:bg-dark-secondary/90"
                        onClick={() => setOpen(false)}
                    >
                        {t('Button.cancel')}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
