import { db } from '@/config/db'
import { redirect } from 'next/navigation'

export default async function ServerPage({
    params
}: {
    params: { serverId: string }
}) {
    const server = await db.server.findFirst({
        where: {
            id: params.serverId
        }
    })
    if (!server) {
        redirect('/')
    }
    return <h1>{params.serverId}</h1>
}
