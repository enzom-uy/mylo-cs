'use client'

import { ServerApiResponse } from '@/app/api/create-server/route'
import { useToast } from '@/shad-components/use-toast'
import { TOAST_DURATION } from '@/utils/contants'
import axios from 'axios'
import { RotateCw } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function UserJoinServers({
    access_token,
    id
}: {
    access_token: string
    id: string
}) {
    const t = useTranslations()
    const [clicked, setClicked] = useState<boolean>(false)
    const router = useRouter()
    const { toast } = useToast()
    const handleClick = async () => {
        setClicked(true)
        const response = (await axios
            .post('/api/join-servers', {
                access_token,
                id
            })
            .then((res) => res.data)) as ServerApiResponse
        if (response.result === 'error') {
            setClicked(false)
            toast({
                title: t('Join-Server.api.error'),
                variant: 'destructive',
                duration: TOAST_DURATION
            })
            return
        }
        setClicked(false)
        toast({ title: t('Join-Server.api.success'), duration: TOAST_DURATION })
        setTimeout(() => {
            router.refresh()
        }, 500)
    }
    return (
        <button
            onClick={handleClick}
            className={`cursor-pointer ${clicked && 'animate-spin'}`}
        >
            <RotateCw className="w-5" />
        </button>
    )
}
