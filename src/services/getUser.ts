import { db } from '@/config/db'
import { Nade, Server, User } from '@prisma/client'
import { cache } from 'react'

export interface UserWithNadesAndServers extends User {
    nades: Nade[]
    servers_is_member: Server[]
    servers_is_admin: Server[]
    servers_is_owner: Server[]
}

/**
 * Gets the user info from the database, with nades, servers_is_member, servers_is_admin and servers_is_owner included. Returns null if doesn't exists.
 * @param {string} params.id - User ID.
 * @returns {Promise<UserWithNadesAndServers | null>}
 */
export const getUser = cache(
    async ({ id }: { id: string }): Promise<UserWithNadesAndServers | null> => {
        const user = await db.user.findFirst({
            where: {
                id
            },
            include: {
                nades: true,
                servers_is_member: true,
                servers_is_admin: true,
                servers_is_owner: true
            }
        })
        return user
    }
)
