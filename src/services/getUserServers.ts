import { db } from '@/config/db'
import { Server } from '@prisma/client'
import { Session } from 'next-auth'
import { cache } from 'react'

/**
 * Gets user's servers from the database. Returns null if doesn't exists.
 * @param {Session} params.session - User's Session from next-auth.
 * @returns {Promise<UserServers | null>}
 */
export const getUserServers = cache(
    async ({
        session
    }: {
        session: Session | null
    }): Promise<UserServers | null> => {
        const userServers = await db.user.findFirst({
            where: {
                id: session?.id
            },
            select: {
                servers_is_member: true,
                servers_is_admin: true,
                servers_is_owner: true
            }
        })
        return userServers
    }
)

export interface UserServers {
    servers_is_member: Server[]
    servers_is_admin: Server[]
    servers_is_owner: Server[]
}
