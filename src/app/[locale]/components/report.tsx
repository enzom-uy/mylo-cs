'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/shad-components/dialog'
import { Flag } from 'lucide-react'
import { useTranslations } from 'next-intl'
import ReportReason from './report-reason'
import { Report_Target } from '@prisma/client'
import { useState } from 'react'

interface Props {
    context: Report_Target
    reportAuthorId: string
    reportedServerId?: string
    reportedNadeId?: string
}

export default function Report({
    context,
    reportAuthorId,
    reportedServerId,
    reportedNadeId
}: Props) {
    const [open, setOpen] = useState<boolean>(false)
    const t = useTranslations()
    const closeDialog = () => {
        setOpen(false)
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Flag className="w-5 text-muted-foreground duration-150 hover:text-destructive" />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {t(
                            context === 'NADE'
                                ? 'Report.report-nade'
                                : 'Report.report-server'
                        )}
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    {t('Report.report-reason-description')}
                </DialogDescription>
                <ReportReason
                    target={context}
                    reportAuthorId={reportAuthorId}
                    reportedNadeId={reportedNadeId}
                    reportedServerId={reportedServerId}
                    closeDialog={closeDialog}
                />
            </DialogContent>
        </Dialog>
    )
}
