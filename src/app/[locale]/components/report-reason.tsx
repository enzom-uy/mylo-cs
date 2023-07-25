'use client'

import { ReportBody } from '@/app/api/report/route'
import { Button } from '@/shad-components/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/shad-components/form'
import { Textarea } from '@/shad-components/textarea'
import { useToast } from '@/shad-components/use-toast'
import { ApiResponse } from '@/types/api'
import { TOAST_DURATION } from '@/utils/contants'
import { zodResolver } from '@hookform/resolvers/zod'
import { Report_Target } from '@prisma/client'
import axios from 'axios'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

interface Props {
    target: Report_Target
    reportedServerId?: string
    reportedNadeId?: string
    reportAuthorId: string
    closeDialog: () => void
}

export default function ReportReason({
    target,
    reportedServerId,
    reportedNadeId,
    reportAuthorId,
    closeDialog
}: Props) {
    const t = useTranslations()
    const { toast } = useToast()
    const formSchema = z.object({
        reason: z
            .string({ required_error: t('Report.reason-required-msg') })
            .max(400)
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            reason: ''
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const axiosBody: ReportBody = {
            reason: values.reason,
            target,
            reportAuthorId,
            reportedNadeId: reportedNadeId ? reportedNadeId : undefined,
            reportedServerId: reportedServerId ? reportedServerId : undefined
        }

        const response = (await axios
            .post('/api/report', axiosBody)
            .then((res) => res.data)) as ApiResponse

        if (response.result === 'error') {
            toast({
                title: t('Report.api.error'),
                duration: TOAST_DURATION
            })
            return
        }

        toast({
            title: t('Report.api.success'),
            duration: TOAST_DURATION
        })
        closeDialog()
    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-2"
            >
                <FormField
                    control={form.control}
                    name="reason"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('Report.report-reason')}</FormLabel>
                            <FormControl>
                                <Textarea {...field} maxLength={400} required />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    className="bg-accent-light hover:bg-accent-light/90"
                >
                    {t('Report.report-submit')}
                </Button>
            </form>
        </Form>
    )
}
