import { db } from '@/config/db'
import { Nade, NadeType, Server, User } from '@prisma/client'
import { cache } from 'react'

/**
 * Gets a Server from the database with Admins, Members, Banned_Users and Nades with Author and NadeType included. Returns null if doesn't exists.
 * @param {Object} params - URL options with the server ID section, e.g: 'server/{server_id}'
 * @param {string} params.serverId - Server ID.
 * @param {boolean} options.admin - If the user is Admin of the server or not.
 * @returns {Promise<ServerWithNadesNadeTypeAdminsMembers | null>}
 */
export const getServer = cache(
    async ({
        params,
        admin
    }: {
        params: { serverId: string }
        admin: boolean
    }): Promise<ServerWithNadesNadeTypeAdminsMembers | null> => {
        let whereCondition: { status: string } | undefined = {
            status: 'APPROVED'
        } // Filtro por defecto

        if (admin) {
            whereCondition = undefined // Eliminar el filtro si admin es true
        }

        const server = await db.server.findFirst({
            where: {
                id: params.serverId
            },
            include: {
                admins: true,
                members: true,
                banned_users: true,
                nades: {
                    where: whereCondition as any,
                    include: {
                        author: true,
                        nade_type: true
                    }
                }
            }
        })

        return server
    }
)

export interface NadeAuthorNadeType extends Nade {
    author: User
    nade_type: NadeType
}

export interface ServerWithNadesNadeTypeAdminsMembers extends Server {
    admins: User[]
    members: User[]
    banned_users: User[]
    nades: NadeAuthorNadeType[]
}
