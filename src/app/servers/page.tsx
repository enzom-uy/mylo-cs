import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { User, UserServerRole } from '@prisma/client'
import ServersList from './components/servers-list'
import { getUserServers } from '../utils/getUserServers'

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
    const userServers = await getUserServers({ session: session })
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
