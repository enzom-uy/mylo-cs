import {
    ApproveNadeData,
    ApproveNadeResponse
} from '@/app/api/approve-nade/route'
import { approveNade, loadingNades } from '@/redux/features/nadesSlice'
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
import { CheckCheck } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

export default function AdminControlsApprove({
    nade
}: {
    nade: NadeAuthorNadeType
}) {
    const t = useTranslations()
    const [open, setOpen] = useState(false)
    const dispatch = useAppDispatch()
    const { toast } = useToast()
    const handleConfirm = async () => {
        const axiosBody: ApproveNadeData = {
            nadeId: nade.id
        }
        dispatch(loadingNades(true))
        const response = (await axios
            .post('/api/approve-nade', axiosBody)
            .then((res) => {
                return res.data
            })) as ApproveNadeResponse

        if (
            response.result === 'error' &&
            response.approvedNade === undefined
        ) {
            toast({
                title: t('Approve-Nade.api.error'),
                variant: 'destructive',
                duration: TOAST_DURATION
            })
            dispatch(loadingNades(false))
            return
        }
        toast({
            title: t('Approve-Nade.api.success'),
            duration: TOAST_DURATION
        })

        dispatch(approveNade(response.approvedNade!))
        dispatch(loadingNades(false))
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="admin-ctrl-dialog-item hover:text-green-500">
                <CheckCheck className="w-5" />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex flex-col items-center gap-2">
                        <Button
                            onClick={handleConfirm}
                            className="w-full max-w-xs bg-green-500 hover:bg-green-600"
                        >
                            {t('Approve-Nade.approve')}
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
