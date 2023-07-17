import { NadeAuthorNadeTypeMap } from '@/app/api/get-nades/route'
import { db } from '@/config/db'

/**
 * Gets nades from the database based on the received params.
 *  @param {string} options.query - Search query used to filter the nades.
 *  @param {string} options.userId - Actual user ID.
 *  @param {string} options.serverId - Server ID. The user might use the search feature inside a Server Page, so this param is used know if the query must include only nades from that server.
 *  @returns {Promise<Array<NadeAuthorNadeTypeMap>>} Promise that resolves in an array of Nades with Author, NadeType and Map included.
 */

export const getNadesQuery = async ({
    query,
    userId,
    serverId
}: {
    query?: string
    userId: string
    serverId?: string
}): Promise<Array<NadeAuthorNadeTypeMap>> => {
    const queryWithSpaces = query && `%${query.replaceAll('-', ' ')}%`

    const nades = await db.nade.findMany({
        where: {
            Server: {
                members: {
                    some: {
                        // I don't want users to see nades of other servers if they're searching for nades in a specific server page
                        id: serverId ? undefined : userId
                    }
                },
                banned_users: {
                    none: {
                        id: userId
                    }
                },
                id: serverId ? serverId : undefined
            },
            status: 'APPROVED',
            OR: [
                {
                    title: {
                        contains: queryWithSpaces
                    }
                },
                {
                    nade_type_name: {
                        contains: queryWithSpaces
                    }
                },
                {
                    author: {
                        name: {
                            contains: queryWithSpaces
                        }
                    }
                },
                {
                    map_name: {
                        contains: queryWithSpaces
                    }
                }
            ]
        },
        include: {
            author: true,
            map: true,
            nade_type: true
        }
    })
    return nades
}
