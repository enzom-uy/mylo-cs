import { getServer } from '@/utils/getServer'
import { redirect } from 'next/navigation'

export default async function ServerPage({
    params
}: {
    params: { serverId: string }
}) {
    const server = await getServer({ params })
    if (!server) redirect('/')
    return <h1>{params.serverId}</h1>
}
