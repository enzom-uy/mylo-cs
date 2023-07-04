import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { User, UserServerRole } from '@prisma/client'
import ServersList from './components/servers-list'
import { getUserServers } from '@/utils/getUserServers'
import { redirect } from 'next/navigation'

export interface UserServers {
    servers_is_member: {
        name: string
        description: string | null
        UserServerRole: UserServerRole[]
        members: User[]
        id: string
    }[]
}

export default async function ServersPage() {
    const session = await getServerSession(authOptions)
    if (!session) redirect('/')
    const userServers = await getUserServers({ session })
    return (
        <>
            <h1>Mis servidores</h1>
            <section className="w-full">
                {!!userServers ? (
                    <ServersList userServers={userServers} />
                ) : (
                    'Nada'
                )}
            </section>
        </>
    )
}
