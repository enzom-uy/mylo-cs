'use client'

import { Button } from '@/shad-components/button'
import { addUserToExistingServers } from '@/utils/addUserToExistingServers'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function UserJoinServers({
    access_token,
    id
}: {
    access_token: string
    id: string
}) {
    const router = useRouter()
    const handleClick = async () => {
        const response = await axios.post('/api/join-servers', {
            access_token,
            id
        })
        if (response) router.refresh()
    }
    return <Button onClick={handleClick}>Actualizar servidores</Button>
}
