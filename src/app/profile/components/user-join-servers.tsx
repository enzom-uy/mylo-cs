'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { RotateCw } from 'lucide-react'
import { useState } from 'react'
import { useToast } from '@/shad-components/use-toast'

export default function UserJoinServers({
    access_token,
    id
}: {
    access_token: string
    id: string
}) {
    const [clicked, setClicked] = useState<boolean>(false)
    const router = useRouter()
    const { toast } = useToast()
    const handleClick = async () => {
        setClicked(true)
        const response = await axios
            .post('/api/join-servers', {
                access_token,
                id
            })
            .then((res) => res.data)
        router.refresh()
        console.log(response)
        setClicked(false)
        toast({ title: 'Se han actualizado tus servidores.' })
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
