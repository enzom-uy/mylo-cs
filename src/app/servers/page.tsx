import { db } from '@/config/db'
import { getServerSession } from 'next-auth'
import React from 'react'
import ServerCard from './components/server-card'
import { authOptions } from '../api/auth/[...nextauth]/route'

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
                <ul>
                    {userServers?.servers_is_member.map((server) => (
                        <ServerCard
                            key={server.name}
                            name={server.name}
                            description={server.description}
                            members={server.members.length}
                            id={server.id}
                        />
                    ))}
                </ul>
            </section>
        </>
    )
}
