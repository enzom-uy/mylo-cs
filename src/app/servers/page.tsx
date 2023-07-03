import { db } from '@/config/db'
import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { User, UserServerRole } from '@prisma/client'
import ServersList from './components/servers-list'

// export interface UserServers {
//     servers_is_member: {
//         name: string
//         description: string | null
//         UserServerRole: {
//             id: string
//             user_id: string
//             server_id: string
//             role: Server_Role
//         }[]
//         members: []
//         id: string
//     }[]
// }

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
    const userServers = await db.user.findFirst({
        where: {
            id: session?.id
        },
        select: {
            servers_is_member: {
                select: {
                    name: true,
                    description: true,
                    UserServerRole: true,
                    members: true,
                    id: true
                }
            }
        }
    })
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
