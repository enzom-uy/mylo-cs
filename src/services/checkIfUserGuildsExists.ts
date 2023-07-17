import { db } from '@/config/db'
import { Guild } from './getUserGuilds'
import { Server } from '@prisma/client'

/**
 * Checks if any of the discord servers the user is in already exists in the database.
 * @params {Guild[] | undefined} params.userGuilds - Array of type {Guild} returned from the Discord API.
 * @returns {Promise<Server[]>}
 */
export const checkIfUserGuildsExist = async ({
    userGuilds
}: {
    userGuilds: Guild[] | undefined
}): Promise<Server[]> => {
    const guildsId = userGuilds?.map((g) => ({ id: { contains: g.id } }))
    const existingServers = await db.server.findMany({
        where: {
            OR: guildsId
        }
    })

    return existingServers
}
